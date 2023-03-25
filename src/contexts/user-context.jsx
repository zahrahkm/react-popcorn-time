import {createContext, useContext, useEffect, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase-utils";

//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null

});


export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            console.log(user)
            setCurrentUser(user)
        })
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
    //children means components that have access to value

}
//context has two pieces:
// 1.actual storage= which will build a context for us, and we passed the default value to it.
// 2.provider= is the actual component, so this UserProvider is going to be a functional component
// for each context that built for us, there is a ".Provider"
// and the Provider is the component that will wrap around any other components,
// that need access to the values inside.
//for example:
// <UserProvider>
//    <App/>
// </UserProvider>


//this provider is allowing any of its child components to access the value inside of its usedState



