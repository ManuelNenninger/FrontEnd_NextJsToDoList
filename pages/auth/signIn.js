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
  textField: {
    marginBottom: theme.spacing(1),
  },
  Typography: {
    margin: theme.spacing(1),
    alignItems: "center",
  },
  green: {
    color: '#fff',
    backgroundColor: "#8ecae6",
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
    paddingLeft: "24px",
    paddingRight: "24px",
    flexDirection: "column",
    display: "flex",
  },
  socialBox: {
    marginTop: theme.spacing(5),
    padding: "0 8px 0 8px",
    width: "100%",
    paddingLeft: "24px",
    paddingRight: "24px",
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
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
    <Box className={classes.logInDiv}>
      <Avatar className={classes.green}>
        <FormatListBulletedIcon />
      </Avatar>
      <Typography className={classes.Typography} gutterBottom variant="h5" component="h2">
        To Do List
      </Typography>
      <Box>
        <form className={classes.root} noValidate autoComplete="off" method='post' action='/api/auth/signin/email'>
          <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
          <div>
            <TextField className={classes.textField} fullWidth label="Email Adress*" variant="outlined" type='email' id='email' name='email' />
          </div>
          <div>
          </div>
          <div>
            <Button type='submit' fullWidth variant="contained" color="primary">
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
        <Button className={classes.textField} fullWidth variant="contained" color="primary" onClick={()=> signIn(provider.id)}>Sign in with {provider.name}</Button>
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
