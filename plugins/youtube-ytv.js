import fetch from "node-fetch";
import axios from 'axios';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `🎄 *Por favor, ingresa una URL válida de YouTube.*`, m);
    }

    m.react('🕒');

    let videoInfo, urlYt;

    if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(text)) {
      const id = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^\s&]+)/)?.[1];
      if (!id) return m.reply(`⚠️ No se pudo extraer el ID del video.`);

      const result = await yts({ videoId: id });
      videoInfo = result;
      urlYt = text;
    } else {
      const search = await yts(text);
      if (!search || !search.videos || !search.videos.length) {
        return conn.reply(m.chat, `⚠️ No se encontraron resultados para: *${text}*`, m);
      }

      videoInfo = search.videos[0];
      urlYt = videoInfo.url;
    }

    const {
      title = 'Sin título',
      timestamp = 'Desconocido',
      author = {},
      views = 0,
      ago = 'Desconocido',
      url = urlYt,
      thumbnail
    } = videoInfo;

    const canal = author.name || 'Desconocido';
    const vistas = views.toLocaleString('es-PE');

    const json = await ytdl(url);
    const size = await getSize(json.url);
    const sizeStr = size ? await formatSize(size) : 'Desconocido';

    const textoInfo =
      `╭━━━〔 *⛩️ YOUTUBE - MP4 🌪️* 〕━━⬣\n` +
      `┃ 📌 *Título:* ${title}\n` +
      `┃ ⏱️ *Duración:* ${timestamp}\n` +
      `┃ 🧑‍🏫 *Canal:* ${canal}\n` +
      `┃ 👁️ *Vistas:* ${vistas}\n` +
      `┃ 🗓️ *Publicado:* ${ago}\n` +
      `┃ 💾 *Tamaño:* ${sizeStr}\n` +
      `┃ 🔗 *Enlace:* ${url}\n` +
      `╰━━━━━━━━━━━━━━━━━━━━⬣\n\n` +
      `*➤ El video se está procesando y será enviado pronto...*`;


    await conn.sendMessage(m.chat, {
      image: { url: thumbnail }
    }, { quoted: m });


    await conn.sendMessage(m.chat, {
      text: textoInfo
    }, { quoted: m });

    await conn.sendFile(m.chat, await (await fetch(json.url)).buffer(), `${title}.mp4`, '', m);
    m.react('✅');

  } catch (e) {
    console.error(e);
    m.reply(`❌ Error inesperado:\n${e.message}`);
  }
};

handler.help = ['ytv <link>'];
handler.command = ['ytv'];
handler.tags = ['dl'];

export default handler;

async function ytdl(url) {
  const headers = {
    "accept": "*/*",
    "accept-language": "es-PE,es;q=0.9",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "Referer": "https://id.ytmp3.mobi/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };

  const initial = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
  const init = await initial.json();
  const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  const convertURL = init.convertURL + `&v=${id}&f=mp4&_=${Math.random()}`;

  const converts = await fetch(convertURL, { headers });
  const convert = await converts.json();

  let info = {};
  for (let i = 0; i < 3; i++) {
    const progressResponse = await fetch(convert.progressURL, { headers });
    info = await progressResponse.json();
    if (info.progress === 3) break;
  }

  return {
    url: convert.downloadURL,
    title: info.title || 'video'
  };
}

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
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
    const response = await axios.head(url);
    const contentLength = response.headers['content-length'];
    if (!contentLength) return null;
    return parseInt(contentLength, 10);
  } catch (error) {
    console.error("Error al obtener el tamaño:", error.message);
    return null;
  }
}