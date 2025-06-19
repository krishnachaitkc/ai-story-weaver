import React, { useState } from 'react';
import { StoryGenre } from '../types';
import { AVAILABLE_GENRES, DEFAULT_GENRE } from '../constants';

interface StoryInputFormProps {
  onSubmit: (prompt: string, genre: StoryGenre) => void;
  isLoading: boolean;
}

const StoryInputForm: React.FC<StoryInputFormProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [genre, setGenre] = useState<StoryGenre>(DEFAULT_GENRE);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) {
        alert("Please enter a story prompt to begin.");
        return;
    }
    onSubmit(prompt, genre);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl space-y-6 border border-slate-700">
      <div>
        <label htmlFor="storyPrompt" className="block text-sm font-medium text-slate-300 mb-1">
          Craft Your Beginning:
        </label>
        <textarea
          id="storyPrompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., The old lighthouse keeper found a mysterious map..."
          rows={6}
          className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-slate-200 placeholder-slate-400 text-base focus:bg-slate-700"
          disabled={isLoading}
          required
        />
        <p className="mt-2 text-xs text-slate-400">
          Provide a captivating start. The more detailed, the better the AI can weave!
        </p>
      </div>

      <div>
        <label htmlFor="storyGenre" className="block text-sm font-medium text-slate-300 mb-1">
          Choose a Genre:
        </label>
        <select
          id="storyGenre"
          value={genre}
          onChange={(e) => setGenre(e.target.value as StoryGenre)}
          className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-slate-200 text-base focus:bg-slate-700"
          disabled={isLoading}
        >
          {AVAILABLE_GENRES.map((g) => (
            <option key={g} value={g} className="bg-slate-700 text-slate-200">
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95"
        >
          {isLoading ? 'Weaving Magic...' : 'Weave My Story'}
        </button>
      </div>
    </form>
  );
};

export default StoryInputForm;
