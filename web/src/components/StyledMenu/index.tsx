import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BuildIcon from '@material-ui/icons/Build';

import AuthContext from '../../contexts/auth';

import { useHistory } from 'react-router-dom';

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

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  let history = useHistory();

  const { user, singOut } = useContext(AuthContext);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function goConfig() {
    history.push("/config");
  }

  function goProfile() {
    history.push(`/profile/${user?.id}`);
  }

  function handleLogoff() {
    singOut(user? user.email as string : '', user? user.password as string : '');
    history.push("/");
  }

  return (
    <div>
      <Button
        onClick={handleClick}
      >
      <div className='profile-picture'>
        <img src={user ? user.image_url : 'blank-profile.webp'} alt="profile" />
      </div>
        
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={goProfile}>
          <ListItemIcon>
            <AssignmentIndIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Ver meu perfil" />
        </MenuItem >
        <MenuItem onClick={goConfig}>
          <ListItemIcon>
            <BuildIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Editar perfil" />
        </MenuItem >
        <MenuItem onClick={() => handleLogoff()}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </MenuItem >
      </StyledMenu>
    </div>
  );
}
