
import { useState } from "react";
import { toast } from "sonner";
import { 
  FileText, 
  Link, 
  AlertTriangle, 
  Shield, 
  Search, 
  History, 
  Info, 
  Check, 
  X, 
  LoaderCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import TextInput from "@/components/TextInput";
import UrlInput from "@/components/UrlInput";
import DetailedResult from "@/components/DetailedResult";
import HistoryList from "@/components/HistoryList";
import TruthMeter from "@/components/TruthMeter";
import { ContentType } from "@/types/content";
import { mockAnalyze } from "@/lib/fakeMockData";

const Index = () => {
  const [inputType, setInputType] = useState<'text' | 'url'>('text');
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("analyze");
  const [currentContent, setCurrentContent] = useState<ContentType | null>(null);
  const [history, setHistory] = useState<ContentType[]>([]);

  const handleAnalyze = async () => {
    if (!inputValue.trim()) {
      toast("Please enter some text or a URL to analyze", {
        description: "The input field can't be empty",
        icon: <AlertTriangle size={18} />,
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // In a real implementation, this would call an actual API
      // For now, we use a mock that returns simulated results after a delay
      const result = await mockAnalyze(inputValue, inputType);
      
      setCurrentContent(result);
      setHistory((prev) => [result, ...prev.slice(0, 9)]); // Keep last 10 items
      
      // Show success notification
      const scoreFriendly = Math.round(result.truthScore * 100);
      const scoreMessage = scoreFriendly >= 70 
        ? "Likely truthful content" 
        : scoreFriendly >= 40 
          ? "Content contains potentially misleading elements" 
          : "Content appears highly misleading";
      
      toast(scoreMessage, {
        description: `Truth score: ${scoreFriendly}%`,
        icon: scoreFriendly >= 70 
          ? <Check className="text-green-600" size={18} /> 
          : scoreFriendly >= 40 
            ? <AlertTriangle className="text-amber-500" size={18} /> 
            : <X className="text-red-600" size={18} />,
      });
    } catch (error) {
      toast("Analysis failed", {
        description: "There was an error analyzing your content. Please try again.",
        icon: <AlertTriangle size={18} />
      });
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <Shield className="mr-2" />
              <h1 className="text-xl md:text-2xl font-bold">TruthGuard</h1>
            </div>
            <p className="text-sm opacity-90 mt-1 md:mt-0">
              Advanced fake news detection powered by NLP
            </p>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
              Detect misleading information in real-time
            </h2>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="analyze" className="flex items-center gap-2">
                  <Search size={16} />
                  <span>Analyze Content</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History size={16} />
                  <span>History</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="analyze" className="space-y-6">
                {/* Input Selection */}
                <div className="flex justify-center mb-4">
                  <div className="inline-flex rounded-lg border p-1">
                    <button
                      className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                        inputType === 'text' 
                          ? 'bg-primary text-white' 
                          : 'text-gray-600'
                      }`}
                      onClick={() => setInputType('text')}
                    >
                      <FileText size={16} />
                      <span>Text</span>
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                        inputType === 'url' 
                          ? 'bg-primary text-white' 
                          : 'text-gray-600'
                      }`}
                      onClick={() => setInputType('url')}
                    >
                      <Link size={16} />
                      <span>URL</span>
                    </button>
                  </div>
                </div>

                {/* Input Area */}
                {inputType === 'text' ? (
                  <TextInput 
                    value={inputValue} 
                    onChange={setInputValue} 
                    isAnalyzing={isAnalyzing}
                  />
                ) : (
                  <UrlInput 
                    value={inputValue} 
                    onChange={setInputValue} 
                    isAnalyzing={isAnalyzing}
                  />
                )}
                
                {/* Analyze Button */}
                <div className="flex justify-center mt-6">
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing || !inputValue.trim()}
                    className="w-full md:w-auto px-8"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Analyze Content
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Results */}
                {isAnalyzing && (
                  <div className="mt-8 text-center">
                    <div className="flex justify-center mb-4">
                      <LoaderCircle className="animate-spin text-primary h-12 w-12" />
                    </div>
                    <h3 className="text-lg font-medium mb-3">Analyzing content...</h3>
                    <div className="max-w-md mx-auto">
                      <Progress value={45} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      Our AI is checking multiple sources to verify this information
                    </p>
                  </div>
                )}
                
                {!isAnalyzing && currentContent && (
                  <>
                    <div className="mt-8">
                      <TruthMeter score={currentContent.truthScore} />
                    </div>
                    
                    <DetailedResult content={currentContent} />
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="history">
                <HistoryList 
                  history={history}
                  onItemSelect={(item) => {
                    setCurrentContent(item);
                    setActiveTab("analyze");
                  }}
                />
              </TabsContent>
            </Tabs>
          </Card>
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <Card className="p-5 shadow">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="text-primary h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Advanced NLP</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Our algorithm evaluates content using advanced natural language processing techniques.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 shadow">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Info className="text-primary h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Detailed Analysis</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Get insights into why content might be flagged as potentially misleading.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 shadow">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full">
                  <History className="text-primary h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Content History</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Keep track of your previously analyzed content for future reference.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>© 2025 TruthGuard | Fake news detection powered by AI</p>
          <p className="mt-1 text-xs">
            This is a demonstration tool. Always verify information through multiple trusted sources.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
