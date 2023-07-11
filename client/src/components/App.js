import React from 'react';
import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import NewClientForm from './NewClientForm';
import SigninForm from './SignInForm';

function App() {

    const [currentClient, setCurrentClient] = useState(null);
    const [showSigninForm, setShowSigninForm] = useState(false);

    const saveClient = (new_client) => {
        setCurrentClient(new_client);
    };

    const handleToggleForm = () => {
        setShowSigninForm(value => !value);
    };

    if (!currentClient) {
        return (
            <>
                {showSigninForm ? <SigninForm saveClient={saveClient} handleToggleForm={handleToggleForm} /> : <NewClientForm saveClient={saveClient} handleToggleForm={handleToggleForm} />}
            </>
        );
    }

    return (
        <div>App</div>
    );
}

export default App;
