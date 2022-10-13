import React, {useState, useEffect} from "react"
import styled from "styled-components"
import * as fcl from "@onflow/fcl"

const Card = styled.div`
  margin: 10px 5px;
  padding: 10px;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
`

/**
 * SignInOutButton Component
 * @param {*} param0 
 * @returns 
 */
const SignInOutButton = ({ user: { loggedIn } }) => {

    /**
     * signInOrOut function
     * @param {*} event 
     */
    const signInOrOut = async (event) => {
        event.preventDefault()

        if (loggedIn) {
            fcl.unauthenticate()
        } else {
            fcl.authenticate()
        }
    }

    return (
        <button onClick={signInOrOut}>
            {loggedIn ? 'Sign Out' : 'Sign In/Up'}
        </button>
    )
}

/**
 * CurrentUser Component
 */
const CurrentUser = () => {
    // state variable
    const [user, setUser] = useState({})

    useEffect(() =>
        fcl
        .currentUser()
        .subscribe(user => setUser({...user}))
    , [])

    return (
        <Card>
            <SignInOutButton user={user} />
        </Card>
    )
}

export default CurrentUser
