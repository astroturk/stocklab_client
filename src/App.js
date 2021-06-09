import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './components/dashboard/context/DataContext'

import Home from './components/home_screen/Home'
import Login from './components/auth_screen/login'
import Register from './components/auth_screen/register'
import Dashboard from './components/dashboard/dashboard'
import ProtectedRoute from './components/dashboard/protectedRoute'

import './styles/app.css'
import 'typeface-montserrat'
import {ThemeProvider, createMuiTheme } from '@material-ui/core/styles' 


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ffffff',
      dark: '#ffffff',
    },
    secondary: {main: '#323232',},
  },
  typography: {
    fontFamily: [
      "'Montserrat'",
      'sans-serif',
    ].join(','),
  }
})


function App() {
  return (
    <ThemeProvider theme={theme}>
        <Router>
        <AuthProvider>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/auth/login'>
              <Login />
            </Route>
            <Route exact path='/auth/register'>
              <Register />
            </Route>
            <DataProvider>
              <ProtectedRoute path='/dashboard' component={Dashboard}/>
            </DataProvider>
          </Switch>
        </AuthProvider>
        </Router>
    </ThemeProvider>
  );
}

export default App
