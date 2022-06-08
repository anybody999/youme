import styled from "styled-components";

export const StyledWatchAnthology = styled.div`
  margin-top: 20px;
  margin-right: -10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 38vh;
  overflow-y: auto;
  button {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: var(--black);
  }
  button.is-active {
    background-color: var(--primary-color);
    color: var(--white);
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 6px;
  }
`;