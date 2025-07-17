/*// codigo creado por Black.ofc 💥
// no robes creaditos

import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*⛩️ Ingresa un link de YouTub'e 🌲*`);

  try {

    await conn.sendMessage(m.chat, { react: { text: '⏱️', key: m.key }});

    const api = `https://api.stellarwa.xyz/dow/ytmp3?url=${url}&apikey=Dev.Shadow`;
    const res = await fetch(api);
    const json = await res.json();

    if (!json.status || !json.result || !json.result.downloadUrl) {
      return m.reply('❌ ocurrio un error intenta con otro titulo.');
    }

    const { title, channel, duration, cover } = json.result.metadata;
    const downloadUrl = json.result.downloadUrl;
    const sourceUrl = json.result.metadata.url || text;

    let thumb;
    try {
      const thumbRes = await conn.getFile(cover);
      thumb = thumbRes?.data;
    } catch {
      thumb = null;
    }

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: `YOUTUBE • MP3`,
          mediaUrl: sourceUrl,
          sourceUrl: sourceUrl,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak });


    await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key }});

  } catch (e) {
    console.error(e);
    m.reply('⚠️ Ocurrió un error al procesar el audio. Intenta de nuevo.');

    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key }});
  }
};

handler.help = ['ytmp3'].map(v => v + ' <nombre o link>');
handler.tags = ['downloader'];
handler.command = ['ytmp3', 'yta'];

export default handler;*/



import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];

  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `✧ Ingresa el nombre de la música a descargar.`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const vistas = formatViews(views);
    const canal = author?.name || 'Desconocido';

    const infoMessage = `*Título:* ${title}
*Duración:* ${timestamp}
*Vistas:* ${vistas}
*Canal:* ${canal}
*Publicado:* ${ago}
*URL:* ${url}`;

    const thumb = (await conn.getFile(thumbnail))?.data;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    const apiAudioUrl = `https://api.stellarwa.xyz/dow/ytmp3?url=${url}&apikey=diamond`;
    const response = await fetch(apiAudioUrl);
    const json = await response.json();
    const { dl } = json.data;

    if (!dl) throw new Error('No se generó el enlace de descarga.');

    await conn.sendMessage(m.chat, {
      audio: { url: dl },
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg'
    }, { quoted: m });

  } catch (error) {
    console.error('Error al enviar audio:', error);
    return m.reply(`⚠︎ Ocurrió un error: ${error}`);
  }
};

handler.command = handler.help = ['ytmp3'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
  if (views === undefined) return "No disponible";
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  return views.toString();
}