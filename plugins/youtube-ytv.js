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

let handler = async (m, { conn, command }) => {
  let url = 'https://api.sylphy.xyz/nsfw/tetasvid';

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (!json.estado || !json.datos?.url) {
      return m.reply('❌ No se pudo obtener el video. La API falló.');
    }

    const videoUrl = json.datos.url;

    await conn.sendMessage(m.chat, {
      document: { url: videoUrl },
      fileName: 'nsfw-video.mp4',
      mimetype: json.datos.mime || 'video/mp4',
      caption: `🎥 NSFW Video - ${json.datos.tipo}`,
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('⚠️ Ocurrió un error al obtener el video NSFW.');
  }
};

handler.command = ['tetasvid', 'nsfwvideo'];
handler.tags = ['nsfw'];
handler.premium = true; // Puedes cambiar esto
handler.limit = 1;       // Si usas sistema de límites

export default handler;