import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `*🍹 Por favor, ingresa una URL de YouTube válida.*\n\n📌 Ejemplo:\n${usedPrefix + command} https://youtu.be/TdrL3QxjyVw`, m);
  }

  await m.react('🎧');

  try {
    const url = `https://delirius-apiofc.vercel.app/download/ytmp3?url=${encodeURIComponent(args[0])}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('❌ Error al conectar con la API');

    const json = await res.json();
    if (!json.estado || !json.datos?.descargar?.url) throw new Error('❌ No se pudo obtener el audio');

    const data = json.datos;
    const audio = data.descargar;

    const duracion = `${Math.floor(data.duración / 60)}:${String(data.duración % 60).padStart(2, '0')}`;

    const texto = `╭━━〔 *🎵 YT MP3 Descargado* 〕━━⬣
┃ ✦ *🎧 Título:* ${data.título}
┃ ✦ *🕒 Duración:* ${duracion}
┃ ✦ *📥 Tamaño:* ${audio.tamaño}
┃ ✦ *🧑 Autor:* ${data.autor}
┃ ✦ *📈 Vistas:* ${data.vistas}
┃ ✦ *👍 Likes:* ${data['me gusta']}
╰━━━━━━━━━━━━━━━━━━⬣
⏳ *Enviando audio...*`;

    // Enviar portada con descripción
    await conn.sendFile(m.chat, data.imagen, 'yt.jpg', texto, m);

    // Enviar audio
    await conn.sendMessage(m.chat, {
      audio: { url: audio.url },
      mimetype: 'audio/mpeg',
      fileName: audio.filename
    }, { quoted: m });

    await m.react('✅');

  } catch (e) {
    console.error(e);
    await m.react('❌');
    await conn.reply(m.chat, '🚫 Ocurrió un error al procesar tu solicitud.\nVerifica que el enlace sea válido o intenta más tarde.', m);
  }
};

handler.help = ['ytmp33 <url>'];
handler.tags = ['downloader'];
handler.command = ['ytmp33'];
handler.register = true;

export default handler;