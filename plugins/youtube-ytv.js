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

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`*⛩️ Ingresa el enlace de un video de YouTube.*`);

  const url = args[0].trim();

  // Validar que sea un enlace de YouTube
  const isYouTubeLink = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]{11}/.test(url);
  if (!isYouTubeLink) {
    return m.reply('*🚫 El enlace proporcionado no es válido. Asegúrate de que sea un enlace de YouTube.*');
  }

  try {
    const res = await fetch(`https://api.stellarwa.xyz/dow/ytmp4?url=${encodeURIComponent(url)}`);
    const json = await res.json();

    if (!json.status || !json.result) throw '*⚠️ No se pudo obtener información del video.*';

    let { title, thumbnail, timestamp, views, ago, url: downloadUrl, author } = json.result;

    // Valores por defecto si faltan datos
    title = title || 'No encontrado';
    thumbnail = thumbnail || 'https://i.imgur.com/JP52fdP.png';
    timestamp = timestamp || 'No disponible';
    views = views || 0;
    ago = ago || 'Desconocido';
    downloadUrl = downloadUrl || url;
    author = author || { name: 'Desconocido' };

    const vistas = formatViews(views);
    const canal = author.name || 'Desconocido';

    // Mensaje informativo
    const infoMessage = `
╭─〔 🔱 *SUKUNA BOT MD* 🔮 〕─╮
│ ⛩️ *Título:* ${title}
│ 🥀 *Canal:* ${canal}
│ ☄️ *Vistas:* ${vistas}
│ 🎈 *Duración:* ${timestamp}
│ 🌐 *Publicado:* ${ago}
│ 🎍 *Link:* ${downloadUrl}
╰─▣ *𝑬𝒏𝒗𝒊𝒂𝒏𝒅𝒐 ▰▰▱▱*
╰─────────────── ⭑`;

    // Obtener miniatura en buffer
    const thumb = (await conn.getFile(thumbnail)).data;

    const contexto = {
      contextInfo: {
        externalAdReply: {
          title: title,
          body: canal,
          mediaType: 1,
          previewType: 0,
          mediaUrl: downloadUrl,
          sourceUrl: downloadUrl,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    // Enviar imagen con descripción
    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: infoMessage }, { quoted: m });

    // Enviar el video como documento
    await conn.sendMessage(m.chat, {
      document: { url: downloadUrl },
      fileName: `${title}.mp4`,
      mimetype: 'video/mp4',
    }, { quoted: m, ...contexto });

  } catch (e) {
    console.error(e);
    m.reply('*❌ Ocurrió un error al procesar el video. Asegúrate de que el enlace sea válido o intenta más tarde.*');
  }
};

handler.command = ['ytmp4', 'video', 'ytvideo'];
export default handler;

// Función para formatear vistas
function formatViews(views) {
  if (!views || isNaN(views)) return "No disponible";
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  return views.toString();
}