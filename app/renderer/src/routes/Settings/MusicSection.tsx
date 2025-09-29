import React from "react";
import { MusicPlayer } from "components";
import SettingSection from "./SettingSection";

const MusicSection: React.FC = () => {
  return (
    <SettingSection heading="Background Music">
      <MusicPlayer />
    </SettingSection>
  );
};

export default MusicSection;