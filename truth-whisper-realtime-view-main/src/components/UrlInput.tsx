
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  isAnalyzing: boolean;
}

const UrlInput: FC<UrlInputProps> = ({ value, onChange, isAnalyzing }) => {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Globe className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="url"
          placeholder="Enter the URL of the news article (e.g., https://example.com/news)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isAnalyzing}
          className="pl-10 text-base py-6"
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Enter the full URL including https:// for accurate results.
      </p>
    </div>
  );
};

export default UrlInput;
