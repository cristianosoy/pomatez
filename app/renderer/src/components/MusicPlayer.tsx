import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "hooks/storeHooks";
import { setMusicEnabled, setMusicVolume, setCurrentMusicUrl } from "store";
import {
  StyledMusicPlayer,
  StyledMusicPlayerHeader,
  StyledMusicPlayerControls,
  StyledMusicPlayerInput,
  StyledMusicPlayerVolume,
  StyledMusicPlayerToggle,
} from "styles";
import { SVG, RangeSlider } from "components";

const MusicPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  
  const [inputUrl, setInputUrl] = useState(settings.currentMusicUrl || "");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/live\/([^&\n?#]+)/,
      /youtube\.com\/channel\/([^&\n?#]+)\/live/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const validateAndSetUrl = useCallback((url: string) => {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&loop=1&playlist=${videoId}`;
      dispatch(setCurrentMusicUrl(embedUrl));
      setIsValidUrl(true);
      return embedUrl;
    }
    setIsValidUrl(false);
    return null;
  }, [dispatch]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndSetUrl(inputUrl);
  };

  const toggleMusic = () => {
    dispatch(setMusicEnabled(!settings.musicEnabled));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseInt(e.target.value);
    dispatch(setMusicVolume(volume));
    
    // Send volume change to iframe
    if (iframeRef.current && settings.currentMusicUrl) {
      iframeRef.current.contentWindow?.postMessage(
        `{"event":"command","func":"setVolume","args":[${volume}]}`,
        "*"
      );
    }
  };

  useEffect(() => {
    if (settings.currentMusicUrl) {
      setIsValidUrl(true);
    }
  }, [settings.currentMusicUrl]);

  return (
    <StyledMusicPlayer>
      <StyledMusicPlayerHeader>
        <h4>Background Music</h4>
        <StyledMusicPlayerToggle
          type="checkbox"
          checked={settings.musicEnabled}
          onChange={toggleMusic}
        />
      </StyledMusicPlayerHeader>

      {settings.musicEnabled && (
        <>
          <form onSubmit={handleUrlSubmit}>
            <StyledMusicPlayerInput
              type="url"
              placeholder="Paste YouTube live stream or video URL..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              isValid={isValidUrl}
            />
            <button type="submit">
              <SVG name="play" />
              Load Music
            </button>
          </form>

          {settings.currentMusicUrl && isValidUrl && (
            <>
              <StyledMusicPlayerVolume>
                <span>Volume: {settings.musicVolume}%</span>
                <RangeSlider
                  minValue={0}
                  maxValue={100}
                  value={settings.musicVolume}
                  onChange={handleVolumeChange}
                />
              </StyledMusicPlayerVolume>

              <iframe
                ref={iframeRef}
                src={settings.currentMusicUrl}
                title="Background Music"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "200px",
                  border: "none",
                  borderRadius: "4px",
                  marginTop: "1rem"
                }}
              />
            </>
          )}

          <div style={{ marginTop: "1rem", fontSize: "1.2rem", color: "var(--color-disabled-text)" }}>
            <p>💡 Consejo: Busca "lofi hip hop", "música de estudio", o "sonidos ambientales" en YouTube para música perfecta de concentración!</p>
            <p>🎵 Canales recomendados: "ChilledCow", "Lofi Girl", "Chillhop Music"</p>
          </div>
        </>
      )}
    </StyledMusicPlayer>
  );
};

export default React.memo(MusicPlayer);