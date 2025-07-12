let handler = async (m, { conn, usedPrefix }) => {
  const imageUrl = 'https://files.catbox.moe/3gxuzq.jpg';

  // Enviar mensaje de carga estilo hacker
  const loadingMsg = await conn.sendMessage(m.chat, {
    text: '🧠 Procesando datos del perfil...\n⌛ Cargando configuraciones...',
  }, { quoted: m });

  // Esperar 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Definir contenido final
  const caption = `
╔══[ 🌐 𝗣𝗘𝗥𝗙𝗜𝗟 𝗠𝗢𝗗𝗘 ]══╗
║ 🎭 𝙲𝚘𝚗𝚏𝚒𝚐𝚞𝚛𝚊 𝚝𝚞 𝚒𝚍𝚎𝚗𝚝𝚒𝚍𝚊𝚍 𝚍𝚒𝚐𝚒𝚝𝚊𝚕
║
║ 🎂 ${usedPrefix}setbirth - Registrar cumpleaños
║ 🗑️ ${usedPrefix}delbirth - Eliminar cumpleaños
║ 📄 ${usedPrefix}setdesc - Cambiar biografía
║ 🧻 ${usedPrefix}deldesc - Eliminar biografía
║ 🚻 ${usedPrefix}setgenre - Seleccionar género
║ 🚫 ${usedPrefix}delgenre - Quitar género
║ 💍 ${usedPrefix}marry - Casarse (💘)
║ 💔 ${usedPrefix}divorce - Divorciarse (💀)
╚════════════════════════╝
  `.trim();

  const botones = [
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

  const contexto = {
    forwardingScore: 999,
    isForwarded: true,
    externalAdReply: {
      title: '⚠️ CONFIGURACIÓN AVANZADA',
      body: '🌌 Personaliza tu avatar digital en Sukuna Bot',
      thumbnailUrl: imageUrl,
      mediaType: 1,
      renderLargerThumbnail: true,
      sourceUrl: 'https://github.com/Yuji-XDev/Sukuna-Bot'
    }
  };

  // Editar el mensaje anterior con la imagen y los botones
  await conn.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption,
    footer: '⛩️ Sukuna Profile Manager',
    buttons: botones,
    viewOnce: true,
    contextInfo: contexto
  }, {
    quoted: m,
    messageId: loadingMsg.key.id // opcional: para mantener relación con el anterior
  });

  await m.react('💻');
};

handler.command = ['perfildates', 'menuperfil'];
handler.tags = ['rg'];
handler.help = ['perfildates'];
handler.coin = 3;

export default handler;