import Navbar from '../components/Navbar';
import { Provider } from 'react-redux';
import Main from './Main';
import configureStore from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import {setCurrentUser ,setAuthorizationToken} from '../store/actions/auth';
import jwtDecode from 'jwt-decode';
const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  //prevent someone from manually tamering from the key
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  }catch(e){
    store.dispatch(setCurrentUser({}));
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
