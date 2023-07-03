import { useState, useEffect } from "react";
import { useUserAuth, useUserData } from "../../context";
import { useUserAction } from "../../hooks";

export default function HomePagee() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [desc, setDesc] = useState("");
  const [editDesc, setEditDesc] = useState(""); // New state for edited description
  const [postId, setPostId] = useState(""); // New state for post ID being edited
  const { addPost, deletePost, updatePost,addBookMark,LikeDislikePost} = useUserAction();
  const { userData: { timeLine,bookMark} } = useUserData();
  const { userProfile } = useUserAuth();
  useEffect(() => {
    if (postId) {
      const post = timeLine.find((p) => p._id === postId);
      if (post) {
        setEditDesc(post.desc);
      }
    }
  }, [postId, timeLine]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPostdata = {
      userId: userProfile._id,
      desc: desc,
    };
    if (previewSource) {
      newPostdata.data = previewSource;
    }
    addPost(newPostdata);
    clearStates();
  };

  const deleteHandler = (pId) => {
    deletePost(pId);
  };

  const editHandler = (pId) => {
    setPostId(pId);
  };

  const updateHandler = () => {
    const updatedPostData = {
      postId: postId,
      desc: editDesc,
    };
    updatePost(updatedPostData);
    clearStates();
  };

  const bookkMarkHandler =(postId)=>{
    addBookMark(postId)
  }
  const clearStates = () => {
    setFileInputState("");
    setPreviewSource("");
    setDesc("");
    setEditDesc("");
    setPostId("");
  };

  return (
    <div>
      <h1>Home Page</h1>
      {!postId && ( // Render regular mode if postId is not set
        <div>
          <input type="text" onChange={(e) => setDesc(e.target.value)} value={desc} />
          <input
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={handleFileInputChange}
            value={fileInputState}
          />
          <button onClick={submitHandler}>Submit</button>
        </div>
      )}

      <main>
        {timeLine.map((p) => (
          <div key={p._id}>
            {!postId || (postId && postId !== p._id) ? ( 
              <div>
                <span>{p.desc}</span>
                <img src={p.img.url} alt="post" />
                <button onClick={() => editHandler(p._id)}>Edit</button>
                <button onClick={() => deleteHandler(p._id)}>Delete</button>
                <button onClick={()=>bookkMarkHandler(p._id)}>BookMark</button>
                <button onClick={()=>LikeDislikePost(p._id)}>Like</button>

              </div>
            ) : (
              <div>
                <input type="text" onChange={(e) => setEditDesc(e.target.value)} value={editDesc} />
                <button onClick={updateHandler}>Update</button>
                <button onClick={clearStates}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
