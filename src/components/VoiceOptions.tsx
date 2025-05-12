
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlayCircle, Pause } from 'lucide-react';

const voiceOptions = [
  {
    id: "drill-sergeant",
    name: "Drill Sergeant",
    emoji: "💪",
    sample: "LISTEN UP! You've got five tasks to finish by EOD. NO EXCUSES!",
    color: "bg-red-500",
  },
  {
    id: "zen-master",
    name: "Chill Zen Master",
    emoji: "🧘",
    sample: "Remember that each small step is progress. How's your task coming along?",
    color: "bg-blue-400",
  },
  {
    id: "sass-queen",
    name: "Sass Queen",
    emoji: "💅",
    sample: "Sooooo, that presentation was due like... yesterday? Just saying.",
    color: "bg-purple-500",
  },
  {
    id: "own-voice",
    name: "Your Own Voice",
    emoji: "🧠",
    sample: "Upload your voice and we'll mimic your tone.",
    color: "bg-green-500",
  },
];

const VoiceOptions = () => {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  
  const handlePlaySample = (id: string) => {
    if (playingVoice === id) {
      setPlayingVoice(null);
      return;
    }
    setPlayingVoice(id);
    // In a real implementation, this would play the audio sample
    setTimeout(() => {
      setPlayingVoice(null);
    }, 3000);
  };
  
  return (
    <section id="voices" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center font-outfit mb-4">
          Choose Your <span className="text-neon">Voice</span>
        </h2>
        <p className="text-center text-gray-600 text-lg mb-16">
          Customize the tone of your AI calls
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {voiceOptions.map((voice) => (
            <div 
              key={voice.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className={`h-3 ${voice.color} w-full`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{voice.emoji}</span>
                    <h3 className="font-bold text-lg">{voice.name}</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-neon hover:text-neon-hover hover:bg-neon-hover hover:bg-opacity-10"
                    onClick={() => handlePlaySample(voice.id)}
                  >
                    {playingVoice === voice.id ? 
                      <Pause className="h-6 w-6" /> : 
                      <PlayCircle className="h-6 w-6" />
                    }
                  </Button>
                </div>
                <p className="text-gray-600 text-sm">
                  "{voice.sample}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceOptions;
