import { Topic } from '../../types';

interface TopicCardProps {
  topic: Topic;
  onSelect: () => void;
}

export function TopicCard({ topic, onSelect }: TopicCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h3>
        <p className="text-sm text-gray-500 mb-3">来源: {topic.source}</p>
        <p className="text-gray-700 leading-relaxed">{topic.description}</p>
      </div>

      <button
        onClick={onSelect}
        className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors font-medium"
      >
        选择深入学习
      </button>
    </div>
  );
}
