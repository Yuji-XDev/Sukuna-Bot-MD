import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `*🎧 Ingresa una URL válida de YouTube.*\n\n📌 Ejemplo:\n${usedPrefix + command} https://youtu.be/TdrL3QxjyVw`, m);
  }

  await m.react('🎶');

  try {
    const res = await fetch(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(args[0])}&apikey=ryzen`);
    const json = await res.json();

    if (!json.status || !json.result?.audio) throw new Error('❌ No se pudo descargar el audio');

    const data = json.result;

    const duracion = data.duration;
    const texto = `╭━━〔 *🎵 YT MP3 Descargado* 〕━━⬣
┃ ✦ *🎧 Título:* ${data.title}
┃ ✦ *🕒 Duración:* ${duracion}
┃ ✦ *📥 Calidad:* 128 kbps
┃ ✦ *🧑 Autor:* ${data.channel}
┃ ✦ *📈 Vistas:* ${data.views}
╰━━━━━━━━━━━━━━━━━━⬣
⏳ *Enviando audio...*`;

    // Enviar imagen con info
    await conn.sendFile(m.chat, data.thumbnail, 'thumb.jpg', texto, m);

    // Enviar audio
    await conn.sendFile(
      m.chat,
      data.audio,
      'audio.mp3',
      null,
      m,
      true,
      { mimetype: 'audio/mpeg' }
    );

    await m.react('✅');

  } catch (e) {
    console.error(e);
    await m.react('❌');
    conn.reply(m.chat, '🚫 No se pudo descargar el audio.\nVerifica el enlace o intenta más tarde.', m);
  }
};

handler.help = ['ytmp3 <url>'];
handler.tags = ['downloader'];
handler.command = ['ytmp3', 'ytmp33'];
handler.register = true;

export default handler;