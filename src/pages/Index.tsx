import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuestionScreen from '@/components/QuestionScreen';
import SoundScreen from '@/components/SoundScreen';

type Screen = 'welcome' | 'question' | 'sound';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedReason, setSelectedReason] = useState<string>('');

  const handleStart = () => {
    setCurrentScreen('question');
  };

  const handleSelectReason = (reason: string) => {
    setSelectedReason(reason);
    setCurrentScreen('sound');
  };

  const handleRestart = () => {
    setSelectedReason('');
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
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
      </AnimatePresence>
    </div>
  );
};

export default Index;
