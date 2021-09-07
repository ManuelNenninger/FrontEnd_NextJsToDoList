import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import React, {useState, useEffect} from "react";
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Navbar from "../Navbar";
import {useSession} from "next-auth/client";
import Link from 'next/link';



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

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


export default function Home() {
  const classes = useStyles();
  const [newlistItem, setNewListItem] = useState({"Titel": ''});
  const [listItems, setlistItems] = useState([]);
  const [checked, setChecked] = React.useState([1]);
  //Zieht die Coockie Session aus dem Browser
  const [session, loading] = useSession()


  //Initiale zuweisung der DB Daten an ListItems
  //For Development use localhost of server
  //For deployment use https://guarded-waters-13481.herokuapp.com/api/list
  //Senden der Session. Die API entscheidet, ob der User bereits eine Datenbank (Document) besitzt oder nicht. Falls nein, neues erstellen, falls ja,
  //Derzeitiges zurücksenden
  useEffect(() => {

    const InitialRequestFunction = async event => {
      const response = await fetch(`https://guarded-waters-13481.herokuapp.com/api/list`, {
            body: JSON.stringify(
              session
            ),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }
        );
        const res = await response.json();
        setlistItems(res.[0].UserListItems);
    }

    // fetchData();
    InitialRequestFunction();
    //Updated bei jeder Session änderung und initialem laden.
  }, [session])





//Der Input in das Textfeld wird dem Hook-State zugewiesen.
function inputHandler(event){
  const {value} = event.target;
  setNewListItem({"Titel": value})
}

//Post-Request an den Server um Daten weiter an DB zu uebermitteln
//Async Funktion, da await und fetch verwendet wird (ua Promise)
//await da auf die antwort aus API gewartet werden muss, bevor JS-Code weiter fortgesetzt wird
//For deployment use https://guarded-waters-13481.herokuapp.com/api/list/add
const ClickHandler = async event => {

    const response = await fetch(`https://guarded-waters-13481.herokuapp.com/api/list/add`, {
          body: JSON.stringify(
            {session, newlistItem}
          ),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      );
      if(!response.ok) {
        console.log("The Add Request was not sucessfull");
      } else {
        setNewListItem({"Titel": ''});
      }
      const res = await response.json();
      //Hier wird das neue upgedatete Array uebergeben
      setlistItems(res.UserListItems);
}


//Post-Request an den Server um Daten weiter an DB zu uebermitteln
//Async Funktion, da await und fetch verwendet wird (ua Promise)
//await da auf die antwort aus API gewartet werden muss, bevor JS-Code weiter fortgesetzt wird
// DeleteRequestHandler
//For deployment use https://guarded-waters-13481.herokuapp.com/api/list/delete
const DeleteHandler = async event => {
  console.log("delete req was made");
  console.log("The event id is: " + event._id);

    const response = await fetch(`https://guarded-waters-13481.herokuapp.com/api/list/delete`, {
          body: JSON.stringify(
            {session, "id": event._id}
          ),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      );
      if(!response.ok) {
        console.log("The Delete Request was not sucessfull");
        }
      const res = await response.json();
      //Hier wird das neue upgedatete Array uebergeben
      setlistItems(res.UserListItems);

}


const handleToggle = (value) => () => {
   const currentIndex = checked.indexOf(value);
   const newChecked = [...checked];
   if (currentIndex === -1) {
     newChecked.push(value);
     DeleteHandler(value);
   } else {
     newChecked.splice(currentIndex, 1);
   }
   setChecked(newChecked);
 };


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
         <div >
     <List className={classes.root} component="nav" aria-label="secondary mailbox folders">
       <form className={classes.textFieldRoot} noValidate autoComplete="off">
         <div className="row">
           <div className="col-9 justify-content-evenly">
             <TextField
               value={newlistItem.Titel}
               fullWidth
               id="standard-basic"
               label="Any new Notes?"
               placeholder="Notes"
               InputLabelProps={{
                 shrink: true,
               }}
               onChange={inputHandler} />
           </div>
           <div className="col-1 justify-content-evenly">
             <IconButton className={classes.saveButton} onClick={ClickHandler} aria-label="delete">
               <AddCircleOutlineIcon fontSize="large"/>
             </IconButton>
           </div>
       </div>
       <Divider variant="middle" />
       </form>
       {
         listItems.map((listInhalt, index) => (
           <>
           <ListItem key={index} button>
             <ListItemText primary={listInhalt.Note} />
           <ListItemSecondaryAction>
             <Checkbox
               edge="end"
               onChange={handleToggle(listInhalt)}
               checked={checked.indexOf(listInhalt) !== -1}
             />
           </ListItemSecondaryAction>
           </ListItem>
           <Divider />
         </>
         ))
       }
     </List>
   </div>
       </div>
     </main>
   </div>
   </>
 )
 }
