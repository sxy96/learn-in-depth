import { Insight, LearningStage } from '../../types';
import { STAGE_INFO } from '../../utils/constants';

interface InsightsPanelProps {
  insights: Insight[];
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.stage]) {
      acc[insight.stage] = [];
    }
    acc[insight.stage].push(insight);
    return acc;
  }, {} as Record<LearningStage, Insight[]>);

  return (
    <div className="bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">关键洞察</h3>
        <p className="text-sm text-gray-600 mt-1">AI 自动提取的笔记</p>
      </div>

      <div className="p-4 space-y-4">
        {insights.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>开始对话后，</p>
            <p>关键洞察会自动出现在这里</p>
          </div>
        ) : (
          Object.entries(groupedInsights).map(([stage, stageInsights]) => {
            const stageInfo = STAGE_INFO[stage as LearningStage];
            return (
              <div key={stage} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${stageInfo.color}`} />
                  <h4 className="font-medium text-sm text-gray-700">{stageInfo.name}</h4>
                </div>
                <div className="space-y-2">
                  {stageInsights.map(insight => (
                    <div
                      key={insight.id}
                      className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 border border-gray-200"
                    >
                      {insight.content}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
