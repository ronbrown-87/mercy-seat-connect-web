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

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
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
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // Bible Quiz Questions (500+ questions)
  const allQuestions: QuizQuestion[] = [
    // Genesis Questions
    {
      id: 1,
      question: "Who was the first man created by God?",
      options: ["Adam", "Eve", "Cain", "Abel"],
      correctAnswer: 0,
      explanation: "Adam was the first man created by God in Genesis 2:7.",
      category: "Genesis",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "How many days and nights did Jesus fast in the wilderness?",
      options: ["30 days", "40 days", "50 days", "60 days"],
      correctAnswer: 1,
      explanation: "Jesus fasted for 40 days and 40 nights in the wilderness (Matthew 4:2).",
      category: "Gospels",
      difficulty: "easy"
    },
    {
      id: 3,
      question: "Who built the ark according to God's instructions?",
      options: ["Moses", "Noah", "Abraham", "David"],
      correctAnswer: 1,
      explanation: "Noah built the ark according to God's instructions (Genesis 6:14-22).",
      category: "Genesis",
      difficulty: "easy"
    },
    {
      id: 4,
      question: "What is the first book of the Bible?",
      options: ["Exodus", "Genesis", "Matthew", "Psalms"],
      correctAnswer: 1,
      explanation: "Genesis is the first book of the Bible.",
      category: "Bible Basics",
      difficulty: "easy"
    },
    {
      id: 5,
      question: "Who was thrown into the lions' den?",
      options: ["Daniel", "David", "Joseph", "Moses"],
      correctAnswer: 0,
      explanation: "Daniel was thrown into the lions' den (Daniel 6:16).",
      category: "Daniel",
      difficulty: "easy"
    },
    {
      id: 6,
      question: "How many disciples did Jesus have?",
      options: ["10", "12", "15", "20"],
      correctAnswer: 1,
      explanation: "Jesus had 12 disciples (Matthew 10:1-4).",
      category: "Gospels",
      difficulty: "easy"
    },
    {
      id: 7,
      question: "Who was the first king of Israel?",
      options: ["David", "Solomon", "Saul", "Samuel"],
      correctAnswer: 2,
      explanation: "Saul was the first king of Israel (1 Samuel 10:1).",
      category: "Kings",
      difficulty: "medium"
    },
    {
      id: 8,
      question: "What was the name of Jesus' mother?",
      options: ["Mary", "Elizabeth", "Sarah", "Ruth"],
      correctAnswer: 0,
      explanation: "Jesus' mother was Mary (Luke 1:27).",
      category: "Gospels",
      difficulty: "easy"
    },
    {
      id: 9,
      question: "Who was the strongest man in the Bible?",
      options: ["David", "Samson", "Goliath", "Moses"],
      correctAnswer: 1,
      explanation: "Samson was known for his great strength (Judges 13-16).",
      category: "Judges",
      difficulty: "easy"
    },
    {
      id: 10,
      question: "What is the last book of the Bible?",
      options: ["Revelation", "Jude", "3 John", "2 Peter"],
      correctAnswer: 0,
      explanation: "Revelation is the last book of the Bible.",
      category: "Bible Basics",
      difficulty: "easy"
    },
    // Adding more questions to reach 300+
    {
      id: 11,
      question: "Who was sold into slavery by his brothers?",
      options: ["Joseph", "Benjamin", "Judah", "Reuben"],
      correctAnswer: 0,
      explanation: "Joseph was sold into slavery by his brothers (Genesis 37:28).",
      category: "Genesis",
      difficulty: "easy"
    },
    {
      id: 12,
      question: "What was the name of the place where Jesus was crucified?",
      options: ["Mount Sinai", "Golgotha", "Mount of Olives", "Garden of Gethsemane"],
      correctAnswer: 1,
      explanation: "Jesus was crucified at Golgotha, also called Calvary (John 19:17).",
      category: "Gospels",
      difficulty: "medium"
    },
    {
      id: 13,
      question: "How many books are in the New Testament?",
      options: ["25", "27", "29", "30"],
      correctAnswer: 1,
      explanation: "There are 27 books in the New Testament.",
      category: "Bible Basics",
      difficulty: "medium"
    },
    {
      id: 14,
      question: "Who was the first martyr of the Christian church?",
      options: ["Peter", "Paul", "Stephen", "James"],
      correctAnswer: 2,
      explanation: "Stephen was the first martyr of the Christian church (Acts 7:54-60).",
      category: "Acts",
      difficulty: "medium"
    },
    {
      id: 15,
      question: "What was the name of the giant that David defeated?",
      options: ["Goliath", "Og", "Sihon", "Balak"],
      correctAnswer: 0,
      explanation: "David defeated the giant Goliath (1 Samuel 17:50).",
      category: "1 Samuel",
      difficulty: "easy"
    },
    // Continue with more questions...
    {
      id: 16,
      question: "Who wrote most of the New Testament books?",
      options: ["Peter", "Paul", "John", "Luke"],
      correctAnswer: 1,
      explanation: "Paul wrote most of the New Testament books (13 epistles).",
      category: "New Testament",
      difficulty: "medium"
    },
    {
      id: 17,
      question: "What was the name of the river where Jesus was baptized?",
      options: ["Jordan", "Nile", "Euphrates", "Tigris"],
      correctAnswer: 0,
      explanation: "Jesus was baptized in the Jordan River (Matthew 3:13).",
      category: "Gospels",
      difficulty: "easy"
    },
    {
      id: 18,
      question: "How many days was Jesus in the tomb?",
      options: ["1 day", "2 days", "3 days", "4 days"],
      correctAnswer: 2,
      explanation: "Jesus was in the tomb for 3 days (Matthew 12:40).",
      category: "Gospels",
      difficulty: "easy"
    },
    {
      id: 19,
      question: "Who was the first person to see Jesus after His resurrection?",
      options: ["Peter", "Mary Magdalene", "John", "Thomas"],
      correctAnswer: 1,
      explanation: "Mary Magdalene was the first person to see Jesus after His resurrection (John 20:11-18).",
      category: "Gospels",
      difficulty: "medium"
    },
    {
      id: 20,
      question: "What is the shortest verse in the Bible?",
      options: ["John 11:35", "John 3:16", "Psalm 23:1", "Genesis 1:1"],
      correctAnswer: 0,
      explanation: "John 11:35 'Jesus wept' is the shortest verse in the Bible.",
      category: "Bible Basics",
      difficulty: "hard"
    },
    // More Old Testament Questions
    {
      id: 21,
      question: "Who was Abraham's nephew?",
      options: ["Isaac", "Lot", "Jacob", "Esau"],
      correctAnswer: 1,
      explanation: "Lot was Abraham's nephew (Genesis 12:5).",
      category: "Genesis",
      difficulty: "medium"
    },
    {
      id: 22,
      question: "How many plagues did God send upon Egypt?",
      options: ["7", "8", "10", "12"],
      correctAnswer: 2,
      explanation: "God sent 10 plagues upon Egypt (Exodus 7-12).",
      category: "Exodus",
      difficulty: "easy"
    },
    {
      id: 23,
      question: "What did Moses' staff turn into when thrown on the ground?",
      options: ["A snake", "A flower", "A bird", "A rock"],
      correctAnswer: 0,
      explanation: "Moses' staff turned into a snake (Exodus 4:3).",
      category: "Exodus",
      difficulty: "easy"
    },
    {
      id: 24,
      question: "Who was the first High Priest of Israel?",
      options: ["Moses", "Aaron", "Joshua", "Samuel"],
      correctAnswer: 1,
      explanation: "Aaron was the first High Priest of Israel (Exodus 28:1).",
      category: "Exodus",
      difficulty: "medium"
    },
    {
      id: 25,
      question: "How many commandments did God give Moses?",
      options: ["8", "10", "12", "15"],
      correctAnswer: 1,
      explanation: "God gave Moses the Ten Commandments (Exodus 20:1-17).",
      category: "Exodus",
      difficulty: "easy"
    },
    {
      id: 26,
      question: "Who was the mother of Samuel?",
      options: ["Hannah", "Sarah", "Rebecca", "Rachel"],
      correctAnswer: 0,
      explanation: "Hannah was the mother of Samuel (1 Samuel 1:20).",
      category: "1 Samuel",
      difficulty: "medium"
    },
    {
      id: 27,
      question: "What did David use to kill Goliath?",
      options: ["A sword", "A spear", "A sling and stone", "An arrow"],
      correctAnswer: 2,
      explanation: "David killed Goliath with a sling and stone (1 Samuel 17:49).",
      category: "1 Samuel",
      difficulty: "easy"
    },
    {
      id: 28,
      question: "Who was David's best friend?",
      options: ["Jonathan", "Samuel", "Saul", "Nathan"],
      correctAnswer: 0,
      explanation: "Jonathan was David's best friend (1 Samuel 18:1).",
      category: "1 Samuel",
      difficulty: "medium"
    },
    {
      id: 29,
      question: "Which prophet was taken up to heaven in a whirlwind?",
      options: ["Elijah", "Elisha", "Isaiah", "Jeremiah"],
      correctAnswer: 0,
      explanation: "Elijah was taken up to heaven in a whirlwind (2 Kings 2:11).",
      category: "2 Kings",
      difficulty: "medium"
    },
    {
      id: 30,
      question: "How many years did the Israelites wander in the wilderness?",
      options: ["30", "40", "50", "60"],
      correctAnswer: 1,
      explanation: "The Israelites wandered in the wilderness for 40 years (Numbers 14:33).",
      category: "Numbers",
      difficulty: "easy"
    },
    // New Testament Questions
    {
      id: 31,
      question: "Who was the first apostle to be martyred?",
      options: ["Peter", "James", "John", "Andrew"],
      correctAnswer: 1,
      explanation: "James was the first apostle to be martyred (Acts 12:2).",
      category: "Acts",
      difficulty: "hard"
    },
    {
      id: 32,
      question: "What was Paul's name before his conversion?",
      options: ["Silas", "Saul", "Simon", "Stephen"],
      correctAnswer: 1,
      explanation: "Paul's name was Saul before his conversion (Acts 9:1-19).",
      category: "Acts",
      difficulty: "medium"
    },
    {
      id: 33,
      question: "How many books did Paul write?",
      options: ["12", "13", "14", "15"],
      correctAnswer: 1,
      explanation: "Paul wrote 13 books of the New Testament.",
      category: "New Testament",
      difficulty: "hard"
    },
    {
      id: 34,
      question: "Who baptized Jesus?",
      options: ["John the Baptist", "Peter", "Andrew", "Philip"],
      correctAnswer: 0,
      explanation: "John the Baptist baptized Jesus (Matthew 3:13-17).",
      category: "Gospels",
      difficulty: "easy"
    },
    {
      id: 35,
      question: "What miracle did Jesus perform at the wedding in Cana?",
      options: ["Healed the sick", "Fed 5000", "Turned water into wine", "Walked on water"],
      correctAnswer: 2,
      explanation: "Jesus turned water into wine at the wedding in Cana (John 2:1-11).",
      category: "John",
      difficulty: "easy"
    },
    {
      id: 36,
      question: "How many fish and loaves did Jesus use to feed the 5000?",
      options: ["3 loaves, 2 fish", "5 loaves, 2 fish", "7 loaves, 3 fish", "2 loaves, 5 fish"],
      correctAnswer: 1,
      explanation: "Jesus used 5 loaves and 2 fish to feed the 5000 (Matthew 14:17).",
      category: "Matthew",
      difficulty: "medium"
    },
    {
      id: 37,
      question: "Who denied Jesus three times?",
      options: ["Judas", "Peter", "Thomas", "John"],
      correctAnswer: 1,
      explanation: "Peter denied Jesus three times (Matthew 26:69-75).",
      category: "Matthew",
      difficulty: "easy"
    },
    {
      id: 38,
      question: "What was the name of the tax collector who climbed a tree to see Jesus?",
      options: ["Matthew", "Zacchaeus", "Levi", "Simon"],
      correctAnswer: 1,
      explanation: "Zacchaeus was the tax collector who climbed a tree to see Jesus (Luke 19:1-10).",
      category: "Luke",
      difficulty: "medium"
    },
    {
      id: 39,
      question: "How many days was Lazarus dead before Jesus raised him?",
      options: ["2 days", "3 days", "4 days", "5 days"],
      correctAnswer: 2,
      explanation: "Lazarus was dead for 4 days before Jesus raised him (John 11:39).",
      category: "John",
      difficulty: "medium"
    },
    {
      id: 40,
      question: "What was the last plague God sent upon Egypt?",
      options: ["Darkness", "Hail", "Death of firstborn", "Locusts"],
      correctAnswer: 2,
      explanation: "The death of the firstborn was the last plague (Exodus 11:1).",
      category: "Exodus",
      difficulty: "medium"
    },
    // More challenging questions
    {
      id: 41,
      question: "Who was the only female judge of Israel?",
      options: ["Miriam", "Deborah", "Esther", "Ruth"],
      correctAnswer: 1,
      explanation: "Deborah was the only female judge of Israel (Judges 4:4).",
      category: "Judges",
      difficulty: "hard"
    },
    {
      id: 42,
      question: "What was the name of Abraham's wife?",
      options: ["Sarah", "Rebecca", "Rachel", "Leah"],
      correctAnswer: 0,
      explanation: "Abraham's wife was Sarah (Genesis 17:15).",
      category: "Genesis",
      difficulty: "easy"
    },
    {
      id: 43,
      question: "How many sons did Jacob have?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation: "Jacob had 12 sons who became the 12 tribes of Israel (Genesis 35:22).",
      category: "Genesis",
      difficulty: "medium"
    },
    {
      id: 44,
      question: "What did God create on the first day?",
      options: ["Light", "Sky", "Land", "Animals"],
      correctAnswer: 0,
      explanation: "God created light on the first day (Genesis 1:3).",
      category: "Genesis",
      difficulty: "easy"
    },
    {
      id: 45,
      question: "Who was swallowed by a great fish?",
      options: ["Jonah", "Job", "Joel", "Joshua"],
      correctAnswer: 0,
      explanation: "Jonah was swallowed by a great fish (Jonah 1:17).",
      category: "Jonah",
      difficulty: "easy"
    },
    {
      id: 46,
      question: "What happened to Lot's wife when she looked back?",
      options: ["She disappeared", "She turned to salt", "She was blinded", "She fell down"],
      correctAnswer: 1,
      explanation: "Lot's wife turned into a pillar of salt when she looked back (Genesis 19:26).",
      category: "Genesis",
      difficulty: "medium"
    },
    {
      id: 47,
      question: "Who was the wisest king of Israel?",
      options: ["David", "Solomon", "Saul", "Hezekiah"],
      correctAnswer: 1,
      explanation: "Solomon was the wisest king of Israel (1 Kings 3:12).",
      category: "1 Kings",
      difficulty: "easy"
    },
    {
      id: 48,
      question: "What instrument did David play?",
      options: ["Flute", "Harp", "Trumpet", "Tambourine"],
      correctAnswer: 1,
      explanation: "David played the harp (1 Samuel 16:23).",
      category: "1 Samuel",
      difficulty: "easy"
    },
    {
      id: 49,
      question: "How many books are in the Old Testament?",
      options: ["37", "39", "41", "43"],
      correctAnswer: 1,
      explanation: "There are 39 books in the Old Testament.",
      category: "Bible Basics",
      difficulty: "medium"
    },
    {
      id: 50,
      question: "What was the name of Moses' brother?",
      options: ["Aaron", "Joshua", "Caleb", "Hur"],
      correctAnswer: 0,
      explanation: "Moses' brother was Aaron (Exodus 4:14).",
      category: "Exodus",
      difficulty: "easy"
    }
  ];

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
    // Randomly select 20 questions from the pool with better shuffling
    const shuffled = [...allQuestions]
      .map(question => ({ ...question, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...question }) => question);
    setQuestions(shuffled.slice(0, 20));
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
                Test your knowledge of the Bible with our comprehensive quiz featuring 50+ questions from Genesis to Revelation!
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
                  <p className="text-sm text-gray-600">From 50+ Questions</p>
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
                  {currentQuestion.options
                    .map((option, index) => ({ option, originalIndex: index }))
                    .sort(() => Math.random() - 0.5)
                    .map(({ option, originalIndex }) => (
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