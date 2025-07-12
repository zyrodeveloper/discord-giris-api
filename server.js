// server.js
const express = require("express");
const { createCanvas, loadImage } = require("canvas");

const app = express();

app.get("/giris", async (req, res) => {
  const username = req.query.username || "Doruk";
  const avatarURL =
    req.query.avatar ||
    "https://cdn.discordapp.com/avatars/1392409942799024180/abcdef1234567890.png";

  try {
    // Canvas ayarları
    const width = 700;
    const height = 250;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Arka plan
    ctx.fillStyle = "#23272A";
    ctx.fillRect(0, 0, width, height);

    // Avatarı yükle ve yuvarlak kes
    const avatar = await loadImage(avatarURL);
    const avatarX = 25;
    const avatarY = 25;
    const avatarSize = 200;

    // Yuvarlak avatar çizimi
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      avatarX + avatarSize / 2,
      avatarY + avatarSize / 2,
      avatarSize / 2,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    // Yazı stilleri
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 40px Sans-serif";
    ctx.fillText(`Hoş geldin, ${username}!`, avatarX + avatarSize + 40, 100);

    ctx.font = "28px Sans-serif";
    ctx.fillText("Sunucuya katıldın.", avatarX + avatarSize + 40, 150);

    // PNG buffer olarak gönder
    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer());
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Görsel oluşturulurken hata oluştu.");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});
