import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
`;

export const Image = styled.img`
  flex: 5;
  max-width: 65%;  
  height: 394px;
  background-color: var(--secondary-bg);
  object-fit: contain;

  @media (max-width: 768px) {
    max-width: 12rem;
  }
`;

export const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  margin-left: 12px;
  min-width: 224px;


`;

export const SubText = styled.div`
  font-size: 12px;
  font-weight: 450;
  color: var(--secondary-text);
`;

export const Text = styled.div`
  /* styles for the main text */
`;

export const Divider = styled.div`
  flex: 4;
  font-weight: 400;
  font-size: 12px;
  overflow: scroll;
`;

export const DescBottom = styled.div`
  flex: 0;
  position: relative;
  
`;
export const ReplayToCommentBox = styled.div`
position: absolute;
z-index: 115;
width: 100%;
background: #151c25;
height: 79%;
top: -36px;
padding: 5px 0px 3px 5px;
color: white;
border-radius: 10px;
transition: height 0.3s ease; /* Add transition property for smooth height transition */
svg{
  position: absolute;
  top: 0;
  cursor:pointer;
}
p{
  padding: 0px;
  margin: 0px;
  text-align: center;
  font-size: 11px;
}
`

export const LikesContainer = styled.div`
  display: flex;
`;

export const LikeIcon = styled.span`
  color: ${({ isLiked }) => (isLiked ? "red" : "inherit")};
  cursor: pointer;
`;

export const LikeCount = styled.div`
  margin-left: 0.5rem;
`;

export const CommentInputContainer = styled.div`
  display: flex;
  margin-top: 5%;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

export const PostButton = styled.button`
  border: none;
  background:none;
  color: var(--primary-text);
  cursor: pointer;
`;

export const CommentBoxContainer = styled.div`
  overflow-y: scroll;
  max-height: 266px;
  padding: 1rem 0px;
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }
`;
export const CommentBox = styled.div`
  /* styles for the comment box */
`;

export const NoComments = styled.div`
  margin-top: 1rem;
  font-style: italic;
  color: #999;
`;

