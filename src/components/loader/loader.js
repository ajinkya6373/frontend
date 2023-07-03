import styled, { keyframes } from "styled-components/macro";

export const Container = styled.div`
padding: 30px;
width: 100%;
height: 100%;
position: fixed;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 999999999999999;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #8255d6; /* Purple */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-bottom: 4px;
  animation: ${spin} 2s linear infinite;
`;

