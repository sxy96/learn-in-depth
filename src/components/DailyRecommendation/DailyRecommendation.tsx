import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { TopicCard } from './TopicCard';

export function DailyRecommendation() {
  const { state, selectTopic } = useApp();
  const navigate = useNavigate();

  // 如果有当前会话，跳转到学习界面
  useEffect(() => {
    if (state.currentSession) {
      navigate('/learning');
    }
  }, [state.currentSession, navigate]);

  const handleSelectTopic = async (topicId: string) => {
    await selectTopic(topicId);
    navigate('/learning');
  };

  if (state.dailyTopics.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">今日推荐已使用</h2>
          <p className="text-gray-600 mb-6">
            你今天已经选择了学习话题。明天再来获取新的推荐吧！
          </p>
          <button
            onClick={() => navigate('/backlog')}
            className="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 transition-colors"
          >
            查看待学习列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">今日推荐</h2>
        <p className="text-gray-600">
          AI 为你精选了 3 个值得深入学习的话题。选择 1 个开始你的深度学习之旅，其余将自动加入待学习列表。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {state.dailyTopics.map(topic => (
          <TopicCard
            key={topic.id}
            topic={topic}
            onSelect={() => handleSelectTopic(topic.id)}
          />
        ))}
      </div>
    </div>
  );
}
