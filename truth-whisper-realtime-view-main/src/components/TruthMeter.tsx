
import { FC } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface TruthMeterProps {
  score: number; // 0 to 1
}

const TruthMeter: FC<TruthMeterProps> = ({ score }) => {
  const percentage = Math.round(score * 100);
  
  // Determine the indicator color based on the score
  const getIndicatorColor = () => {
    if (percentage >= 70) return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (percentage >= 40) return "bg-gradient-to-r from-yellow-400 to-amber-500";
    return "bg-gradient-to-r from-red-500 to-rose-600";
  };
  
  // Determine the score label based on the score
  const getScoreLabel = () => {
    if (percentage >= 70) return {
      text: "Likely Truthful",
      icon: <CheckCircle className="h-6 w-6 text-truthful" />,
      color: "text-truthful"
    };
    if (percentage >= 40) return {
      text: "Potentially Misleading",
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      color: "text-amber-500"
    };
    return {
      text: "Likely Misleading",
      icon: <XCircle className="h-6 w-6 text-misleading" />,
      color: "text-misleading"
    };
  };
  
  const scoreLabel = getScoreLabel();

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-center">Analysis Result</h3>
      
      <div className="flex items-center justify-center mb-2">
        {scoreLabel.icon}
        <span className={cn("text-lg font-medium ml-2", scoreLabel.color)}>
          {scoreLabel.text}
        </span>
      </div>
      
      <div className="relative h-7 bg-neutral rounded-full overflow-hidden mb-2">
        <div 
          className={cn(
            "absolute top-0 left-0 h-full transition-all duration-1000 ease-out animate-pulse-slow", 
            getIndicatorColor()
          )}
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white drop-shadow">
          {percentage}% Truth Score
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Misleading</span>
        <span>Neutral</span>
        <span>Truthful</span>
      </div>
    </div>
  );
};

export default TruthMeter;
