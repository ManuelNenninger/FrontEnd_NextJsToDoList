import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#0A0A0A',
  },
  appbar: {
    backgroundColor: 'transparent',
    boxShadow: '0px 0px 2px 0px #061c4c',
  },


}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [dayTime, setDayTime] = useState("none");




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


// const [red, setRed] = useState(true);
//
// useEffect(() => {
//   const intervalID = setInterval(() => {
//     setRed(red => !red);
//     console.log(red);
//   }, 1000);
//
//   return () => clearInterval(intervalID);
// }, []);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Good {dayTime}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
