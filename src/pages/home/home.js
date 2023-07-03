import styled from "styled-components/macro";

export const PageWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 80%;
`;
export const LeftbarWrraper =styled.div`
flex: 1;

`
export const RightBar = styled.div`
  flex: 1;
`;
export const SuggestionsBox = styled.div`
position: sticky;
top: 53px; 
z-index: 1; 
padding: 1rem;

`
export const Feed = styled.div`
  flex: 2;
`;


export const SortingBox = styled.div`
  text-align: center;
  position: relative;
  margin-top: 13px;

  >span {
    text-align: center;
    margin-top: 18px;
  }
  >svg {
    right: 0;
    position: absolute;
    cursor: pointer;

  }
`;


export const SelectContainer = styled.div`
  position: absolute;
  right: 0px;
  background: #ffffff;
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  z-index: 99;
  padding: 1rem;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    &.selected {
      color: blue;
      
    }
  }
`;
