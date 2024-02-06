'use client'
import S3Upload from '@/app/api/S3/S3Upload'
import React from 'react'

const AdminPanel = () => {
  const storeId = 14392

  return (
    <div>
        <S3Upload storeId={storeId}/>
    </div>
  )
}

export default AdminPanel