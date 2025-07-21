import React from 'react';

interface MentorAccountProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const MentorAccountProgressBar: React.FC<MentorAccountProgressBarProps> = ({ currentStep, totalSteps, stepLabels }) => {

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
    </div>
  );
};