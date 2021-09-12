import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import React, {useState, useEffect} from "react";
import Navbar from "../src/components/Navbar";
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/client"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Avatar from '@material-ui/core/Avatar';
import {
  providers,
  getSession,
  csrfToken
} from "next-auth/client";






//<--- Styles --->
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    background: 'rgba( 255, 255, 255, 0.2 )',
    boxShadow: '0 8px 32px 0 rgba( 233, 196, 106, 0.1 )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.3 )',
    backdropFilter: 'blur( 3.5px )',
  },
  title: {
    display:"flex",
    justifyContent: "center",
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: theme.spacing(2),
  },
  boxClass: {
    minHeight: "100vh",
    flexDirection: "column",
  },
}));

//<--- Next / React Code --->




export default function Home() {
  const classes = useStyles();
  const [session, loading] = useSession()






  return (
    <>
    <Navbar />
    <div >
      <Head>
        <title>To Do List in Next</title>
        <meta name="description" content="To Do List in Next Js Sign in" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
      </Head>
      <main>
        <Box className={classes.boxClass} display="flex" justifyContent="center" alignItems="center" textAlign= "center">
          <Card className={classes.root} >
            <Box class={{flexDirection: "column"}} display="flex" justifyContent="center" alignItems="center" >
              <CardContent>
                <Box  display="flex" justifyContent="center" alignItems="center" >
                  <Avatar className={classes.avatar}>
                    <FormatListBulletedIcon />
                  </Avatar>
                </Box>
                <Typography className={classes.title} variant="h4" component="h2"  gutterBottom>
                  To Do List
                </Typography>
                <Typography className={classes.title} color="textSecondary" variant="h6" component="h2"  gutterBottom>
                  A simple To-Do-List for your daily life.
                </Typography>
              </CardContent>
              <Box>
                <CardActions>
                  {!session &&(
                    <>
                      <Button onClick={signIn} variant="contained" color="primary" >Sign in</Button>
                    </>
                  )}
                  {session &&(
                    <>
                      <h5 className="title">
                        <Link href="/HomeDashboard">
                          <a>Go to your To-Do-List Page</a>
                        </Link>
                      </h5>
                    </>
                  )}
                </CardActions>
              </Box>
            </Box>
          </Card>
        </Box>
      </main>
    </div>
    </>
  )
};

//Wenn eine Session vorhanden ist, leite Ihn direkt weiter zum Dashboard. Wenn nicht, setze Session als undefiniert, etc.
Home.getInitialProps = async (context) => {
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
