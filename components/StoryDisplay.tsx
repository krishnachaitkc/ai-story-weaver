import React from 'react';

interface StoryDisplayProps {
  storyText: string | null;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ storyText }) => {
  if (!storyText) {
    return (
        <div className="mt-8 p-8 bg-white/5 backdrop-blur-sm rounded-lg shadow-lg min-h-[200px] flex items-center justify-center border border-slate-700">
            <p className="text-slate-400 text-lg italic text-center">Your beautifully woven story will appear here once you submit a prompt.</p>
        </div>
    );
  }

  const paragraphs = storyText.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="mt-8 p-6 sm:p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-slate-700">
      <h2 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 mb-6 pb-3 border-b border-slate-600">
        Your Woven Tale:
      </h2>
      <div className="space-y-4 text-slate-300 leading-relaxed text-left text-base sm:text-lg">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default StoryDisplay;
