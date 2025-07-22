import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: 'Who gave Arjuna the celestial bow Gandiva?',
    options: ['Agni (Fire God)', 'Indra (King of Gods)', 'Shiva (The Destroyer)', 'Hanuman (Devoted Monkey)'],
    answer: 'Agni (Fire God)',
    explanation: 'Agni, the fire god, gifted Gandiva to Arjuna during the burning of Khandava forest.'
  },
  {
    question: 'What was Krishna\'s role in the Kurukshetra war?',
    options: ['Archer', 'Warrior King', 'Charioteer', 'Army General'],
    answer: 'Charioteer',
    explanation: 'Krishna chose to be Arjuna\'s charioteer and guide, giving us the wisdom of Bhagavad Gita.'
  },
  {
    question: 'Which brother was known for his strength and appetite?',
    options: ['Arjuna', 'Bhima', 'Nakula', 'Sahadeva'],
    answer: 'Bhima',
    explanation: 'Bhima was the strongest of the Pandavas and famous for his enormous appetite and protective nature.'
  },
  {
    question: 'What was Draupadi also known as?',
    options: ['Sita', 'Panchali', 'Radha', 'Ganga'],
    answer: 'Panchali',
    explanation: 'Draupadi was called Panchali as she was the princess of Panchala kingdom.'
  },
  {
    question: 'Who was the eldest of the Pandava brothers?',
    options: ['Arjuna', 'Bhima', 'Yudhishthira', 'Nakula'],
    answer: 'Yudhishthira',
    explanation: 'Yudhishthira, known for his truthfulness and righteousness, was the eldest Pandava.'
  }
];

const MythologyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer) return; // Prevent multiple selections
    
    setSelectedAnswer(option);
    setShowExplanation(true);
    
    if (option === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "🏆 Amazing! You're a Mahabharata expert!";
    if (percentage >= 60) return "👏 Well done! You know your mythology!";
    if (percentage >= 40) return "📚 Good effort! Keep learning about our epics!";
    return "🌟 Great start! There's so much more to discover!";
  };

  if (quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="card-parchment text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-divine mb-4">Quiz Complete!</h2>
          <div className="text-6xl font-bold text-primary mb-4">
            {score}/{quizQuestions.length}
          </div>
          <p className="text-xl text-sacred mb-6">{getScoreMessage()}</p>
          
          <div className="space-y-4">
            <Progress value={(score / quizQuestions.length) * 100} className="h-4" />
            <Button onClick={resetQuiz} className="btn-divine">
              🔄 Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const current = quizQuestions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="card-parchment">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
            <Badge className="text-lg px-4 py-2 bg-primary text-primary-foreground">
              Score: {score}
            </Badge>
          </div>
          <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-3" />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-sacred mb-6">
            🧠 Mythology Knowledge Test
          </h2>
          <h3 className="text-xl font-medium text-foreground mb-6">
            {current.question}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {current.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              className={`quiz-option text-left p-4 ${
                selectedAnswer === option
                  ? option === current.answer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-red-100 border-red-500 text-red-800'
                  : selectedAnswer && option === current.answer
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : ''
              }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="bg-muted/50 rounded-lg p-4 mb-6 animate-fade-in">
            <h4 className="font-semibold text-sacred mb-2">📖 Did you know?</h4>
            <p className="text-foreground">{current.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <div className="text-center">
            <Button onClick={handleNextQuestion} className="btn-divine">
              {currentQuestion + 1 < quizQuestions.length ? 'Next Question' : 'View Results'} ➡️
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MythologyQuiz;