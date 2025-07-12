const express = require("express");
const app = express();

// Render gibi platformlar PORT'u env'den verir, yoksa 3001 kullan
const port = process.env.PORT || 3001;

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
