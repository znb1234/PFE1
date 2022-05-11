import logo from './logo.svg';
import './App.css';
import Navbar from "./layouts/Navbar";
import {BrowserRouter as Router  , Switch , Route} from 'react-router-dom'
import Login from './views/Login'
import Register from "./views/Register";
import Contact from "./views/Contact";
import Feed from "./views/Feed";
import MySpace from "./views/MySpace";
function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>

                    <Route path="/register" component={Register}  />
                    <Route path="/contact" component={Contact}  />
                    <Route path="/home" component={Feed}  />
                    <Route path="/" component={Login}  />
                    <Route path="/MySpace" component={MySpace}  />
                </Switch>
            </Router>

        </div>
    );
}

export default App;