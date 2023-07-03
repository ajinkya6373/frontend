import { useState, useEffect, useRef } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import {
  PostContainer,
  Wrapper,
  PostTop,
  PostTopLeft,
  UserProfile,
  UserName,
  DateOfPost,
  PostTopRight,
  PostCenter,
  Description,
  PostImage,
  PostBottom,
  PostBottomLeft,
  PostLikeCounter,
  PostBottomRight,
  DropDown,
  Container,
  OptionList,
  Text,
  UpdateContainer,
  Input,
  Button,
} from './style/post';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import {  useUserAuth, useUserData } from '../../context';
import PostModal from '../postModal';
import { cloudinaryBaseUrl } from '../../utils/utils';
import { useUserAction } from '../../hooks';

export default function Post({ post }) {
  const { userProfile } = useUserAuth();
  const { userData: { bookMark } } = useUserData();
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [editDesc, setEditDesc] = useState('');
  const updateDes = useRef();
  const {
    deletePost,
    updatePost,
    likeDislikePost,
    addBookmark,
  } = useUserAction();

  useEffect(() => {
    setIsLiked(post.likes.includes(userProfile._id));
  }, [post.likes, userProfile._id]);

  useEffect(() => {
    setIsBookmarked(bookMark.find(item => item?._id === post._id));
  }, [bookMark, post]);

  const likeHandler = async () => {
    const { success } = await likeDislikePost(post._id);
    if (success) {
      setIsLiked(!isLiked);
      if (isLiked) {
        post.likes = post.likes.filter(id => id !== userProfile._id);
      } else {
        post.likes.push(userProfile._id);
      }
    }
  };

  useEffect(() => {
    setLikes(post.likes.length);
  }, [post.likes.length]);

  const deletePostHandler = () => {
    deletePost(post._id);
  };

  const updateHandler = () => {
    const updatedPostData = {
      postId: post._id,
      desc: editDesc,
    };
    updatePost(updatedPostData);
    setIsEdit(false);
  };

  const bookmarkHandler = (postId) => {
    addBookmark(postId);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <PostContainer>
      <Wrapper>
        <PostTop>
          <PostTopLeft>
            <Link to={`/profile/${post.userId?._id}`}>
              <UserProfile src={post.userId?.profilePicture?.url} />
            </Link>
            <UserName>{post.userId?.username}</UserName>
            <DateOfPost>{format(post.createdAt)}</DateOfPost>
          </PostTopLeft>
          <PostTopRight>
            {userProfile._id === post.userId._id && <MoreVertIcon />}
            <DropDown>
              <Container>
                <OptionList onClick={() => setIsEdit(!isEdit)}>
                  <EditIcon htmlColor="blue" style={{ marginRight: '3px' }} />
                  <Text>Edit</Text>
                </OptionList>
                <OptionList onClick={deletePostHandler}>
                  <DeleteIcon htmlColor="red" />
                  <Text>delete</Text>
                </OptionList>
              </Container>
            </DropDown>
          </PostTopRight>
          {isEdit && (
            <UpdateContainer>
              <Input
                type="string"
                placeholder="Edit Caption"
                ref={updateDes}
                defaultValue={post?.desc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
              <Button onClick={updateHandler}>Submit</Button>
            </UpdateContainer>
          )}
        </PostTop>
        <PostCenter>
          <Description>{post?.desc}</Description>
          <PostImage
            src={`${cloudinaryBaseUrl}${post.img.public_id}`}
            loading="lazy"
            onClick={openModal}
          />
        </PostCenter>
        <PostBottom>
          <PostBottomLeft>
            {isLiked ? (
              <FavoriteIcon
                sx={{ color: 'red', cursor: 'pointer' }}
                onClick={likeHandler}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{ cursor: 'pointer' }}
                onClick={likeHandler}
              />
            )}
            <PostLikeCounter>{likes} people like it</PostLikeCounter>
            <ModeCommentOutlinedIcon
              onClick={openModal}
              sx={{ cursor: 'pointer' }}
            />
          </PostBottomLeft>
          <PostBottomRight>
            {isBookmarked ? (
              <BookmarkOutlinedIcon onClick={() => bookmarkHandler(post._id)} />
            ) : (
              <BookmarkBorderIcon onClick={() => bookmarkHandler(post._id)} />
            )}
          </PostBottomRight>
        </PostBottom>
      </Wrapper>
      {isOpen && (
        <PostModal post={post} handleClose={closeModal} open={openModal} />
      )}
    </PostContainer>
  );
}
