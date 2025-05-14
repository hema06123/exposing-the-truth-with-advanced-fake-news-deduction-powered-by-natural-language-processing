
import { FC } from "react";
import { AlertTriangle, CheckCircle, Info, BarChart2, Link } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ContentType } from "@/types/content";

interface DetailedResultProps {
  content: ContentType;
}

const DetailedResult: FC<DetailedResultProps> = ({ content }) => {
  // Get indicator based on a value
  const getIndicator = (value: number) => {
    if (value >= 0.7) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (value >= 0.4) return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };
  
  return (
    <Card className="p-6 mt-6">
      <div className="flex items-start">
        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="ml-3">
          <h3 className="font-semibold text-lg">Detailed Analysis</h3>
          <p className="text-sm text-gray-600">
            Our AI has analyzed this content across multiple dimensions.
          </p>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        {/* Content Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.metrics.map((metric) => (
            <div key={metric.name} className="flex items-start">
              {getIndicator(metric.score)}
              <div className="ml-3">
                <h4 className="font-medium text-sm">{metric.name}</h4>
                <p className="text-xs text-gray-600">{metric.description}</p>
                <div className="h-2 bg-gray-100 rounded-full mt-2">
                  <div 
                    className={`h-full rounded-full ${
                      metric.score >= 0.7 
                        ? 'bg-green-500' 
                        : metric.score >= 0.4 
                          ? 'bg-amber-500' 
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${metric.score * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Red Flags */}
        {content.redFlags.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
              Potential Issues Detected
            </h4>
            <ul className="mt-2 space-y-2">
              {content.redFlags.map((flag, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="inline-block bg-red-100 text-red-700 rounded-full p-1 mr-2">
                    <AlertTriangle className="h-3 w-3" />
                  </span>
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Factual Assessment */}
        <div className="mt-5">
          <h4 className="font-medium flex items-center mb-2">
            <BarChart2 className="h-4 w-4 text-blue-600 mr-2" />
            Factual Assessment
          </h4>
          <p className="text-sm">{content.factualAssessment}</p>
        </div>
        
        {/* Verified Sources */}
        {content.sources && content.sources.length > 0 && (
          <div className="mt-5">
            <h4 className="font-medium flex items-center mb-2">
              <Link className="h-4 w-4 text-blue-600 mr-2" />
              Related Information Sources
            </h4>
            <div className="space-y-2">
              {content.sources.map((source, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-md text-sm">
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 hover:underline"
                  >
                    {source.title}
                  </a>
                  <p className="text-xs text-gray-600 mt-1">{source.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DetailedResult;
