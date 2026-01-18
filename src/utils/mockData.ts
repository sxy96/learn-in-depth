import { Topic } from '../types';

// 模拟话题池
const MOCK_TOPICS_POOL: Omit<Topic, 'id' | 'createdAt'>[] = [
  {
    title: '第一性原理思维',
    description: '从物理学衍生出的思维模型，Elon Musk 常用的解决问题方法。将复杂问题分解到最基本的真理，然后从基础重新构建解决方案。',
    source: 'Twitter @Naval',
  },
  {
    title: '心流状态（Flow State）',
    description: '心理学家 Mihaly Csikszentmihalyi 提出的概念。当技能与挑战达到完美平衡时，人会进入完全专注、忘记时间的最佳状态。',
    source: 'Hacker News',
  },
  {
    title: '复利效应与指数增长',
    description: '爱因斯坦称为"世界第八大奇迹"。微小的持续改进会随时间产生惊人的累积效应，在投资、学习、健康等领域都适用。',
    source: 'Reddit r/productivity',
  },
  {
    title: 'OODA 循环决策模型',
    description: '美国空军上校 John Boyd 提出的快速决策框架：观察(Observe)、定向(Orient)、决定(Decide)、行动(Act)。在不确定环境中保持优势。',
    source: 'Medium',
  },
  {
    title: '帕累托法则（80/20 法则）',
    description: '意大利经济学家 Vilfredo Pareto 发现的规律：80%的结果来自20%的原因。应用于时间管理、商业、软件优化等领域。',
    source: 'RSS: Farnam Street',
  },
  {
    title: '认知负荷理论',
    description: '教育心理学家 John Sweller 提出。人的工作记忆容量有限，有效学习需要管理内在、外在和关联认知负荷。',
    source: 'Twitter @davidperell',
  },
  {
    title: '双过程理论（系统1与系统2）',
    description: 'Daniel Kahneman 在《思考，快与慢》中提出。大脑有快速直觉的系统1和缓慢理性的系统2，理解两者能改善决策质量。',
    source: 'Hacker News',
  },
  {
    title: '反脆弱性（Antifragility）',
    description: 'Nassim Taleb 提出的概念。有些系统不只是抵抗冲击（鲁棒性），还能从压力中获益和成长。',
    source: 'Twitter @nntaleb',
  },
  {
    title: '刻意练习（Deliberate Practice）',
    description: 'Anders Ericsson 研究发现的专业技能养成方法。通过高度专注、即时反馈、走出舒适区的练习达到精通。',
    source: 'Medium',
  },
  {
    title: '最小可行产品（MVP）',
    description: 'Eric Ries 精益创业方法的核心。用最少资源构建产品核心功能，快速验证假设、获取反馈、迭代改进。',
    source: 'RSS: Paul Graham',
  },
];

// 生成唯一ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 获取今天的日期（YYYY-MM-DD）
export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// 生成每日推荐话题
export function generateDailyTopics(): Topic[] {
  // 随机选择3个话题
  const shuffled = [...MOCK_TOPICS_POOL].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);

  const createdAt = new Date().toISOString();

  return selected.map(topic => ({
    ...topic,
    id: generateId(),
    createdAt,
  }));
}
