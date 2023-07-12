import React from 'react';
import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import NewClientForm from './NewClientForm';
import SigninForm from './SignInForm';
import ClientProfile from './ClientProfile'

function App() {

    const [currentClient, setCurrentClient] = useState(null);
    const [showSigninForm, setShowSigninForm] = useState(false);

    const saveClient = (new_client) => {
        setCurrentClient(new_client);
    };

    const handleToggleForm = () => {
        setShowSigninForm(value => !value);
    };

    useEffect(() => {
        fetch("/check-user")
        .then(response => {
          if (response.ok){
            response.json()
            .then(saveClient)
          }
        })
    }, [])

    const handleSignOutClick= () => {
        fetch("/signout", {method: "DELETE"})
        .then(() => {
        setCurrentClient(null);   
        },);
    }

    if (!currentClient) {
        return (
            <>
                {showSigninForm ? <SigninForm saveClient={saveClient} handleToggleForm={handleToggleForm} /> : <NewClientForm saveClient={saveClient} handleToggleForm={handleToggleForm} />}
            </>
        );
    }

    return (
        <div>
            <Switch>
                <Route exact path ="/profile">
                    <ClientProfile handleSignOutClick={handleSignOutClick}/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
