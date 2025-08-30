import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ActivityScreenProps {
  onSelectActivity: (activity: string) => void;
}

const activities = [
  { 
    id: 'sleep', 
    label: 'Help Me Sleep', 
    icon: '😴', 
    description: 'Calming sounds for better sleep',
    color: 'from-primary to-accent'
  },
  { 
    id: 'breathing', 
    label: 'Breathing Exercises', 
    icon: '🫁', 
    description: 'Guided breathing techniques',
    color: 'from-success to-emerald-400'
  },
  { 
    id: 'meditation', 
    label: 'Meditation', 
    icon: '🧘‍♀️', 
    description: 'Mindfulness and relaxation',
    color: 'from-accent to-pink-400'
  },
  { 
    id: 'focus', 
    label: 'Focus Sounds', 
    icon: '🎯', 
    description: 'Sounds for concentration',
    color: 'from-warning to-orange-400'
  },
  { 
    id: 'anxiety', 
    label: 'Anxiety Relief', 
    icon: '💙', 
    description: 'Calming exercises for anxiety',
    color: 'from-blue-500 to-cyan-400'
  },
  { 
    id: 'energy', 
    label: 'Boost Energy', 
    icon: '⚡', 
    description: 'Energizing sounds and exercises',
    color: 'from-yellow-500 to-amber-400'
  },
];

const ActivityScreen = ({ onSelectActivity }: ActivityScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Enhanced Background Stars */}
      <div className="stars">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 right-16 text-3xl opacity-20 rotate-slow"
      >
        ✨
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-32 left-16 text-2xl float-delayed"
      >
        🌟
      </motion.div>

      <motion.div
        animate={{ 
          x: [0, 40, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/3 left-12 text-xl opacity-40 float-slow"
      >
        💫
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center z-10 max-w-6xl mx-auto"
      >
        {/* Main Icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl mb-8"
        >
          🌙
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient_3s_ease-in-out_infinite]">
            What do you need?
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
        >
          Choose your wellness journey and let us guide you to peace
        </motion.p>

        {/* Activity Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={() => onSelectActivity(activity.id)}
                variant="outline"
                size="lg"
                className="card-activity w-full p-8 h-auto text-left hover:shadow-glow transition-all duration-500 group"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{activity.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {activity.label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 text-muted-foreground/60 text-sm italic"
        >
          Your journey to wellness starts here ✨
        </motion.p>
      </motion.div>

      {/* Enhanced CSS animations */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default ActivityScreen;