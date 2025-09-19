import React, { useState, useEffect } from 'react';
import { MessageCircle, Brain, Trophy, RotateCcw } from 'lucide-react';

const HinduMythologyQuizBot = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [animateMonk, setAnimateMonk] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const questions = [
    // Hindu Mythology Questions (80%)
    {
      question: "Who is the destroyer god in the Hindu trinity (Trimurti)?",
      correctAnswer: "Shiva",
      alternatives: ["Brahma", "Vishnu", "Krishna"],
      explanation: "Lord Shiva is known as the destroyer and transformer in the Hindu Trimurti, responsible for cosmic cycles."
    },
    {
      question: "What is the name of Lord Vishnu's divine weapon?",
      correctAnswer: "Sudarshan Chakra",
      alternatives: ["Trishul", "Vel", "Gada"],
      explanation: "The Sudarshan Chakra is Lord Vishnu's spinning discus weapon that never misses its target."
    },
    {
      question: "Who is the monkey god known for his devotion to Rama?",
      correctAnswer: "Hanuman",
      alternatives: ["Sugriva", "Angada", "Bali"],
      explanation: "Lord Hanuman is the devoted follower of Rama, known for his strength, courage, and unwavering devotion."
    },
    {
      question: "What is the name of the sacred river that flows from Lord Shiva's hair?",
      correctAnswer: "Ganga",
      alternatives: ["Yamuna", "Saraswati", "Narmada"],
      explanation: "River Ganga (Ganges) descended from heaven and was caught in Lord Shiva's hair to reduce its force."
    },
    {
      question: "Who is the elephant-headed god of wisdom and remover of obstacles?",
      correctAnswer: "Ganesha",
      alternatives: ["Kartikeya", "Indra", "Varuna"],
      explanation: "Lord Ganesha, son of Shiva and Parvati, is worshipped before starting any new venture."
    },
    {
      question: "What is the name of Krishna's flute?",
      correctAnswer: "Murali",
      alternatives: ["Veena", "Damaru", "Conch"],
      explanation: "Lord Krishna's divine flute Murali could enchant all beings with its melodious sound."
    },
    {
      question: "Who is the goddess of wealth and prosperity?",
      correctAnswer: "Lakshmi",
      alternatives: ["Saraswati", "Durga", "Kali"],
      explanation: "Goddess Lakshmi is the consort of Vishnu and bestows wealth, fortune, and prosperity."
    },
    {
      question: "What is the name of Arjuna's bow in the Mahabharata?",
      correctAnswer: "Gandiva",
      alternatives: ["Pinaka", "Saranga", "Kodanda"],
      explanation: "Gandiva was Arjuna's divine bow, given by Varuna, which made him invincible in battle."
    },
    {
      question: "Who is the king of demons (Asuras) in Hindu mythology?",
      correctAnswer: "Ravana",
      alternatives: ["Hiranyakashipu", "Mahishasura", "Kumbhakarna"],
      explanation: "Ravana, the ten-headed king of Lanka, was a great devotee of Shiva but was defeated by Rama."
    },
    {
      question: "What is the name of the cosmic serpent on which Vishnu rests?",
      correctAnswer: "Shesha",
      alternatives: ["Vasuki", "Takshaka", "Kaliya"],
      explanation: "Shesha (also called Ananta) is the thousand-headed serpent that serves as Vishnu's bed in the cosmic ocean."
    },
    {
      question: "Who is the goddess of knowledge and arts?",
      correctAnswer: "Saraswati",
      alternatives: ["Lakshmi", "Parvati", "Radha"],
      explanation: "Goddess Saraswati, consort of Brahma, is the deity of knowledge, music, arts, and learning."
    },
    {
      question: "What is the name of Lord Shiva's vehicle?",
      correctAnswer: "Nandi",
      alternatives: ["Garuda", "Mushika", "Vahana"],
      explanation: "Nandi, the sacred bull, is Lord Shiva's vehicle and gatekeeper, symbolizing righteousness."
    },
    {
      question: "Who wrote the epic Ramayana?",
      correctAnswer: "Valmiki",
      alternatives: ["Vyasa", "Kalidasa", "Tulsidas"],
      explanation: "Sage Valmiki composed the original Sanskrit Ramayana, earning him the title 'Adi Kavi' (first poet)."
    },
    {
      question: "What is the name of Indra's weapon?",
      correctAnswer: "Vajra",
      alternatives: ["Chakra", "Trishul", "Gada"],
      explanation: "Vajra is Indra's thunderbolt weapon, made from the bones of sage Dadhichi."
    },
    {
      question: "Who is the son of Vayu (wind god) in the Ramayana?",
      correctAnswer: "Hanuman",
      alternatives: ["Bhima", "Garuda", "Jatayu"],
      explanation: "Hanuman is considered the son of Vayu, which grants him the power of flight and incredible strength."
    },
    {
      question: "What is the name of the divine cow that grants all wishes?",
      correctAnswer: "Kamadhenu",
      alternatives: ["Surabhi", "Nandini", "Kapila"],
      explanation: "Kamadhenu is the wish-fulfilling divine cow, mother of all cows, emerged during the churning of the ocean."
    },
    // Other Mythology Questions (20%)
    {
      question: "Who is the king of gods in Greek mythology?",
      correctAnswer: "Zeus",
      alternatives: ["Poseidon", "Hades", "Apollo"],
      explanation: "Zeus is the ruler of Mount Olympus and god of the sky and thunder in Greek mythology."
    },
    {
      question: "In Norse mythology, what is the name of Thor's hammer?",
      correctAnswer: "Mjolnir",
      alternatives: ["Gungnir", "Gram", "Laevateinn"],
      explanation: "Mjolnir was crafted by dwarves and could level mountains in Norse mythology."
    },
    {
      question: "Who is the Egyptian god of the dead with a jackal head?",
      correctAnswer: "Anubis",
      alternatives: ["Ra", "Horus", "Set"],
      explanation: "Anubis guides souls to the afterlife and oversees mummification in Egyptian mythology."
    },
    {
      question: "In Japanese mythology, what are fox spirits called?",
      correctAnswer: "Kitsune",
      alternatives: ["Tengu", "Oni", "Yokai"],
      explanation: "Kitsune are intelligent fox spirits that grow more tails as they become more powerful."
    }
  ];

  const startWelcomeMessage = () => {
    setShowGreeting(false);
    setShowWelcomeMessage(true);
    
    setTimeout(() => {
      setShowWelcomeMessage(false);
      setGameStarted(true);
      setScore(0);
      setTotalQuestions(0);
      setFeedback('');
      generateNewQuestion();
    }, 3000);
  };

  const generateNewQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setUserAnswer('');
    setShowAnswer(false);
    setFeedback('');
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback("Please enter an answer first, dear disciple!");
      return;
    }

    const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase();
    setTotalQuestions(prev => prev + 1);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback("🎉 GOOD JOB MATE! PROCEED TO NEXT");
    } else {
      setFeedback(`❌ INCORRECT! GOOD LUCK FOR NEXT`);
    }
    
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    generateNewQuestion();
  };

  const resetGame = () => {
    setGameStarted(false);
    setShowGreeting(true);
    setShowWelcomeMessage(false);
    setAnimateMonk(true);
    setScore(0);
    setTotalQuestions(0);
    setFeedback('');
    setCurrentQuestion(null);
  };

  useEffect(() => {
    if (showGreeting) {
      const timer = setTimeout(() => {
        setAnimateMonk(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showGreeting]);

  if (!gameStarted && showWelcomeMessage) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-800 rounded-xl shadow-2xl text-white min-h-96">
        <div className="text-center flex flex-col items-center justify-center h-full">
          {/* Monk with Welcome Message */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-b from-orange-600 to-amber-700 p-6 rounded-full shadow-lg animate-pulse">
                <div className="relative">
                  {/* Large Cartoonish Monk for welcome */}
                  <div className="text-orange-300 text-5xl absolute -z-10 top-2">⭕</div>
                  <div className="text-5xl animate-bounce">😌</div>
                  <div className="text-3xl absolute -bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">🙏</div>
                  <div className="absolute -top-4 -left-4 text-yellow-300 text-lg animate-ping">✨</div>
                  <div className="absolute -top-4 -right-4 text-yellow-300 text-lg animate-ping animation-delay-300">🕉️</div>
                </div>
              </div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-amber-900 px-4 py-2 rounded-full text-lg font-bold animate-bounce shadow-lg">
                Hi Disciples!
              </div>
            </div>
          </div>
          
          <div className="bg-amber-800/50 rounded-lg p-6 border-2 border-yellow-400/50 max-w-md animate-fadeIn">
            <p className="text-2xl font-bold text-yellow-200 mb-4">
              🕉️ Welcome, Seekers of Wisdom! 🕉️
            </p>
            <p className="text-xl text-amber-200 mb-2">
              Let's go on our <span className="text-yellow-300 font-bold">mythical journey</span>
            </p>
            <p className="text-lg text-amber-300">
              through the sacred stories of ancient times...
            </p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin text-2xl">🏛️</div>
            </div>
          </div>
          
          <div className="mt-6 text-amber-400 text-sm animate-pulse">
            Preparing your spiritual quest...
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted && showGreeting) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-800 rounded-xl shadow-2xl text-white min-h-96">
        <div className="text-center">
          {/* Animated Cartoonish Monk Mascot */}
          <div className={`flex justify-center mb-6 transition-all duration-2000 ${animateMonk ? 'animate-bounce' : ''}`}>
            <div className="relative">
              <div className="bg-gradient-to-b from-orange-600 to-amber-700 p-6 rounded-full shadow-lg">
                <div className="text-6xl relative">
                  <div className="inline-block animate-pulse">
                    <div className="relative">
                      {/* Monk body */}
                      <div className="text-orange-300 text-5xl absolute -z-10 top-2">⭕</div>
                      {/* Monk head */}
                      <div className="text-4xl">😌</div>
                      {/* Prayer hands */}
                      <div className="text-2xl absolute -bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">🙏</div>
                      {/* Floating wisdom symbols */}
                      <div className="absolute -top-6 -left-6 text-yellow-300 text-sm animate-ping">✨</div>
                      <div className="absolute -top-6 -right-6 text-yellow-300 text-sm animate-ping animation-delay-300">🕉️</div>
                      <div className="absolute top-0 -right-10 text-yellow-300 text-xs animate-bounce animation-delay-500">📿</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`absolute -top-2 -right-2 bg-yellow-400 text-amber-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse ${animateMonk ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
                Hi Disciples!
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Gyani
          </h1>
          <p className="text-xl mb-8 text-amber-200">
            Journey through ancient wisdom with your spiritual guide!
          </p>
          
          {!animateMonk && (
            <div className="animate-fadeIn">
              <button
                onClick={startWelcomeMessage}
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Begin Your Quest
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-800 rounded-xl shadow-2xl text-white">
      {/* Header with Monk */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-b from-orange-600 to-amber-700 p-2 rounded-full">
            <div className="relative">
              {/* Mini Cartoonish Monk */}
              <div className="text-orange-200 text-lg absolute -z-10">⭕</div>
              <div className="text-lg">😌</div>
              <div className="text-xs absolute -bottom-1 left-1/2 transform -translate-x-1/2">🙏</div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-amber-100">Gyani</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-amber-800 px-3 py-1 rounded-full">
            <Trophy size={16} className="text-yellow-400" />
            <span className="font-bold text-yellow-300">{score}/{totalQuestions}</span>
          </div>
          <button
            onClick={resetGame}
            className="bg-orange-600 hover:bg-orange-700 p-2 rounded-full transition-colors"
            title="Restart Quest"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="bg-amber-800/50 rounded-lg p-6 mb-6 border border-amber-600/50">
          <div className="flex items-start space-x-3 mb-4">
            <div className="relative mt-1">
              {/* Mini Cartoonish Monk for questions */}
              <div className="text-orange-200 text-lg absolute -z-10">⭕</div>
              <div className="text-lg animate-pulse">😌</div>
              <div className="text-xs absolute -bottom-1 left-1/2 transform -translate-x-1/2">🙏</div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-yellow-200">
                {currentQuestion.question}
              </h3>
            </div>
          </div>
          
          <div className="space-y-3 ml-11">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Share your wisdom here..."
              className="w-full px-4 py-3 bg-amber-900/30 border border-amber-600 rounded-lg text-white placeholder-amber-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
              onKeyPress={(e) => e.key === 'Enter' && !showAnswer && checkAnswer()}
              disabled={showAnswer}
            />
            
            {!showAnswer ? (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
              >
                Seek Wisdom
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
              >
                Continue Journey
              </button>
            )}
          </div>
        </div>
      )}

      {/* Feedback and Answer */}
      {showAnswer && (
        <div className="space-y-4">
          <div className={`rounded-lg p-4 border-2 ${feedback.includes('GOOD JOB') 
            ? 'bg-green-800/30 border-green-500' 
            : 'bg-red-800/30 border-red-500'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="relative">
                {/* Mini Cartoonish Monk for feedback */}
                <div className="text-orange-200 text-sm absolute -z-10">⭕</div>
                <div className="text-sm animate-bounce">😌</div>
                <div className="text-xs absolute -bottom-1 left-1/2 transform -translate-x-1/2">🙏</div>
              </div>
              <p className="font-bold text-lg">{feedback}</p>
            </div>
          </div>
          
          <div className="bg-amber-700/30 rounded-lg p-4 border border-amber-500/50">
            <div className="flex items-start space-x-2">
              <span className="text-xl">📜</span>
              <div>
                <p className="font-semibold text-yellow-200 mb-2">
                  Correct Answer: <span className="text-yellow-400">{currentQuestion.correctAnswer}</span>
                </p>
                <p className="text-amber-200 text-sm">
                  💡 <strong>Ancient Wisdom:</strong> {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress */}
      {totalQuestions > 0 && (
        <div className="mt-6 bg-amber-800/30 rounded-lg p-4 border border-amber-600/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-amber-200 flex items-center">
              <span className="mr-2">🏛️</span>
              Your Spiritual Progress
            </span>
            <span className="font-bold text-yellow-300">
              {Math.round((score / totalQuestions) * 100)}% Enlightenment
            </span>
          </div>
          <div className="w-full bg-amber-900 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(score / totalQuestions) * 100}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-amber-300 text-sm">
            🕉️ May your knowledge grow like the eternal flame 🕉️
          </div>
        </div>
      )}
    </div>
  );
};

export default HinduMythologyQuizBot;