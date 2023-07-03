import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserAuth } from "../../context";
import { useAuth } from "../../hooks";
const LeftbarWrapper = styled.div`
  position: sticky;
  top: 60px;
`;

const LeftbarLink = styled.p`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  color: #000;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function Leftbar() {
  const navigate = useNavigate();
  const {userProfile}=useUserAuth()
  const { logUserOut } = useAuth()

  return (
    <LeftbarWrapper>
      <LeftbarLink onClick={() => navigate("/")}>
        <HomeIcon /> Home
      </LeftbarLink>
      <LeftbarLink onClick={() => navigate("/explore")}>
        <ExploreIcon /> Explore
      </LeftbarLink>
      <LeftbarLink onClick={() => navigate("/bookmark")}>
        <BookmarkIcon /> Bookmark
      </LeftbarLink>
      <LeftbarLink onClick={() => navigate(`/profile/${userProfile._id}`)}>
        <PersonIcon /> Profile</LeftbarLink>
      <LeftbarLink onClick={()=>logUserOut()}>
        <LogoutIcon /> Log Out</LeftbarLink>
    </LeftbarWrapper>
  );
}
