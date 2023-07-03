import styled,{css} from "styled-components/macro";
export const AuthWrapper = styled.div`
display:flex;
align-items:center;
justify-content:center;
background:gray;
height:100vh;

`

export const AuthForm = styled.form`
border:1px solid white;
padding: 2rem;
display:flex;
flex-direction:column;
background:white;
border-radius: 8px;
width: 20rem;

`
export const Label = styled.label`
// color: rgba(174, 165, 143, 0.5);
${({ required }) => {
    if (required) {
        return css`
    &::after {
        content: "*";
        color: red;
        position: absolute;

      }
    `
    }
}}
`
export const Logo= styled.h4`
text-align:center;

`
export const Heading = styled.h2`
text-align:center;
margin: 0;


`

export const AuthInput = styled.input`
border: 1px solid black;
border-radius: 0.25pc;
margin-bottom: 0.5rem;
padding: 0.5rem 0.5rem;
`

export const Button = styled.button`
  border-radius: 50px;
  padding: 0.5rem 0.75rem;
  background-color: #ff5f6d;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;

  &:hover {
    background-color: #e6424a;
  }
  ${({guest})=>{
    if(guest){
        return css `
        background-color: unset;
        color:black;
        border:1px solid black;
        margin-top: unset;
        &:hover {
            background-color: unset;
            opacity:0.6;
          }
        `
    }
  }}
`;

export const Subtext = styled.p`
  text-align: center;
  span{
    color:#ff5f6d;
    cursor:pointer;
  }
`;
export const Error = styled.span`
text-align: center;
color:red;
`

export const PasswordWrapper = styled.div`
position: relative;
input{
    width:94%;
}
svg{
    position: absolute;
    top: 42%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
}
`