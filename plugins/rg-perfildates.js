import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix }) => {
  const imageUrl = 'https://telegra.ph/file/0c67b38e07be7ea49fa30.jpg';
  const thumbnailUrl = 'https://files.catbox.moe/3gxuzq.jpg';

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

  const contextInfo = {
    externalAdReply: {
      title: '🔧 Ajustes Avanzados',
      body: 'Sukuna Bot MD',
      thumbnail: await fetch(thumbnailUrl).then(res => res.buffer()),
      mediaType: 1,
      renderLargerThumbnail: true,
      sourceUrl: 'https://github.com/Yuji-XDev/Sukuna-Bot'
    }
  };

  await conn.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption,
    footer: '⛩️ Sukuna Profile Manager',
    buttons,
    headerType: 4,
    contextInfo
  }, { quoted: m });

  await m.react('✅');
};

handler.command = ['perfilmenu'];
handler.tags = ['perfil'];
handler.help = ['perfilmenu'];

export default handler;