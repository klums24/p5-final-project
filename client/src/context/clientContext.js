import {useContext, useState, createContext, useEffect,} from "react"
import { useHistory } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import NewClientForm from "../components/NewClientForm";


const ClientContext = createContext()

const ClientProvider = ({children}) => {

    const [currentClient, setCurrentClient] = useState(null);
    const [showSigninForm, setShowSigninForm] = useState(false);
    const history = useHistory()

    const saveClient = (new_client) => {
        setCurrentClient(new_client);
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

    

    const handleToggleForm = () => {
        setShowSigninForm(value => !value);
    };
    
    
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

    const handleSignOutClick= () => {
        fetch("/signout", {method: "DELETE"})
        .then(() => {
        setCurrentClient(null);   
        },);
    }

    

    if (!currentClient) {
        return (
            <>
                
                {showSigninForm ? <SignInForm saveClient={saveClient} handleToggleForm={handleToggleForm} /> : <NewClientForm saveClient={saveClient} handleToggleForm={handleToggleForm} />}
                
            </>
        );
    }

    return (
        <ClientContext.Provider value={{currentClient, handleDeleteAccountClick, handleSignOutClick, saveClient}}>
            {children}
        </ClientContext.Provider>

    )
}

export {ClientContext, ClientProvider}