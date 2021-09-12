import React, {useState, useEffect} from "react";
import {useSession} from "next-auth/client";
import Link from 'next/link';
import ToDoList from "../src/components/ListComponents/ToDoList";
import NotLogedIn from "../src/components/auth/NotLogedIn"
import {
  providers,
  getSession,
  csrfToken
} from "next-auth/client";





//<--- Styles --->


//<--- Next / React Code --->

export default function Home() {
  //Zieht die Coockie Session aus dem Browser
  const [session, loading] = useSession()



//Macht eine API Call um die aktuelle Session zu bekommen. Wird nicht benötigt, da Du hier auch useSession verwendest.
  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch("/api/secret");
      const response = await res.json();
      if(response.content) {
        console.log(response.content);
        console.log(session);
      }
    }
    fetchData();
  }, [session])


//Wenn eine Session vorhanden ist, dann zeig die ToDoList. Ansonsten zeige an, dass keine Session da ist.
return (
  <>
  {session ? (<ToDoList /> ): (<NotLogedIn />)}
  </>
)
}
