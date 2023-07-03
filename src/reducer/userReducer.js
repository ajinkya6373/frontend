
const userReducer = (state, action) => {
    switch (action.type) {
        case "INITIALIZE_DATA": {
            return {
                ...state,
                timeLine: [...action.payload.timeLine],
                userPosts: [...action.payload.userPosts],
                bookMark:[...action.payload.bookMark]
            }
        }
        case "ADD_POST":
            return {
                ...state,
                timeLine: [action.payload, ...state.timeLine],
                userPosts: [action.payload, ...state.userPosts],
            }

        case "DELETE_POST":
            return {
                ...state,
                timeLine: state.timeLine.filter((i) => i._id !== action.payload),
                userPosts: state.userPosts.filter((i) => i._id !== action.payload)

            }

        case "UPDATE_POST": {
            const updatedTimeline = state.timeLine.map((post) => {
                if (post._id === action.payload.postId) {
                    return { ...post, ...action.payload };
                }
                return post;
            });

            const updatedUserPosts = state.userPosts.map((post) => {
                if (post._id === action.payload.postId) {
                    return { ...post, ...action.payload };
                }
                return post;
            });

            return {
                ...state,
                timeLine: updatedTimeline,
                userPosts: updatedUserPosts,
            };
        }

        case "BOOKMARK" :{
            const { bookmarkList } = action.payload;
            const updatedBookmark = bookmarkList.bookMarkItems.map(item=> item.post)
            return {
                ...state,
                bookMark: updatedBookmark
            }
        }


        case "SET_POSTS":
            return {
                ...state,
                posts: action.payload,
            }
        case "SET_TIMELINE":
            return {
                ...state,
                timeLine: action.payload,
                settingTimeline: false,
            }

        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload,

            }
        case "UPDATE_PROFILE":
            return {
                ...state,
                user: {
                    ...state.user,
                    profilePicture: action.payload,
                }
            }
        case "UPDATE_COVERPIC":
            return {
                ...state,
                user: {
                    ...state.user,
                    coverPicture: action.payload,
                }
            }
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload]

                }
            }
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter((following) => following !== action.payload)
                }
            }
        case "SET_SOCKET":
            return {
                ...state,
                socket: action.payload,
            }
        case "SET_ONLINE_USER":
            return {
                ...state,
                onlineUsers: action.payload,
            }
        case "FLUSH_DATA":
            return {
                timeLine: [],
                bookMark: [],
                userPosts: [],
            };
        default:
            return state;
    }
}

export default userReducer;