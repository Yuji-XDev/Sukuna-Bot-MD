import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix }) => {
  // URL de la imagen principal y logo miniatura
  const mainImage = 'https://telegra.ph/file/0c67b38e07be7ea49fa30.jpg';
  const logoMini = 'https://files.catbox.moe/3gxuzq.jpg';

  // Texto tipo menú
  const caption = `
╔══[ 🌐 𝗣𝗘𝗥𝗙𝗜𝗟 𝗠𝗢𝗗𝗘 ]══╗
║ 🎭 𝘾𝙤𝙣𝙛𝙞𝙜𝙪𝙧𝙖 𝙩𝙪 𝙞𝙙𝙚𝙣𝙩𝙞𝙙𝙖𝙙
║
║ 🎂 ${usedPrefix}setbirth - Registrar cumpleaños
║ 🗑️ ${usedPrefix}delbirth - Eliminar cumpleaños
║ 📄 ${usedPrefix}setdesc - Cambiar biografía
║ 🧻 ${usedPrefix}deldesc - Eliminar biografía
║ 🚻 ${usedPrefix}setgenre - Seleccionar género
║ 🚫 ${usedPrefix}delgenre - Quitar género
║ 💍 ${usedPrefix}marry - Casarse
║ 💔 ${usedPrefix}divorce - Divorciarse
╚════════════════════════╝`.trim();

  // Botones rápidos
  const buttons = [
    {
      type: 1,
      buttonId: `${usedPrefix}profile`,
      buttonText: { displayText: '⚙️ Ver Perfil' }
    },
    {
      type: 1,
      buttonId: `${usedPrefix}menu`,
      buttonText: { displayText: '🌐 Menú Principal' }
    }
  ];

  // Miniatura/logo con contexto externo
  const contextInfo = {
    externalAdReply: {
      title: '⚙️ CONFIGURACIÓN DE PERFIL',
      body: 'Sukuna Bot MD',
      mediaType: 1,
      thumbnail: await (await fetch(logoMini)).buffer(),
      renderLargerThumbnail: true,
      sourceUrl: 'https://github.com/Yuji-XDev/Sukuna-Bot'
    }
  };

  // Envío del mensaje completo con imagen, caption, botones, footer y miniatura
  await conn.sendMessage(m.chat, {
    image: { url: mainImage },
    caption,
    footer: '⛩️ Sukuna Profile Manager',
    buttons,
    headerType: 4,
    contextInfo
  }, { quoted: m });

  // Reacción opcional
  await m.react('✅');
};

handler.command = ['perfildates', 'menuperfil'];
handler.tags = ['perfil'];
handler.help = ['perfildates'];
handler.register = true;

export default handler;