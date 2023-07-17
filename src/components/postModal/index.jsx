import { Divider } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  CommentBoxContainer,
  CommentInputContainer,
  Desc,
  DescBottom,
  Image,
  LikeCount,
  LikesContainer,
  NoComments,
  PostButton,
  ReplayToCommentBox,
  SubText,
  Text,
  Wrapper,
} from "./postModal";
import { pink } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { CommentBox, ModalCustom } from "../../components";
import { useUserAuth } from "../../context";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useUserAction } from "../../hooks";
import CancelIcon from "@mui/icons-material/Cancel";
const PostModal = ({ open, handleClose, post }) => {
  const imageSrc = post.img?.url;
  const { userProfile } = useUserAuth();
  const [isliked, setIsLiked] = useState(false);
  const [replyToComment, setReplyToComment] = useState(null);
  const [deletedCommentId, setDeletedCommentId] = useState("");
  const [deletedReply, setDeletedReply] = useState(null);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const { getCommnets, addComment, addReplyToComment, LikeDislikePost } =
    useUserAction();
  const [likes, setLikes] = useState(post.likes.length);

  const commentListRef = useRef(null);
  useEffect(() => {
    if (commentListRef.current) {
      commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
    }
  }, [commentList]);

  useEffect(() => {
    if (deletedCommentId) {
      setCommentList(commentList.filter((c) => c._id !== deletedCommentId));
    }
  }, [deletedCommentId]);

  useEffect(() => {
    if (deletedReply) {
      setCommentList((prevCommentList) => {
        const updatedCommentList = prevCommentList.map((comment) => {
          if (comment._id === deletedReply.parentId) {
            const updatedReplies = comment.replies.filter(
              (reply) => reply._id !== deletedReply._id
            );
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });
        return updatedCommentList;
      });
    }
  }, [deletedReply]);

  useEffect(() => {
    setIsLiked(post.likes.includes(userProfile._id))
}, [post.likes.length, userProfile._id,post.likes])

  useEffect(() => {
    (async () => {
      const comments = await getCommnets(post?._id);
      setCommentList(comments);
    })();
  }, [post]);

  const commentHandler = async () => {
    if (!comment || comment.length === 0) {
      return;
    }
    let commentItem = {
      text: comment,
      userId: userProfile._id,
    };

    try {
      if (!replyToComment) {
        const savedComment = await addComment(post._id, commentItem);
        const formattedComment = {
          ...savedComment,
          userId: {
            profilePicture: { url: userProfile.profilePicture },
            username: userProfile.username,
            _id: userProfile._id,
          },
        };

        setCommentList((prev) => {
          const updatedCommentList = prev
            ? [...prev, formattedComment]
            : [formattedComment];
          return updatedCommentList;
        });
      } else {
        commentItem = { ...commentItem, parentId: replyToComment._id };
        const savedReply = await addReplyToComment(
          replyToComment._id,
          commentItem
        );
        const formattedReply = {
          ...savedReply,
          userId: {
            profilePicture: { url: userProfile.profilePicture },
            username: userProfile.username,
            _id: userProfile._id,
          },
        };

        const updatedCommentList = commentList.map((c) =>
          c._id === replyToComment._id
            ? { ...c, replies: [...c.replies, formattedReply] }
            : c
        );

        setCommentList(updatedCommentList);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setComment("");
      setReplyToComment("");
    }
  };

  const likeHandler = async () => {
    const { success } = await LikeDislikePost(post._id);
    if (success) {
      setIsLiked(!isliked);
      if (isliked) {
        post.likes = post.likes.filter((id) => id !== userProfile._id);
      } else {
        post.likes.push(userProfile._id);
      }
    }
  };
  useEffect(() => {
    setLikes(post.likes.length);
  }, [post.likes.length]);
  return (
    <ModalCustom
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <Image src={imageSrc} />
        <Desc>
          <div>
            <Text>{post?.desc}</Text>
            <SubText>{format(post.createdAt)}</SubText>
          </div>
          <Text>
            <Divider />
            <CommentBoxContainer ref={commentListRef}>
              {commentList?.length > 0 ? (
                commentList?.map((c) => (
                  <CommentBox
                    data={c}
                    setReplyToComment={setReplyToComment}
                    key={c._id}
                    postId={post._id}
                    setDeletedCommentId={setDeletedCommentId}
                    setDeletedReply={setDeletedReply}
                  />
                ))
              ) : (
                <NoComments>no comments</NoComments>
              )}
            </CommentBoxContainer>
          </Text>
          <Divider />
          <DescBottom>
            <LikesContainer>
              {isliked ? (
                <FavoriteIcon
                  sx={{ color: pink[500], cursor: "pointer" }}
                  onClick={() => likeHandler()}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => likeHandler()}
                />
              )}
              <LikeCount>{likes} like this post</LikeCount>
            </LikesContainer>
            <CommentInputContainer>
              {replyToComment && (
                <ReplayToCommentBox>
                  <p>Replying to ...</p>
                  <CommentBox
                    data={replyToComment}
                    replaybox={true}
                    hideBottom={true}
                    postId={post._id}
                  />
                  <CancelIcon
                    sx={{ position: "absolute", right: "0" }}
                    onClick={() => setReplyToComment("")}
                  />
                </ReplayToCommentBox>
              )}
              <InputEmoji
                placeholder="add a comment"
                onChange={setComment}
                cleanOnEnter
                onEnter={commentHandler}
              />
              <PostButton onClick={commentHandler}>post</PostButton>
            </CommentInputContainer>
          </DescBottom>
        </Desc>
      </Wrapper>
    </ModalCustom>
  );
};

export default PostModal;
