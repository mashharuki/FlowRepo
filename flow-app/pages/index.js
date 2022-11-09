import "../flow/config";
import Header from './../components/Header';
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

/**
 * Home component
 * @returns 
 */
export default function Home() {

  const [user, setUser] = useState({loggedIn: null});

  useEffect(() => fcl.currentUser.subscribe(setUser), []);
  
  /**
   * AuthedState function
   * @returns 
   */
  const AuthedState = () => {
    return (
      <div>
        <div>Address: {user?.addr ?? "No Address"}</div>
        <button onClick={fcl.unauthenticate}>Log Out</button>
      </div>
    )
  }

  /**
   * UnauthenticatedState function
   * @returns 
   */
  const UnauthenticatedState = () => {
    return (
      <div>
        <button onClick={fcl.logIn}>Log In</button>
        <button onClick={fcl.signUp}>Sign Up</button>
      </div>
    )
  }

  return (
    <div>
      <Header/>
      <h1>Flow App</h1>
      {user.loggedIn
        ? <AuthedState />
        : <UnauthenticatedState />
      }
    </div>
  )
}