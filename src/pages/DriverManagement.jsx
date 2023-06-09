import React from 'react'
import DriverDataTable from '../components/Driver/DriverDataTable'
import Layout from '../Layout/Layout'
import Loading from '../Layout/Loading'

function DriverManagement() {
        return (
                <Layout>
                        <DriverDataTable />
                        <Loading/>
                </Layout>
        )
}

export default DriverManagement