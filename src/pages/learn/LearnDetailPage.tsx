import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRate } from '../../context/RateContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeftIcon, PlayIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useToast } from '../../hooks/use-toast';

const LearnDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { lessons, completedLessons, completeLesson } = useRate();
  const { toast } = useToast();

  const lesson = lessons.find(l => l.id === id);
  const isCompleted = lesson ? completedLessons.includes(lesson.id) : false;

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❓</div>
          <h2 className="text-xl font-semibold text-zinc-800 mb-2">Lesson Not Found</h2>
          <Button onClick={() => navigate('/learn')}>
            Back to Learn
          </Button>
        </div>
      </div>
    );
  }

  const handleMarkDone = () => {
    if (!isCompleted) {
      completeLesson(lesson.id);
      toast({
        title: "Lesson Completed! 🎉",
        description: `You earned ${lesson.xp} XP`,
      });
    }
    navigate('/learn');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/learn')}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-zinc-800">{lesson.title}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge 
                variant={isCompleted ? "default" : "secondary"}
                className={`text-xs ${
                  isCompleted 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {lesson.xp} XP
              </Badge>
              {isCompleted && (
                <div className="flex items-center space-x-1 text-emerald-600">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span className="text-xs font-medium">Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Video Thumbnail */}
        <Card className="relative overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-indigo-100 to-emerald-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">{lesson.thumbnail}</div>
              <Button 
                size="lg"
                className="bg-white/90 text-zinc-800 hover:bg-white shadow-lg"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Play Video
              </Button>
            </div>
          </div>
        </Card>

        {/* Lesson Content */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-zinc-800 mb-4">
            What you'll learn
          </h2>
          
          <div className="prose prose-sm max-w-none text-zinc-700 leading-relaxed">
            {lesson.content.split('. ').map((sentence, index) => (
              <p key={index} className="mb-3">
                {sentence}{sentence.endsWith('.') ? '' : '.'}
              </p>
            ))}
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 text-xl">💡</div>
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Key Takeaways</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Understanding the fundamentals saves money</li>
                <li>• Compare options before making decisions</li>
                <li>• Security and compliance protect your transfers</li>
                <li>• Timing can significantly impact costs</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <Button 
          onClick={handleMarkDone}
          className={`w-full ${
            isCompleted 
              ? 'bg-emerald-600 hover:bg-emerald-700' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              Back to Learn
            </>
          ) : (
            `Mark Done & Earn ${lesson.xp} XP`
          )}
        </Button>

        {/* Next Lesson Suggestion */}
        {!isCompleted && (
          <Card className="p-4 bg-amber-50 border-amber-200">
            <div className="flex items-center space-x-3">
              <div className="text-amber-600 text-xl">🎯</div>
              <div>
                <h3 className="font-medium text-amber-800">Pro Tip</h3>
                <p className="text-sm text-amber-700">
                  Complete this lesson to unlock your XP and track your progress!
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LearnDetailPage;