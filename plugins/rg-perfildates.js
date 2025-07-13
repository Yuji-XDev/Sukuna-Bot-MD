import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix }) => {
  const imageUrl = 'https://telegra.ph/file/0c67b38e07be7ea49fa30.jpg';
  const thumbnailBuffer = await fetch(imageUrl).then(res => res.buffer());

  const caption = `👤 *Configuración de Perfil*

📋 Comandos disponibles:

🎂 ${usedPrefix}setbirth
📄 ${usedPrefix}setdesc
🚻 ${usedPrefix}setgenre
💍 ${usedPrefix}marry
💔 ${usedPrefix}divorce`;

  const buttons = [
    { buttonId: `${usedPrefix}profile`, buttonText: { displayText: '👁️ Ver Perfil' }, type: 1 },
    { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '📚 Menú' }, type: 1 }
  ];

  await conn.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption,
    buttons,
    footer: 'Sukuna Bot MD',
    contextInfo: {
      externalAdReply: {
        title: '🔧 Ajustes Avanzados',
        body: 'Sukuna Bot MD',
        thumbnail: thumbnailBuffer,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://github.com/Yuji-XDev/Sukuna-Bot'
      }
    }
  }, { quoted: m });

  await m.react('✅');
};

handler.command = ['perfilmenu'];
handler.tags = ['perfil'];
handler.help = ['perfilmenu'];

export default handler;