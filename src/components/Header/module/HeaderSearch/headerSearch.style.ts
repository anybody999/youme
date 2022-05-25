import styled from "styled-components";

export const StyledHeaderSearch = styled.div`
  position: relative;
  width: 350px;
  .header-searchbar {
    background-color: var(--white);
    border-radius: 30px;
    overflow: hidden;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-searchbar input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 0 20px;
    height: 100%;
    font-size: 1.5rem;
    min-height: 45px;
  }
  .header-searchbar .search-icon {
    padding: 0 12px;
    font-size: 2rem;
    cursor: pointer;
    color: var(--black);
    background-color: transparent;
  }
  .header-result {
    position: absolute;
    top: 110%;
    left: 0;
    right: 0;
    background-color: var(--dark-color);
    z-index: 25;
    border-radius: 8px;
    height: 400px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    &::-webkit-scrollbar-thumb {
      background-image: linear-gradient(-45deg, #6a5af9, #d66efd);
      border-radius: 50px;
    }
  }
  .header-result li {
    padding: 14px;
    transition: all 0.25s linear;
    a {
      color: var(--white);
    }
    &:hover {
      background-color: #666666;
    }
  }
  @media screen and (max-width: 1023.98px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 20;
    .header-searchbar {
      height: 45px;
    }
  }
`;
