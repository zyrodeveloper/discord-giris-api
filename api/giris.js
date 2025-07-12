import { createCanvas, loadImage } from "canvas";

export default async function handler(req, res) {
  const { ad, avatar } = req.query;

  const canvas = createCanvas(800, 250);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#1e1e2f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  try {
    const pfp = await loadImage(avatar);
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(pfp, 25, 25, 200, 200);
  } catch (e) {
    console.log("Avatar yüklenemedi:", e.message);
  }

  ctx.font = "bold 30px Sans";
  ctx.fillStyle = "white";
  ctx.fillText(`${ad} sunucuya katıldı!`, 250, 140);

  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
}
