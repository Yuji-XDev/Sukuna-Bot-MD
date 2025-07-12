let handler = async (m, { conn, usedPrefix }) => {
  const logoUrl = 'https://files.catbox.moe/3gxuzq.jpg'; // Logo miniatura (thumbnail)
  const mainImageUrl = 'https://telegra.ph/file/0c67b38e07be7ea49fa30.jpg'; // Imagen principal grande

  // Mensaje estilo hacker (no se elimina)
  await conn.sendMessage(m.chat, {
    text: '🧠 Procesando datos del perfil...\n⌛ Cargando configuraciones...\n░▒▓█ █▓▒░\n░▒▓█ █▓▒░\n░▒▓█ █▓▒░',
  }, { quoted: m });

  // Esperar 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Texto principal del perfil
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
╚════════════════════════╝`.trim();

  const botones = [
    {
      type: 1,
      buttonId: `${usedPrefix}profile`,
      buttonText: { displayText: '⚙️ Ver Perfil' },
    },
    {
      type: 1,
      buttonId: `${usedPrefix}menu`,
      buttonText: { displayText: '🌐 Menú Principal' },
    },
  ];

  const contexto = {
    forwardingScore: 999,
    isForwarded: true,
    externalAdReply: {
      title: '⚠️ CONFIGURACIÓN AVANZADA',
      body: '🌌 Personaliza tu avatar digital en Sukuna Bot',
      thumbnailUrl: logoUrl, // Miniatura del logo
      mediaType: 1,
      renderLargerThumbnail: true,
      sourceUrl: 'https://github.com/Yuji-XDev/Sukuna-Bot',
    },
  };

  // Enviar mensaje final con imagen principal, botones y mini logo
  await conn.sendMessage(m.chat, {
    image: { url: mainImageUrl },
    caption,
    footer: '⛩️ Sukuna Profile Manager',
    buttons: botones,
    contextInfo: contexto,
  }, { quoted: m });

  await m.react('💻');
};

handler.command = ['perfildates', 'menuperfil'];
handler.tags = ['rg'];
handler.help = ['perfildates'];
handler.coin = 3;

export default handler;