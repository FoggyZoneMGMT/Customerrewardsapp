import { useState, useEffect } from 'react';
import { NumberPadScreen } from './components/NumberPadScreen';
import { PointsScreen } from './components/PointsScreen';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

interface SavedEntry {
  id: string;
  number: string;
  points: number;
  timestamp: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'numberPad' | 'points'>('numberPad');
  const [selectedNumber, setSelectedNumber] = useState('');
  const [points, setPoints] = useState(0);
  const [savedEntries, setSavedEntries] = useState<SavedEntry[]>([]);

  // Load saved entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('foggyZoneEntries');
    if (stored) {
      try {
        setSavedEntries(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading saved entries:', error);
      }
    }
  }, []);

  const handleContinue = (number: string) => {
    setSelectedNumber(number);
    
    // Check if this number already has saved points
    const existingEntry = savedEntries.find(entry => entry.number === number);
    if (existingEntry) {
      setPoints(existingEntry.points);
    } else {
      setPoints(0);
    }
    
    setCurrentScreen('points');
  };

  const handleAddPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  const handleSubtractPoints = (amount: number) => {
    setPoints(prev => Math.max(0, prev - amount));
  };

  const handleSave = () => {
    // Check if entry already exists
    const existingIndex = savedEntries.findIndex(entry => entry.number === selectedNumber);
    
    let updatedEntries: SavedEntry[];
    
    if (existingIndex !== -1) {
      // Update existing entry
      updatedEntries = [...savedEntries];
      updatedEntries[existingIndex] = {
        ...updatedEntries[existingIndex],
        points: points,
        timestamp: Date.now(),
      };
    } else {
      // Create new entry
      const newEntry: SavedEntry = {
        id: `${Date.now()}-${selectedNumber}`,
        number: selectedNumber,
        points: points,
        timestamp: Date.now(),
      };
      updatedEntries = [...savedEntries, newEntry];
    }

    setSavedEntries(updatedEntries);

    // Save to localStorage
    localStorage.setItem('foggyZoneEntries', JSON.stringify(updatedEntries));

    // Show success toast
    toast.success('Entry Saved!', {
      description: `${selectedNumber}: ${points} points`,
    });

    // Return to number pad and reset
    setCurrentScreen('numberPad');
    setPoints(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-8">
      <div className="w-full max-w-[768px] h-[1024px] bg-white rounded-3xl shadow-2xl flex flex-col">
        {currentScreen === 'numberPad' ? (
          <NumberPadScreen onContinue={handleContinue} savedEntries={savedEntries} />
        ) : (
          <PointsScreen
            number={selectedNumber}
            points={points}
            onAddPoints={handleAddPoints}
            onSubtractPoints={handleSubtractPoints}
            onSave={handleSave}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
}
