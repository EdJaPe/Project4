import Head from 'next/head'
import Toolbar from '../component/toolbar'
import styles from '../styles/Home.module.css'

export default function Index() {
  return (
    <div className={styles.container}>
     <Toolbar/>
      <h1>AchOO!</h1>
    </div>
  )
}
