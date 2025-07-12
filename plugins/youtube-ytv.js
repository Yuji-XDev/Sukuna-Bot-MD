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
  if (!args[0]) return m.reply('🔴 Ingresa un enlace de YouTube.');

  let urlAPI = `https://api.sylphy.xyz/descargar/ytmp4v2?url=${encodeURIComponent(args[0])}&quality=360`;

  try {
    const res = await fetch(urlAPI);
    const json = await res.json();

    // Verificamos si la API respondió correctamente
    if (!json.status) {
      return m.reply(`❌ Error de la API: ${json.message || 'Respuesta no válida.'}`);
    }

    const result = json.res;

    if (!result.downloadUrl || result.downloadUrl === null) {
      return m.reply(`⚠️ La API respondió, pero no devolvió la URL de descarga.\n\n🔧 Este es el enlace de prueba: ${args[0]}\n\n👨‍💻 *API por:* ${json.creator}`);
    }

    let caption = `
🎬 *Título:* ${result.title}
📥 *Calidad:* ${result.quality}p
🔗 *Descarga directa:* ${result.downloadUrl}
👨‍💻 *API por:* ${json.creator}
`.trim();

    await conn.sendMessage(m.chat, {
      video: { url: result.downloadUrl },
      caption,
      jpegThumbnail: await (await fetch(result.image)).buffer()
    }, { quoted: m });

  } catch (e) {
    console.error('❌ ERROR:', e);
    m.reply('❌ Error interno. Es posible que la API haya fallado o el enlace no sea válido.');
  }
};

handler.command = ['ytmp4sylphy'];
handler.help = ['ytmp4sylphy <enlace>'];
handler.tags = ['descargas'];

export default handler;