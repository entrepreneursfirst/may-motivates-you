
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlayCircle, Pause } from 'lucide-react';

const voiceOptions = [
  {
    id: "drill-sergeant",
    name: "Drill Sergeant",
    emoji: "💪",
    sample: "LISTEN UP! You've got five tasks to finish by EOD. NO EXCUSES!",
    color: "from-red-400 to-orange-400",
    bgColor: "bg-red-100"
  },
  {
    id: "zen-master",
    name: "Chill Zen Master",
    emoji: "🧘",
    sample: "Remember that each small step is progress. How's your task coming along?",
    color: "from-blue-400 to-cyan-400",
    bgColor: "bg-blue-100"
  },
  {
    id: "sass-queen",
    name: "Sass Queen",
    emoji: "💅",
    sample: "Sooooo, that presentation was due like... yesterday? Just saying.",
    color: "from-purple-400 to-fuchsia-400",
    bgColor: "bg-purple-100"
  },
  {
    id: "own-voice",
    name: "Your Own Voice",
    emoji: "🧠",
    sample: "Upload your voice and we'll mimic your tone.",
    color: "from-green-400 to-emerald-400",
    bgColor: "bg-green-100"
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
    <section id="voices" className="py-24 bg-gradient-to-b from-purple-50 via-white to-pink-50 relative">
      {/* Decorative Elements */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-yellow-300 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-400 opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit inline-block">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Voice</span>
          </h2>
          <p className="text-gray-600 text-xl mt-4 max-w-xl mx-auto">
            Customize the tone of your AI calls to match your motivation style
          </p>
          <div className="h-1.5 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {voiceOptions.map((voice) => (
            <div 
              key={voice.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`h-2 bg-gradient-to-r ${voice.color} w-full`}></div>
              <div className="p-6">
                <div className={`inline-block rounded-full ${voice.bgColor} p-3 mb-4`}>
                  <span className="text-4xl">{voice.emoji}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">{voice.name}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`bg-gradient-to-r ${voice.color} text-white hover:opacity-90`}
                    onClick={() => handlePlaySample(voice.id)}
                  >
                    {playingVoice === voice.id ? 
                      <Pause className="h-5 w-5" /> : 
                      <PlayCircle className="h-5 w-5" />
                    }
                  </Button>
                </div>
                <p className="text-gray-600 italic bg-gray-50 p-3 rounded-lg">
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
