import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import EdgesFlow from '../components/examples/EdgesFlow'
import CustomLayout from '../components/examples/CustomLayout'
import HorizontalLayout from '../components/examples/HorizontalLayout'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BoilerPlan</title>
        <meta name="description" content="powered by boilerplan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HorizontalLayout/>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
