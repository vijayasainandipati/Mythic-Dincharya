import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CharacterMatcher from './CharacterMatcher';
import MythologyQuiz from './MythologyQuiz';
import DincharyaPlanner from './DincharyaPlanner';
import AudioController from './AudioController';
import mahabharataBg from '@/assets/mahabharata-bg.png';

interface Character {
  name: string;
  traits: string;
  quote: string;
  image: string;
  dailyWisdom: string;
  timeOfDay: string;
}

const MahabharataApp = () => {
  const [activeTab, setActiveTab] = useState<'character' | 'quiz'>('character');
  const [matchedCharacter, setMatchedCharacter] = useState<Character | null>(null);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${mahabharataBg})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/80"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-divine mb-2">
              🏹 Mahabharata Dincharya
            </h1>
            <p className="text-lg text-sacred">
              Ancient Wisdom for Modern Times ✨
            </p>
          </div>
          <AudioController />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={() => setActiveTab('character')}
            className={`btn-divine ${activeTab === 'character' ? 'animate-divine-glow' : ''}`}
          >
            🎭 Character Match
          </Button>
          <Button
            onClick={() => setActiveTab('quiz')}
            className={`btn-divine ${activeTab === 'quiz' ? 'animate-divine-glow' : ''}`}
          >
            🧠 Mythology Quiz
          </Button>
        </div>

        {/* Main Content Layout */}
        <div className="space-y-8 animate-fade-in">
          {/* Daily Routine - Top Section */}
          <div className="w-full">
            <DincharyaPlanner matchedCharacter={matchedCharacter} />
          </div>

          {/* Character Match & Quiz - Bottom Section */}
          <div className="w-full">
            {activeTab === 'character' && (
              <CharacterMatcher 
                onCharacterMatch={setMatchedCharacter}
                matchedCharacter={matchedCharacter}
              />
            )}
            {activeTab === 'quiz' && <MythologyQuiz />}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-sm">
            🕉️ Learn ancient wisdom through interactive storytelling 🕉️
          </p>
        </div>
      </div>
    </div>
  );
};

export default MahabharataApp;