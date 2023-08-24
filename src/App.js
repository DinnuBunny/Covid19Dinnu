import {Route, Switch, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'
import About from './components/About'
import Home from './components/Home'
import StateSpecific from './components/StateSpecific'
import Vaccination from './components/Vaccination'
import './App.css'

// ccbp publish RJSCPAUCLT dinnuCovid.ccbp.tech
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/vaccination" component={Vaccination} />
      <Route exact path="/state/:stateCode" component={StateSpecific} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
