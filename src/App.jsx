import React, {useContext} from 'react';
import PublicRoutes from './Routes/public.routes';
import PrivateRoutes from './Routes/private.routes';
import { UserContext } from './Contexts/UserContext';

function App() {
  const {auth, name, id} = useContext(UserContext);

  return(
    auth ? <PrivateRoutes /> : <PublicRoutes />
 )
}

export default App;
