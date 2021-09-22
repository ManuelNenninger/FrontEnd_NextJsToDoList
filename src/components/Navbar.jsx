import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { signIn, signOut, useSession } from "next-auth/client"
import DigitalTime from "./digitalTime/digitalTime"
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ListItemText from '@material-ui/core/ListItemText';






const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "#212529",

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  typography: {
    flexGrow: 1,
    fontWeight: "300",
    color: "#003049",
    [theme.breakpoints.down('xs')]: {
    fontSize: '1.2rem',
  },
  },
  appbar: {
    backgroundColor: 'transparent',
    boxShadow: '0px 0px 2px 0px #f8f9fa',
  },
  loginOutButton: {
    color: "#003049",
    fontWeight: "300",
    fontSize: "1.2rem",
    borderRadius: "10px",
    border: '1px solid rgba( 255, 255, 255, 0.0 )',
    '&:hover': {
      color: "#fafafb",
      background: 'rgba( 0, 48, 73, 0.4 )',
      boxShadow: '0 8px 32px 0 rgba( 233, 196, 106, 0.1 )',
      border: '1px solid rgba( 255, 255, 255, 0.3 )',
      backdropFilter: 'blur( 3.5px )',
    },
  },
  digitaltime: {
    padding: theme.spacing(0.5, 2),
    background: 'rgba( 0, 48, 73, 0.4 )',
    boxShadow: '0 8px 32px 0 rgba( 233, 196, 106, 0.1 )',
    border: '1px solid rgba( 255, 255, 255, 0.3 )',
    backdropFilter: 'blur( 3.5px )',
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
    marginRight: theme.spacing(1),
  },
  },
  moreIconStyle: {
    color: "#003049",
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
}));

// <------- Style MobileMenu ---------->
const StyledMenu = withStyles({
  paper: {
    background: "rgba( 255, 255, 255, 0.4 )",
    boxShadow: "0 8px 32px 0 rgb(31 38 135 / 37%)",
    backdropFilter: "blur( 1.5px )",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  },
})((props) => (
  <Menu
    {...props}
  />
));
// <------- Style MobileMenu ---------->


export default function ButtonAppBar() {
  const classes = useStyles();
  const [dayTime, setDayTime] = useState("none");
  const [session, loading] = useSession()
  const [name, setName] = useState("");
  //<------- Handle Mobile and Desktop Menu ------->
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  //<------- Handle Mobile and Desktop Menu ------->

  useEffect(() =>{
    if(session) {
      setName(session.user.name)
    }
  }, []);



//<----- generating Day Time ----->
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
//<----- generating Day Time ----->



const mobileMenuId = 'primary-search-account-menu-mobile';
const renderMobileMenu = (
  <StyledMenu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
    className={classes.x}
  >
    <MenuItem
    onClick={session ? signOut : signIn}
    >
      {session ? (<ListItemText primary="Sign Out" />) : (<ListItemText primary="Sign In" />)}
    </MenuItem>
    </StyledMenu>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.typography}>
            Good {dayTime} {session ? ", @ " + name : ""}
          </Typography>
          <Box borderRadius={10} className={classes.digitaltime}>
            <Typography variant="h5" className={classes.typography}>
              <DigitalTime/>
            </Typography>
          </Box>
          <div className={classes.sectionDesktop}>
          <Box>
              {session ? (<Button className={classes.loginOutButton} onClick={signOut}>Sign Out</Button>) : (<Button className={classes.loginOutButton} onClick={signIn} >Sign In</Button>)}
          </Box>
        </div>
        <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon className={classes.moreIconStyle}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
