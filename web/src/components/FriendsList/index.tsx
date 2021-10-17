import React, { useContext, useLayoutEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
/*import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ContactsIcon from '@material-ui/icons/Contacts';*/

import './styles.css';
import { FriendsData } from '../../interfaces/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

const NestedList: React.FC<{friends: Array<FriendsData>}> = ({friends}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [openOnline, setOpenOnline] = useState(true);
  const [openOffline, setOpenOffline] = useState(true);

  const [amigosOnline, setAmigosOnline] = useState<Array<JSX.Element>>([]);
  const [amigosOffline, setAmigosOffline] = useState<Array<JSX.Element>>([]);

  useLayoutEffect(() => {
    if (friends.length > 0) {
      setAmigosOnline(
        [ ...friends].filter((f: { user_online: number; }) => f.user_online == 1).map((oneFriend: FriendsData) => 
                <ListItem button className={classes.nested} key={oneFriend.cod_friend}>
                    <ListItemIcon>
                      <img src={oneFriend.pic_friend} alt="Friend Image" className='profile-friend-picture'/>
                    </ListItemIcon>
                    <ListItemText primary={oneFriend.name_friend} />
                </ListItem>
          )
      )
      setAmigosOffline(
        [ ...friends].filter((f: { user_online: number; }) => f.user_online == 0).map((oneFriend: FriendsData) => 
                <ListItem button className={classes.nested} key={oneFriend.cod_friend}>
                    <ListItemIcon>
                      <img src={oneFriend.pic_friend} alt="Friend Image" className='profile-friend-picture'/>
                    </ListItemIcon>
                    <ListItemText primary={oneFriend.name_friend} />
                </ListItem>
          )
      )
      
      if ([ ...friends].filter((f: { user_online: number; }) => f.user_online == 1).length == 0) {
        setAmigosOnline([
          <ListItem button className={classes.nested} key="none">
            <ListItemText primary="Nenhum amigo disponível" />
          </ListItem>
        ]);
      }
      if ([ ...friends].filter((f: { user_online: number; }) => f.user_online == 0).length == 0) {
        setAmigosOffline([
          <ListItem button className={classes.nested} key="none2">
            <ListItemText primary="Nenhum amigo indisponível" />
          </ListItem>
        ]);
      }
    }
  }, []);

  const handleClick = () => {
    setOpen(!open);
  }

  const clickOnline = () => {
    setOpenOnline(!openOnline);
  }

  const clickOffline = () => {
    setOpenOffline(!openOffline);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Lista de Amigos
        </ListSubheader>
      }
      className={classes.root}
      id='lista-amigos'
    >
      {
        /*<ListItem button onClick={handleClick} key="button">
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText primary="Todos Amigos" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>*/
      }
      <Collapse in={open} timeout="auto" unmountOnExit>
        {
          /*<ListItem button onClick={clickOnline} key="none3">
            <ListItemIcon>
              <FiberManualRecordIcon/>
            </ListItemIcon>
            <ListItemText primary="Disponível" />
            {openOnline ? <ExpandLess /> : <ExpandMore />}
          </ListItem>*/
        }
        <ListItem button key="none3">
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText primary="Disponível" />
        </ListItem>
        <Collapse in={openOnline} timeout="auto" unmountOnExit>
          {amigosOnline}
        </Collapse>
        {
          /*<ListItem button onClick={clickOffline} key="none4">
            <ListItemIcon>
              <IndeterminateCheckBoxIcon/>
            </ListItemIcon>
            <ListItemText primary="Indisponível" />
            {openOffline ? <ExpandLess /> : <ExpandMore />}
          </ListItem>*/
        }
        <ListItem button key="none4">
          <ListItemIcon>
            <IndeterminateCheckBoxIcon/>
          </ListItemIcon>
          <ListItemText primary="Indisponível" />
        </ListItem>
        <Collapse in={openOffline} timeout="auto" unmountOnExit>
            {amigosOffline}
        </Collapse>
      </Collapse>
    </List>
  );
}

export default NestedList;