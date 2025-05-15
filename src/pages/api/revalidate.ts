import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string,
    status: number,
};

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {  
    const { path } = req.body
  
    try {
      await res.revalidate(path)
      return res.json({ message: 'revalidated: true',status:200})
    } catch (err) {
      return res.status(500).json({ message: 'Failed to revalidate path',status:500 })
    }
  }