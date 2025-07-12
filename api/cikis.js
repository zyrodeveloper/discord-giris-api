const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { ad, avatar } = req.query;

  if (!ad || !avatar) {
    return res.status(400).send("Eksik parametre: ad ve avatar gerekli.");
  }

  res.json({
    mesaj: `Görüşürüz, ${ad}!`,
    avatar: avatar,
  });
});

module.exports = router;
