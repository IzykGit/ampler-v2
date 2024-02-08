'use client'

import Link from "next/link";
import styles from './styles/homePage.module.css'
import { useEffect, useState } from "react";
import axios from "axios";



export default function Home() {

  const [data, setData] = useState([])

  useEffect(()  => {
    fetchFranchises()
  }, [])

  async function fetchFranchises() {
    const response = await axios.get('/api/sql/franchises', {
      headers: {
        'Accept': 'application/json',
      }
    })
    console.log(response)
  }

  console.log(data)


  return (
    <div>


        <div>
          <h1>Select Franchise</h1>
          <h3>This application is still in early development. Some features may be missing or broken, and your schedule may not be viewable.
              Please refer to the original posted schedule if you do not see your hours. Not all functions and designs are final.
          </h3>
        </div>



        <div className={styles.storeCardsContainer}>
          <Link href={{ pathname: "/franchise", query: {franchise_id: 1}}}>
              <div className={styles.storeCard}>
                <img src="/burgerKingLogo.jpg" alt='Burger King'/>
              </div>
          </Link>
          <Link href={{ pathname: "/franchise", query: {franchiseID: 2}}}>
              <div className={styles.storeCard}>
                <img src="/churchsChickenLogo.jpg" alt='Burger King'/>
              </div>
          </Link>
          <Link href={{ pathname: "/franchise", query: {franchiseID: 3}}}>
              <div className={styles.storeCard}>
                <img src="/littleCeasarsLogo.jpg" alt='Burger King'/>
              </div>
          </Link>
          <Link href={{ pathname: "/franchise", query: {franchiseID: 4}}}>
              <div className={styles.storeCard}>
                <img src="/tacoBellLogo.jpg" alt='Burger King'/>
              </div>
          </Link>
        </div>
    </div>
  );
}



