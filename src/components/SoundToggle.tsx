import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ enabled, onToggle }: SoundToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "fixed top-4 right-4 p-3 rounded-full glass-card border transition-all duration-300",
        enabled 
          ? "border-primary neon-border text-primary" 
          : "border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground/50"
      )}
      aria-label={enabled ? "Mute sounds" : "Enable sounds"}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </button>
  );
};

export default SoundToggle;
