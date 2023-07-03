
import { useState } from "react";
import {
    Wrapper,
    BoxLeft,
    Image,
    BoxRight,
    RightTop,
    Name,
    CommentText,
    RightBottom,
    Reply,
    View,
    Option,
    DeleteBox,
    Dltitem

} from "./style/comentBox";
import { CommentBox as ReplyComment, ModalCustom } from "../../components"
import CircularProgress from '@mui/material/CircularProgress';
import { format } from 'timeago.js';
import Divider from '@mui/material/Divider';
import { useUserAuth } from "../../context";
import { useUserAction } from "../../hooks";


export default function CommentBox({ data, setReplyToComment, replyComment, hideBottom, postId, setDeletedCommentId, setDeletedReply }) {
    const { userProfile } = useUserAuth();
    const [open, setOpen] = useState(false);
    const [replyBox, setReplyBox] = useState(false);
    const [loader, setLoder] = useState(true);
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const { deleteComment, deleteReply } = useUserAction()
    const reply = () => {
        setReplyToComment(data);
    }
    const clickHandler = () => {
        setTimeout(() => {
            setLoder(false);
        }, 1000);
        setReplyBox(() => !replyBox);
    }
    const weeksBetween = () => {
        let d2 = new Date();
        let d1 = new Date(data?.createdAt);
        return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }

    const deleteCommenthandler = async () => {
        if (!replyComment) {
            const { data: { success } } = await deleteComment(postId, data._id)
            if (success) {
                setOpen(false)
                setDeletedCommentId(data._id)
            }
        } else {
            const { data: { success } } = await deleteReply(postId, data.parentId, data._id)
            if (success) {
                setDeletedReply(data)
            }
        }
    }
    let date = weeksBetween() > 0 ? weeksBetween() + "W" : format(data?.createdAt);
    const commentText = hideBottom ? `${data?.text.slice(0, 25)}...` : data?.text;
    return (
        <>
            {<Wrapper>
                <BoxLeft>
                    <Image src={data.userId?.profilePicture.url} />
                </BoxLeft>
                <BoxRight>
                    <RightTop>
                        <Name>{data.userId.username}</Name>
                        <CommentText>{commentText}</CommentText>
                    </RightTop>
                    {!hideBottom && <RightBottom >
                        {!replyComment && <Reply onClick={reply}>Reply</Reply>}
                        <Option style={{ margin: "0px 0px 0px 0.4rem" }}>{date}</Option>
                        {data?.userId._id === userProfile?._id && <Option onClick={handleOpen}>...</Option>}
                    </RightBottom>}
                </BoxRight>
            </Wrapper>

            }
            {<ModalCustom
                open={open}
                onClose={handleClose}>
                <DeleteBox style={{ border: "none", }}>
                    <Dltitem delete={"delete"} onClick={deleteCommenthandler}>Delete</Dltitem>
                    <Divider />
                    <Dltitem onClick={handleClose}>Cancel</Dltitem>
                </DeleteBox>

            </ModalCustom>}
            {data?.replies?.length > 0 &&
                <View>
                    <Divider onClick={clickHandler}> {replyBox ? "hide replies" : 'view replies'}</Divider>
                </View>
            }

            {replyBox && <div>
                {loader
                    ? < CircularProgress style={{ margin: "0px 0px  0px 25px" }} color="inherit" size={20} />
                    : data.replies.map((c) => {
                        return <div style={{ margin: "0px 0px  0px 15px" }}>
                            <ReplyComment
                                data={c}
                                replyComment={true}
                                postId={postId}
                                setDeletedCommentId={setDeletedCommentId}
                                setDeletedReply={setDeletedReply}
                            />
                        </div>
                    })}
            </div>
            }
        </>
    )
}