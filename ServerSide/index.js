const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {marked} = require("marked")


const app = express();


app.use(bodyParser.json());
app.use(cors());


app.post("/convert", (req, res) => {
  const { markdown } = req.body;

  if (!markdown) {
    return res.status(400).send({ error: "Markdown content is required" });
  }

  const html = marked(markdown);
  res.send({ html });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
