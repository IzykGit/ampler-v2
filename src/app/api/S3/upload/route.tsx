
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import dotenv from 'dotenv';
dotenv.config();






const s3Client = new S3Client({
    endpoint: "https://us-east-1.linodeobjects.com",
    region: process.env.LINODE_REGION!,
    credentials: {
        accessKeyId: process.env.LINODE_ACCESS_KEY!,
        secretAccessKey: process.env.LINODE_SECRET_KEY!,
    }
})



async function uploadFileToS3(file: any, fileName: any) {
    

    const params = {
        Bucket: process.env.LINODE_BUCKET_NAME!,
        Key: `${fileName}`,
        Body: file,
        ContentType: "application/pdf", 
    };

    const command = new PutObjectCommand(params)
    await s3Client.send(command);
    return fileName;
}



export async function POST(request: any) {


 try {

        const formData = await request.formData();
        const file = formData.get("file")
        console.log(file)

        if(!file) {
            return NextResponse.json( {error: "File is required." }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer, file.name)

        return NextResponse.json({ success: true, fileName })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error })
    }

}
