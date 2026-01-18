import { AppState, Topic, LearningSession } from '../types';
import { generateDailyTopics, getTodayDate } from './mockData';

const STORAGE_KEY = 'learn-in-depth-state';

// 获取初始状态
function getInitialState(): AppState {
  return {
    dailyTopics: [],
    selectedTopic: null,
    backlog: [],
    history: [],
    currentSession: null,
    lastRecommendationDate: '',
  };
}

// 从 localStorage 加载状态
export function loadState(): AppState {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return getInitialState();
    }
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Failed to load state:', err);
    return getInitialState();
  }
}

// 保存状态到 localStorage
export function saveState(state: AppState): void {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.error('Failed to save state:', err);
  }
}

// 检查是否需要生成新的每日推荐
export function shouldGenerateNewRecommendations(state: AppState): boolean {
  const today = getTodayDate();
  return state.lastRecommendationDate !== today;
}

// 更新每日推荐
export function updateDailyRecommendations(state: AppState): AppState {
  const newTopics = generateDailyTopics();
  return {
    ...state,
    dailyTopics: newTopics,
    lastRecommendationDate: getTodayDate(),
  };
}

// 选择话题开始学习
export function selectTopicForLearning(state: AppState, topicId: string): AppState {
  const topic = state.dailyTopics.find(t => t.id === topicId);
  if (!topic) return state;

  // 将其他话题加入 backlog
  const remainingTopics = state.dailyTopics.filter(t => t.id !== topicId);

  return {
    ...state,
    selectedTopic: topic,
    backlog: [...state.backlog, ...remainingTopics],
    dailyTopics: [], // 清空每日推荐
  };
}

// 添加话题到 backlog
export function addToBacklog(state: AppState, topic: Topic): AppState {
  // 检查是否已存在
  const exists = state.backlog.some(t => t.id === topic.id);
  if (exists) return state;

  return {
    ...state,
    backlog: [...state.backlog, topic],
  };
}

// 从 backlog 移除话题
export function removeFromBacklog(state: AppState, topicId: string): AppState {
  return {
    ...state,
    backlog: state.backlog.filter(t => t.id !== topicId),
  };
}

// 保存完成的学习会话到历史
export function saveSessionToHistory(state: AppState, session: LearningSession): AppState {
  return {
    ...state,
    history: [session, ...state.history],
    currentSession: null,
    selectedTopic: null,
  };
}
