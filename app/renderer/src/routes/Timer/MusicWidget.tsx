import React, { useState } from "react";
import { useAppSelector } from "hooks/storeHooks";
import { TimerStatus } from "store/timer/types";
import {
  StyledMusicWidget,
  StyledMusicWidgetButton,
  StyledMusicWidgetPlayer,
} from "styles";
import { SVG } from "components";

const MusicWidget: React.FC = () => {
  const settings = useAppSelector((state) => state.settings);
  const timer = useAppSelector((state) => state.timer);
  const [isExpanded, setIsExpanded] = useState(false);

  // Only show during focus time and when music is enabled
  if (!settings.musicEnabled || 
      !settings.currentMusicUrl || 
      timer.timerType !== TimerStatus.STAY_FOCUS) {
    return null;
  }

  return (
    <StyledMusicWidget>
      <StyledMusicWidgetButton 
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
      >
        <SVG name="volume-on" />
        {isExpanded ? "Hide Music" : "Show Music"}
      </StyledMusicWidgetButton>
      
      {isExpanded && (
        <StyledMusicWidgetPlayer>
          <iframe
            src={settings.currentMusicUrl}
            title="Background Music"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: "100%",
              height: "120px",
              border: "none",
              borderRadius: "4px"
            }}
          />
        </StyledMusicWidgetPlayer>
      )}
    </StyledMusicWidget>
  );
};

export default React.memo(MusicWidget);