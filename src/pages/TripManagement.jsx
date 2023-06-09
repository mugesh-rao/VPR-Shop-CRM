import React from 'react'
import Layout from '../Layout/Layout'
import TripDataTable from '../components/Trip/TripDataTable'
import Loading from '../Layout/Loading'

function TripManagement() {
  return (
    <Layout>
      <TripDataTable />
      <Loading/>
    </Layout>
  )
}

export default TripManagement