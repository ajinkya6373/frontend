
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
    Button
} from './style/post'
import { useUserAuth, useUserData } from '../../context';
import { useState, useEffect, useRef } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'timeago.js';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useUserAction } from '../../hooks';
import PostModal from '../postModal';
import { cloudinaryBaseUrl } from '../../utils/utils';


export default function Post({ post }) {
    const {
        userProfile,
    } = useUserAuth();
    const [likes, setLikes] = useState(post.likes.length)
    const [isliked, setIsLiked] = useState(false);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false)
    const [isBookMarked, setBookMarked] = useState(false);
    const [editDesc, setEditDesc] = useState(""); 
    const { userData: { bookMark } } = useUserData();
    const updateDes = useRef()
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const {
        deletePost,
        updatePost,
        LikeDislikePost,
        addBookMark
    } = useUserAction()

    useEffect(() => {
        setIsLiked(post.likes.includes(userProfile._id))
    }, [post.likes.length, userProfile._id,post.likes])
    useEffect(() => {
        setBookMarked(bookMark.find(item => item?._id === post._id));
    }, [bookMark,post])

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
    }
    useEffect(() => {
        setLikes(post.likes.length);
      }, [post.likes.length]);

    const deletePosthandler = () => {
        deletePost(post._id);
    }

    const updateHandler = () => {
        const updatedPostData = {
          postId: post._id,
          desc: editDesc,
        };
        updatePost(updatedPostData);
        setEdit(false);

      };
    const bookMarkHandler = (postId) => {
        addBookMark(postId)
    }
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
                    <PostTopRight >
                        {userProfile._id === post.userId._id && <MoreVertIcon />}
                        <DropDown>
                            <Container >
                                <OptionList onClick={() => setEdit(!edit)}>
                                    < EditIcon htmlColor="blue" style={{ marginRight: "3px" }} />
                                    <Text>Edit</Text>
                                </OptionList>
                                <OptionList onClick={deletePosthandler}>
                                    <DeleteIcon htmlColor="red" />
                                    <Text >delete</Text>
                                </OptionList>
                            </Container>
                        </DropDown>
                    </PostTopRight>
                    {edit && <UpdateContainer>
                        <Input 
                            type="string" 
                            placeholder="Edit Caption" 
                            ref={updateDes} 
                            defaultValue={post?.desc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            />
                        <Button onClick={updateHandler} >Submit</Button>
                    </UpdateContainer>}
                </PostTop>
                <PostCenter>
                    <Description>{post?.desc}</Description>
                    <PostImage src={`${cloudinaryBaseUrl}${post.img.public_id}`} 
                    loading="lazy" 
                    onClick={() => setOpen(true)} />
                </PostCenter>
                <PostBottom>
                    <PostBottomLeft>
                        {isliked ? <FavoriteIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={() => likeHandler()} />
                            : <FavoriteBorderIcon
                                sx={{ cursor: "pointer" }}
                                onClick={() => likeHandler()} />}
                        <PostLikeCounter>{likes} people like it</PostLikeCounter>
                        <ModeCommentOutlinedIcon onClick={() => setOpen(true)} sx={{ cursor: "pointer" }}/>
                    </PostBottomLeft>
                    <PostBottomRight>
                        {isBookMarked
                            ? <BookmarkOutlinedIcon onClick={() => bookMarkHandler(post._id)} />
                            : <BookmarkBorderIcon onClick={() => bookMarkHandler(post._id)} />}
                    </PostBottomRight>
                </PostBottom>
            </Wrapper>
            {open &&
                <PostModal
                    post={post}
                    handleClose={handleClose}
                    open={handleOpen} />
                    }
        </PostContainer>

    )
}
