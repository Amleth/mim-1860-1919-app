import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Box, Button, AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Documents from './components/Documents'
import Fiches from './components/Fiches'
import Fiche from './components/Fiche'
import Home from './components/Home'

const useStyles = makeStyles({
  bar: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& a': {
      margin: '0 5px',
    },
  },
})

export default function App() {
  const classes = useStyles()
  return (
    <Router basename="/mim-1860-1919">
      <AppBar position="static">
        <Toolbar className={classes.bar}>
          <Button
            color="inherit"
            aria-label="home"
            component={Link}
            to="/"
            startIcon={<i className="fas fa-home"></i>}
          >
            Accueil
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/documents"
            startIcon={<i className="fas fa-file-alt"></i>}
          >
            Documents
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/fiches"
            startIcon={<i className="fas fa-list"></i>}
          >
            Fiches
          </Button>
        </Toolbar>
      </AppBar>
      <Box m={2} />
      <div>
        <Switch>
          <Route exact path="/" children={Home} />
          <Route path="/documents" children={Documents} />
          <Route path="/fiches" children={Fiches} />
          <Route path="/fiche/:id" children={Fiche} />
        </Switch>
      </div>
    </Router>
  )
}
