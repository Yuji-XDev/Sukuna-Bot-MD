import fetch from 'node-fetch';
import yts from 'yt-search';
import FormData from 'form-data';
import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🌪️ *Ejemplo:* ${usedPrefix + command} Bad Bunny`);

  await m.react('🕓');

  const results = await yts(text);
  const videos = results?.videos?.slice(0, 9);
  if (!videos || videos.length === 0) return m.reply('❌ No se encontraron resultados en YouTube.');

  shuffleArray(videos);

  const push = [];

  for (const video of videos) {
    const imageResponse = await fetch(video.thumbnail);
    const imageBuffer = await imageResponse.buffer();
    const enhancedImage = await remini(imageBuffer, 'enhance');

    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `◦ *Título:* ${video.title}\n◦ *Duración:* ${video.timestamp}\n◦ *Vistas:* ${video.views}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: await createImage(enhancedImage, conn)
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            name: 'cta_copy',
            buttonParamsJson: JSON.stringify({
              display_text: 'Descargar audio! 💜',
              copy_code: `.ytmp3 ${video.url}`
            })
          },
          {
            name: 'cta_copy',
            buttonParamsJson: JSON.stringify({
              display_text: 'Descargar video! 🍜',
              copy_code: `.ytmp4 ${video.url}`
            })
          }
        ]
      })
    });
  }

  const message = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: { text: `*🍓 Resultados de:* *${text}*` },
          footer: { text: 'Desliza y toca "copiar", luego envía el comando que aparece 📥' },
          header: { hasMediaAttachment: false },
          carouselMessage: { cards: push }
        })
      }
    }
  }, { quoted: m });

  await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });
  await m.react('✅');
};

handler.help = ['ytsearch', 'yts'];
handler.tags = ['search'];
handler.command = ['ytsearch', 'yts'];

export default handler;


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function createImage(img, conn) {
  const { imageMessage } = await generateWAMessageContent({ image: img }, { upload: conn.waUploadToServer });
  return imageMessage;
}

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const ops = ["enhance", "recolor", "dehaze"];
    operation = ops.includes(operation) ? operation : "enhance";
    const baseUrl = `https://inferenceengine.vyro.ai/${operation}.vyro`;

    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), { filename: "image.jpg", contentType: "image/jpeg" });
    formData.append("model_version", 1);

    formData.submit({ url: baseUrl, protocol: "https:" }, (err, res) => {
      if (err) return reject(err);
      const chunks = [];
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", err => reject(err));
    });
  });
}