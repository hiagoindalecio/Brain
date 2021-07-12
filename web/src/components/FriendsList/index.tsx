import React, { useContext, useLayoutEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ContactsIcon from '@material-ui/icons/Contacts';
//import FriendsContex from '../../contexts/friends';

import './styles.css';

interface FriendsData {
    cod_friend: number,
    name_friend: string,
    pic_friend: string,
    accepted: number
}

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
  const [open, setOpen] = useState(false);

  const [screen, setScreen] = useState<Array<JSX.Element>>([]);

  useLayoutEffect(() => {
    if (friends.length > 0) {
      friends.map((oneFriend) => {
        setScreen([ ...screen,
            <ListItem button className={classes.nested} key={oneFriend.cod_friend}>
                <ListItemIcon>
                  <img src={oneFriend.pic_friend} alt="Friend Image" className='profile-friend-picture'/>
                </ListItemIcon>
                <ListItemText primary={oneFriend.name_friend} />
            </ListItem>
        ])
      });
      /*setScreen( FILTRAR ONLINE E ACERTAR ISSO NO BANCO QUANDO LOGA E FILTRAR POR SÓ ATIVOS
        [...friends].fiter()
      )*/
    }
    else{
      setScreen([
        <ListItem button className={classes.nested} key="none">
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Parece que você ainda não possui amigos :(" />
        </ListItem>
      ]);
    }


  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

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
      <ListItem button onClick={handleClick} key="button">
        <ListItemIcon>
          <ContactsIcon />
        </ListItemIcon>
        <ListItemText primary="Todos Amigos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {screen}
        </List>
      </Collapse>
    </List>
  );
}

export default NestedList;