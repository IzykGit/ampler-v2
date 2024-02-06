'use client'
import React from 'react'
import { useState } from 'react'


const S3Upload = (storeId: any) => {

    const [file, setFile] = useState(null)

    function handleFileChange(e: any) {
        setFile(e.target.files[0])
    }

    async function handleSubmit(e: any) {
        e.preventDefault();

        if(!file) {
            console.log("Please select a file to upload")
            return
        }



        const formData = new FormData();
        formData.append('file', file)

        console.log(formData)
        
        console.log(file)

        try {
            const response = await fetch('/api/S3/upload', {
                method: "POST",
                body: formData
            })

            console.log(response)

            if (response.ok) {
                console.log('File uploaded successfully');
              } else {
                console.log('Failed to upload file');
            }

            setFile(null)

        } catch (error) {
            console.error('Error uploading file:', error);
            console.log('Error uploading file');
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleFileChange} accept='application/*' type='file' name={`${storeId}`}/>
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}

export default S3Upload