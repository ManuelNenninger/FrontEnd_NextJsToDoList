import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import React, {useState, useEffect} from "react";
import Navbar from "../src/components/Navbar";
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/client"
import Button from '@material-ui/core/Button';






//<--- Styles --->
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: 'rgba( 255, 255, 255, 0.2 )',
    boxShadow: '0 8px 32px 0 rgba( 233, 196, 106, 0.1 )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.3 )',
    backdropFilter: 'blur( 3.5px )',
    margin: theme.spacing(2),
    maxHeight: '30rem',
  },
  textFieldRoot: {
    margin: theme.spacing(2),
  },
  saveButton: {
    marginRight: theme.spacing(0),
  },
  overFlowContainer: {
    overflow: 'scroll',
  }
}));

//<--- Next / React Code --->




export default function Home() {
  const classes = useStyles();
  const [session, loading] = useSession()






  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <Head>
        <title>To Do List in Next</title>
        <meta name="description" content="To Do List in Next" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
      </Head>
      <main >
        <div className="container ">
          {
            !session && (
            <>
              Not signt in <br />
              <Button className={classes.saveButton} onClick={signIn} variant="contained">Sign In</Button>
            </>
            )
          }
          {
            session && (
              <>
              You are signed in as {session.user.email}
              <h1 className="title">
                <Link href="/HomeDashboard">
                  <a>Go to Home Page</a>
                </Link>
              </h1>
              <br />
              <Button className={classes.saveButton} onClick={signOut} variant="contained">Sign Out</Button>
              </>
            )
          }

        </div>
      </main>
    </div>
    </>
  )
}
