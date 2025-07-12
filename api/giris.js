const express = require("express");
const { createCanvas, loadImage } = require("canvas");

const app = express();

app.get("/giris", async (req, res) => {
  const username = req.query.username || "Doruk";
  let avatarURL = req.query.avatar || "https://cdn.discordapp.com/avatars/1392409942799024180/abcdef1234567890.png";

  // Discord avatar webp ise png olarak değiştir
  if (avatarURL.includes("discordapp.com") && avatarURL.endsWith(".webp")) {
    avatarURL = avatarURL.replace(".webp", ".png");
  }

  try {
    const width = 700;
    const height = 250;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // 1) Arkaplan: gradient + hafif çizgi deseni
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#0f2027");
    gradient.addColorStop(0.5, "#203a43");
    gradient.addColorStop(1, "#2c5364");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Hafif çizgi deseni
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - 50, height);
      ctx.stroke();
    }

    // 2) Avatar için daire maskesi + yeşil neon halka efekti
    const avatarSize = 200;
    const avatarX = 40;
    const avatarY = (height - avatarSize) / 2;

    // Neon halka
    ctx.save();
    ctx.shadowColor = "#00ff00";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 10, 0, Math.PI * 2);
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.restore();

    // Avatar dairesi maskesi
    const avatar = await loadImage(avatarURL);
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    // 3) Kullanıcı adı + hoş geldin mesajı, stil ve gölge
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 44px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 4;
    ctx.fillText(`Hoş geldin, ${username}!`, avatarX + avatarSize + 40, 100);

    ctx.font = "28px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    ctx.fillStyle = "#b1e5b4"; // açık yeşil
    ctx.fillText("Sunucuya katıldın.", avatarX + avatarSize + 40, 150);

    // 4) Alt kısma ince çizgi + küçük logo (opsiyonel)
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, height - 30);
    ctx.lineTo(width - 20, height - 30);
    ctx.stroke();

    // (İstersen buraya küçük bir Discord logosu koyabiliriz)

    // PNG olarak gönderiyoruz
    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer());
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Görsel oluşturulamadı.");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});
