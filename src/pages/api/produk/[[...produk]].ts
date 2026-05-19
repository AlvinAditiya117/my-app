// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveProducts, retrieveProductById } from "../../../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const { produk } = req.query;

    // Jika ada ID produk: /api/produk/[id]
    if (produk && produk.length > 0) {
      const id = produk[0];
      const data = await retrieveProductById("products", id);
      if (!data) {
        return res.status(404).json({ status: false, status_code: 404, data: null });
      }
      return res.status(200).json({ status: true, status_code: 200, data });
    }

    // Tanpa ID: /api/produk
    const data = await retrieveProducts("products");
    res.status(200).json({ status: true, status_code: 200, data });
  } catch (error) {
    console.error("Error fetching from Firestore:", error);
    res.status(500).json({ status: false, status_code: 500, data: [] });
  }
}
