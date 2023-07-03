import { useUserAuth, useUserData } from "../context";
import { axiosInstance } from "../utils/utils";
import { toast } from "react-hot-toast";
export const useUserAction = () => {
  const { userDispatch } = useUserData();
  const {
    userProfile,
    setLoading,
  } = useUserAuth();
  const fetchUserById = async (userId) => {
    try {
      setLoading(true);
      return await axiosInstance.get(`/users?userId=${userId}`)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);

    }
  }
  const addPost = async (data) => {
    try {
      setLoading(true)
      const { data: { success, message, post } } = await axiosInstance.post("/posts", data);
      if (success) {
        userDispatch({ type: "ADD_POST", payload: post })
        toast.success(message);
      }
      return success;
    } catch (err) {
      toast.error(err)
    } finally {
      setLoading(false)
    }
  }
  const LikeDislikePost = async (postId) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.put(`/posts/${postId}/like`, { userId: userProfile._id })
      const { success, message } = data;
      if (success) {
        toast.success(message);
      }
      return data;
    } catch (err) {
      toast.error(err);

    } finally {
      setLoading(false)
    }

  }
  const deletePost = async (postId) => {
    try {
      setLoading(true)
      const {data:{message,deletedPost}} = await axiosInstance.delete(`/posts/${postId}/delete`)
      userDispatch({ type: "DELETE_POST", payload: deletedPost._id })
      toast.success(message)
    } catch (err) {
      console.log(err)
      toast.success(err)
    } finally {
      setLoading(false)

    }
  }
  const updatePost = async (updatedPostData) => {
    try {
      setLoading(true)
      const res = await axiosInstance.put(`/posts/${userProfile._id}`, updatedPostData);
      toast.success(res.data)
      userDispatch({ type: "UPDATE_POST", payload: updatedPostData });
      return res;
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setLoading(false)
    }
  };

  const addBookMark = async (postId) => {
    try {
      setLoading(true)
      const { data: { success, message, bookmarkList } } = await axiosInstance.post(`/bookmark`, { userId: userProfile._id, postId })
      if (success) {
        userDispatch({ type: "BOOKMARK", payload: { bookmarkList } });
        toast.success(message)
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
      toast.success(error)

    } finally {
      setLoading(false)

    }
  }

  const addComment = async (postId, commentItem) => {
    try {
      setLoading(true)
      const { data: { success, savedComment, message } } = await axiosInstance.post(`/comment/${postId}`, { commentItem });
      if (success) {
        toast.success(message)
        return savedComment;
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(error)
    } finally {
      setLoading(false)
    }
  };

  const getCommnets = async (postId) => {
    try {
      setLoading(true)
      const { data: { success, comments } } = await axiosInstance.get(`/comment/${postId}/comments`)
      if (success) {
        return comments;
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  const addReplyToComment = async (commentId, commentItem) => {
    try {
      setLoading(true)
      const { data: { success, savedReply, message } } =
        await axiosInstance.post(`/comment/reply/${commentId}`, { replyItem: commentItem });
      if (success) {
        toast.success(message)
        return savedReply;
      }
    } catch (error) {
      toast.error(error)
      console.error("Error adding reply:", error);
    } finally {
      setLoading(false)
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      return await axiosInstance.delete(`/comment/${postId}/comments/${commentId}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const deleteReply = async (postId, commentId, replyId) => {
    try {
      setLoading(true)
      return await axiosInstance.delete(`/comment/${postId}/comments/${commentId}/replies/${replyId}`);
    } catch (error) {
      console.error("Error deleting reply:", error);
    } finally {
      setLoading(false)
    }
  };

  const handleFollowUnfollow = async (isFollowing, setIsFollowing, userId) => {
    try {
      setLoading(true)
      if (isFollowing) {
        await axiosInstance.put(`/users/${userId}/unfollow`, { userId: userProfile._id })
      } else {
        await axiosInstance.put(`/users/${userId}/follow`, { userId: userProfile._id });
      }
      setIsFollowing(!isFollowing)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userId, data) => {
    try {
      setLoading(true)
      return await axiosInstance.put(`/users/${userId}`, data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  return {
    addPost,
    deletePost,
    updatePost,
    addBookMark,
    LikeDislikePost,
    fetchUserById,
    addComment,
    getCommnets,
    addReplyToComment,
    deleteComment,
    deleteReply,
    handleFollowUnfollow,
    updateProfile
  }
}