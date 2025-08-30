import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';

interface BreathingScreenProps {
  onBack: () => void;
}

const breathingTechniques = [
  {
    id: '4-7-8',
    name: '4-7-8 Technique',
    description: 'Inhale 4s, Hold 7s, Exhale 8s',
    icon: '🌬️',
    inhale: 4,
    hold: 7,
    exhale: 8,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Equal timing: 4s each phase',
    icon: '📦',
    inhale: 4,
    hold: 4,
    exhale: 4,
    pause: 4,
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 'triangle',
    name: 'Triangle Breathing',
    description: 'Inhale 4s, Hold 4s, Exhale 4s',
    icon: '🔺',
    inhale: 4,
    hold: 4,
    exhale: 4,
    color: 'from-purple-500 to-violet-400'
  },
  {
    id: 'calm',
    name: 'Calming Breath',
    description: 'Inhale 4s, Exhale 8s',
    icon: '🕊️',
    inhale: 4,
    hold: 0,
    exhale: 8,
    color: 'from-pink-500 to-rose-400'
  }
];

const BreathingScreen = ({ onBack }: BreathingScreenProps) => {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const technique = breathingTechniques.find(t => t.id === selectedTechnique);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && technique) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (currentPhase === 'inhale') {
              setCurrentPhase(technique.hold > 0 ? 'hold' : 'exhale');
              return technique.hold > 0 ? technique.hold : technique.exhale;
            } else if (currentPhase === 'hold') {
              setCurrentPhase('exhale');
              return technique.exhale;
            } else if (currentPhase === 'exhale') {
              if ('pause' in technique && technique.pause! > 0) {
                setCurrentPhase('pause');
                return technique.pause!;
              } else {
                setCurrentPhase('inhale');
                setCycleCount(c => c + 1);
                return technique.inhale;
              }
            } else if (currentPhase === 'pause') {
              setCurrentPhase('inhale');
              setCycleCount(c => c + 1);
              return technique.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, currentPhase, technique]);

  const startBreathing = (techniqueId: string) => {
    const selected = breathingTechniques.find(t => t.id === techniqueId);
    if (!selected) return;

    setSelectedTechnique(techniqueId);
    setCurrentPhase('inhale');
    setTimeLeft(selected.inhale);
    setCycleCount(0);
    setIsActive(true);
  };

  const toggleBreathing = () => {
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimeLeft(technique?.inhale || 0);
    setCycleCount(0);
  };

  const goBackToSelection = () => {
    setSelectedTechnique(null);
    setIsActive(false);
    setCycleCount(0);
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Pause';
      default: return 'Ready';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'from-blue-500 to-cyan-400';
      case 'hold': return 'from-yellow-500 to-amber-400';
      case 'exhale': return 'from-green-500 to-emerald-400';
      case 'pause': return 'from-purple-500 to-violet-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  if (!selectedTechnique) {
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
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-7xl mb-8 breathe-in"
          >
            🫁
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-success to-emerald-400 bg-clip-text text-transparent"
          >
            Breathing Exercises
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-muted-foreground mb-12 leading-relaxed"
          >
            Choose a breathing technique to calm your mind and body
          </motion.p>

          {/* Technique Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {breathingTechniques.map((technique, index) => (
              <motion.div
                key={technique.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => startBreathing(technique.id)}
                  variant="outline"
                  size="lg"
                  className="card-activity w-full p-6 h-auto text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${technique.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{technique.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                        {technique.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {technique.description}
                      </p>
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
        {[...Array(30)].map((_, i) => (
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

        {/* Technique Name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-success to-emerald-400 bg-clip-text text-transparent"
        >
          {technique?.name}
        </motion.h2>

        {/* Breathing Circle */}
        <motion.div
          className="relative w-80 h-80 mx-auto mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.div
            className={`w-full h-full rounded-full bg-gradient-to-r ${getPhaseColor()} flex items-center justify-center shadow-glow`}
            animate={{
              scale: currentPhase === 'inhale' ? [1, 1.3] : 
                     currentPhase === 'exhale' ? [1.3, 1] : 1.15,
            }}
            transition={{
              duration: isActive ? (
                currentPhase === 'inhale' ? technique?.inhale :
                currentPhase === 'hold' ? technique?.hold :
                currentPhase === 'exhale' ? technique?.exhale :
                technique?.pause || 0
              ) : 2,
              ease: "easeInOut",
              repeat: isActive ? 0 : Infinity,
            }}
          >
            <div className="text-center text-white">
              <div className="text-6xl mb-4">
                {technique?.icon}
              </div>
              <div className="text-2xl font-bold mb-2">
                {getPhaseInstruction()}
              </div>
              <div className="text-4xl font-mono">
                {timeLeft}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Cycle Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-lg text-muted-foreground mb-2">
            Cycles Completed: <span className="font-bold text-primary">{cycleCount}</span>
          </p>
          <p className="text-sm text-muted-foreground/70">
            {technique?.description}
          </p>
        </motion.div>

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
              onClick={toggleBreathing}
              size="lg"
              className="btn-breathing flex items-center gap-2 px-8"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={resetBreathing}
              variant="outline"
              size="lg"
              className="btn-soft flex items-center gap-2 px-8"
            >
              <RotateCcw size={20} />
              Reset
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BreathingScreen;