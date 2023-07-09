
import {
    UpdateContainer,
    Container,
    Profile,
    Form,
    FormItem,
    Label,
    FormInput,
    Button,
    AvatarContainer,
    InputBox
} from "./style/update"
import { useRef, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { useUserAction } from "../../hooks";
import { toast } from "react-hot-toast";
import { StyledToastMessage } from "../sharePost/style/share";
import { useUserAuth } from "../../context";
import ModalCustom from "../Modal";
import { avatarList } from "../../utils/utils";


export default function UpdateProfile({ user, setUser, setUpdateModal }) {
    const { setUserProfile } = useUserAuth();
    const [profilePreview, setprofilePreview] = useState("");
    const [open, setOpen] = useState(false);
    const { updateProfile } = useUserAction()
    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true)
    }
    const handleClose = () => setOpen(false)
    const userName = useRef()
    const Desc = useRef()
    const City = useRef()
    const From = useRef()
    const Bio = useRef()

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = {
                userId: user._id,
                username: userName.current.value,
                desc: Desc.current.value,
                city: City.current.value,
                from: From.current.value,
                bio: Bio.current.value,
                profilePicture: user.profilePicture,
            };
            if (profilePreview) {
                data.img = profilePreview;
            }
            let { username, desc, city, from, relationship, bio, profilePicture, ...other } = user;
            const { data: { success, message, response } } = await updateProfile(user._id, data);
            setUserProfile((prv) => ({ ...prv, profilePicture: response.profilePicture.url }));
            const updatedUser = { ...other, ...response };
            if (success) {
                toast.success(message);
                setUser(updatedUser);
                setUpdateModal(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setUpdateModal(false);
        }

    };

    const handleAvatarClick = (avatarPath) => {
        fetch(avatarPath)
            .then((response) => response.blob())
            .then((blob) => {
                const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
                setprofilePreview(avatarPath);
                handleFileInputChange({ target: { files: [file] } });
            })
            .catch((error) => {
                console.log("Error fetching avatar:", error);
            });

            handleClose()
    };


    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file?.size > 4 * 1024 * 1024) {
            toast.error("Image size exceeds the limit of 4MB.");
            setprofilePreview("");
            return;
        }
        if (file?.size < 3 * 1024 * 1024 && file?.size > 1 * 1024 * 1024) {
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
            setprofilePreview(reader.result);
        };
    };


    return (
        <UpdateContainer>
            <Container>
                <Profile >
                    <Avatar src={
                        profilePreview
                            ? profilePreview
                            : user?.profilePicture?.url
                    } />
                    <InputBox>
                        <span>
                            <input
                                type="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={handleFileInputChange}
                            />
                            Profile
                        </span>
                        <span onClick={(e) => handleOpen(e)}>Avatar</span>
                    </InputBox>
                </Profile>
                <Form onSubmit={submitHandler}>
                    <FormItem >
                        <Label>username</Label>
                        < FormInput type="string" ref={userName} defaultValue={user?.username} />
                    </FormItem>
                    <FormItem >
                        <Label>Bio</Label>
                        < FormInput type="string" ref={Bio} defaultValue={user?.bio} />
                    </FormItem>
                    <FormItem >
                        <Label>PortFolio</Label>
                        < FormInput type="string" ref={Desc} defaultValue={user?.desc} />
                    </FormItem>
                    <FormItem >
                        <Label>City</Label>
                        < FormInput type="string" ref={City} defaultValue={user?.city} />
                    </FormItem>
                    <FormItem >
                        <Label>Form</Label>
                        < FormInput type="string" ref={From} defaultValue={user?.from} />
                    </FormItem>
                    <Button type="submit">Update</Button>
                </Form>
            </Container>

            <ModalCustom
                open={open}
                onClose={handleClose}
            >
                <AvatarContainer>
                    {
                        avatarList.map(i => <img
                            key={i}
                            src={`/assets/avatar/${i}`}
                            onClick={() => handleAvatarClick(`/assets/avatar/${i}`)}
                            alt="avatar" />)
                    }
                </AvatarContainer>
            </ModalCustom>
        </UpdateContainer>


    )
}
