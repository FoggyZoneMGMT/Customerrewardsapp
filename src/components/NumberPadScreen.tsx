import { useState } from 'react';
import { Button } from './ui/button';

interface SavedEntry {
  id: string;
  number: string;
  points: number;
  timestamp: number;
}

interface NumberPadScreenProps {
  onContinue: (number: string) => void;
  savedEntries: SavedEntry[];
}

export function NumberPadScreen({ onContinue, savedEntries }: NumberPadScreenProps) {
  const [inputValue, setInputValue] = useState('');

  const handleNumberClick = (num: string) => {
    setInputValue(prev => prev + num);
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleBackspace = () => {
    setInputValue(prev => prev.slice(0, -1));
  };

  const handleContinue = () => {
    if (inputValue) {
      onContinue(inputValue);
      setInputValue('');
    }
  };

  const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-8 rounded-t-3xl">
        <h1 className="text-center">Foggy Zone</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 gap-12">
        {/* Display */}
        <div className="w-full max-w-md">
          <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-8 min-h-[100px] flex items-center justify-center">
            <span className="text-4xl tracking-widest text-slate-800">
              {inputValue || ''}
            </span>
          </div>
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-4 max-w-md w-full">
          {numberButtons.map((num) => (
            <Button
              key={num}
              onClick={() => handleNumberClick(num)}
              variant="outline"
              className="h-24 text-3xl hover:bg-slate-100 border-2 border-slate-300 rounded-xl"
            >
              {num}
            </Button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 max-w-md w-full">
          <Button
            onClick={handleBackspace}
            variant="outline"
            className="flex-1 h-16 hover:bg-slate-100 border-2 border-slate-300 rounded-xl"
          >
            ← Delete
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="flex-1 h-16 hover:bg-slate-100 border-2 border-slate-300 rounded-xl"
          >
            Clear
          </Button>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!inputValue}
          className="w-full max-w-md h-16 bg-slate-800 hover:bg-slate-700 rounded-xl disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </>
  );
}
