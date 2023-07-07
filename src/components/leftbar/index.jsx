import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserAuth } from "../../context";
import { useAuth } from "../../hooks";
import { LeftbarLink, LeftbarWrapper } from "./leftbar";
import { useEffect, useState } from "react";

export default function Leftbar() {
  const navigate = useNavigate();
  const { userProfile } = useUserAuth();
  const { logUserOut } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    setSelectedItem(currentPath);
  }, [location.pathname]);

  const handleLinkClick = (link) => {
    navigate(link);
    setSelectedItem(link);
  };

  return (
    <LeftbarWrapper>
      <LeftbarLink
        onClick={() => handleLinkClick("/")}
        className={selectedItem === "/" ? "selected" : ""}
      >
        <HomeIcon />
      <span> Home</span>  
      </LeftbarLink>
      <LeftbarLink
        onClick={() => handleLinkClick("/explore")}
        className={selectedItem === "/explore" ? "selected" : ""}
      >
        <ExploreIcon />
       <span> Explore </span> 
      </LeftbarLink>
      <LeftbarLink
        onClick={() => handleLinkClick("/bookmark")}
        className={selectedItem === "/bookmark" ? "selected" : ""}
      >
        <BookmarkIcon />
       <span>Bookmark</span> 
      </LeftbarLink>
      <LeftbarLink
        onClick={() => handleLinkClick(`/profile/${userProfile._id}`)}
        className={selectedItem === `/profile/${userProfile._id}` ? "selected" : ""}
      >
        <PersonIcon />
       <span>Profile</span> 
      </LeftbarLink>
      <LeftbarLink onClick={logUserOut}>
        <LogoutIcon />
       <span>Log Out</span> 
      </LeftbarLink>
    </LeftbarWrapper>
  );
}
