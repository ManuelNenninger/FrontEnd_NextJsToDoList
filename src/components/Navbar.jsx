import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { signIn, signOut, useSession } from "next-auth/client"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "#f8f9fa",

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: 'transparent',
    boxShadow: '0px 0px 2px 0px #f8f9fa',
  },
  loginOutButton: {
    color: "#f8f9fa",
    '&:hover': {
      background: 'rgba( 255, 255, 255, 0.2 )',
      boxShadow: '0 8px 32px 0 rgba( 233, 196, 106, 0.1 )',
      border: '1px solid rgba( 255, 255, 255, 0.3 )',
      backdropFilter: 'blur( 3.5px )',
    },
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [dayTime, setDayTime] = useState("none");
  const [session, loading] = useSession()





useEffect(() => {
  const date = new Date();
  const current_hour = date.getHours();
  if(5<= current_hour && current_hour <= 10) {
    setDayTime("morning");
    } else {
      if(10<current_hour && current_hour <=18) {
         setDayTime("afternoon");
      } else {
         setDayTime("evening");

  }}
  const intervalID = setInterval(() => {
    if(5<= current_hour && current_hour <= 10) {
      setDayTime("morning");
      } else {
        if(10<current_hour && current_hour <=18) {
           setDayTime("afternoon");
        } else {
           setDayTime("evening");

    }}
  }, 60000);
  return () => clearInterval(intervalID);
}, []);



  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Good {dayTime}
          </Typography>
          {session ? (<Button className={classes.loginOutButton} onClick={signOut}>Sign Out</Button>) : (<Button className={classes.loginOutButton} onClick={signIn} >Sign In</Button>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}
