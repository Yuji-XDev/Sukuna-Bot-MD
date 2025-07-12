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
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `*Por favor, ingresa la URL del vídeo de YouTube.*`, m);
    }

    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) {
      return m.reply(`*⚠️ Enlace inválido, por favor coloca un enlace válido de YouTube.*`);
    }

    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

    let json = await ytdl(args[0]);
    let size = await getSize(json.url);
    let sizeStr = size ? await formatSize(size) : 'Desconocido';

    const caption = `🎬 *${json.title}*\n📦 Tamaño: ${sizeStr}\n\n📥 *Enviado como documento*`;

    
    await conn.sendMessage(m.chat, {
      document: { url: json.url },
      fileName: `${json.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}.mp4`,
      mimetype: 'video/mp4',
      caption: caption
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error(e);
    m.reply(`❌ Ocurrió un error:\n${e.message}`);
  }
};

handler.help = ['ytmp4doc'];
handler.command = ['ytmp4doc'];
handler.tags = ['descargas'];

export default handler;

// 🔧 Funciones auxiliares

async function ytdl(url) {
  const headers = {
    "accept": "*/*",
    "accept-language": "es-PE,es;q=0.9",
    "sec-fetch-mode": "cors",
    "Referer": "https://id.ytmp3.mobi/"
  };

  const initReq = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
  const init = await initReq.json();
  const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  const convertURL = init.convertURL + `&v=${id}&f=mp4&_=${Math.random()}`;

  const convertRes = await fetch(convertURL, { headers });
  const convert = await convertRes.json();

  let info = {};
  for (let i = 0; i < 3; i++) {
    const progress = await fetch(convert.progressURL, { headers });
    info = await progress.json();
    if (info.progress === 3) break;
  }

  return {
    url: convert.downloadURL,
    title: info.title || 'video'
  };
}

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;

  if (!bytes || isNaN(bytes)) return 'Desconocido';

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }

  return `${bytes.toFixed(2)} ${units[i]}`;
}

async function getSize(url) {
  try {
    const res = await axios.head(url);
    const length = res.headers['content-length'];
    return length ? parseInt(length, 10) : null;
  } catch (err) {
    console.error('⚠️ Error al obtener tamaño del archivo:', err.message);
    return null;
  }
}