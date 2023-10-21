import axios from "axios";

const fs = require("fs");
const path = require("path");
function loadQnaPairs() {
  const filePath = path.join(process.cwd(), "pages/api/qna_pairs.txt");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const qnaPairs = fileContents
    .split("\n")
    .map((line) => line.trim().split(": "));

  return qnaPairs;
}

export default async function handler(req, res) {
  const referer = req.headers.referer || req.headers.referrer;
  const qnaPairs = loadQnaPairs();

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method should be POST" });
  } else if (process.env.NODE_ENV !== "development") {
    if (!referer || referer !== process.env.APP_URL) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    try {
      const { body } = req;
      const url = "https://api.openai.com/v1/chat/completions";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      };

      const response = await axios.post(url, body, { headers: headers });

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}