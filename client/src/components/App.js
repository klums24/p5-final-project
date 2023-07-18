import React from 'react';
import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import NewClientForm from './NewClientForm';
import SigninForm from './SignInForm';
import ClientProfile from './ClientProfile'
import EditProfileForm from './EditProfileForm';
import TrainerCollection from './TrainerCollection';
import NewExerciseForm from './NewExerciseForm';
import {UserContext} from './UserContext';
import ContactUsForm from './ContactUsForm';
import NewWorkoutForm from './NewWorkoutForm';



function App() {

    const history = useHistory();
    const [currentClient, setCurrentClient] = useState(null);
    const [showSigninForm, setShowSigninForm] = useState(false);
    const [trainers, setTrainers] = useState([])

    

    useEffect(() => {
        fetch("/trainers")
        .then(response => {
            if (response.ok) {
                response.json()
                .then(data => {
                    setTrainers(data)
                })
            }
        })
    }, [])

    const saveClient = (new_client) => {
        setCurrentClient(new_client);
    };

    const handleToggleForm = () => {
        setShowSigninForm(value => !value);
    };

    const handleEditProfileClick = () => {
        history.push(`/clients/${currentClient.id}/edit-profile`);
    };

    const handleTrainersClick = () => {
        history.push('/trainers');
    };
    
    const handleCreateWorkoutClick = () => {
        history.push('/create-workout');
    };

    const handleContactUsClick = () => {
        history.push('/contact-us')
    }
    
    const handleDeleteAccountClick = () => {
        fetch(`/clients/${currentClient.id}`, {
          method: "DELETE"
        })
        .then(response => {
          if (response.ok){
            saveClient(null)    
          }
        })
        .catch(e => console.error(e))
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
            <UserContext.Provider>
              <Route exact path="/">
                <ClientProfile
                  handleSignOutClick={handleSignOutClick}
                  currentClient={currentClient}
                  saveClient={saveClient}
                  handleEditProfileClick={handleEditProfileClick}
                  handleTrainersClick={handleTrainersClick}
                  handleCreateWorkoutClick={handleCreateWorkoutClick}
                  handleDeleteAccountClick={handleDeleteAccountClick}
                  handleContactUsClick={handleContactUsClick}
                />
              </Route>
              <Route path="/clients/:id/edit-profile">
                <EditProfileForm
                  handleSignOutClick={handleSignOutClick}
                  currentClient={currentClient}
                  saveClient={saveClient}
                  handleEditProfileClick={handleEditProfileClick}
                  handleTrainersClick={handleTrainersClick}
                  handleCreateWorkoutClick={handleCreateWorkoutClick}
                  handleDeleteAccountClick={handleDeleteAccountClick}
                />
              </Route>
              <Route path="/trainers">
                <TrainerCollection
                  trainers={trainers}
                  handleSignOutClick={handleSignOutClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleTrainersClick={handleTrainersClick}
                  handleCreateWorkoutClick={handleCreateWorkoutClick}
                  handleDeleteAccountClick={handleDeleteAccountClick}
                />
              </Route>
              <Route path="/create-workout/:trainerId">
                <NewWorkoutForm trainers={trainers} />
              </Route>
              <Route path="/contact-us">
                <ContactUsForm />
              </Route>
            </UserContext.Provider>
          </Switch>
        </div>
      );
      
}

export default App;
