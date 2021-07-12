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
//import FriendsContex from '../../contexts/friends';

interface FriendsData {
    cod_friend: number,
    name_friend: string,
    pic_friend: string,
    accepted: number
}

interface ModalProps {
    props : {
        friends: Array<FriendsData>
    };
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

export default function NestedList(props: ModalProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  //const { getFriends } = useContext(FriendsContex);
  
  const [screen, setScreen] = useState<Array<JSX.Element>>([
    <ListItem button className={classes.nested} key="none">
        <ListItemIcon>
        </ListItemIcon>
        <ListItemText primary="Parece que você ainda não possui amigos :(" />
    </ListItem>
  ]);

  useLayoutEffect(() => {
    setFriends();
  }, []);

  async function setFriends() {
    if (props.props.friends.length as number > 0) {
        //var friends = await getFriends(props.props.userId as number);
        setScreen([<div />]);
        props.props.friends.map((oneFriend) => {
            console.log(oneFriend.name_friend);
            setScreen([ ...screen,
                <ListItem button className={classes.nested} key={oneFriend.cod_friend}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary={oneFriend.name_friend} />
                </ListItem>
            ])
        })
    }
  }

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
    >
      <ListItem button onClick={handleClick} key="button">
        <ListItemIcon>
          <InboxIcon />
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