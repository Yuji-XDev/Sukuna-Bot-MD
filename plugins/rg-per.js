let handler = async (m, { conn, usedPrefix }) => {
  const imageUrl = 'https://files.catbox.moe/3gxuzq.jpg';

  // Mensaje inicial estilo hacker
  const loadingMsg = await conn.sendMessage(m.chat, {
    text: '🧠 Procesando datos del perfil...\n░▒▓█ █▓▒░\n░▒▓█ █▓▒░\n░▒▓█ █▓▒░',
  });

  // Esperar 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Editar el mensaje con datos del perfil
  await conn.relayMessage(
    m.chat,
    {
      protocolMessage: {
        key: loadingMsg.key,
        type: 14,
        editedMessage: {
          imageMessage: {
            caption: `╭━━〔🧠 𝗣𝗘𝗥𝗙𝗜𝗟 𝗛𝗔𝗖𝗞𝗘𝗥〕━━⬣
┃ 👤 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: @${m.sender.split('@')[0]}
┃ 🧩 𝗖𝗼𝗺𝗮𝗻𝗱𝗼: ${usedPrefix}perfil
┃ ⚙️ 𝗘𝘀𝘁𝗮𝗱𝗼: 𝗔𝗖𝗧𝗜𝗩𝗢
┃ 📡 𝗖𝗼𝗻𝗲𝗰𝘁𝗮𝗱𝗼 𝗮𝗹 𝗡𝗢𝗗𝗢: [ SUCCESS ]
┃ 🛰️ 𝗜𝗣 𝗱𝗲 𝗲𝗻𝘃𝗶𝗼: 127.0.0.1
┃ 🛡️ 𝗙𝗶𝗿𝗲𝘄𝗮𝗹𝗹: 𝗛𝗮𝗰𝗸𝗘𝗻𝗮𝗯𝗹𝗲
╰━━━━━━━━━━━━━━━━⬣`,
            jpegThumbnail: await (await fetch(imageUrl)).buffer(),
          },
        },
      },
    },
    { messageId: loadingMsg.key.id }
  );
};

handler.command = /^perfil2$/i;
export default handler;