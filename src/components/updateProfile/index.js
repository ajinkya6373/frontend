
import {
    UpdateContainer,
    Container,
    Profile,
    Form,
    FormItem,
    Label,
    FormInput,
    Button
} from "./style/update"
import { useRef } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { useUserAction } from "../../hooks";
import { toast } from "react-hot-toast";


export default function UpdateProfile({user,setUser,setUpdateModal}) {
    const {updateProfile} = useUserAction()
    const userName = useRef()
    const Desc = useRef()
    const City = useRef()
    const From = useRef()
    const Bio = useRef()
    const sumbitHandler = async (e) => {
        e.preventDefault();
        let data = {
            userId: user._id,
            username: userName.current.value,
            desc: Desc.current.value,
            city: City.current.value,
            from: From.current.value,
            bio: Bio.current.value,
        }
        let { username, desc, city, from, relationship,bio, ...other } = user;
        const {data:{success,message,response}} = await updateProfile(user._id,data)
            const updatedUser = { ...other, ...response}
            if (success) {
                toast.success(message)
                setUser(updatedUser);
                setUpdateModal(false)
            }

    }
    return (
        <UpdateContainer>
            <Container>
                <Profile >
                    <Avatar src={user?.profilePicture?.url}
                        style={{ width: "100px", height: "100px", objectFit: "contain", }} />
                </Profile>
                <Form onSubmit={sumbitHandler}>
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
        </UpdateContainer>
    )
}
