import React, {createContext, useState} from 'react';


export const UserContext = createContext();

const UserProvider = ({children}) => {

   const [auth, setAuth] = useState(false);
   const [name, setName] = useState("");
   const [id, setId] = useState(0);

   return (
    <UserContext.Provider value={{auth, setAuth, name, setName, id, setId}}>
        {children}
    </UserContext.Provider>
   )
};

export default UserProvider;