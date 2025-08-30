import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/WelcomeScreen';
import ActivityScreen from '@/components/ActivityScreen';
import QuestionScreen from '@/components/QuestionScreen';
import SoundScreen from '@/components/SoundScreen';
import BreathingScreen from '@/components/BreathingScreen';
import MeditationScreen from '@/components/MeditationScreen';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

type Screen = 'welcome' | 'activity' | 'question' | 'sound' | 'breathing' | 'meditation';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode based on system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleStart = () => {
    setCurrentScreen('activity');
  };

  const handleSelectActivity = (activity: string) => {
    if (activity === 'sleep') {
      setCurrentScreen('question');
    } else if (activity === 'breathing') {
      setCurrentScreen('breathing');
    } else if (activity === 'meditation') {
      setCurrentScreen('meditation');
    } else {
      // For other activities, go to question screen for now
      setCurrentScreen('question');
    }
  };

  const handleSelectReason = (reason: string) => {
    setSelectedReason(reason);
    setCurrentScreen('sound');
  };

  const handleBackToActivity = () => {
    setCurrentScreen('activity');
  };

  const handleRestart = () => {
    setSelectedReason('');
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen relative">
      {/* Dark Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          size="sm"
          className="btn-soft rounded-full p-3"
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}
        {currentScreen === 'activity' && (
          <ActivityScreen key="activity" onSelectActivity={handleSelectActivity} />
        )}
        {currentScreen === 'question' && (
          <QuestionScreen key="question" onSelectReason={handleSelectReason} />
        )}
        {currentScreen === 'sound' && (
          <SoundScreen 
            key="sound" 
            selectedReason={selectedReason}
            onRestart={handleRestart} 
          />
        )}
        {currentScreen === 'breathing' && (
          <BreathingScreen key="breathing" onBack={handleBackToActivity} />
        )}
        {currentScreen === 'meditation' && (
          <MeditationScreen key="meditation" onBack={handleBackToActivity} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
