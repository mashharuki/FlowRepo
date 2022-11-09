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
  const [name, setName] = useState('');
  const [transactionStatus, setTransactionStatus] = useState(null);

  useEffect(() => fcl.currentUser.subscribe(setUser), []);
  
  /**
   * AuthedState function
   * @returns 
   */
  const AuthedState = () => {
    return (
      <div>
        <div>Address: {user?.addr ?? "No Address"}</div>
        <div>Profile Name: {name ?? "--"}</div> 
        <div>Transaction Status: {transactionStatus ?? "--"}</div> 
        <button onClick={sendQuery}>Send Query</button><br/>
        <button onClick={initAccount}>Init Account</button><br/>
        <button onClick={executeTransaction}>Execute Transaction</button><br/>
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

  /**
   * sendQuery function
   */
  const sendQuery = async () => {
    // query
    const profile = await fcl.query({
      cadence: `
        import Profile from 0xProfile

        pub fun main(address: Address): Profile.ReadOnly? {
          return Profile.read(address)
        }
      `,
      args: (arg, t) => [arg(user.addr, t.Address)]
    })

    setName(profile?.name ?? 'No Profile')
  }

  /**
   * initAccount function
   */
  const initAccount = async () => {
    // mutate 
    const transactionId = await fcl.mutate({
      cadence: `
        import Profile from 0xProfile

        transaction {
          prepare(account: AuthAccount) {
            // Only initialize the account if it hasn't already been initialized
            if (!Profile.check(account.address)) {
              // This creates and stores the profile in the user's account
              account.save(<- Profile.new(), to: Profile.privatePath)

              // This creates the public capability that lets applications read the profile's info
              account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
            }
          }
        }
      `,
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 50
    })
    // tx send
    const transaction = await fcl.tx(transactionId).onceSealed()
    console.log(transaction)
  }

  /**
   * executeTransaction function
   */
  const executeTransaction = async () => {
    // mutate
    const transactionId = await fcl.mutate({
      cadence: `
        import Profile from 0xProfile
  
        transaction(name: String) {
          prepare(account: AuthAccount) {
            account
              .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
              .setName(name)
          }
        }
      `,
      args: (arg, t) => [arg("mashharuki", t.String)],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 50
    })
    // tx send
    fcl.tx(transactionId).subscribe(res => setTransactionStatus(res.status))
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