import { LearningStage, StageInfo } from '../types';

// 学习阶段配置
export const STAGE_INFO: Record<LearningStage, StageInfo> = {
  [LearningStage.SCAFFOLDING]: {
    id: LearningStage.SCAFFOLDING,
    name: '建立认知框架',
    description: '了解核心概念和关键术语',
    color: 'bg-blue-500',
  },
  [LearningStage.ELABORATION]: {
    id: LearningStage.ELABORATION,
    name: '深化理解',
    description: '探索概念间关系和多角度视角',
    color: 'bg-purple-500',
  },
  [LearningStage.CRITICAL_THINKING]: {
    id: LearningStage.CRITICAL_THINKING,
    name: '批判性思考',
    description: '挑战假设，发现边界条件',
    color: 'bg-orange-500',
  },
  [LearningStage.INTEGRATION]: {
    id: LearningStage.INTEGRATION,
    name: '整合内化',
    description: '总结洞察，连接知识体系',
    color: 'bg-green-500',
  },
};

// 每个阶段的目标问题数
export const QUESTIONS_PER_STAGE = 3;

// 学习阶段顺序
export const STAGE_ORDER = [
  LearningStage.SCAFFOLDING,
  LearningStage.ELABORATION,
  LearningStage.CRITICAL_THINKING,
  LearningStage.INTEGRATION,
];
