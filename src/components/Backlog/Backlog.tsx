import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

export function Backlog() {
  const { state, removeTopicFromBacklog, selectFromBacklog } = useApp();
  const navigate = useNavigate();

  const handleStartLearning = async (topicId: string) => {
    await selectFromBacklog(topicId);
    navigate('/learning');
  };

  const handleRemove = (topicId: string) => {
    removeTopicFromBacklog(topicId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (state.backlog.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">待学习列表为空</h2>
          <p className="text-gray-600 mb-6">
            当你从每日推荐中选择话题时，其余话题会自动加入这里。
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 transition-colors"
          >
            查看今日推荐
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">待学习列表</h2>
        <p className="text-gray-600">
          共 {state.backlog.length} 个话题等待深入学习
        </p>
      </div>

      <div className="space-y-4">
        {state.backlog.map(topic => (
          <div
            key={topic.id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  来源: {topic.source} • 添加于 {formatDate(topic.createdAt)}
                </p>
                <p className="text-gray-700 leading-relaxed">{topic.description}</p>
              </div>

              <div className="ml-6 flex flex-col space-y-2">
                <button
                  onClick={() => handleStartLearning(topic.id)}
                  className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors font-medium whitespace-nowrap"
                >
                  开始学习
                </button>
                <button
                  onClick={() => handleRemove(topic.id)}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  移除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
