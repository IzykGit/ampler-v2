
import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "./db";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = "SELECT * FROM franchise";
        const result = await executeQuery(query)
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Welp" })
    }
}