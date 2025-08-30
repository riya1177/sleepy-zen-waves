import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';

interface MeditationScreenProps {
  onBack: () => void;
}

const meditationSessions = [
  {
    id: 'mindfulness',
    name: 'Mindfulness Meditation',
    duration: 300, // 5 minutes
    description: 'Focus on the present moment',
    icon: '🧘‍♀️',
    instructions: [
      'Sit comfortably with your back straight',
      'Close your eyes gently',
      'Focus on your natural breath',
      'When thoughts arise, gently return to breathing',
      'Stay present in this moment'
    ]
  },
  {
    id: 'body-scan',
    name: 'Body Scan',
    duration: 600, // 10 minutes
    description: 'Progressive relaxation technique',
    icon: '✨',
    instructions: [
      'Lie down or sit comfortably',
      'Start from the top of your head',
      'Notice sensations in each body part',
      'Release tension as you scan downward',
      'End at your toes, fully relaxed'
    ]
  },
  {
    id: 'loving-kindness',
    name: 'Loving Kindness',
    duration: 480, // 8 minutes
    description: 'Cultivate compassion and love',
    icon: '💝',
    instructions: [
      'Begin with yourself: "May I be happy"',
      'Extend to loved ones',
      'Include neutral people',
      'Embrace difficult relationships',
      'Send love to all beings'
    ]
  },
  {
    id: 'quick-reset',
    name: 'Quick Reset',
    duration: 180, // 3 minutes
    description: 'Short stress relief session',
    icon: '⚡',
    instructions: [
      'Take three deep breaths',
      'Release shoulder tension',
      'Soften your face and jaw',
      'Feel your feet on the ground',
      'Set a positive intention'
    ]
  }
];

const MeditationScreen = ({ onBack }: MeditationScreenProps) => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentInstruction, setCurrentInstruction] = useState(0);

  const session = meditationSessions.find(s => s.id === selectedSession);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Change instruction every minute
  useEffect(() => {
    if (isActive && session) {
      const instructionInterval = Math.floor(session.duration / session.instructions.length);
      const elapsed = session.duration - timeLeft;
      const newInstruction = Math.min(
        Math.floor(elapsed / instructionInterval),
        session.instructions.length - 1
      );
      setCurrentInstruction(newInstruction);
    }
  }, [timeLeft, isActive, session]);

  const startMeditation = (sessionId: string) => {
    const selected = meditationSessions.find(s => s.id === sessionId);
    if (!selected) return;

    setSelectedSession(sessionId);
    setTimeLeft(selected.duration);
    setCurrentInstruction(0);
    setIsActive(true);
  };

  const toggleMeditation = () => {
    setIsActive(!isActive);
  };

  const resetMeditation = () => {
    setIsActive(false);
    setTimeLeft(session?.duration || 0);
    setCurrentInstruction(0);
  };

  const goBackToSelection = () => {
    setSelectedSession(null);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!session) return 0;
    return ((session.duration - timeLeft) / session.duration) * 100;
  };

  if (!selectedSession) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      >
        {/* Background */}
        <div className="stars">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center z-10 max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="absolute top-6 left-6"
          >
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="btn-soft flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          </motion.div>

          {/* Header Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-7xl mb-8"
          >
            🧘‍♀️
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-pink-400 bg-clip-text text-transparent"
          >
            Meditation Sessions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-muted-foreground mb-12 leading-relaxed"
          >
            Find your inner peace with guided meditation
          </motion.p>

          {/* Session Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {meditationSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => startMeditation(session.id)}
                  variant="outline"
                  size="lg"
                  className="card-activity w-full p-6 h-auto text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <span className="text-3xl">{session.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                        {session.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {session.description}
                      </p>
                      <div className="text-xs text-accent font-medium">
                        {Math.floor(session.duration / 60)} minutes
                      </div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="stars">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center z-10 max-w-2xl mx-auto"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="absolute top-6 left-6"
        >
          <Button
            onClick={goBackToSelection}
            variant="outline"
            size="sm"
            className="btn-soft flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </motion.div>

        {/* Session Name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-accent to-pink-400 bg-clip-text text-transparent"
        >
          {session?.name}
        </motion.h2>

        {/* Meditation Circle with Progress */}
        <motion.div
          className="relative w-80 h-80 mx-auto mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted/20"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
              className="text-accent transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Content */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-r from-accent/20 to-pink-400/20 flex items-center justify-center shadow-glow backdrop-blur-sm"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: isActive ? 4 : 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <div className="text-center text-foreground">
              <div className="text-5xl mb-4">
                {session?.icon}
              </div>
              <div className="text-3xl font-mono font-bold">
                {formatTime(timeLeft)}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Current Instruction */}
        {session && isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 card-dreamy rounded-lg"
          >
            <p className="text-lg text-center italic leading-relaxed">
              "{session.instructions[currentInstruction]}"
            </p>
          </motion.div>
        )}

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={toggleMeditation}
              size="lg"
              className="btn-meditation flex items-center gap-2 px-8"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              {isActive ? 'Pause' : timeLeft === 0 ? 'Start' : 'Resume'}
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={resetMeditation}
              variant="outline"
              size="lg"
              className="btn-soft flex items-center gap-2 px-8"
            >
              <RotateCcw size={20} />
              Reset
            </Button>
          </motion.div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          Progress: {getProgress().toFixed(0)}% complete
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MeditationScreen;