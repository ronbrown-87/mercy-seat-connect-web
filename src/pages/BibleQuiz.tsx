import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Play, 
  RotateCcw,
  Timer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getRandomQuestions, randomizeAnswers } from '@/data/quizQuestions';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ShuffledQuestion extends QuizQuestion {
  shuffledOptions: Array<{option: string, originalIndex: number}>;
}

const BibleQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  // Questions are now imported from external file with 500+ questions

  useEffect(() => {
    if (isQuizActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsQuizActive(false);
            setIsQuizComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isQuizActive, timeLeft]);

  const startQuiz = () => {
    // Get 20 random questions from the 500+ question pool
    const randomQuestions = getRandomQuestions(20);
    // Randomize answer options for each question
    const questionsWithShuffledOptions = randomQuestions.map(q => randomizeAnswers(q));
    
    setQuestions(questionsWithShuffledOptions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(300);
    setIsQuizActive(true);
    setIsQuizComplete(false);
    setAnsweredQuestions(new Set());
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answerIndex);
    const currentQuestion = questions[currentQuestionIndex];
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsQuizActive(false);
      setIsQuizComplete(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return "Excellent! You're a Bible scholar!";
    if (percentage >= 80) return "Great job! You know your Bible well!";
    if (percentage >= 70) return "Good work! Keep studying!";
    if (percentage >= 60) return "Not bad! Room for improvement.";
    return "Keep studying the Word of God!";
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-amber-600 hover:text-amber-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Bible Quiz</h1>
              <p className="text-gray-600">Test your knowledge of God's Word with our interactive quiz</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!isQuizActive && !isQuizComplete && (
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                Bible Knowledge Quiz
              </CardTitle>
              <p className="text-gray-600 text-lg">
                Test your knowledge of the Bible with our comprehensive quiz featuring 500+ questions from Genesis to Revelation!
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-amber-50 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                  <h3 className="font-semibold">5 Minutes</h3>
                  <p className="text-sm text-gray-600">Time Limit</p>
                </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                    <h3 className="font-semibold">20 Questions</h3>
                    <p className="text-sm text-gray-600">From 500+ Questions</p>
                  </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                  <h3 className="font-semibold">Mixed Difficulty</h3>
                  <p className="text-sm text-gray-600">Easy to Hard</p>
                </div>
              </div>
              <Button onClick={startQuiz} size="lg" className="bg-amber-600 hover:bg-amber-700">
                <Play className="w-5 h-5 mr-2" />
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        )}

        {isQuizActive && currentQuestion && (
          <div className="space-y-6">
            {/* Timer and Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Timer className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold">Time Left: {formatTime(timeLeft)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <Badge variant="secondary">{score} correct</Badge>
                  </div>
                </div>
                <Progress value={(timeLeft / 300) * 100} className="h-2" />
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{currentQuestion.category}</Badge>
                  <Badge variant={currentQuestion.difficulty === 'easy' ? 'default' : 
                                currentQuestion.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuestion.shuffledOptions.map(({ option, originalIndex }) => (
                    <Button
                      key={originalIndex}
                      variant={selectedAnswer === originalIndex ? 
                        (originalIndex === currentQuestion.correctAnswer ? 'default' : 'destructive') : 
                        'outline'}
                      className="w-full justify-start h-auto p-4 text-left transition-all duration-200 hover:scale-105"
                      onClick={() => handleAnswerSelect(originalIndex)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center space-x-3">
                        {selectedAnswer === originalIndex ? (
                          originalIndex === currentQuestion.correctAnswer ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        )}
                        <span>{option}</span>
                      </div>
                    </Button>
                   ))}
                </div>

                {selectedAnswer !== null && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Explanation:</h4>
                    <p className="text-gray-600">{currentQuestion.explanation}</p>
                    <Button 
                      onClick={nextQuestion} 
                      className="mt-4 bg-amber-600 hover:bg-amber-700"
                    >
                      {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {isQuizComplete && (
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                Quiz Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  {score}/{questions.length}
                </div>
                <div className="text-2xl font-semibold text-gray-800 mb-2">
                  {getScorePercentage()}%
                </div>
                <p className="text-gray-600 text-lg">{getScoreMessage()}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={startQuiz} 
                  variant="outline" 
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={() => navigate('/')} 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BibleQuiz; 