import styled from 'styled-components/macro';

export const LeftbarWrapper = styled.div`
  position: sticky;
  top: 60px;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    justify-content: space-around;
  }
`;

export const LeftbarLink = styled.p`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  color: var(--primary-text);
  border-radius: 50px;
  align-items: center;
  width: 42%;
  &:hover {
    background: var(--secondary-bg);
  }

  &.selected {
    background: var(--secondary-bg);
  }

  @media (max-width: 617px) {
    width: unset;
    span{
      display:none;
    }

    &:hover {
      background: var(--primary-bg);
    }
  
    &.selected {
      background: var(--primary-bg);
    }
  }
`;
