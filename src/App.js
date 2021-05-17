import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import Home from './components/main/Home'
import HolidayDisplay from './components/main/HolidayDisplay'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/holidays/:id/:year" component={HolidayDisplay} />
      </Switch>
    </Router>
  )
}

export default App
