import {
    Title,
    Info,
    InfoItem,
    InfoKey,
    InfoValue,
    LogOutButton,
    Wrapper,

} from './style/profileRightbar'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@mui/material/Button';
import { SearchContainer, ModalCustom, FollowButton } from "../../components"
import { useUserAuth } from '../../context';
import { useAuth, useUserAction } from '../../hooks';

export default function ProfileRightbar({ user }) {
    const {
        userProfile
    } = useUserAuth();
    const { handleFollowUnfollow } = useUserAction()
    const { logUserOut } = useAuth()
    const [isFollowing, setIsFollowing] = useState(false)
    const [open, setOpen] = useState(false);
    let [flagModal, setFlagModal] = useState('following')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        setIsFollowing(user?.followers?.some(item => item._id === userProfile._id));
    }, [user, userProfile])

    const followHandler = async () => {
        handleFollowUnfollow(isFollowing, setIsFollowing, user._id)
    }

    return (
        <Wrapper>
            {
                userProfile._id === user._id ? (
                    <LogOutButton onClick={() => logUserOut()}>
                        <ExitToAppIcon />
                        log out
                    </LogOutButton>
                )
                    : (
                        <FollowButton onClickHandler={followHandler} isFollowing={isFollowing} />
                    )
            }
            <Title>{user.desc
                ? <a href={user.desc} target='_blank' rel="noreferrer">Portfolio</a>
                : "No Portfolio"}
            </Title>
            <Info>

                <InfoItem>
                    <InfoKey>City:</InfoKey>
                    <InfoValue>{user.city}</InfoValue>
                </InfoItem>
                <InfoItem>
                    <InfoKey>Form:</InfoKey>
                    <InfoValue>{user.from}</InfoValue>
                </InfoItem>
                <span onClick={() => setFlagModal('following')}>
                    <Button onClick={handleOpen} >following {user.followings?.length}</Button>
                </span>
                <Info onClick={() => setFlagModal("followers")}>
                    <Button onClick={handleOpen} >followers {user.followers?.length}</Button>
                </Info>
            </Info>
            <ModalCustom onClose={handleClose} open={open} profileModel>
                {
                    <>

                        {flagModal === 'following' ? user?.followings?.map((i) => (
                            <Link to={`/profile/${i._id}`} style={{ textDecoration: "none" }} key={i._id} onClick={handleClose}>
                                <SearchContainer searchData={i} />
                            </Link>
                        )) : user?.followers?.map((i) => (
                            <Link to={`/profile/${i._id}`} style={{ textDecoration: "none" }} key={i._id} onClick={handleClose}>
                                <SearchContainer searchData={i} />
                            </Link>
                        ))}
                    </>
                }
            </ModalCustom>
        </Wrapper>
    )
}
