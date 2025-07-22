import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import arjunaImg from '@/assets/arjuna.png';
import krishnaImg from '@/assets/krishna.png';
import bhimaImg from '@/assets/bhima.png';
import yudhishthiraImg from '@/assets/yudhishthira.png';
import draupadiImg from '@/assets/draupadi.png';
import karnaImg from '@/assets/karna.png';

interface Character {
  name: string;
  traits: string;
  quote: string;
  image: string;
  dailyWisdom: string;
  timeOfDay: string;
}

const characterData: Record<string, Character> = {
  Arjuna: {
    name: 'Arjuna',
    traits: 'Focused, disciplined, excellent archer 🎯',
    quote: 'Focus on your goal with unwavering determination!',
    image: arjunaImg,
    dailyWisdom: 'Practice your skills daily with complete concentration',
    timeOfDay: 'Early Morning (Brahma Muhurta)'
  },
  Krishna: {
    name: 'Krishna',
    traits: 'Wise, calm, strategist 🧠',
    quote: 'Do your duty without attachment to results.',
    image: krishnaImg,
    dailyWisdom: 'Meditate and seek wisdom in all actions',
    timeOfDay: 'Dawn (Sunrise)'
  },
  Bhima: {
    name: 'Bhima',
    traits: 'Strong, loyal, protector 💪',
    quote: 'Strength and loyalty protect those we love!',
    image: bhimaImg,
    dailyWisdom: 'Exercise your body and strengthen your resolve',
    timeOfDay: 'Morning (Physical Activities)'
  },
  Yudhishthira: {
    name: 'Yudhishthira',
    traits: 'Truthful, fair, responsible 📜',
    quote: 'Truth and dharma are the paths to peace.',
    image: yudhishthiraImg,
    dailyWisdom: 'Always speak truth and act with righteousness',
    timeOfDay: 'Midday (Decision Making)'
  },
  Draupadi: {
    name: 'Draupadi',
    traits: 'Bold, intelligent, courageous 👑',
    quote: 'Stand tall with dignity, no matter the challenge.',
    image: draupadiImg,
    dailyWisdom: 'Face challenges with grace and inner strength',
    timeOfDay: 'Afternoon (Community Service)'
  },
  Karna: {
    name: 'Karna',
    traits: 'Generous, skilled, honorable 🎯❤️',
    quote: 'True nobility comes from your actions, not your birth.',
    image: karnaImg,
    dailyWisdom: 'Practice charity and kindness to all beings',
    timeOfDay: 'Evening (Reflection & Gratitude)'
  }
};

interface CharacterMatcherProps {
  onCharacterMatch: (character: Character) => void;
  matchedCharacter: Character | null;
}

const CharacterMatcher = ({ onCharacterMatch, matchedCharacter }: CharacterMatcherProps) => {
  const [dob, setDob] = useState('');

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDob(value);
    
    if (value) {
      const day = new Date(value).getDate();
      const names = Object.keys(characterData);
      const index = day % names.length;
      const characterName = names[index];
      const character = characterData[characterName];
      onCharacterMatch(character);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="card-parchment mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-sacred mb-4">
            🎭 Discover Your Mahabharata Character
          </h2>
          <p className="text-muted-foreground mb-6">
            Enter your birth date to find which legendary character matches your soul!
          </p>
          
          <div className="max-w-md mx-auto">
            <Label htmlFor="dob" className="text-base font-medium text-foreground">
              Your Date of Birth 📅
            </Label>
            <Input
              id="dob"
              type="date"
              value={dob}
              onChange={handleDobChange}
              className="mt-2 text-center text-lg border-2 border-primary/30 focus:border-primary"
            />
          </div>
        </div>
      </Card>

      {matchedCharacter && (
        <Card className="card-parchment character-reveal">
          <div className="text-center">
            <Badge className="mb-4 text-lg px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground">
              ✨ Your Character Match ✨
            </Badge>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-bold text-divine mb-4">
                  {matchedCharacter.name}
                </h3>
                
                <div className="space-y-4 text-left">
                  <div>
                    <h4 className="font-semibold text-sacred mb-2">Character Traits:</h4>
                    <p className="text-foreground">{matchedCharacter.traits}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sacred mb-2">Sacred Quote:</h4>
                    <p className="italic text-foreground border-l-4 border-primary pl-4">
                      "{matchedCharacter.quote}"
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sacred mb-2">Daily Wisdom:</h4>
                    <p className="text-foreground">{matchedCharacter.dailyWisdom}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sacred mb-2">Best Time for Activities:</h4>
                    <Badge variant="outline" className="text-sm">
                      {matchedCharacter.timeOfDay}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
                  <img
                    src={matchedCharacter.image}
                    alt={matchedCharacter.name}
                    className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-primary/20 hover:border-primary transition-all duration-300"
                  />
                  <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
                    ✨
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CharacterMatcher;