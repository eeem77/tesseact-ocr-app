const express = require('express')
const tesseract = require("node-tesseract-ocr")
const path = require('path');

const app = express()
const port = 3000

const pictureText = async (url) => {
  let textFinal = ''

  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  }

  // const img = "https://tesseract.projectnaptha.com/img/eng_bw.png"

  await tesseract
    .recognize(url, config)
    .then((text) => {
      textFinal = text
      // console.log("Result:", text)
    })
    .catch((error) => {
      console.log(error.message)
    })

  return textFinal
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'))
})

app.post('/submit', async (req, res) => {
  const text = await pictureText(req.body.url)
  res.send(text)
  console.log(text);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})