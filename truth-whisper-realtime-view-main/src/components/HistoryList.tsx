
import { FC } from "react";
import { Clock, ExternalLink, ChevronRight } from "lucide-react";
import { ContentType } from "@/types/content";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HistoryListProps {
  history: ContentType[];
  onItemSelect: (item: ContentType) => void;
}

const HistoryList: FC<HistoryListProps> = ({ history, onItemSelect }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-700">No Analysis History</h3>
        <p className="text-gray-500 mt-2">
          Articles you analyze will appear here for easy reference.
        </p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  // Get a visual indicator based on the truth score
  const getScoreIndicator = (score: number) => {
    const percentage = Math.round(score * 100);
    
    if (percentage >= 70) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
        {percentage}% Truthful
      </span>;
    }
    
    if (percentage >= 40) {
      return <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
        {percentage}% Ambiguous
      </span>;
    }
    
    return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
      {percentage}% Misleading
    </span>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Previously Analyzed Content</h3>
        <span className="text-sm text-gray-500">{history.length} items</span>
      </div>

      {history.map((item, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base line-clamp-1">{item.title}</CardTitle>
                <CardDescription className="text-xs">
                  Analyzed {formatDate(item.analyzedAt)}
                </CardDescription>
              </div>
              {getScoreIndicator(item.truthScore)}
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            <p className="text-sm text-gray-700 line-clamp-2">{item.excerpt}</p>
          </CardContent>
          
          <CardFooter className="pt-0 flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} content
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onItemSelect(item)}
              className="text-xs font-normal"
            >
              View Details
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HistoryList;
