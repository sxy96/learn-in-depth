import { Fragment } from 'react';
import { LearningStage } from '../../types';
import { STAGE_INFO, STAGE_ORDER } from '../../utils/constants';

interface ProgressBarProps {
  currentStage: LearningStage;
}

export function ProgressBar({ currentStage }: ProgressBarProps) {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {STAGE_ORDER.map((stage, index) => {
            const stageInfo = STAGE_INFO[stage];
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <Fragment key={stage}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? `${stageInfo.color} text-white ring-4 ring-offset-2 ring-primary-200`
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={`text-sm font-medium ${
                        isCurrent ? 'text-primary-700' : 'text-gray-600'
                      }`}
                    >
                      {stageInfo.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 max-w-[120px]">
                      {stageInfo.description}
                    </div>
                  </div>
                </div>

                {index < STAGE_ORDER.length - 1 && (
                  <div className="flex-1 h-1 mx-2 mb-12">
                    <div
                      className={`h-full rounded transition-all ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
