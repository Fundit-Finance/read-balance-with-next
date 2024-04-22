// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const { API_KEY, CLIENT_ID, BASE_URL } = process.env;

      if (!API_KEY || !CLIENT_ID || !BASE_URL) {
        throw new Error(
          "API_KEY, CLIENT_ID or BASE_URL missing in env.local file"
        );
      }

      const balance = await axios.get(
        `${BASE_URL}/api/receiver/${process.env.CLIENT_ID}`,
        {
          headers: {
            apiKey: process.env.API_KEY,
            clientId: process.env.CLIENT_ID,
          },
        }
      );

      return res.status(200).json(balance.data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  return res.status(200).json({ success: "This is not relevant for our code" });
}
