import { Box } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { List } from '@material-ui/core'
import { ListItem } from '@material-ui/core'
import { ListItemText } from '@material-ui/core'
import { ListItemAvatar } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
// import { ViewList as ViewListIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { DeveloperMode as DeveloperModeIcon } from '@material-ui/icons'
import React from 'react'
import { withRouter } from 'react-router'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    flexGrow: 1,
  },
  list: {
    margin: 0,
    padding: 0,
    '& li': {
      margin: 0,
      marginBottom: theme.spacing(2),
      padding: 0,
    },
  },
}))

function Home() {
  const classes = useStyles()
  return (
    <Container maxWidth="md">
      <Box pt={5} pb={10}>
        <Typography variant="h3" component="h1" align="center">
          Marques d'instruments de musique (1860-1919)
        </Typography>
        <br />
        <Typography variant="h5" component="h1" align="center">
          Les marques de fabrique des facteurs d'instruments de musique déposées
          au greffe du Tribunal de Commerce de Paris de 1860 à 1919 (Archives de
          Paris)
        </Typography>
      </Box>
      <Grid container className={classes.gridContainer} spacing={10}>
        <Grid item xs={7}>
          <Typography variant="body1" color="textSecondary" align="justify">
            …
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <List className={classes.list}>
            <ListItem disableGutters={true}>
              <ListItemAvatar>
                <Avatar>
                  <SearchIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Malou Haine"
                secondary="Responsable scientifique"
              />
            </ListItem>
            <ListItem disableGutters={true}>
              <ListItemAvatar>
                <Avatar>
                  <SearchIcon />
                  {/* <ViewListIcon /> */}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Alban Framboisier"
                secondary="Administrateur de la base"
              />
            </ListItem>
            <ListItem disableGutters={true}>
              <ListItemAvatar>
                <Avatar>
                  <DeveloperModeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Thomas Bottini" secondary="Développeur" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export default withRouter(Home)
