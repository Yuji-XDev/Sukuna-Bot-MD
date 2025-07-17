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

    const { title, url: sourceUrl } = json.result.metadata;
    const downloadUrl = json.result.downloadUrl;

    // Enviar audio como mensaje de voz normal
    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      ptt: true, // false = no es nota de voz, true = nota de voz (ondas de audio)
    }, { quoted: m });

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