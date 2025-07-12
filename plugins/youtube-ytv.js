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

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('❌ Ingresa el enlace de YouTube');

  let api = `https://api.sylphy.xyz/download/ytmp4?url=${encodeURIComponent(args[0])}`;

  try {
    const res = await fetch(api);
    const json = await res.json();

    if (!json.status || !json.res?.url || !json.res?.title || json.res.url.includes('undefined')) {
      return m.reply('⚠️ No se pudo obtener el video. Puede que el enlace no sea válido o la API esté fallando.');
    }

    let { url, title } = json.res;

    await conn.sendMessage(m.chat, {
      document: { url },
      fileName: title + '.mp4',
      mimetype: 'video/mp4'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Error al intentar descargar el video. Intenta nuevamente.');
  }
};

handler.command = ['ytmp4alt2', 'video2'];
export default handler;