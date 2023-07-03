import React from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const StyledFollowButton = styled.button`
  margin-top: 30px;
  margin-bottom: 10px;
  border: none;
  background-color: #1872f2;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #146ac6;
    outline: none;
  }

  ${(suggestionsbox)=>{
    if (suggestionsbox) {
    return  `
      margin:0;
      background-color: #2a384b;      
      `
    }
  }}

`;


export default function FollowButton({ onClickHandler, isFollowing,suggestionsBox }) {
  return (
    <StyledFollowButton onClick={onClickHandler} suggestionsbox={suggestionsBox}>
      {isFollowing ? <RemoveIcon /> : <AddIcon />}
      {isFollowing ? "Unfollow" : "Follow"}
    </StyledFollowButton>
  );
}
