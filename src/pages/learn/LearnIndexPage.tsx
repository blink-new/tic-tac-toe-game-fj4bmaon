import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRate } from '../../context/RateContext';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const LearnIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const { lessons, completedLessons, xp } = useRate();

  const handleLessonClick = (lessonId: string) => {
    navigate(`/learn/${lessonId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-zinc-800">Learn</h1>
            <p className="text-sm text-zinc-600">Master money transfers</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⭐</span>
              <span className="font-bold text-indigo-600">{xp} XP</span>
            </div>
            <p className="text-xs text-zinc-500">Total earned</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Progress Overview */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-indigo-50 to-emerald-50 border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-zinc-800">Your Progress</h3>
              <p className="text-sm text-zinc-600">
                {completedLessons.length} of {lessons.length} lessons completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">
                {Math.round((completedLessons.length / lessons.length) * 100)}%
              </div>
              <p className="text-xs text-zinc-500">Complete</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-zinc-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </Card>

        {/* Lessons Grid */}
        <div className="grid grid-cols-2 gap-4">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            
            return (
              <Card 
                key={lesson.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                  isCompleted ? 'bg-emerald-50 border-emerald-200' : 'hover:border-indigo-200'
                }`}
                onClick={() => handleLessonClick(lesson.id)}
              >
                <div className="text-center space-y-3">
                  {/* Thumbnail */}
                  <div className="relative">
                    <div className="text-3xl">{lesson.thumbnail}</div>
                    {isCompleted && (
                      <CheckCircleIcon className="absolute -top-1 -right-1 w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-medium text-zinc-800 text-sm leading-tight">
                    {lesson.title}
                  </h3>
                  
                  {/* XP Badge */}
                  <Badge 
                    variant={isCompleted ? "default" : "secondary"}
                    className={`text-xs ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {isCompleted ? '✓ ' : ''}{lesson.xp} XP
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Achievement Card */}
        {completedLessons.length > 0 && (
          <Card className="p-4 mt-6 bg-amber-50 border-amber-200">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🏆</div>
              <div>
                <h3 className="font-medium text-amber-800">Keep Learning!</h3>
                <p className="text-sm text-amber-700">
                  You've earned {xp} XP so far. Complete all lessons to become a transfer expert!
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LearnIndexPage;