
import React from 'react';
import { Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Agent {
  id: number;
  name: string;
  image: string;
  emoji: string;
  description: string;
  quote: string;
}

interface ActiveAgentCardProps {
  activeAgent: Agent;
  activeAgentId: number;
  setActiveAgentId: React.Dispatch<React.SetStateAction<number>>;
  agents: Agent[];
}

const ActiveAgentCard: React.FC<ActiveAgentCardProps> = ({
  activeAgent,
  activeAgentId,
  setActiveAgentId,
  agents
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-commitify-text" />
          Your Active Agent
        </CardTitle>
        <CardDescription>Manage your active agent and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-gradient-to-r from-[#FFC371] via-[#FFAA5B] to-[#FDE365] rounded-lg text-commitify-text mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-24 h-24 rounded-full bg-white p-1 overflow-hidden flex-shrink-0 mx-auto md:mx-0">
              <img src={activeAgent.image} alt={activeAgent.name} className="w-full h-full object-cover object-top rounded-full" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-2xl">{activeAgent.emoji}</span>
                <h3 className="font-bold text-xl">{activeAgent.name}</h3>
              </div>
              <p className="text-sm mb-3">{activeAgent.description}</p>
              <div className="bg-white/40 backdrop-blur-sm p-3 rounded-lg italic text-sm">
                "{activeAgent.quote}"
              </div>
            </div>
          </div>
        </div>
        
        <h4 className="font-medium mb-3">Select a different agent</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agents.map(agent => (
            <button 
              key={agent.id} 
              className={`p-3 rounded-lg border-2 transition-all ${agent.id === activeAgentId ? "border-commitify-yellow bg-commitify-yellow/10" : "border-transparent hover:border-commitify-yellow/50"}`} 
              onClick={() => setActiveAgentId(agent.id)}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{agent.emoji}</span>
                <span className="font-medium">{agent.name}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveAgentCard;
