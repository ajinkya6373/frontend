import { useEffect, useState } from "react";
import FollowButton from "../followButton";
import { Container, Img, Text } from "./style/search";
import { useUserAction } from "../../hooks";
import { useUserAuth } from "../../context";
import { useNavigate } from "react-router-dom";

export default function SearchContainer({ searchData, suggestionsBox }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { handleFollowUnfollow } = useUserAction();
  const { userProfile } = useUserAuth();

  useEffect(() => {
    setIsFollowing(searchData?.followers?.some(item => item._id === userProfile._id));
  }, [searchData, userProfile]);

  const followHandler = async (event) => {
    event.stopPropagation(); 
    handleFollowUnfollow(isFollowing, setIsFollowing, searchData._id);
  };

  const navigate = useNavigate();
  const handleContainerClick = () => {
    navigate(`/profile/${searchData._id}`);
  };

  return (
    <Container onClick={handleContainerClick}>
      <Img src={searchData.profilePicture.url || searchData.profilePicture} />
      <Text>{searchData.username}</Text>
      {suggestionsBox && (
        <FollowButton
        onClickHandler={(event) => followHandler(event)}          
        isFollowing={isFollowing}
          suggestionsBox={suggestionsBox}
        />
      )}
    </Container>
  );
}
