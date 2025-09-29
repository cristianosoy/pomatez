import styled from "styled-components/macro";
import { themes } from "styles/themes";

export const StyledMusicWidget = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  
  border-radius: 6px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  
  overflow: hidden;
`;

export const StyledMusicWidgetButton = styled.button<{ isExpanded?: boolean }>`
  width: 100%;
  height: 3.6rem;
  padding: 0.8rem 1.2rem;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-body-text);
  
  border: none;
  background-color: transparent;
  
  transition: ${themes.transition};
  
  &:hover {
    color: var(--color-primary);
    background-color: var(--color-border-primary);
  }
  
  svg {
    width: 1.4rem;
    height: 1.4rem;
    fill: currentColor;
  }
`;

export const StyledMusicWidgetPlayer = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--color-border-primary);
  background-color: var(--color-bg-tertiary);
`;