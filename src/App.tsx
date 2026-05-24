/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { GameState } from './types';
import { journeyData } from './data';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizStep } from './components/QuizStep';
import { EndScreen } from './components/EndScreen';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stars, setStars] = useState(0);

  const startGame = () => {
    setGameState('playing');
    setCurrentStepIndex(0);
    setStars(0);
  };

  const nextStep = (starsEarned: number) => {
    setStars(prev => prev + starsEarned);
    if (currentStepIndex < journeyData.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setGameState('completed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden relative text-[#5D4037] bg-[#FFF8E1] select-none" dir="rtl">
       {/* Background decorative elements */}
       <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
          {/* Animated clouds and stars */}
          <div className="absolute top-10 right-10 text-[100px] opacity-40 animate-[bounce_10s_infinite_alternate]">☁️</div>
          <div className="absolute top-32 left-20 text-[60px] opacity-50 animate-[pulse_3s_infinite_alternate] drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">⭐</div>
          <div className="absolute top-64 left-10 text-[80px] opacity-30 animate-[bounce_15s_infinite_alternate-reverse]">☁️</div>
          <div className="absolute bottom-20 right-20 text-[80px] opacity-60 animate-[pulse_4s_infinite_alternate]">🌙</div>
          <div className="absolute bottom-40 left-32 text-[50px] opacity-40 animate-[pulse_2s_infinite_alternate]">✨</div>
       </div>

      <main className="relative z-10 flex-1 flex items-center justify-center p-8 w-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {gameState === 'welcome' && (
            <WelcomeScreen key="welcome" onStart={startGame} />
          )}
          {gameState === 'playing' && (
            <QuizStep 
              key={`step-${currentStepIndex}`}
              step={journeyData[currentStepIndex]} 
              stepNumber={currentStepIndex + 1}
              totalSteps={journeyData.length}
              onNext={nextStep} 
            />
          )}
          {gameState === 'completed' && (
            <EndScreen 
              key="end" 
              onRestart={startGame} 
              stars={stars} 
              totalStars={journeyData.length * 3} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
