"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Login from './login/page'
import DashBoard from './dashBoard/page'



 function Home() {
  return (
    <main>
      <DashBoard></DashBoard>
    </main>
  )
}
export default (Home)