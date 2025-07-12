const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const girisRoute = require("./api/giris");
const cikisRoute = require("./api/cikis");

app.use("/giris", girisRoute);
app.use("/cikis", cikisRoute);

app.get("/", (req, res) => {
  res.send("Discord Giriş-Çıkış API çalışıyor!");
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor.`);
});
