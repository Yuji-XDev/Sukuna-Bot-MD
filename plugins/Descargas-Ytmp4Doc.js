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


import fetch from 'node-fetch';
import axios from 'axios';
import yts from 'yt-search';

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('🔴 Ingresa el nombre de un video para buscar.');

  await conn.sendMessage(m.chat, { react: { text: '🎥', key: m.key } });

  try {
    // 1. Buscar en YouTube
    const search = await yts(text);
    const video = search.videos[0];
    if (!video) return m.reply('❌ No se encontró ningún video.');

    const { title, url, thumbnail, timestamp } = video;

    // 2. APIs disponibles
    const apis = [
      `https://api.sylphy.xyz/download/ytmp4v2?url=${encodeURIComponent(url)}`,
      `https://api.lolhuman.xyz/api/ytvideo?apikey=FikriBotz&url=${encodeURIComponent(url)}`,
      `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${encodeURIComponent(url)}`
    ];

    let downloadUrl = null;

    // 3. Probar APIs una por una
    for (const api of apis) {
      try {
        const res = await axios.get(api);
        const json = res.data;

        downloadUrl =
          json.result?.url ||
          json.result?.link ||
          json.data?.url ||
          json.result?.download?.url;

        // Validar que sea un enlace directo
        if (downloadUrl) {
          const head = await axios.head(downloadUrl).catch(() => null);
          if (head && head.headers['content-length']) break;
        }
      } catch (e) {
        console.log(`⚠️ API falló: ${api}`);
      }
    }

    if (!downloadUrl) return m.reply('❌ No se pudo obtener el video. Todas las fuentes fallaron.');

    // 4. Enviar como documento MP4
    await conn.sendMessage(m.chat, {
      document: { url: downloadUrl },
      mimetype: 'video/mp4',
      fileName: `${title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}.mp4`,
      caption: `🎬 *${title}*\n🕒 Duración: ${timestamp}\n\n📥 Descarga completada.`,
      contextInfo: {
        externalAdReply: {
          title: 'Descargador de YouTube',
          body: title,
          mediaUrl: url,
          sourceUrl: url,
          thumbnailUrl: thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error(err);
    m.reply(`❌ Error inesperado: ${err.message}`);
  }
};

handler.command = ['ytmp4doc2', 'ytvdoc2', 'ytdoc2'];
handler.help = ['ytmp4doc2 <nombre>'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;