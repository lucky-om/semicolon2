import { useState, useCallback } from "react";
import NeonTitle from "@/components/NeonTitle";
import TeamInput from "@/components/TeamInput";
import WildcardCard from "@/components/WildcardCard";
import SpinButton from "@/components/SpinButton";
import SoundToggle from "@/components/SoundToggle";
import ResultDisplay from "@/components/ResultDisplay";
import VictoryRipple from "@/components/VictoryRipple";
import { useSound } from "@/hooks/useSound";
import { useWildcards } from "@/hooks/useWildcards";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [teamName, setTeamName] = useState("");
  const [isTeamLocked, setIsTeamLocked] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinningCard, setSpinningCard] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isSpinUsed, setIsSpinUsed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  const { playShuffleSound, playVictorySound } = useSound();
  const { data: wildcards, isLoading, error } = useWildcards();

  const handleTeamSubmit = (name: string) => {
    setTeamName(name);
    setIsTeamLocked(true);
  };

  const handleSpin = useCallback(async () => {
    if (isSpinUsed || isSpinning || !isTeamLocked || !wildcards) return;

    setIsSpinning(true);
    setShowResult(false);
    setShowVictory(false);

    // Determine winner upfront
    const winner = Math.floor(Math.random() * 3) + 1;

    // Shuffle animation with sounds
    const shuffleCount = 12;
    const initialDelay = 100;
    const slowdownFactor = 1.15;

    for (let i = 0; i < shuffleCount; i++) {
      await new Promise((resolve) => {
        setTimeout(resolve, initialDelay * Math.pow(slowdownFactor, i));
      });
      
      const highlightCard = (i % 3) + 1;
      setSpinningCard(highlightCard);
      
      if (soundEnabled) {
        playShuffleSound();
      }
    }

    // Final selection with dramatic pause
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setSpinningCard(null);
    setSelectedCard(winner);
    setIsSpinning(false);
    setIsSpinUsed(true);

    // Victory effects
    if (soundEnabled) {
      playVictorySound();
    }
    
    setShowVictory(true);
    
    // Show result text after a brief moment
    setTimeout(() => {
      setShowResult(true);
    }, 300);
  }, [isSpinUsed, isSpinning, isTeamLocked, soundEnabled, playShuffleSound, playVictorySound, wildcards]);

  const getWildcardName = (cardNumber: number) => {
    const wildcard = wildcards?.find(w => w.card_number === cardNumber);
    return wildcard?.name || `Card ${cardNumber}`;
  };

  const selectedCardName = selectedCard ? getWildcardName(selectedCard) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card-glow rounded-2xl px-8 py-6 text-center">
          <p className="font-display text-xl text-destructive">Failed to load wildcards</p>
          <p className="font-body text-muted-foreground mt-2">Please refresh the page</p>
        </div>
      </div>
    );
  }

  const cards: (1 | 2 | 3)[] = [1, 2, 3];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background grid effect */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Sound toggle */}
      <SoundToggle enabled={soundEnabled} onToggle={() => setSoundEnabled(!soundEnabled)} />

      {/* Victory ripple effect */}
      <VictoryRipple active={showVictory} />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-10">
        {/* Header */}
        <NeonTitle />

        {/* Team input */}
        <div className="w-full">
          <TeamInput 
            onSubmit={handleTeamSubmit} 
            isLocked={isTeamLocked} 
            teamName={teamName} 
          />
        </div>

        {/* Wildcard cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full">
          {cards.map((num) => (
            <WildcardCard
              key={num}
              number={num}
              name={getWildcardName(num)}
              isSelected={selectedCard === num}
              isSpinning={spinningCard === num}
              isRevealed={isSpinUsed}
              isLoser={isSpinUsed && selectedCard !== num}
            />
          ))}
        </div>

        {/* Spin button */}
        <SpinButton
          onClick={handleSpin}
          disabled={!isTeamLocked}
          isSpinning={isSpinning}
          isUsed={isSpinUsed}
        />

        {/* Result display */}
        <ResultDisplay
          teamName={teamName}
          selectedCard={selectedCard}
          selectedCardName={selectedCardName}
          visible={showResult}
        />
      </div>

      {/* Bottom decorative line */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </div>
  );
};

export default Index;
