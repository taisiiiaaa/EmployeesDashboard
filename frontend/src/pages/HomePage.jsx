import React from 'react'
import Header from '../components/Header'
import { Heading, Text } from '../styled-components/components'

export default function HomePage() {
  return (
    <>
        <Header />
        <Heading>Welcome to Employees Dashboard</Heading>
        <Text>Manage departments and employees at a few clicks</Text>
    </>
  )
}
