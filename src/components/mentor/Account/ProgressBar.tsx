import React from 'react';

interface MentorAccountProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const MentorAccountProgressBar: React.FC<MentorAccountProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepLabels
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          {stepLabels[currentStep - 1]}
        </h2>
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      <div className="relative overflow-x-auto">
        <div className="w-full h-2 bg-muted-foreground/20 rounded-full">
          <div
            className="h-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex justify-between mt-4">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs
                    transition-all duration-200
                    ${isCompleted
                      ? 'bg-teal-500 text-primary-foreground'
                      : isCurrent
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted-foreground/20 text-accent-foreground'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className={`
                  text-xs mt-2 text-center max-w-20 leading-tight
                  ${isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'}
                `}>
                  {stepLabels[index]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};