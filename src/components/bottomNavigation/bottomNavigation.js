import { styled } from "styled-components/macro";

export const Wrapper = styled.div`
display:none;
@media (max-width: 767px) {
  display:block;
  position: fixed;
z-index: 9999999;
bottom: 0;
width: 100%;
background: var(--secondary-bg);

}
`
