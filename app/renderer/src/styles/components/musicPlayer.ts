import styled from "styled-components/macro";
import { themes } from "styles/themes";

export const StyledMusicPlayer = styled.div`
  width: 100%;
  padding: 1.6rem;
  margin-bottom: 2rem;
  
  border-radius: 8px;
  border: 1px solid var(--color-border-primary);
  background-color: var(--color-bg-secondary);
  
  display: grid;
  gap: 1.2rem;
`;

export const StyledMusicPlayerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h4 {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-heading-text);
  }
`;

export const StyledMusicPlayerToggle = styled.input`
  width: 2.6rem;
  height: 3.2rem;
  appearance: none;
  position: relative;
  transition: opacity 0.15s;

  &::before,
  &::after {
    content: "";
    position: absolute;
  }

  &::before {
    top: 50%;
    left: 50%;
    width: 2.4rem;
    height: 1.2rem;
    border-radius: 10rem;
    background-color: var(--color-border-primary);
    transform: translate(-50%, -50%);
    transition: ${themes.transition} 40ms;
  }

  &::after {
    top: 50%;
    left: 0;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 10rem;
    border: 0.1rem solid var(--color-primary);
    background-color: var(--color-bg-slider-thumb);
    box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);
    transform: translateY(-50%);
    cursor: pointer;
    transition: ${themes.transition};
  }

  &:hover::after,
  &:focus::after {
    box-shadow: 0 0 0 0.4rem rgba(var(--color-primary-rgb), 0.16);
  }

  &:checked::before {
    background-color: var(--color-primary);
  }

  &:checked::after {
    left: calc(100% - 1.4rem);
  }
`;

export const StyledMusicPlayerControls = styled.div`
  display: grid;
  gap: 1rem;
  
  form {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.8rem;
    align-items: center;
    
    button {
      height: 3.6rem;
      padding: 0.6rem 1.2rem;
      
      display: flex;
      align-items: center;
      gap: 0.4rem;
      
      font-weight: 500;
      color: var(--color-primary-button);
      
      border: none;
      border-radius: 3px;
      background-color: var(--color-primary);
      
      transition: ${themes.transition};
      
      &:hover {
        opacity: 0.9;
      }
      
      svg {
        width: 1.2rem;
        height: 1.2rem;
        fill: currentColor;
      }
    }
  }
`;

export const StyledMusicPlayerInput = styled.input<{ isValid?: boolean }>`
  width: 100%;
  height: 3.6rem;
  padding: 0.5rem 1rem;
  
  color: var(--color-heading-text);
  
  border-radius: 3px;
  border: 1px solid ${props => 
    props.isValid === false 
      ? "var(--color-pink)" 
      : "var(--color-border-primary)"
  };
  background-color: var(--color-bg-input);
  box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);
  
  transition: ${themes.transition};
  
  &::placeholder {
    color: var(--color-disabled-text);
  }
  
  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 0.2rem rgba(var(--color-primary-rgb), 0.16);
  }
`;

export const StyledMusicPlayerVolume = styled.div`
  display: grid;
  gap: 0.8rem;
  
  span {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--color-body-text);
  }
`;