import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { PostModal } from "..";
import { axiosInstance } from "../../utils/utils";
import { useUserData } from "../../context";

export default function StandardImageList({ userId,isloggedInUser }) {
  const {userData:{userPosts}}= useUserData();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (userId && !isloggedInUser) {
          const response = await axiosInstance.get(`/posts/profile/${userId}`);
          setPosts(response.data);
        }else{
          setPosts(userPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId,userPosts]);

  return (
    <>
      <ImageList sx={{ maxWidth: 800, paddingTop: 2 }} cols={3} gap={20}>
        {posts.length > 0 ? (
          posts.map((item) => (
            <ImageListItem
              key={item._id}
              style={{ position: "relative", boxShadow: "0px 0px 16px -8px rgb(0 0 0 / 68%)" }}
              onClick={() => setPost(item)}
            >
              <img
                className="Image"
                src={`${item.img.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.desc}
                loading="lazy"
                onClick={handleOpen}
              />
            </ImageListItem>
          ))
        ) : (
          <div>
            <img
              className="NoPostsImage"
              src="/assets/noPosts.jpg" 
              alt="No Posts"
            />
          </div>
        )}
      </ImageList>
      {open && <PostModal post={post} handleClose={handleClose} open={handleOpen} />}
    </>
  );
}
