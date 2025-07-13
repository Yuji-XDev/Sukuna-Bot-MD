import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix }) => {
  // Imagen principal y miniatura
  const foto = 'https://telegra.ph/file/0c67b38e07be7ea49fa30.jpg';
  const miniLogo = 'https://files.catbox.moe/3gxuzq.jpg';

  // Texto del menú
  const texto = `🔧 *Panel de Configuración de Perfil*
  
✨ Personaliza tu identidad en el bot:

🎂 ➤ ${usedPrefix}setbirth
🗑️ ➤ ${usedPrefix}delbirth
📄 ➤ ${usedPrefix}setdesc
🧻 ➤ ${usedPrefix}deldesc
🚻 ➤ ${usedPrefix}setgenre
🚫 ➤ ${usedPrefix}delgenre
💍 ➤ ${usedPrefix}marry
💔 ➤ ${usedPrefix}divorce

Usa los botones para comenzar.`.trim();

  // Botones
  const botones = [
    {
      buttonId: `${usedPrefix}profile`,
      buttonText: { displayText: '📋 Mi Perfil' },
      type: 1
    },
    {
      buttonId: `${usedPrefix}menu`,
      buttonText: { displayText: '📚 Menú Principal' },
      type: 1
    }
  ];

  // Miniatura y link del contexto
  const contexto = {
    externalAdReply: {
      title: '🎭 Tu Identidad Digital',
      body: 'Sukuna Bot MD | Avanza con estilo',
      thumbnail: await (await fetch(miniLogo)).buffer(),
      mediaType: 1,
      renderLargerThumbnail: true,
      sourceUrl: 'https://github.com/Yuji-XDev/Sukuna-Bot'
    }
  };

  // Enviar mensaje completo
  await conn.sendMessage(m.chat, {
    image: { url: foto },
    caption: texto,
    footer: '🔒 Perfil Seguro en Sukuna Bot',
    buttons: botones,
    headerType: 4,
    contextInfo: contexto
  }, { quoted: m });

  await m.react('🧠');
};

handler.command = ['perfilconfig', 'ajustesperfil'];
handler.help = ['perfilconfig'];
handler.tags = ['perfil'];
handler.register = true;

export default handler;