// codigo creado por Black.ofc 💥
// no robes creaditos

import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*⛩️ Ingresa un link o nombre de YouTube 🌲*`);

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });

    const api = `https://api.nekorinn.my.id/downloader/ytplay-savetube?q=${encodeURIComponent(text)}`;
    const res = await fetch(api);

    if (!res.ok) throw new Error('No se pudo conectar con la API');

    const json = await res.json();

    if (!json.status || !json.result || !json.result.downloadUrl) {
      return m.reply('❌ Ocurrió un error. Intenta con otro título o link.');
    }

    const { title, channel, duration, cover, url: sourceUrl } = json.result.metadata;
    const downloadUrl = json.result.downloadUrl;

    let thumb = null;
    try {
      const thumbRes = await conn.getFile(cover);
      thumb = thumbRes?.data;
    } catch (e) {
      console.warn('No se pudo obtener la miniatura:', e);
    }

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: `YOUTUBE • MP3`,
          mediaUrl: sourceUrl || text,
          sourceUrl: sourceUrl || text,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak });

    await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });

  } catch (e) {
    console.error('[ERROR YTMP3]', e);
    m.reply('⚠️ Ocurrió un error al procesar el audio. Intenta de nuevo más tarde.');
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.help = ['ytmp3'].map(v => v + ' <nombre o link>');
handler.tags = ['downloader'];
handler.command = ['ytmp3', 'yta'];

export default handler;