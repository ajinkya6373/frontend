import {
  Profile,
  ProfileRight,
  ProfileRightTop,
  ProfileCover,
  CoverImage,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  Description,
  ProfileRightBottom,
  Meta,
  ProfileWrapper,
  MetaLabel,
  Setting,
  SetCoverpic,
  StyledToastMessage,
} from "./style/profile";
import {
  Topbar,
  ModalCustom,
  SharePost,
  StandardImageList,
  ProfileRightbar,
  UpdateProfile,
} from "../../components";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import SettingsIcon from "@material-ui/icons/Settings";
import PhotoCameraTwoToneIcon from "@material-ui/icons/PhotoCameraTwoTone";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import { Input } from "@mui/material";
import { useUserAuth } from "../../context";
import { useUserAction } from "../../hooks";
import { axiosInstance } from "../../utils/utils";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { userProfile, setUserProfile,setLoading } = useUserAuth();
  const { fetchUserById } = useUserAction();
  const [user, setUser] = useState({});
  const [profilePreview, setprofilePreview] = useState("");
  const [coverState, setCoverState] = useState(false);
  const [coverPreview, setCoverPreview] = useState("");
  const userId = useParams().userId;
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setCoverState(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCoverState(false);
    setCoverPreview("");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file?.size > 4 * 1024 * 1024) {
      toast.error("Image size exceeds the limit of 4MB.");
      setprofilePreview("");
      setCoverPreview("");
      setOpen(false);
      return;
    }
    if(file?.size <3 * 1024 * 1024 && file?.size> 1 * 1024 * 1024){
        toast.custom((t) => (
            <StyledToastMessage>
              <strong >Uploading Image:</strong> This may take longer due to the large size.
            </StyledToastMessage>
          ));
    }
  
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      coverState
        ? setCoverPreview(reader.result)
        : setprofilePreview(reader.result);
    };
  };
  const uploadProfile = async () => {
    try {
      setLoading(true);
      const profileData = {
        userId: userProfile._id,
        img: profilePreview,
      };
      const {
        data: { success, message, response },
      } = await axiosInstance.put(`/users/${userId}`, profileData);
      if (success) {
        toast.success(message)
        setUserProfile((prv) => ({ ...prv, profilePicture: response.url }));
      }
      setprofilePreview("");
    } catch (error) {
        console.log(error);
        toast.error(error)
    }finally{
      setLoading(false);
    }
  };

  const uploadCover = async () => {
    try {
      setLoading(true);
      const coverData = {
        userId: userProfile._id,
        img: coverPreview,
      };
      const {
        data: { success, message, response },
      } = await axiosInstance.put(`/users/${userId}/coverPic`, coverData);
      if (success) {
        toast.success(message)
        setUserProfile((prv) => ({ ...prv, coverPicture: response.url }));
      }
      setOpen(false);
      
    } catch (error) {
      toast.error(error)
      console.log(error);
    }finally{
      setCoverPreview("");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUserById(userId);
        if (response && response.data) {
          const { data } = response;
          if (userProfile.userId === userId) {
            setUser(data);
          } else {
            setUser(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userId, userProfile]);
  const isloggedInUser = userProfile._id === user?._id;
  return (
    <>
      <Topbar />
      <Profile>
        <Setting onClick={() => setUpdateModal(true)}>
          {isloggedInUser && <SettingsIcon htmlColor="blue" />}
        </Setting>
        <ModalCustom
          open={updateModal}
          onClose={() => setUpdateModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <UpdateProfile user={user} setUser={setUser} setUpdateModal={setUpdateModal}/>
        </ModalCustom>
        {isloggedInUser && (
          <SetCoverpic onClick={handleOpen}>
            <EditIcon
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                fontSize: "27px",
                padding: "3px",
              }}
            />
          </SetCoverpic>
        )}
        <div>
          <ModalCustom
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Input
              type="file"
              accept=".png,.jpeg,.jpg"
              onChange={handleFileInputChange}
            />
            <Button
              style={{ display: coverPreview ? "block" : "none" }}
              onClick={uploadCover}
            >
              sumbit
            </Button>
          </ModalCustom>
        </div>
        <ProfileRight>
          <ProfileRightTop>
            <ProfileCover>
              <CoverImage
                src={
                  coverPreview
                    ? coverPreview
                    : user?.coverPicture?.url}
              />
              <ProfileWrapper>
                <ProfileImage
                  src={
                    profilePreview
                      ? profilePreview
                      : user?.profilePicture?.url
                  }
                />
                {isloggedInUser && (
                  <Meta>
                    <MetaLabel htmlFor="Profilefile">
                      change profile
                      <PhotoCameraTwoToneIcon style={{ marginLeft: "3px" }} />
                    </MetaLabel>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={handleFileInputChange}
                      id="Profilefile"
                    />
                  </Meta>
                )}
              </ProfileWrapper>
            </ProfileCover>
            <ProfileInfo>
              {profilePreview ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={uploadProfile}
                >
                  <KeyboardArrowUpIcon />
                  upload
                </Button>
              ) : (
                <>
                  <ProfileName>{user.username}</ProfileName>
                  <Description>
                    {user.bio 
                    ? user.bio 
                    :isloggedInUser
                    ? "Please add your Bio" 
                    : "No Bio"
                    }
                    
                  </Description>
                </>
              )}
            </ProfileInfo>
          </ProfileRightTop>
          <ProfileRightBottom>
            <div style={{ width: "88%" }}>
              {isloggedInUser && <SharePost />}
              <StandardImageList
                userId={user?._id}
                isloggedInUser={isloggedInUser}
              />
            </div>
            <ProfileRightbar user={user} />
          </ProfileRightBottom>
        </ProfileRight>
      </Profile>
    </>
  );
}
