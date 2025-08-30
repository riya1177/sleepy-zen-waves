import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface QuestionScreenProps {
  onSelectReason: (reason: string) => void;
}

const reasons = [
  { id: 'overthinking', label: 'Overthinking', icon: '🧠' },
  { id: 'anxiety', label: 'Anxiety', icon: '😰' },
  { id: 'stress', label: 'Stress', icon: '😫' },
  { id: 'phone', label: 'Using phone at night', icon: '📱' },
  { id: 'unknown', label: 'Unknown reason', icon: '🤷‍♀️' },
];

const QuestionScreen = ({ onSelectReason }: QuestionScreenProps) => {
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
        {/* Question Icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-8"
        >
          🤔
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Why can't you sleep?
        </motion.h2>

        {/* Reason Buttons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => onSelectReason(reason.id)}
                variant="outline"
                size="lg"
                className="w-full p-6 h-auto card-dreamy text-primary hover:text-primary-foreground hover:bg-primary/90 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </span>
                  <span className="text-lg font-medium">
                    {reason.label}
                  </span>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-16 right-16 text-2xl opacity-30"
        >
          💭
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 left-16 text-xl opacity-40"
        >
          💤
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionScreen;