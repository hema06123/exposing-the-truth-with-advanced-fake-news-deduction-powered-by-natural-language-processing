
import { FC } from "react";
import { Textarea } from "@/components/ui/textarea";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  isAnalyzing: boolean;
}

const TextInput: FC<TextInputProps> = ({ value, onChange, isAnalyzing }) => {
  return (
    <div className="w-full">
      <Textarea 
        placeholder="Paste the article text or news content you want to analyze..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isAnalyzing}
        className="min-h-[200px] text-base"
      />
      <p className="text-xs text-muted-foreground mt-2">
        For best results, paste complete paragraphs with context.
      </p>
    </div>
  );
};

export default TextInput;
