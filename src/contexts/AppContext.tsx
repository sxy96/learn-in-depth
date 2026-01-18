import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, Topic, LearningSession, Message, LearningStage } from '../types';
import {
  loadState,
  saveState,
  shouldGenerateNewRecommendations,
  updateDailyRecommendations,
  selectTopicForLearning,
  removeFromBacklog,
  saveSessionToHistory,
} from '../utils/storage';
import { aiService } from '../utils/aiService';
import { QUESTIONS_PER_STAGE, STAGE_ORDER } from '../utils/constants';

interface AppContextType {
  state: AppState;
  startNewDay: () => void;
  selectTopic: (topicId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  completeSession: () => void;
  removeTopicFromBacklog: (topicId: string) => void;
  selectFromBacklog: (topicId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const loaded = loadState();
    // 检查是否需要生成新的每日推荐
    if (shouldGenerateNewRecommendations(loaded)) {
      return updateDailyRecommendations(loaded);
    }
    return loaded;
  });

  // 自动保存状态
  useEffect(() => {
    saveState(state);
  }, [state]);

  // 开始新的一天（生成新推荐）
  const startNewDay = () => {
    setState(prevState => updateDailyRecommendations(prevState));
  };

  // 创建新的学习会话
  const createNewSession = (topic: Topic): LearningSession => {
    return {
      id: `session-${Date.now()}`,
      topicId: topic.id,
      topic,
      currentStage: LearningStage.SCAFFOLDING,
      messages: [],
      insights: [],
      startedAt: new Date().toISOString(),
      questionCount: {
        [LearningStage.SCAFFOLDING]: 0,
        [LearningStage.ELABORATION]: 0,
        [LearningStage.CRITICAL_THINKING]: 0,
        [LearningStage.INTEGRATION]: 0,
      },
    };
  };

  // 选择话题开始学习
  const selectTopic = async (topicId: string) => {
    const topic = state.dailyTopics.find(t => t.id === topicId);
    if (!topic) return;

    // 更新状态：选择话题并移动其他话题到 backlog
    const updatedState = selectTopicForLearning(state, topicId);

    // 创建新的学习会话
    const newSession = createNewSession(topic);

    // 获取AI欢迎消息
    const welcomeMessage = await aiService.getWelcomeMessage(topic.title);
    newSession.messages.push(welcomeMessage);

    // 获取第一个问题
    const firstQuestion = await aiService.getStageFirstQuestion(
      LearningStage.SCAFFOLDING,
      topic.title
    );
    newSession.messages.push(firstQuestion);

    setState({
      ...updatedState,
      currentSession: newSession,
    });
  };

  // 从 backlog 选择话题
  const selectFromBacklog = async (topicId: string) => {
    const topic = state.backlog.find(t => t.id === topicId);
    if (!topic) return;

    // 从 backlog 移除
    const updatedState = removeFromBacklog(state, topicId);

    // 创建新的学习会话
    const newSession = createNewSession(topic);

    // 获取AI欢迎消息
    const welcomeMessage = await aiService.getWelcomeMessage(topic.title);
    newSession.messages.push(welcomeMessage);

    // 获取第一个问题
    const firstQuestion = await aiService.getStageFirstQuestion(
      LearningStage.SCAFFOLDING,
      topic.title
    );
    newSession.messages.push(firstQuestion);

    setState({
      ...updatedState,
      currentSession: newSession,
      selectedTopic: topic,
    });
  };

  // 发送消息并获取AI响应
  const sendMessage = async (content: string) => {
    if (!state.currentSession) return;

    const session = state.currentSession;

    // 添加用户消息
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    session.messages.push(userMessage);

    // 增加当前阶段的问题计数
    session.questionCount[session.currentStage]++;

    // 从用户消息中提取洞察
    const newInsights = aiService.extractInsights([userMessage], session.currentStage);
    newInsights.forEach(insightContent => {
      session.insights.push({
        id: `insight-${Date.now()}-${Math.random()}`,
        content: insightContent,
        stage: session.currentStage,
        timestamp: new Date().toISOString(),
      });
    });

    // 检查是否需要进入下一阶段
    const currentStageQuestions = session.questionCount[session.currentStage];
    const shouldAdvanceStage = currentStageQuestions >= QUESTIONS_PER_STAGE;

    let aiResponse: Message;

    if (shouldAdvanceStage) {
      // 获取下一个阶段
      const currentStageIndex = STAGE_ORDER.indexOf(session.currentStage);
      const isLastStage = currentStageIndex === STAGE_ORDER.length - 1;

      if (isLastStage) {
        // 完成学习
        aiResponse = await aiService.getCompletionMessage(session.topic.title);
        session.messages.push(aiResponse);
        session.completedAt = new Date().toISOString();

        // 保存到历史
        setState(prevState => saveSessionToHistory(prevState, session));
        return;
      } else {
        // 进入下一阶段
        const nextStage = STAGE_ORDER[currentStageIndex + 1];
        session.currentStage = nextStage;

        aiResponse = await aiService.transitionToNextStage(nextStage, session.topic.title);
      }
    } else {
      // 继续当前阶段
      aiResponse = await aiService.respondToAnswer(
        content,
        session.currentStage,
        session.topic.title,
        currentStageQuestions
      );
    }

    session.messages.push(aiResponse);

    // 更新状态
    setState(prevState => ({
      ...prevState,
      currentSession: { ...session },
    }));
  };

  // 完成当前会话
  const completeSession = () => {
    if (!state.currentSession) return;

    const session = state.currentSession;
    session.completedAt = new Date().toISOString();

    setState(prevState => saveSessionToHistory(prevState, session));
  };

  // 从 backlog 移除话题
  const removeTopicFromBacklog = (topicId: string) => {
    setState(prevState => removeFromBacklog(prevState, topicId));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        startNewDay,
        selectTopic,
        sendMessage,
        completeSession,
        removeTopicFromBacklog,
        selectFromBacklog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
