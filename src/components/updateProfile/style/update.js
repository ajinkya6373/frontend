import styled from "styled-components/macro";

export const UpdateContainer = styled.div`
    display:flex;
    justify-content:center;
`
export const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    min-width:300px;

`
export const Profile = styled.label`
display: flex;
flex-direction: column;
align-items: center;
    > div{
          width: 100px;
          height: 100px;
          object-fit: contain;
    }


`

export const InputBox = styled.span`
display:flex;
>span{
    margin:0.5rem 0.5rem 0 0;
    cursor:pointer;
    >input{
        display: none;
        border:1px solid red;
    }

    &:hover{
        text-decoration:underline;
    }
}

`

export const Form = styled.form`
    margin-top:8px;
`
export const FormItem = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:8px;
`
export const Label = styled.label`
color: var(--secondary-text)
`
export const FormInput = styled.input`
    outline:none;
    border:none;
    border-bottom: 1px solid var(--primary-text);
    background: none;
    color: var(--primary-text);


`
export const Text = styled.h3`
    color:${props=> props.color || "#1877f2"}; 
    margin:2px 8px;
    diplay :flex;
    align-items:center;
    margin-top:${props=> props.color ? "5px": "10px"};
    justify-content:center;
`
export const PasswordContainer = styled.div`
    margin-top:10px;
    display:${props=>props.display ? "flex" : "none"};
    flex-direction:column;
    align-items:center;
    justify-content:center;
`
export const PasswordInput = styled.input`
    outline:none;
    padding:5px 6px;
    width:400px;
    border-radius:5px;
    margin-top:10px;
`
export const Button = styled.button`
    margin-top:10px;
    margin-bottom: 10px;
    border: none;
    background-color: var(--main-secondary);
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
`

export const AvatarContainer = styled.div`
>img{
    width:40px;
    cursor:pointer;
}


`