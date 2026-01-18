import { LearningStage, Message } from '../types';
import { STAGE_INFO } from './constants';

// 生成唯一ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 模拟AI响应延迟
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 根据学习阶段和话题生成AI问题
function generateQuestionForStage(stage: LearningStage, topicTitle: string, questionIndex: number): string {
  const questions: Record<LearningStage, string[]> = {
    [LearningStage.SCAFFOLDING]: [
      `让我们开始探索"${topicTitle}"。在你看来，这个概念的核心是什么？`,
      `很好！现在，你能解释一下这个概念中最重要的几个关键术语吗？`,
      `到目前为止理解得不错。你觉得为什么这个概念会受到关注？它解决了什么问题？`,
    ],
    [LearningStage.ELABORATION]: [
      `现在让我们深入一些。在"${topicTitle}"的框架下，你认为哪些要素之间存在重要的关联？`,
      `很有洞察！不同的专家可能会从不同角度看待这个概念。你能想到有哪些不同的视角或流派吗？`,
      `让我们用一个具体例子来理解。你能想到现实生活中哪个场景很好地体现了这个概念吗？`,
    ],
    [LearningStage.CRITICAL_THINKING]: [
      `现在我们来批判性地思考。你认为"${topicTitle}"这个概念有什么局限性或边界条件？`,
      `很好的思考！假设在极端情况下，这个理论还会成立吗？为什么？`,
      `基于我们的讨论，你对这个概念形成了什么独特的观点或质疑？`,
    ],
    [LearningStage.INTEGRATION]: [
      `我们已经深入探讨了很多。现在，请用你自己的话总结一下对"${topicTitle}"最核心的3个洞察。`,
      `非常好！这个概念如何与你已有的知识体系连接？它让你想到了什么？`,
      `最后一个问题：在未来的什么情况下，你会想到并应用这个概念？`,
    ],
  };

  const stageQuestions = questions[stage];
  return stageQuestions[questionIndex % stageQuestions.length];
}

// 生成AI的反馈回应
function generateFeedbackResponse(): string {
  const feedbacks = [
    '很有意思的观点！',
    '你的思考很深入。',
    '这是个很好的角度。',
    '继续保持这种思考深度！',
    '非常好的洞察！',
    '你抓住了关键点。',
  ];
  return feedbacks[Math.floor(Math.random() * feedbacks.length)];
}

// 模拟AI服务
export class AIService {
  // 获取AI的初始欢迎消息
  async getWelcomeMessage(topicTitle: string): Promise<Message> {
    await delay(800);

    return {
      id: generateId(),
      role: 'ai',
      content: `你好！今天我们一起来深入学习"${topicTitle}"。我会作为你的学习向导，通过一系列问题帮助你建立深度理解。\n\n准备好了吗？让我们开始第一阶段：建立认知框架。`,
      timestamp: new Date().toISOString(),
    };
  }

  // 获取当前阶段的第一个问题
  async getStageFirstQuestion(stage: LearningStage, topicTitle: string): Promise<Message> {
    await delay(1000);

    const question = generateQuestionForStage(stage, topicTitle, 0);

    return {
      id: generateId(),
      role: 'ai',
      content: question,
      timestamp: new Date().toISOString(),
    };
  }

  // 响应用户回答并提出下一个问题
  async respondToAnswer(
    _userAnswer: string,
    stage: LearningStage,
    topicTitle: string,
    questionIndex: number
  ): Promise<Message> {
    await delay(1200);

    const feedback = generateFeedbackResponse();
    const nextQuestion = generateQuestionForStage(stage, topicTitle, questionIndex);

    return {
      id: generateId(),
      role: 'ai',
      content: `${feedback}\n\n${nextQuestion}`,
      timestamp: new Date().toISOString(),
    };
  }

  // 转换到下一个学习阶段
  async transitionToNextStage(nextStage: LearningStage, topicTitle: string): Promise<Message> {
    await delay(1000);

    const stageInfo = STAGE_INFO[nextStage];
    const question = generateQuestionForStage(nextStage, topicTitle, 0);

    return {
      id: generateId(),
      role: 'ai',
      content: `太好了！我们已经完成了上一个阶段。现在让我们进入下一个阶段：${stageInfo.name}。\n\n${stageInfo.description}\n\n${question}`,
      timestamp: new Date().toISOString(),
    };
  }

  // 完成学习的总结消息
  async getCompletionMessage(topicTitle: string): Promise<Message> {
    await delay(1000);

    return {
      id: generateId(),
      role: 'ai',
      content: `恭喜你！我们已经完成了对"${topicTitle}"的深度学习之旅。\n\n通过四个阶段的探索，你不仅理解了核心概念，还建立了批判性思考，并将知识整合到了自己的认知体系中。\n\n你的所有洞察已经自动保存。随时可以回顾这次学习记录！`,
      timestamp: new Date().toISOString(),
    };
  }

  // 从对话中提取洞察
  extractInsights(messages: Message[], _stage: LearningStage): string[] {
    // 简单实现：提取用户的回答作为洞察
    // 在实际应用中，可以使用AI来智能提取关键洞察
    const userMessages = messages.filter(m => m.role === 'user');
    return userMessages.map(m => {
      // 截取前100个字符作为洞察
      const content = m.content.length > 100
        ? m.content.substring(0, 100) + '...'
        : m.content;
      return content;
    });
  }
}

// 导出单例
export const aiService = new AIService();
