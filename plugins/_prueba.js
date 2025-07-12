import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const emoji = '🎧';

  if (!args[0] || !args[0].startsWith('http')) {
    return conn.reply(
      m.chat,
      `${emoji} *¡Link no válido!* Por favor, pásame un enlace válido de YouTube 📎\n\nEjemplo:\n${usedPrefix + command} https://youtu.be/KHgllosZ3kA`,
      m
    );
  }

  try {
    await conn.reply(
      m.chat,
      `⏳ *Procesando tu música...*\nPor favor espera un momento~ 🐇🎶`,
      m
    );

    const url = args[0];
    const apiURL = `https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiURL);
    const json = await response.json();

    if (json.status !== 200 || !json.result?.download?.url) {
      return conn.reply(
        m.chat,
        `❌ *No se pudo obtener el audio.*\nRazón: ${json.message || 'Respuesta inválida.'}`,
        m
      );
    }

    const { metadata, download } = json.result;

    const caption = `
┌──「 𝗬𝗧𝗠𝗣𝟯 • 🎶 」─
▢ *🎵 Título:* ${metadata.title}
▢ *👤 Autor:* ${metadata.author?.name || 'Desconocido'}
▢ *⏱️ Duración:* ${metadata.timestamp}
▢ *📅 Publicado:* ${metadata.ago}
▢ *👁️ Vistas:* ${metadata.views.toLocaleString()}
▢ *🔊 Calidad:* ${download.quality}
└───────────────⬣`;

    const audioRes = await fetch(download.url);
    const buffer = await audioRes.buffer();

    await conn.sendMessage(
      m.chat,
      {
        audio: buffer,
        mimetype: 'audio/mpeg',
        fileName: download.filename,
        caption,
        ptt: false
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    return conn.reply(
      m.chat,
      `⚠️ *Error inesperado al descargar música.*\n${e.message}`,
      m
    );
  }
};

handler.help = ['ytmp3'].map(v => v + ' <url>');
handler.tags = ['descargas'];
handler.command = ['ytmp3', 'ytaudio', 'mp3'];
handler.register = true;
handler.limit = true;
handler.coin = 2;

export default handler;