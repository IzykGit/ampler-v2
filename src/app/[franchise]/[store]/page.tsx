import S3Retrieve from '@/app/api/S3/S3Retrieve'
import React from 'react'

const Store = () => {

  const data = {
    storeID: 14392,
    firstName: "Lance",
    lastName: "Hemphill"
  }
  
  return (
    <div>
        <S3Retrieve storeID={data.storeID} firstName={data.firstName} lastName={data.lastName}/>
    </div>


  )
}

export default Store