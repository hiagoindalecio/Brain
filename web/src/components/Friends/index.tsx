import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { BsPeopleFill } from "react-icons/bs";

import AuthContext from '../../contexts/auth';
import FriendsContext from '../../contexts/friends';

import './styles.css';

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

export default function CustomizedFriendsMenus() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user } = useContext(AuthContext);
  const { getFriends } = useContext(FriendsContext);

  let history = useHistory();

  const [friends, setFriends] = useState<JSX.Element[]>([
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

    async function getAllFriends() {
      const friends = await getFriends(user ? user.id as unknown as number : 0);
        if (friends.length > 0 && friends[0].cod_friend !== -1) {
          let online = 0;
          if (anchorEl) { // se o menu tiver aberto
            var elements: Array<JSX.Element> = [
              <MenuItem className='header-menu-item' id='menu-header'>
                <ListItemText primary="Lista de amigos" className='header-text' />
              </MenuItem >
            ];

            friends.forEach(friend => {
              if (friend.user_online)
                online++;
              elements.push(
                <MenuItem className='header-menu-item' >
                  <ListItemIcon onClick={() => {goProfile(friend.cod_friend)}} className='cursor-pointer'>
                    <img src={friend.pic_friend} className='profile-friend-pic' alt="Profile" />
                  </ListItemIcon>
                  <ListItemText primary={friend.name_friend} secondary={friend.user_online ? 'Online' : 'Offline'} onClick={() => {goProfile(friend.cod_friend)}} className='cursor-pointer' />
                </MenuItem >
              );
            });

            setFriends(elements);
          } else {
            friends.forEach(friend => {
              if (friend.user_online)
                online++;
            })
          }

          setHowMuch(online);
        } else {
          setFriends([
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

    getAllFriends();
    
    var interv: NodeJS.Timeout = setInterval(() => {
      getAllFriends();
    }, 10000);

    return () => {
      clearInterval(interv);
    }
  }, [getFriends, user, history, anchorEl])

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
        <BsPeopleFill fontSize='large' className='friends-icon'/>
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
          friends.map((elem, index) => <div key={index}>{elem}</div>)
        }
      </StyledMenu>
    </div>
  );
}
