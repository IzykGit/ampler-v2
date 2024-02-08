'use client'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/component-styles/S3Retrieve.module.css'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();


const s3Client = new S3Client({
    endpoint: "https://us-east-1.linodeobjects.com",
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.LINODE_ACCESS_KEY!,
        secretAccessKey: process.env.LINODE_SECRET_KEY!,
    }
})

const S3Retrieve = ({storeID, firstName, lastName}: {storeID: number, firstName: string, lastName: string}) => {

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pdfFile, setPdfFile] = useState<Blob | null>(null);

    useEffect(() => {
        const fetchPDF = async () => {
            try {

                const params = {
                    Bucket: 'amplerbucket',
                    Key: `${storeID}.pdf`,
                };
          
                const response = await s3Client.send(new GetObjectCommand(params));
          
                const arrayBuffer = await new Response(response.Body as Blob).arrayBuffer();
                const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });
                setPdfFile(pdfBlob);

            }   catch (error) {
                console.error("Error fetching PDF:", error);
            }
        }

        fetchPDF()
    }, [storeID])

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <div className={styles.displayContainer}>
        <div>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"></meta>
          <h3>
            Page {pageNumber} of {numPages}
          </h3>
          <button className={styles.togglePageBtn} onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
            Previous Page
          </button>
          <button className={styles.togglePageBtn} onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages!}>
            Next Page
          </button>
        </div>
        <div className={styles.scheduleContainer}>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page width={1000} pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    )
}

export default S3Retrieve