import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface SoundScreenProps {
  selectedReason: string;
  onRestart: () => void;
}

const sounds = [
  { id: 'rain', label: 'Rain', icon: '🌧️', file: '/sounds/rain.mp3' },
  { id: 'white-noise', label: 'White Noise', icon: '🎧', file: '/sounds/white-noise.mp3' },
  { id: 'pink-noise', label: 'Pink Noise', icon: '🎵', file: '/sounds/pink-noise.mp3' },
  { id: 'brown-noise', label: 'Brown Noise', icon: '🎶', file: '/sounds/brown-noise.mp3' },
];

const reasonMessages = {
  overthinking: "Let these sounds quiet your busy mind",
  anxiety: "Breathe deep and let these calming sounds soothe you",
  stress: "Release your tension with these peaceful sounds", 
  phone: "Put your phone aside and focus on these relaxing sounds",
  unknown: "Sometimes we all need a little help falling asleep",
};

const SoundScreen = ({ selectedReason, onRestart }: SoundScreenProps) => {
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (soundId: string) => {
    const sound = sounds.find(s => s.id === soundId);
    if (!sound) return;

    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Create new audio instance
    const audio = new Audio(sound.file);
    audio.loop = true;
    audioRef.current = audio;

    audio.play().then(() => {
      setCurrentSound(soundId);
      setIsPlaying(true);
    }).catch((error) => {
      console.log('Audio play failed:', error);
      // Fallback: show that it's "playing" even if audio fails
      setCurrentSound(soundId);
      setIsPlaying(true);
    });
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setCurrentSound(null);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Audio play failed:', error);
      });
    }
  };

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Background Stars */}
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
        className="text-center z-10 max-w-3xl mx-auto"
      >
        {/* Sleep Icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-6"
        >
          😴
        </motion.div>

        {/* Personalized Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl md:text-2xl text-primary/80 mb-8 leading-relaxed"
        >
          {reasonMessages[selectedReason as keyof typeof reasonMessages]}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Choose a calming sound
        </motion.h2>

        {/* Sound Buttons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {sounds.map((sound, index) => (
            <motion.div
              key={sound.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => playSound(sound.id)}
                variant={currentSound === sound.id ? "default" : "outline"}
                size="lg"
                className={`w-full p-6 h-auto card-dreamy transition-all duration-300 group ${
                  currentSound === sound.id 
                    ? 'bg-primary text-primary-foreground shadow-glow' 
                    : 'text-primary hover:text-primary-foreground hover:bg-primary/90'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <motion.span 
                    className="text-3xl group-hover:scale-110 transition-transform duration-300"
                    animate={currentSound === sound.id ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={currentSound === sound.id ? { 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    } : {}}
                  >
                    {sound.icon}
                  </motion.span>
                  <span className="text-base font-medium">
                    {sound.label}
                  </span>
                  {currentSound === sound.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xs opacity-80"
                    >
                      Playing
                    </motion.div>
                  )}
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          {currentSound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={togglePlayPause}
                size="lg"
                className="btn-soft flex items-center gap-2 px-8"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
            </motion.div>
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => {
                stopSound();
                onRestart();
              }}
              variant="outline"
              size="lg"
              className="btn-soft flex items-center gap-2 px-8"
            >
              <RotateCcw size={20} />
              Restart
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Sound Waves */}
        {currentSound && (
          <>
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 right-20 text-2xl"
            >
              🎵
            </motion.div>

            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-24 left-20 text-xl"
            >
              🎶
            </motion.div>

            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-1/3 left-12 text-lg"
            >
              🎼
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SoundScreen;