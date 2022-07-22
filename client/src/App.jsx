import logo from './logo.svg';
import './App.css';
import Navbar from "./layouts/Navbar";
import {BrowserRouter as Router  , Switch , Route} from 'react-router-dom'
import Login from './views/Login'
import Register from "./views/Register";
import Contact from "./views/Contact";
import Feed from "./views/Feed";
import MySpace from "./views/MySpace";
import TopThree from './views/TopThree';
import Users from './views/Users';
import Posts from './views/Posts';
import PublicRoute from "./Components/PublicRoute";
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./views/Dashboard";
function App() {
    //
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <PublicRoute restricted={true} path="/register" component={Register}  />
                    <PublicRoute restricted={false} path="/contact" component={Contact}  />
                    <PrivateRoute roles={['ROLE_ADMIN' , 'ROLE_USER']} path="/home" component={Feed}  />
                    <PrivateRoute roles={['ROLE_ADMIN' , 'ROLE_USER']} path="/MySpace" component={MySpace}  />
                    <PrivateRoute roles={['ROLE_ADMIN' , 'ROLE_USER']} path="/TopThree" component={TopThree}  />
                    <PrivateRoute roles={['ROLE_ADMIN' ]} path="/users" component={Users}  />
                    <PrivateRoute roles={['ROLE_ADMIN']} path="/posts" component={Posts}  />
                    <PrivateRoute roles={['ROLE_ADMIN']} path="/dashboard" component={Dashboard}  />
                    <PublicRoute restricted={true} path="/" component={Login}  />
                </Switch>
            </Router>

        </div>
    );
}

export default App;