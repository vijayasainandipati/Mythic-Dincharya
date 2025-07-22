import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface Character {
  name: string;
  traits: string;
  quote: string;
  image: string;
  dailyWisdom: string;
  timeOfDay: string;
}

interface RoutineActivity {
  time: string;
  activity: string;
  description: string;
  icon: string;
  character?: string;
}

interface DincharyaPlannerProps {
  matchedCharacter: Character | null;
}

const baseRoutine: RoutineActivity[] = [
  {
    time: '5:00 AM',
    activity: 'Brahma Muhurta (Sacred Hour)',
    description: 'Wake up during the most sacred time for meditation and prayer',
    icon: '🌅'
  },
  {
    time: '5:30 AM',
    activity: 'Sandhya Vandana (Dawn Prayer)',
    description: 'Greet the sun god with gratitude and set intentions for the day',
    icon: '🙏'
  },
  {
    time: '6:00 AM',
    activity: 'Yoga & Pranayama',
    description: 'Physical and breathing exercises to energize body and mind',
    icon: '🧘'
  },
  {
    time: '7:00 AM',
    activity: 'Study & Learning',
    description: 'Read scriptures, learn new skills, or practice your craft',
    icon: '📚'
  },
  {
    time: '8:00 AM',
    activity: 'Morning Meal',
    description: 'Eat a sattvic (pure) breakfast with gratitude',
    icon: '🥣'
  },
  {
    time: '9:00 AM',
    activity: 'Karma Yoga (Duty)',
    description: 'Perform your daily duties and responsibilities',
    icon: '⚡'
  },
  {
    time: '12:00 PM',
    activity: 'Madhyahna (Midday Prayer)',
    description: 'Brief prayer and reflection at the peak of the day',
    icon: '☀️'
  },
  {
    time: '1:00 PM',
    activity: 'Main Meal',
    description: 'Eat your largest meal when digestive fire is strongest',
    icon: '🍽️'
  },
  {
    time: '2:00 PM',
    activity: 'Rest & Reflection',
    description: 'Short rest to recharge for the afternoon',
    icon: '🌸'
  },
  {
    time: '4:00 PM',
    activity: 'Service (Seva)',
    description: 'Help others, practice charity, or community service',
    icon: '❤️'
  },
  {
    time: '6:00 PM',
    activity: 'Sandhya Vandana (Evening Prayer)',
    description: 'Evening prayer and gratitude for the day\'s blessings',
    icon: '🌅'
  },
  {
    time: '7:00 PM',
    activity: 'Family Time',
    description: 'Spend quality time with loved ones, share stories',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    time: '8:00 PM',
    activity: 'Light Evening Meal',
    description: 'Simple, light dinner that\'s easy to digest',
    icon: '🥗'
  },
  {
    time: '9:00 PM',
    activity: 'Self-Reflection',
    description: 'Review the day, practice gratitude, plan tomorrow',
    icon: '📔'
  },
  {
    time: '10:00 PM',
    activity: 'Peaceful Sleep',
    description: 'Early sleep for natural body rhythms and health',
    icon: '😴'
  }
];

const characterRoutineAdjustments: Record<string, Partial<RoutineActivity>[]> = {
  Arjuna: [
    { time: '6:00 AM', activity: 'Archery Practice', description: 'Practice your focus and skill with concentrated effort', character: 'Arjuna' },
    { time: '4:00 PM', activity: 'Target Practice', description: 'Afternoon practice to perfect your aim and concentration', character: 'Arjuna' }
  ],
  Krishna: [
    { time: '5:30 AM', activity: 'Deep Meditation', description: 'Connect with divine wisdom through silent contemplation', character: 'Krishna' },
    { time: '7:00 AM', activity: 'Spiritual Study', description: 'Study sacred texts and philosophical wisdom', character: 'Krishna' }
  ],
  Bhima: [
    { time: '6:00 AM', activity: 'Strength Training', description: 'Build physical strength and endurance', character: 'Bhima' },
    { time: '8:00 AM', activity: 'Hearty Breakfast', description: 'Fuel your strong body with nutritious food', character: 'Bhima' }
  ],
  Yudhishthira: [
    { time: '9:00 AM', activity: 'Just Decisions', description: 'Make fair and righteous decisions for the day', character: 'Yudhishthira' },
    { time: '12:00 PM', activity: 'Truth Practice', description: 'Speak only truth and act with righteousness', character: 'Yudhishthira' }
  ],
  Draupadi: [
    { time: '4:00 PM', activity: 'Community Leadership', description: 'Lead and inspire others with grace and wisdom', character: 'Draupadi' },
    { time: '7:00 PM', activity: 'Dignified Interactions', description: 'Maintain dignity and respect in all relationships', character: 'Draupadi' }
  ],
  Karna: [
    { time: '4:00 PM', activity: 'Charitable Giving', description: 'Practice generosity and help those in need', character: 'Karna' },
    { time: '9:00 PM', activity: 'Honor Reflection', description: 'Reflect on maintaining honor in all circumstances', character: 'Karna' }
  ]
};

