/*import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🌿 Ingresa el nombre del video a descargar.`, m);
    }

    
    await conn.sendMessage(m.chat, { react: { text: '🎥', key: m.key } });

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('❌ No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, url } = videoInfo;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const sources = [
      `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
      `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
      `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
      `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
    ];

    let success = false;
    for (let source of sources) {
      try {
        const res = await fetch(source);
        const { data, result, downloads } = await res.json();
        const downloadUrl = data?.dl || result?.download?.url || downloads?.url || data?.download?.url;

        if (downloadUrl) {
          success = true;

          await conn.sendMessage(m.chat, {
            document: { url: downloadUrl },
            fileName: `${title.replace(/[^\w\s]/gi, '').trim().replace(/\s+/g, '_')}.mp4`,
            mimetype: 'video/mp4',
            caption: `🎬 *Aquí tienes tu video:* ${title}`,
            thumbnail: thumb,
            contextInfo: {
              externalAdReply: {
                title: title,
                body: 'YouTube • MP4 DOC',
                mediaUrl: url,
                sourceUrl: url,
                thumbnailUrl: thumbnail,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: m });

         
          await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
          break;
        }
      } catch (e) {
        console.error(`Error con la fuente ${source}:`, e.message);
      }
    }

    if (!success) {
      return m.reply(`⚠️ No se pudo descargar el video: no se encontró un enlace válido.`);
    }

  } catch (error) {
    console.error(error);
    return m.reply(`❌ Ocurrió un error: ${error.message}`);
  }
};

handler.command = handler.help = ['ytmp4doc', 'ytvdoc', 'ytdoc'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;*/


import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🌿 Ingresa el nombre del video a descargar.`, m);
    }

    await conn.sendMessage(m.chat, { react: { text: '🎥', key: m.key } });

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('❌ No se encontraron resultados para tu búsqueda.');
    }

    const video = search.videos[0];
    const { title, thumbnail, url } = video;
    const fileName = `${title.replace(/[^\w\s]/gi, '').trim().replace(/\s+/g, '_')}.mp4`;

    const sources = [
      `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
      `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
      `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
      `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
    ];

    let success = false;
    for (let apiUrl of sources) {
      try {
        const res = await axios.get(apiUrl);
        const data = res.data?.data || res.data?.result?.download || res.data?.downloads || res.data?.result;

        let downloadUrl = data?.dl || data?.url || data?.download?.url;

        if (downloadUrl) {
          // Verifica que sea un enlace accesible
          const head = await axios.head(downloadUrl).catch(() => null);
          if (!head || !head.headers || !head.headers['content-length']) continue;

          await conn.sendMessage(m.chat, {
            document: { url: downloadUrl },
            fileName: fileName,
            mimetype: 'video/mp4',
            caption: `🎬 *Aquí tienes tu video:* ${title}`,
            contextInfo: {
              externalAdReply: {
                title: title,
                body: 'YouTube • MP4 DOC',
                mediaUrl: url,
                sourceUrl: url,
                thumbnailUrl: thumbnail,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: m });

          await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
          success = true;
          break;
        }
      } catch (e) {
        console.error(`❌ Error con ${apiUrl}:`, e.message);
      }
    }

    if (!success) {
      return m.reply(`⚠️ No se pudo obtener un enlace válido para el video.`);
    }

  } catch (err) {
    console.error(err);
    m.reply(`❌ Error al procesar el video: ${err.message}`);
  }
};

handler.command = handler.help = ['ytmp4doc', 'ytvdoc', 'ytdoc'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;