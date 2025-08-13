import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress"; // Assuming shadcn/ui Progress is correctly installed

const steps = [
  { id: 1, name: "Mood Scale" },
  { id: 2, name: "Journal Style" },
  { id: 3, name: "Reminders" },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold">Select Your Mood Scale</h2>
            <p>How do you prefer to rate your mood?</p>
            {/* Placeholder for mood scale selection UI */}
            <div className="flex gap-4">
              <button className="border p-4 rounded-md">Emoji Scale</button>
              <button className="border p-4 rounded-md">Number Scale (1-5)</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold">Choose Your Journal Style</h2>
            <p>What kind of journal entries do you prefer?</p>
            {/* Placeholder for journal style selection UI */}
            <div className="flex gap-4">
              <button className="border p-4 rounded-md">Freeform Text</button>
              <button className="border p-4 rounded-md">Guided Prompts</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold">Set Reminder Preferences</h2>
            <p>When would you like to be reminded to log your mood?</p>
            {/* Placeholder for reminder preferences UI */}
            <div className="flex gap-4">
              <button className="border p-4 rounded-md">Morning</button>
              <button className="border p-4 rounded-md">Evening</button>
              <button className="border p-4 rounded-md">Custom</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-md">
      <div className="mb-6">
        <Progress value={progressValue} className="w-full" />
        <div className="flex justify-between text-sm mt-2">
          {steps.map((step) => (
            <span key={step.id} className={step.id === currentStep ? "font-bold" : ""}>
              {step.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6 text-center">
        {renderStepContent()}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
