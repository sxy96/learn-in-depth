import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { LearningSession } from '../../types';
import { STAGE_INFO } from '../../utils/constants';

export function History() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateDuration = (session: LearningSession) => {
    if (!session.completedAt) return '进行中';

    const start = new Date(session.startedAt).getTime();
    const end = new Date(session.completedAt).getTime();
    const durationMinutes = Math.round((end - start) / (1000 * 60));

    if (durationMinutes < 60) {
      return `${durationMinutes} 分钟`;
    }

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours} 小时 ${minutes} 分钟`;
  };

  const toggleExpand = (sessionId: string) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  if (state.history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">还没有学习记录</h2>
          <p className="text-gray-600 mb-6">
            完成第一个深度学习会话后，记录会出现在这里。
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 transition-colors"
          >
            开始学习
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">学习历史</h2>
        <p className="text-gray-600">
          已完成 {state.history.length} 个深度学习会话
        </p>
      </div>

      <div className="space-y-4">
        {state.history.map(session => {
          const isExpanded = expandedSession === session.id;

          return (
            <div
              key={session.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(session.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {session.topic.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>完成于 {formatDate(session.completedAt!)}</span>
                      <span>•</span>
                      <span>用时 {calculateDuration(session)}</span>
                      <span>•</span>
                      <span>{session.insights.length} 条洞察</span>
                    </div>
                  </div>

                  <div className="ml-4">
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-4">关键洞察</h4>

                  {session.insights.length === 0 ? (
                    <p className="text-gray-600">本次会话没有记录洞察</p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(
                        session.insights.reduce((acc, insight) => {
                          if (!acc[insight.stage]) {
                            acc[insight.stage] = [];
                          }
                          acc[insight.stage].push(insight);
                          return acc;
                        }, {} as Record<string, typeof session.insights>)
                      ).map(([stage, insights]) => {
                        const stageInfo = STAGE_INFO[stage as keyof typeof STAGE_INFO];
                        return (
                          <div key={stage}>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className={`w-3 h-3 rounded-full ${stageInfo.color}`} />
                              <h5 className="font-medium text-sm text-gray-700">
                                {stageInfo.name}
                              </h5>
                            </div>
                            <div className="space-y-2 ml-5">
                              {insights.map(insight => (
                                <div
                                  key={insight.id}
                                  className="bg-white rounded-lg p-3 text-sm text-gray-700 border border-gray-200"
                                >
                                  {insight.content}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
