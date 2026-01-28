import { CheckoutStep } from "@/types/checkout";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib";

type CheckoutStepperProps = {
  currentStep: CheckoutStep;
  completedSteps: Set<number>;
};

const steps = [
  { number: 1, label: "Delivery" },
  { number: 2, label: "Payment" },
  { number: 3, label: "Review" },
];

export function CheckoutStepper(props: CheckoutStepperProps) {
  const { currentStep, completedSteps } = props;

  return (
    <div className="w-full mb-8 md:mb-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = completedSteps.has(step.number);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                    isCompleted &&
                      "bg-green-600 border-green-600 text-white",
                    isActive && !isCompleted &&
                      "bg-blue-600 border-blue-600 text-white",
                    !isActive && !isCompleted &&
                      "bg-neutral-02 border-neutral-5 text-neutral-9",
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs md:text-sm font-medium",
                    isActive && "text-neutral-12",
                    !isActive && "text-neutral-10",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 md:mx-4 transition-all",
                    isCompleted ? "bg-green-600" : "bg-neutral-5",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
