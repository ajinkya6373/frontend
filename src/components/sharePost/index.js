
import {
    ShareContainer,
    ShareTop,
    Image,
    Input,
    Divider,
    ShareImgContainer,
    ShareImg,
    ShareCancelImg,
    ShareBottom,
    ShareOptions,
    ShareOption,
    Icon,
    Text,
    ShareButton,
    StyledToastMessage,

} from "./style/share"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import { useUserAuth } from "../../context";
import { useUserAction } from "../../hooks";
import { toast } from "react-hot-toast";
export default function SharePost() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [desc, setDesc] = useState('')
    const {
        userProfile,
    } = useUserAuth();
    const { addPost } = useUserAction()
    const Invalid = desc === '';
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 4 * 1024 * 1024) {
          toast.error("Image size exceeds the limit of 4MB.");
          setFileInputState("");
          setPreviewSource("");
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
        setFileInputState(e.target.value);
      };
      

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };
    const sumbitHandler = async (e) => {
        e.preventDefault()
        if (fileInputState==="") {
            return toast.error("Adding an image is compulsory.");
        }
        const newPostdata = {
            userId: userProfile._id,
            desc: desc,
        };
        if (previewSource) {
            newPostdata.data = previewSource;
        }
       const success = await addPost(newPostdata); 
       if(success) {
           clearStates();
       }
    }
    const clearStates = () => {
        setFileInputState('');
        setPreviewSource('')
        setDesc('')
    }
    return (
        <ShareContainer>
                <ShareTop>
                    <Image src={userProfile.profilePicture} />
                    <Input placeholder={`${userProfile.username} Add caption`} 
                    onChange={(e) => setDesc(e.target.value)} 
                    value={desc} />
                </ShareTop>
                <Divider />
                {
                    previewSource && (
                        <ShareImgContainer>
                            <ShareImg src={previewSource} />
                            <ShareCancelImg onClick={clearStates}><CancelIcon /></ShareCancelImg>
                        </ShareImgContainer>
                    )
                }
                <ShareBottom onSubmit={sumbitHandler}>
                    <ShareOptions>
                        <ShareOption htmlFor="file">
                            <Icon ><PermMediaIcon /></Icon>
                            <Text>Photo </Text>
                        </ShareOption>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            onChange={handleFileInputChange}
                            value={fileInputState}
                            accept=".png,.jpeg,.jpg" />
                    </ShareOptions>
                    <ShareButton type="submit" disabled={Invalid}>Share</ShareButton>
                </ShareBottom>
        </ShareContainer>
    )
}
