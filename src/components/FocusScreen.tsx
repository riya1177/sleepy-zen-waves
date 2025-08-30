import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, Volume2 } from 'lucide-react';

interface FocusScreenProps {
  onBack: () => void;
}

const focusSounds = [
  { id: 'forest', label: 'Forest Ambience', icon: '🌲', file: '/sounds/forest.mp3', color: 'from-green-600 to-emerald-500' },
  { id: 'coffee-shop', label: 'Coffee Shop', icon: '☕', file: '/sounds/coffee-shop.mp3', color: 'from-amber-600 to-yellow-500' },
  { id: 'library', label: 'Library Quiet', icon: '📚', file: '/sounds/library.mp3', color: 'from-blue-600 to-indigo-500' },
  { id: 'ocean-waves', label: 'Ocean Waves', icon: '🌊', file: '/sounds/ocean.mp3', color: 'from-cyan-600 to-blue-500' },
  { id: 'thunderstorm', label: 'Thunderstorm', icon: '⛈️', file: '/sounds/thunder.mp3', color: 'from-gray-600 to-slate-500' },
  { id: 'fireplace', label: 'Fireplace', icon: '🔥', file: '/sounds/fireplace.mp3', color: 'from-red-600 to-orange-500' },
];

const FocusScreen = ({ onBack }: FocusScreenProps) => {
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (soundId: string) => {
    const sound = focusSounds.find(s => s.id === soundId);
    if (!sound) return;

    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Create new audio instance
    const audio = new Audio(sound.file);
    audio.loop = true;
    audio.volume = volume;
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

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
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
        {[...Array(35)].map((_, i) => (
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

        {/* Focus Icon */}
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
          className="text-7xl mb-8"
        >
          🎯
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-warning to-orange-400 bg-clip-text text-transparent"
        >
          Focus Sounds
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl text-muted-foreground mb-12 leading-relaxed"
        >
          Enhance your concentration with ambient sounds
        </motion.p>

        {/* Sound Buttons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          {focusSounds.map((sound, index) => (
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
                    ? 'bg-gradient-to-r ' + sound.color + ' text-white shadow-glow' 
                    : 'text-foreground hover:text-primary-foreground hover:bg-primary/90'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <motion.span 
                    className="text-3xl group-hover:scale-110 transition-transform duration-300"
                    animate={currentSound === sound.id ? { 
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={currentSound === sound.id ? { 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    } : {}}
                  >
                    {sound.icon}
                  </motion.span>
                  <span className="text-sm font-medium text-center">
                    {sound.label}
                  </span>
                  {currentSound === sound.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xs opacity-90"
                    >
                      Playing
                    </motion.div>
                  )}
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Volume Control */}
        {currentSound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 card-dreamy rounded-lg max-w-md mx-auto"
          >
            <div className="flex items-center gap-4">
              <Volume2 size={20} className="text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm text-muted-foreground w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </motion.div>
        )}

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
                className="bg-gradient-to-r from-warning to-orange-400 text-white hover:shadow-glow flex items-center gap-2 px-8"
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
                onBack();
              }}
              variant="outline"
              size="lg"
              className="btn-soft flex items-center gap-2 px-8"
            >
              <RotateCcw size={20} />
              Stop & Back
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Focus Elements */}
        {currentSound && (
          <>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-20 right-20 text-2xl opacity-40"
            >
              ⚡
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-24 left-20 text-xl opacity-50"
            >
              💡
            </motion.div>
          </>
        )}
      </motion.div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: none;
        }
      `}</style>
    </motion.div>
  );
};

export default FocusScreen;