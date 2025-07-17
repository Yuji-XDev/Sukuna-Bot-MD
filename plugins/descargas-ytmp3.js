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



// código creado por Black.ofc 💥
// no robes creaditos

import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*⛩️ Ingresa un enlace de YouTube válido.*\n\n📌 Ejemplo:\n${usedPrefix + command} https://youtu.be/xyz`);

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });

    const api = `https://api.stellarwa.xyz/dow/ytmp3?url=${encodeURIComponent(text)}&apikey=Dev.Shadow`;
    const res = await fetch(api);
    const json = await res.json();

    if (!json?.status || !json?.result?.downloadUrl) {
      return m.reply('❌ Ocurrió un error. Intenta con otro enlace.');
    }

    const {
      title = 'Sin título',
      channel = 'Desconocido',
      duration = 'Desconocida',
      cover = null,
      url: sourceUrl = text
    } = json.result.metadata || {};

    const downloadUrl = json.result.downloadUrl;

    let thumb = null;
    if (cover) {
      try {
        const thumbRes = await conn.getFile(cover);
        thumb = thumbRes?.data;
      } catch (e) {
        console.warn('❗ Error al obtener la miniatura:', e);
      }
    }

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title,
          body: 'YOUTUBE • MP3',
          mediaUrl: sourceUrl,
          sourceUrl,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });

  } catch (e) {
    console.error('Error en el comando yt-mp3:', e);
    m.reply('⚠️ No se pudo procesar el audio. Intenta más tarde.');
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.help = ['ytmp3'].map(v => v + ' <link>');
handler.tags = ['downloader'];
handler.command = ['ytmp3', 'yta'];

export default handler;