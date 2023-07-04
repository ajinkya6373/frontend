import styled from "styled-components/macro";

export const PostContainer = styled.div`
    width: 100%;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    margin: 30px 0;
    position:relative;
    background: var(--secondary-bg);
    border-radius: var(--border-radius);
`
export const Wrapper = styled.div`
    padding: 10px;

`
export const PostTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const PostTopLeft = styled.div`
    display: flex;
    align-items: center;
`
export const UserProfile = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
`
export const UserName = styled.span`
    font-size: 15px;
    font-weight: 500;
    margin: 0 10px;

`
export const DateOfPost = styled.span`
    font-size: 12px;
    color: var(--secondary-text);
`

export const PostTopRight = styled.span`
    cursor:pointer;
`
export const DropDown = styled.div`
    position:absolute;
    right:30px;
    top:30px;
    display:none;
    border-radius:5px;
    -webkit-box-shadow: 1px 1px 11px 3px rgba(0,0,0,0.1);
    -moz-box-shadow: 1px 1px 11px 3px rgba(0,0,0,0.1);
    box-shadow: 1px 1px 11px 3px rgba(0,0,0,0.1);
    ${PostTopRight}:hover & {
        display:block;
    }
`

export const PostCenter = styled.div`
margin: 20px 0;
`
export const Description = styled.span``
export const PostImage = styled.img`
margin-top: 20px;
width: 100%;
max-height: 500px;
object-fit: contain;
cursor: pointer;

`
export const PostBottom = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
export const PostBottomLeft = styled.div`
display: flex;
align-items: center;  
svg{
    color: var(--icon-secondary);
}
svg:nth-child(3) {
    color: var(--icon-primary);
  }
`
export const LikeIcon = styled.img`
width: 24px;
height: 24px;
margin-right: 5px;
cursor: pointer;
`
export const PostLikeCounter = styled.span`
font-size: 15px;
color: var(--secondary-text);
margin: 0 12px;
`
export const PostBottomRight = styled.div`
svg{
    color: var(--icon-tertiary);
}
`
export const PostComments = styled.span`
cursor: pointer;
border-bottom: 1px dashed gray;
font-size: 15px;
`
export const Container = styled.div`
display:flex;
flex-direction:column;
justify-content: center;
padding:10px 10px;
background: var(--primary-bg);
border-radius: var(--border-radius);
`
export const OptionList = styled.div`
display : flex;
padding:2px 3px;
cursor:pointer;
&:hover{
    opacity:0.7;
}
`
export const Text = styled.div`
    margin-left: 4px;
`
export const UpdateContainer = styled.div`
position: absolute;
top: 56px;
width: 80%;
left: 10px;

`
export const Input = styled.input`
height: 30px;
width:80%;
padding: 5px 10px;
outline: none;
border: none;
border-bottom: 2px solid black;

`
export const Button = styled.button`
    background-color: green;
    color: white;
    padding: 7px 8px;
    margin-left: 5px;
    border: none;
    border-radius: 5px;
    font-weight: 500;

`