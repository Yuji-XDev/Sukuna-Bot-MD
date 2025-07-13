let handler = async (m, { conn }) => {
  let imgurl = 'https://files.catbox.moe/nmseef.png';
  const Menu = `Hola gay estoy creando el menu stickers`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: imgurl },
    caption: Menu,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: packname,
        body: dev,
        thumbnailUrl: icono,
        mediaType: 1,
        renderLargerThumbnail: false,
        showAdAttribution: true,
        mediaUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
      }
    }
  }, { quoted: m });
};

handler.help = ['menusticker']
handler.tags = ['menus']
handler.command = ['menusticker', 'stickersmenu']

export default handler
