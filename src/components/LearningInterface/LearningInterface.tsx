import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { ProgressBar } from './ProgressBar';
import { ChatInterface } from './ChatInterface';
import { InsightsPanel } from './InsightsPanel';

export function LearningInterface() {
  const { state, sendMessage } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.currentSession) {
      navigate('/');
    }
  }, [state.currentSession, navigate]);

  if (!state.currentSession) {
    return null;
  }

  const { currentSession } = state;
  const isCompleted = !!currentSession.completedAt;

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {currentSession.topic.title}
          </h2>
          <p className="text-sm text-gray-500">{currentSession.topic.source}</p>
        </div>
        {isCompleted && (
          <button
            onClick={handleBackToHome}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            返回首页
          </button>
        )}
      </div>

      <ProgressBar currentStage={currentSession.currentStage} />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <ChatInterface
            messages={currentSession.messages}
            onSendMessage={sendMessage}
            isCompleted={isCompleted}
          />
        </div>

        <div className="w-80">
          <InsightsPanel insights={currentSession.insights} />
        </div>
      </div>
    </div>
  );
}
