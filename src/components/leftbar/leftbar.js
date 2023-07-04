import styled from 'styled-components/macro';


export const LeftbarWrapper = styled.div`
  position: sticky;
  top: 60px;
`;

export const LeftbarLink = styled.p`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  color: var(--primary-text);
//   transition: background-color 0.3s ease;
  width: 40%;
  border-radius: 50px;
  align-items: center;
  &:hover {
    background: var(--secondary-bg);
  }
  &.selected {
    background: var(--secondary-bg);
  }
`;