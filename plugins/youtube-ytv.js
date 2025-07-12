/*import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, command }) => {
  if (!text) {
    return m.reply('🎄 *Por favor, ingresa una URL válida de YouTube.*');
  }

  if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(text)) {
    return m.reply('🌛 *El enlace proporcionado no parece ser de YouTube.*');
  }

  m.react('⏳');

  try {
    const res = await fetch(`https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(text)}&type=video&quality=480p&apikey=GataDios`);
    const json = await res.json();

    if (!json.status || !json.data?.url) {
      return m.reply('*✖️ No se pudo obtener el video. Intenta con otro enlace.*');
    }

    await conn.sendMessage(m.chat, {
      video: { url: json.data.url },
      mimetype: 'video/mp4',
      caption: `╭━🎬 *YOUTUBE VIDEO DOWNLOADER* ━⬣
┃🌴 *Título:* ${json.data.title || 'No disponible'}
┃🌪️ *Publicado:* ${json.data.published || 'No disponible'}
┃🌲 *Duración:* ${json.data.duration || 'Estandar'}
┃🏞️ *Calidad:* 480p
╰━━━━━━━━━━━━━━━━━━━━⬣

✅ *Descarga completa con éxito.*  
⛩️ _By Sukuna Bot MD_ ⛩️`,
    }, { quoted: m });

    m.react('✅');
  } catch (error) {
    console.error(error);
    m.reply('*✖️ Ocurrió un error al procesar tu solicitud.*');
    m.react('✖️');
  }
};

handler.command = handler.help = ['ytv'];
handler.tags = ['downloader'];

export default handler;
*/


import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, text }) => {
  if (!text) return m.reply('🔍 Ingresa una palabra clave para buscar stickers.\n\nEj: *.stickerly anime*');

  try {
    let res = await fetch(`https://api.sylphy.xyz/stickerly/search?q=${encodeURIComponent(text)}`);
    let json = await res.json();
    
    if (!json.status || !json.res?.length) return m.reply('❌ No se encontraron resultados.');

    let results = json.res.slice(0, 5); // Puedes aumentar o reducir la cantidad
    let caption = `🧩 *Resultados de Sticker.ly:*\n\n`;

    for (let i = 0; i < results.length; i++) {
      let st = results[i];
      caption += `*${i + 1}.* ${st.name}\n👤 Autor: ${st.author}\n🧷 Stickers: ${st.stickerCount}\n🔗 ${st.url}\n\n`;
    }

    await conn.sendMessage(m.chat, {
      image: { url: results[0].thumbnailUrl },
      caption,
      jpegThumbnail: await (await fetch(results[0].thumbnailUrl)).buffer(),
    }, { quoted: m });
    
  } catch (e) {
    console.error(e);
    m.reply('⚠️ Ocurrió un error al buscar stickers.');
  }
};

handler.command = /^stickerly$/i;
export default handler;