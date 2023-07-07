import {
    Title,
    Info,
    InfoItem,
    InfoKey,
    InfoValue,
    LogOutButton,
    Wrapper,
    MobileScreenWrapper,

} from './style/userInfoCard'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@mui/material/Button';
import { SearchContainer, ModalCustom, FollowButton } from "../../components"
import { useUserAuth } from '../../context';
import { useAuth, useUserAction } from '../../hooks';

export default function UserInfoCard({ user }) {
    const {
        userProfile
    } = useUserAuth();
    const { handleFollowUnfollow } = useUserAction()
    const { logUserOut } = useAuth()
    const [isFollowing, setIsFollowing] = useState(false)
    const [open, setOpen] = useState(false);
    let [flagModal, setFlagModal] = useState('following')
    const handleOpen = (flag) =>{ 
        setOpen(true)
        setFlagModal(flag)
    };
    const handleClose = () => setOpen(false);
    useEffect(() => {
        setIsFollowing(user?.followers?.some(item => item._id === userProfile._id));
    }, [user, userProfile])

    const followHandler = async () => {
        handleFollowUnfollow(isFollowing, setIsFollowing, user._id)
    }
    const isloggedInUser = userProfile._id === user?._id;

    return (
        <>
            <Wrapper>
                {
                    isloggedInUser ? (
                        <LogOutButton onClick={() => logUserOut()}>
                            <ExitToAppIcon />
                            log out
                        </LogOutButton>
                    )
                        : (
                            <FollowButton onClickHandler={followHandler} isFollowing={isFollowing} />
                        )
                }
                <Info>
                    <InfoItem>
                        <InfoKey>City:</InfoKey>
                        <InfoValue>{user.city}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoKey>Form:</InfoKey>
                        <InfoValue>{user.from}</InfoValue>
                    </InfoItem>
                    <span >
                        <Button onClick={()=>handleOpen('following')} >following {user.followings?.length}</Button>
                    </span>
                    <Info >
                        <Button onClick={()=>handleOpen('followers')} >followers {user.followers?.length}</Button>
                    </Info>
                </Info>
                <ModalCustom onClose={handleClose} open={open} profileModel>
                    {
                        <>
                            {flagModal === 'following' ? user?.followings?.map((i) => (
                                <Link to={`/profile/${i._id}`} key={i._id} onClick={handleClose}>
                                    <SearchContainer searchData={i} />
                                </Link>
                            )) : user?.followers?.map((i) => (
                                <Link to={`/profile/${i._id}`} key={i._id} onClick={handleClose}>
                                    <SearchContainer searchData={i} />
                                </Link>
                            ))}
                        </>
                    }
                </ModalCustom>
            </Wrapper>
            <MobileScreenWrapper>
              {!isloggedInUser && <FollowButton onClickHandler={followHandler} isFollowing={isFollowing} />}
                <div>
                    <Button onClick={()=>handleOpen('following')} >following {user.followings?.length}</Button>
                    <Button onClick={()=>handleOpen('followers')} >followers {user.followers?.length}</Button>
                </div>
            </MobileScreenWrapper>
        </>
    )
}
