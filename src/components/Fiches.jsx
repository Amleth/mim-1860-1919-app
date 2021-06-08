import { Container } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'
import MaterialTable from 'material-table'
import React from 'react'
import { useEffect, useState } from 'react'
import { withRouter } from 'react-router'

const query = `
{
  mim_1860_1919(limit: 2000) {
    numero_de_fiche
    nom
    specialite
    adresse_et_mandataire_eventuel
    greffe_du_tribunal_de_commerce
    date_de_depot
  }
}        
`

function Fiches({ history }) {
  const [data, setData] = useState([])

  async function fetchData() {
    await fetch(process.env.REACT_APP_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        const d = data.data.mim_1860_1919.map((o) =>
          Object.fromEntries(
            Object.entries(o).map(([k, v]) => {
              return [
                k,
                typeof v === 'string' || v instanceof String
                  ? v.replace(/<[^>]+>/g, '')
                  : v,
              ]
            })
          )
        )
        setData(d)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return data.length === 0 ? (
    <Container maxWidth="md" align="center">
      <CircularProgress />
    </Container>
  ) : (
    <MaterialTable
      title=""
      columns={[
        { title: 'Numéro de fiche', field: 'numero_de_fiche' },
        { title: 'Nom', field: 'nom' },
        { title: 'Spécialité', field: 'specialite' },
        {
          title: 'Adresse et mandataire éventuel',
          field: 'adresse_et_mandataire_eventuel',
        },
        {
          title: 'Greffe du tribunal de commerce',
          field: 'greffe_du_tribunal_de_commerce',
        },
        { title: 'Date de dépôt', field: 'date_de_depot' },
      ]}
      options={{
        pageSize: 50,
        pageSizeOptions: [20, 50, 100],
        filtering: true,
        sorting: true,
        cellStyle: { paddingBottom: '0.3em', paddingTop: '0.3em' },
        headerStyle: { paddingBottom: '0.3em', paddingTop: '0.3em' },
      }}
      data={data}
      onRowClick={(evt, selectedRow) => {
        const id = selectedRow.numero_de_fiche
        history.push('/fiche/' + id)
      }}
    ></MaterialTable>
  )
}

export default withRouter(Fiches)
