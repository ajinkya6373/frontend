import styled from "styled-components/macro";
export const Wrapper = styled.div`
min-width:150px;
@media (max-width: 767px) {
    display:none;
}

`
export const MobileScreenWrapper = styled.div`
display:none;
@media (max-width: 767px) {
    display:block;
    width: 88%;
    position: relative;
    padding: 1rem 0;
    > button{
        float:right;
    }
    span{
        margin-left: 8px;
        margin-bootom:0.5rem;
        a{
            color: var(--primary-text);
            &:hover{
                text-decoration: underline;
            }
        }
    }
}
`
export const Title = styled.h4`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
    a{
        text-decoration:none;
    }
`
export const Info = styled.div`
margin-bottom: 30px;
`
export const InfoItem = styled.div`
margin-bottom: 10px;
`
export const InfoKey = styled.span`
font-weight: 500;
margin-right: 15px;
color: var(--secondary-text);
`
export const InfoValue = styled.span`
font-weight: 300
`
export const LogOutButton = styled.button`
display:flex;
align-items:center;
cursor: pointer;
background: none;
border: none;
color: var(--primary-text);
gap: 0.5rem;
font-size: 17px;
svg{
    color: var(--icon-tertiary);
}
`

