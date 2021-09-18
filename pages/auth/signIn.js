import React from 'react';
import {
  makeStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {
  providers,
  signIn,
  getSession,
  csrfToken
} from "next-auth/client";
import Box from '@material-ui/core/Box';









const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  signUpButton: {
    marginBottom: theme.spacing(1),
    color: "#f8f9fa",
    fontWeight: "300",
    background: 'rgba( 255, 255, 255, 0.2 )',
    boxShadow: '0 8px 32px 0 rgba( 233, 196, 106, 0.1 )',
    border: '1px solid rgba( 255, 255, 255, 0.3 )',
    backdropFilter: 'blur( 3.5px )',
    '&:hover': {
      background: 'rgba( 255, 255, 255, 0.5 )',
    },
  },
  Typography: {
    margin: theme.spacing(1),
    alignItems: "center",
    color: "#f8f9fa",
  },
  screenDiv: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
  },
  logInDiv: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "444px",
    padding: "12px 42px",
    flexDirection: "column",
    display: "flex",
    background: 'rgba( 255, 255, 255, 0.2 )',
    boxShadow: '0 8px 32px 0 rgba( 233, 196, 106, 0.1 )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.3 )',
    backdropFilter: 'blur( 3.5px )',
  },
  socialBox: {
    marginTop: theme.spacing(5),
    padding: "0 8px 0 8px",
    width: "100%",
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  emailTextField: {
    marginBottom: theme.spacing(1),
  }
}));

export default function SignIn({
  providers,
  csrfToken
}) {
  const classes = useStyles();

  return (
    <div className={classes.screenDiv}>
  <div className={classes.logInDiv}>
    <Box>
      <Typography className={classes.Typography} gutterBottom variant="h5" component="h2">
        Sign Up
      </Typography>
      <Box>
        <form className={classes.root} noValidate autoComplete="off" method='post' action='/api/auth/signin/email'>
          <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
          <div>
            <TextField className={classes.emailTextField} fullWidth label="Email Adress*"  type='email' id='email' name='email' />
          </div>
          <div>
          </div>
          <div>
            <Button className={classes.signUpButton} type='submit' fullWidth variant="contained" >
              Sign in with Email
            </Button>
          </div>
        </form>
      </Box>
    </Box>
    <Box className={classes.socialBox}>
      {Object.values(providers).map((provider) => {
      if (provider.name === "Email") {
      return;
      }
      return (
      <div key={provider.name}>
        <Button className={classes.signUpButton} fullWidth variant="contained" onClick={()=> signIn(provider.id)}>Sign in with {provider.name}</Button>
      </div>
      )
      })}
    </Box>
  </div>
</div>
  );
}

SignIn.getInitialProps = async (context) => {
  const {
    req,
    res
  } = context;
  const session = await getSession({
    req
  });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/HomeDashboard",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  };
};
