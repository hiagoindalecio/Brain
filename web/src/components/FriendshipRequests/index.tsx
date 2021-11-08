import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

import AuthContext from '../../contexts/auth';
import FriendsContext from '../../contexts/friends';

import './styles.css';

import { BiCheckCircle, BiUserMinus } from "react-icons/bi";

import ModalMessage from '../ModalMessages/ModalMessages';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default function CustomizedNotificationMenus() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user } = useContext(AuthContext);
  const { getFriendshipRequests, declineFriendRequest, acceptFriendRequest } = useContext(FriendsContext);

  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
  const [message, setMessage] = useState<string>('');

  let history = useHistory();

  const [friendRequests, setFriendRequest] = useState<JSX.Element[]>([
    <MenuItem className='header-menu-item' id='menu-header'>
      <ListItemText primary="Pedidos de amizade" className='header-text' />
    </MenuItem >,
    <MenuItem className='header-menu-item'>
      <ListItemText primary="Você não possui novas solicitações de amizade" secondary="Tente procurar por novos amigos!" />
    </MenuItem >
  ]);
  const [howMuch, setHowMuch] = useState(0);

  useEffect(() => {
    function goProfile(cod: number) {
      history.push(`/profile/${cod}`);
    }

    async function handleDeclineFriendRequest(codFriend: number) {
      const result = await declineFriendRequest(user?.id as unknown as string, codFriend.toString());
      setMessage(result.message);
      setIsModalMessageVisible(true);
      handleClose();
    }
  
    async function handleAcceptFriendRequest(codFriend: number) {
      const result = await acceptFriendRequest(user?.id as unknown as string, codFriend.toString());
      setMessage(result.message);
      setIsModalMessageVisible(true);
      handleClose();
    }

    async function getRequests() {
      const requests = await getFriendshipRequests(user?.id as unknown as string);
        if (requests.length > 0 && requests[0].cod_friend !== -1) {
          if (anchorEl) { // se o menu tiver aberto
            var elements: Array<JSX.Element> = [
              <MenuItem className='header-menu-item' id='menu-header'>
                <ListItemText primary="Pedidos de amizade" className='header-text' />
              </MenuItem >
            ];

            requests.forEach(request => {
              elements.push(
                <MenuItem className='header-menu-item' >
                  <ListItemIcon onClick={() => {goProfile(request.cod_friend)}} className='cursor-pointer'>
                    <img src={request.pic_friend} className='profile-request-pic' alt="Profile" />
                  </ListItemIcon>
                  <ListItemText primary={request.name_friend} secondary='Deseja ser seu amigo' onClick={() => {goProfile(request.cod_friend)}} className='cursor-pointer' />
                  <div className='accept-friend cursor-pointer' onClick={() => {handleAcceptFriendRequest(request.cod_friend)}} >
                    <BiCheckCircle fontSize='extra-large'  />
                  </div>
                  <div className="decline-friend cursor-pointer" onClick={() => {handleDeclineFriendRequest(request.cod_friend)}} >
                    <BiUserMinus fontSize='large' />
                  </div>
                </MenuItem >
              );
            });

            setFriendRequest(elements);
          }

          setHowMuch(requests.length);
        } else {
          setFriendRequest([
            <MenuItem className='header-menu-item' id='menu-header'>
              <ListItemText primary="Pedidos de amizade" className='header-text' />
            </MenuItem >,
            <MenuItem className='header-menu-item'>
              <ListItemText primary="Você não possui novas solicitações de amizade" secondary="Tente procurar por novos amigos!" />
            </MenuItem >
          ]);
          setHowMuch(0);
        }
    }

    getRequests();
    
    var interv: NodeJS.Timeout = setInterval(() => {
      getRequests();
    }, 10000);

    return () => {
      clearInterval(interv);
    }
  }, [getFriendshipRequests, user?.id, history, anchorEl, acceptFriendRequest, declineFriendRequest])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
      >
        <PersonAddIcon fontSize='large' className='add-icon'/>
        <small className={`how-much ${howMuch > 0 ? '' : 'notVisible'}`} >{howMuch > 0 ? howMuch : ''}</small>
      </Button>
      {
        isModalMessageVisible ? 
        <ModalMessage props={{message}} onClose={() => {
            setIsModalMessageVisible(false);
        }}>
            
        </ModalMessage> 
        : null
      }
      <StyledMenu
        id="customized-notifications-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          friendRequests.map((elem, index) => <div key={index}>{elem}</div>)
        }
      </StyledMenu>
    </div>
  );
}
