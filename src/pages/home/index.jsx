import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BottomNavigation,
  Leftbar,
  Post,
  SearchContainer,
  SharePost,
  Topbar,
} from "../../components";
import {
  Feed,
  LeftbarWrraper,
  NoPostImage,
  PageWrapper,
  RightBar,
  SelectContainer,
  SortingBox,
  SuggestionsBox,
} from "./home.js";
import TuneIcon from "@mui/icons-material/Tune";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { axiosInstance } from "../../utils/utils";
import { useUserAuth, useUserData } from "../../context";

export default function HomePage() {
  const [showOption, setShowOption] = useState(false);
  const [sortOption, setSortOption] = useState("trending");
  const [explorePosts, setExplorePosts] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const optionsContainerRef = useRef(null);
  const iconRef = useRef(null);
  const {
    userData: { timeLine, bookMark },
  } = useUserData();
  const { userProfile } = useUserAuth();
  const location = useLocation();
  useEffect(() => {
    const fetchAllPosts = async () => {
      const { data } = await axiosInstance.get(`/posts`);
      setExplorePosts(data);
    };
    fetchAllPosts();
  }, []);

  useEffect(() => {
    const fetchSuggestion = async () => {
      const { data } = await axiosInstance.get(
        `/users/suggestions/${userProfile._id}`
      );
      setSuggestion(data);
    };
    fetchSuggestion();
  }, []);
  const sortPosts = (posts) => {
    let sortedPosts = [...posts];
    switch (sortOption) {
      case "trending":
        sortedPosts.sort((a, b) => b.likes?.length - a.likes?.length);
        break;
      case "oldest":
        sortedPosts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "latest":
        sortedPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
        break;
    }
    return sortedPosts;
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const handleOutsideClick = (event) => {
    if (
      optionsContainerRef.current &&
      !optionsContainerRef.current.contains(event.target) &&
      !iconRef.current.contains(event.target)
    ) {
      setShowOption(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const determinePostsToShow = () => {
    switch (location.pathname) {
      case "/explore":
        return explorePosts;
      case "/bookmark":
        return bookMark;
      default:
        return timeLine;
    }
  };
  const postsToShow = determinePostsToShow();
  const sortedPosts = sortPosts(postsToShow);
  return (
    <div>
      <Topbar />
      <PageWrapper>
        <LeftbarWrraper>
          <Leftbar />
        </LeftbarWrraper>
        <Feed>
          <SharePost />
          <SortingBox>
            <span>
              {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
            </span>
            <TuneIcon
              onClick={() => setShowOption(!showOption)}
              ref={iconRef}
            />
            {showOption && (
              <SelectContainer ref={optionsContainerRef}>
                <div
                  className={sortOption === "trending" ? "selected" : ""}
                  onClick={() => handleSortOptionChange("trending")}
                >
                  <TrendingUpIcon /> Trending
                </div>
                <div
                  className={sortOption === "latest" ? "selected" : ""}
                  onClick={() => handleSortOptionChange("latest")}
                >
                  <ArrowDropUpIcon /> Latest
                </div>
                <div
                  className={sortOption === "oldest" ? "selected" : ""}
                  onClick={() => handleSortOptionChange("oldest")}
                >
                  <ArrowDropDownIcon /> Oldest
                </div>
              </SelectContainer>
            )}
          </SortingBox>
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post, index) => (
              <Post
                key={post._id}
                post={post}
                islastPost={sortedPosts.length - 1 === index}
              />
            ))
          ) : (
            <NoPostImage src="/assets/noPosts.jpg" alt="no posts" />
          )}
        </Feed>
        <RightBar>
          <SuggestionsBox>
            <span>Suggested Users</span>
            <div>
              {suggestion.map((i) => (
                <SearchContainer
                  key={i._id}
                  searchData={i}
                  suggestionsBox={"true"}
                />
              ))}
            </div>
          </SuggestionsBox>
        </RightBar>
      </PageWrapper>
      <BottomNavigation/>
    </div>
  );
}