const DincharyaPlanner = ({ matchedCharacter }: DincharyaPlannerProps) => {
  const [customRoutine, setCustomRoutine] = useState<RoutineActivity[]>(baseRoutine);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (matchedCharacter && characterRoutineAdjustments[matchedCharacter.name]) {
      const adjustments = characterRoutineAdjustments[matchedCharacter.name];
      const updatedRoutine = [...baseRoutine];
      
      adjustments.forEach(adjustment => {
        const index = updatedRoutine.findIndex(activity => activity.time === adjustment.time);
        if (index !== -1) {
          updatedRoutine[index] = { ...updatedRoutine[index], ...adjustment };
        } else if (adjustment.time && adjustment.activity) {
          updatedRoutine.push(adjustment as RoutineActivity);
        }
      });
      
      updatedRoutine.sort((a, b) => a.time.localeCompare(b.time));
      setCustomRoutine(updatedRoutine);
    } else {
      setCustomRoutine(baseRoutine);
    }
  }, [matchedCharacter]);

  const getCurrentActivity = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    
    for (let i = 0; i < customRoutine.length; i++) {
      const activityTime = customRoutine[i].time;
      const nextActivityTime = i < customRoutine.length - 1 ? customRoutine[i + 1].time : '23:59';
      
      if (currentTimeString >= activityTime && currentTimeString < nextActivityTime) {
        return customRoutine[i];
      }
    }
    return null;
  };

  const currentActivity = getCurrentActivity();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
          🌅 Daily Dincharya Routine
        </h2>
        <p className="text-muted-foreground text-lg">
          Ancient wisdom for modern living
        </p>
      </div>

      {/* Current Activity Highlight */}
      {currentActivity && (
        <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 shadow-lg">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-3xl">{currentActivity.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-primary">Current Activity</h3>
                <p className="text-sm text-muted-foreground">{currentActivity.time}</p>
              </div>
            </div>
            <h4 className="text-lg font-semibold mb-2">{currentActivity.activity}</h4>
            <p className="text-muted-foreground">{currentActivity.description}</p>
          </div>
        </Card>
      )}

      {/* Daily Routine Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customRoutine.map((activity, index) => {
          const isCurrentActivity = currentActivity?.time === activity.time;
          const isCharacterSpecific = activity.character === matchedCharacter?.name;
          
          return (
            <Card 
              key={index} 
              className={`transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                isCurrentActivity 
                  ? 'ring-2 ring-primary bg-primary/10 shadow-lg' 
                  : isCharacterSpecific
                    ? 'bg-secondary/20 border-secondary'
                    : 'hover:bg-muted/50'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {activity.time}
                      </span>
                      {isCharacterSpecific && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.character}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 leading-tight">
                      {activity.activity}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Character-specific wisdom */}
      {matchedCharacter && (
        <Card className="bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30">
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-primary mb-3 flex items-center justify-center gap-2">
              ✨ Wisdom from {matchedCharacter.name}
            </h3>
            <p className="text-lg text-foreground font-medium italic">
              💡 {matchedCharacter.dailyWisdom}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DincharyaPlanner;