import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AuthContext from '../../contexts/auth';

import { useHistory } from 'react-router-dom';

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

  function handleLogoff() {
    singOut(user? user.email as string : '', user? user.password as string : '');
    history.push("/");
  }

  return (
    <div>
      <Button
        onClick={handleClick}
      >
        <img src={user ? user.image_url : 'blank-profile.webp'} alt="profile-picture" className='profile-picture'/>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={goConfig}>
          <ListItemIcon>
            <AssignmentIndIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Meu perfil" />
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
