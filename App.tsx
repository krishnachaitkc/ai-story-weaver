import React, { useState, useCallback } from 'react';
import StoryInputForm from './components/StoryInputForm';
import StoryDisplay from './components/StoryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { generateStory } from './services/geminiService';
import { StoryGenre } from './types';

const App: React.FC = () => {
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStorySubmit = useCallback(async (prompt: string, genre: StoryGenre) => {
    setIsLoading(true);
    setError(null);
    setGeneratedStory(null); 

    try {
      const story = await generateStory(prompt, genre);
      setGeneratedStory(story);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while generating the story.");
      }
      setGeneratedStory(null); 
    } finally {
      setIsLoading(false);
    }
  }, []); // useCallback dependencies are empty as setters are stable and generateStory is an import.

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center selection:bg-purple-600 selection:text-white">
      <header className="mb-10 text-center">
        {/* You could add an SVG icon or a simple character art here if desired */}
        {/* Example: <div className="text-6xl mb-4">📖</div> */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
          AI Story Weaver
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          Unleash your imagination. Provide a spark, choose a genre, and let our AI wordsmith craft a unique tale for you.
        </p>
      </header>

      <main className="w-full max-w-3xl bg-slate-800/60 backdrop-blur-lg p-6 sm:p-10 rounded-xl shadow-2xl border border-slate-700/50">
        <StoryInputForm onSubmit={handleStorySubmit} isLoading={isLoading} />
        
        {isLoading && <LoadingSpinner />}
        
        {error && !isLoading && <ErrorMessage message={error} />}
        
        {/* StoryDisplay is shown when not loading, no error, regardless of whether a story exists (it handles its own placeholder) */}
        {!isLoading && !error && (
            <StoryDisplay storyText={generatedStory} />
        )}
      </main>

      <footer className="mt-16 mb-8 text-center text-slate-400 text-sm">
        <p>Powered by Google Gemini API.</p>
        <p>This is a demonstration project for educational purposes.</p>
        <p>&copy; {new Date().getFullYear()} AI Story Weaver.</p>
      </footer>
    </div>
  );
};

export default App;
