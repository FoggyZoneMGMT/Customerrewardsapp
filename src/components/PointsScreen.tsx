import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Minus } from 'lucide-react';

interface PointsScreenProps {
  number: string;
  points: number;
  onAddPoints: (amount: number) => void;
  onSubtractPoints: (amount: number) => void;
  onSave: () => void;
}

export function PointsScreen({ 
  number, 
  points, 
  onAddPoints, 
  onSubtractPoints,
  onSave 
}: PointsScreenProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const amount = parseInt(inputValue);
    if (!isNaN(amount) && amount > 0) {
      onAddPoints(amount);
      setInputValue('');
    }
  };

  const handleSubtract = () => {
    const amount = parseInt(inputValue);
    if (!isNaN(amount) && amount > 0) {
      onSubtractPoints(amount);
      setInputValue('');
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-8 rounded-t-3xl">
        <h1 className="text-center">{number}</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 gap-12">
        {/* Points Display */}
        <div className="w-full max-w-md">
          <div className="text-center mb-4 text-slate-600">Current Points</div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 rounded-2xl p-12 flex items-center justify-center">
            <span className="text-6xl text-slate-800">
              {points}
            </span>
          </div>
        </div>

        {/* Manual Point Entry Section */}
        <div className="w-full max-w-md">
          <div className="text-center mb-4 text-slate-700">Enter Point Value</div>
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter points..."
            className="h-20 text-center text-3xl border-2 border-slate-300 rounded-xl"
          />
        </div>

        {/* Add/Subtract Buttons */}
        <div className="w-full max-w-md flex gap-4">
          <Button
            onClick={handleAdd}
            disabled={!inputValue || parseInt(inputValue) <= 0}
            className="flex-1 h-20 text-2xl bg-green-600 hover:bg-green-700 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Plus className="w-6 h-6" />
            Add
          </Button>
          <Button
            onClick={handleSubtract}
            disabled={!inputValue || parseInt(inputValue) <= 0}
            className="flex-1 h-20 text-2xl bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Minus className="w-6 h-6" />
            Subtract
          </Button>
        </div>

        {/* Done Button */}
        <Button
          onClick={onSave}
          className="w-full max-w-md h-16 bg-slate-800 hover:bg-slate-700 rounded-xl"
        >
          Done
        </Button>
      </div>
    </>
  );
}
