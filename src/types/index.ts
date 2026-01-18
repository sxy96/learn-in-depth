// 学习阶段
export enum LearningStage {
  SCAFFOLDING = 'scaffolding',           // 建立认知框架
  ELABORATION = 'elaboration',           // 深化理解
  CRITICAL_THINKING = 'critical',        // 批判性思考
  INTEGRATION = 'integration',           // 整合内化
}

// 学习阶段信息
export interface StageInfo {
  id: LearningStage;
  name: string;
  description: string;
  color: string;
}

// 话题
export interface Topic {
  id: string;
  title: string;
  description: string;
  source: string;
  createdAt: string;
}

// 消息角色
export type MessageRole = 'user' | 'ai';

// 对话消息
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

// 洞察/笔记
export interface Insight {
  id: string;
  content: string;
  stage: LearningStage;
  timestamp: string;
}

// 学习会话
export interface LearningSession {
  id: string;
  topicId: string;
  topic: Topic;
  currentStage: LearningStage;
  messages: Message[];
  insights: Insight[];
  startedAt: string;
  completedAt?: string;
  questionCount: Record<LearningStage, number>; // 每个阶段的问题数
}

// 应用状态
export interface AppState {
  dailyTopics: Topic[];              // 每日推荐的3个话题
  selectedTopic: Topic | null;       // 当前选中学习的话题
  backlog: Topic[];                  // 待学习列表
  history: LearningSession[];        // 学习历史
  currentSession: LearningSession | null;  // 当前学习会话
  lastRecommendationDate: string;    // 上次推荐日期
}
