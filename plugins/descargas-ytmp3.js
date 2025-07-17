// Código creado por Dev.Shadow 🇦🇱

import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `*⛩️ Ingresa un link de YouTub'e 🌲*`, m, rcanal);
    }

    const search = await yts(text);
    const video = search.videos[0];

    if (!video) {
      return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
    }

    const { title, timestamp, views, ago, url, author, thumbnail } = video;

    const canal = author?.name || 'Desconocido';
    const vistas = views.toLocaleString();

    const textoInfo = `✨ *Resultado Encontrado:*\n\n`
      + `📌 *Título:* ${title}\n`
      + `⏱️ *Duración:* ${timestamp}\n`
      + `📺 *Canal:* ${canal}\n`
      + `👀 *Vistas:* ${vistas}\n`
      + `📆 *Publicado:* ${ago}\n`
      + `🔗 *Enlace:* ${url}`;

    const thumbnailBuffer = await (await fetch(thumbnail)).buffer();

    await conn.sendMessage(m.chat, {
      image: thumbnailBuffer,
      caption: textoInfo,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: 'YOUTUBE • DESCARGA MP3',
          mediaType: 1,
          thumbnail: thumbnailBuffer,
          mediaUrl: url,
          sourceUrl: url,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });


    const api = `https://api.stellarwa.xyz/dow/ytmp3?url=${url}&apikey=stellar-7SQpl4Ah`;
    const res = await fetch(api);
    const json = await res.json();

    if (!json || !json.data || !json.data.dl) {
      throw new Error('⚠️ No se pudo generar el enlace de descarga.');
    }

    await conn.sendMessage(m.chat, {
      audio: { url: json.data.dl },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: 'Descarga completada ✔️',
          thumbnail: thumbnailBuffer,
          mediaUrl: url,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error('❌ Error en ytmp3:', e);
    return conn.reply(m.chat, `❌ *Error:* ${e.message}`, m);
  }
};

handler.command = ['ytmp3', 'ytaudio'];
handler.tags = ['descargas'];
handler.help = ['ytmp3 <nombre o link>'];

export default handler;