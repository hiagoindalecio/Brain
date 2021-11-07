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
  const { getFriendshipRequests } = useContext(FriendsContext);

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
                <MenuItem onClick={() => {goProfile(request.cod_friend)}}>
                  <ListItemIcon>
                    <img src={request.pic_friend} className='profile-request-pic' alt="Profile" />
                  </ListItemIcon>
                  <ListItemText primary={request.name_friend} secondary='Deseja ser seu amigo' />
                  <div className='accept-friend'>
                    <BiCheckCircle fontSize='extra-large'  />
                  </div>
                  <div className="decline-friend">
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

    setInterval(() => {
      getRequests();
    }, 10000)
  }, [getFriendshipRequests, user?.id, history, anchorEl])

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
