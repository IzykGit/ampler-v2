'use client'

import { useState } from "react"



export default function UploadForm() {
    const storeId = 14392

    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    const resultElement = typeof window !== "undefined" ? window.document.getElementById('fileResult') : null;



    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
        if(resultElement) {
            resultElement.innerHTML = ""
        }
    }




    const handleSubmit =  async (e: any) => {
        e.preventDefault();



        if(!file) {
            return
        }


        
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file)

        console.log(formData)

        const isFileNameValid = () => {
            const file = formData.get("file") as File | null
    
            if(file) {
                const expectedFileName = `${storeId}.pdf`
                return file.name.replace(/\D/g, '') === expectedFileName.replace(/\D/g, '')
            }
    
            return false;
        }

        if(!isFileNameValid() && resultElement) {
            return resultElement.innerHTML = "File name must match store number!"
         }

        try {

            const response = await fetch(`/api/S3/upload`, {
                method: "POST",
                body: formData
            });

            
            const data = await response.json()
            console.log(data.status);


            setUploading(false);
            setFile(null)
            resultElement!.innerHTML = "Successfuly Uploaded"
            return response

        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }



    return (

        <div>
            <h1>Upload to S3</h1>


            <form onSubmit={handleSubmit}>
                <input type="file" accept=" application/*" onChange={handleFileChange} />
                <button type="submit" disabled={!file || uploading}>{uploading ? "Uploading..." : "Upload"}</button>
                <h5 id="fileResult"></h5>
            </form>
        </div>
    )
}