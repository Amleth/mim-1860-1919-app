import { CircularProgress, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'

const query = (id) => `
{
  mim_1860_1919(limit: 1000, filter: { numero_de_fiche: { _eq: ${id} } }) {
    date_de_depot
    description
    image {
      id
    }
    greffe_du_tribunal_de_commerce
    id
    specialite
    nom
  }
}
`

function Fiche({ history, match }) {
  const classes = useStyles()
  const id = match.params.id

  const [data, setData] = useState({})

  useEffect(() => {
    async function fetchData() {
      await fetch(process.env.REACT_APP_GRAPHQL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: query(id),
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          setData(data.data.mim_1860_1919[0])
        })
    }

    fetchData()
  }, [id])

  if (Object.entries(data).length === 0) {
    return (
      <Container maxWidth="md" align="center">
        <CircularProgress />
      </Container>
    )
  } else {
    return (
      <Container maxWidth="md" className={classes.root}>
        <h1 dangerouslySetInnerHTML={{ __html: data.nom }} />
        <div>
          <div>
            <h2>Spécialité</h2>
            <div dangerouslySetInnerHTML={{ __html: data.specialite }} />
          </div>
          <div>
            <h2>Greffe du tribunal de commerce</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: data.greffe_du_tribunal_de_commerce,
              }}
            />
          </div>
          <div>
            <h2>Date de dépôt</h2>
            <div dangerouslySetInnerHTML={{ __html: data.date_de_depot }} />
          </div>
          <div>
            <h2>Description</h2>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
        </div>
        <div className={classes.pictureContainer}>
          <img
            alt="Marque"
            src={process.env.REACT_APP_ASSETS + data.image.id}
          />
        </div>
      </Container>
    )
  }
}

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& h2': {
        marginBottom: 0,
      },
    },
    pictureContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(6),
      '& img': {
        boxShadow: '1px 1px 3px 1px rgba(0,0,0,0.3)',
      },
    },
  }
})

export default withRouter(Fiche)
