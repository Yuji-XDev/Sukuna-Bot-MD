import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix }) => {
  const thumbUrl = 'https://files.catbox.moe/3gxuzq.jpg';
  const thumbnail = await fetch(thumbUrl).then(res => res.buffer());

  const text = `┌─〔🌌 *AJUSTES DE PERFIL* 〕─┐
│ 〣 🧩 *Dale forma a tu identidad.*
│
│ 🎂 ${usedPrefix}setbirth - Añadir cumpleaños
│ 🗑️ ${usedPrefix}delbirth - Borrar cumpleaños
│ 📄 ${usedPrefix}setdesc - Editar biografía
│ 🧻 ${usedPrefix}deldesc - Borrar biografía
│ 🚻 ${usedPrefix}setgenre - Elegir género
│ 🚫 ${usedPrefix}delgenre - Quitar género
│ 💍 ${usedPrefix}marry - Casarse con alguien
│ 💔 ${usedPrefix}divorce - Divorciarse
└─────────────────────┘`;

  const buttons = [
    {
      type: 1,
      buttonId: `${usedPrefix}profile`,
      buttonText: { displayText: '🥀 Ver Perfil' }
    },
    {
      type: 1,
      buttonId: `${usedPrefix}menu`,
      buttonText: { displayText: '🌲 Menú Principal' }
    }
  ];

  const contextInfo = {
    forwardingScore: 1000,
    isForwarded: true,
    externalAdReply: {
      title: '🌪️ Configuración de Perfil',
      body: '⛩️ Administra tu identidad con Sukuna Bot ⛩️',
      mediaType: 1,
      previewType: 'PHOTO',
      thumbnail,
      renderLargerThumbnail: false
    }
  };

  await conn.sendMessage(m.chat, {
    text,
    footer: '🏞️ Sukuna Profile Manager',
    buttons,
    contextInfo
  }, { quoted: m });

  await m.react('👁️');
};

handler.command = ['perfildates', 'menuperfil'];
handler.tags = ['rg'];
handler.help = ['perfildates'];
handler.coin = 3;

export default handler;