import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `*🍹 Por favor, ingresa una URL de YouTube válida.*\n\n📌 Ejemplo:\n${usedPrefix + command} https://youtu.be/TdrL3QxjyVw`, m);
  }

  await m.react('🎧');

  const url = args[0];
  let data;

  try {
    // PRIMERA API
    let res = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}`);
    let json = await res.json();

    if (!json.estado || !json.datos?.descargar?.url) throw 'Primera API falló';

    data = {
      titulo: json.datos.título,
      duracion: json.datos.duración,
      autor: json.datos.autor,
      vistas: json.datos.vistas,
      likes: json.datos['me gusta'],
      tamaño: json.datos.descargar.tamaño,
      audioUrl: json.datos.descargar.url,
      fileName: json.datos.descargar.filename,
      imagen: json.datos.imagen
    };

  } catch (e1) {
    console.warn('❌ Primera API falló, probando segunda...');

    try {
      // SEGUNDA API BACKUP
      let res2 = await fetch(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(url)}&apikey=ryzen`);
      let json2 = await res2.json();

      if (!json2.status || !json2.result?.audio) throw 'Segunda API falló';

      data = {
        titulo: json2.result.title,
        duracion: json2.result.duration,
        autor: json2.result.channel,
        vistas: json2.result.views,
        likes: '-',
        tamaño: '-',
        audioUrl: json2.result.audio,
        fileName: 'audio.mp3',
        imagen: json2.result.thumbnail
      };

    } catch (e2) {
      console.error(e2);
      await m.react('❌');
      return conn.reply(m.chat, '🚫 Las dos APIs fallaron. Intenta más tarde o usa otro link.', m);
    }
  }

  const duracionFormateada = `${Math.floor(data.duracion / 60)}:${String(data.duracion % 60).padStart(2, '0')}`;
  const texto = `╭━━〔 *🎵 YT MP3 Descargado* 〕━━⬣
┃ ✦ *🎧 Título:* ${data.titulo}
┃ ✦ *🕒 Duración:* ${duracionFormateada}
┃ ✦ *📥 Tamaño:* ${data.tamaño}
┃ ✦ *🧑 Autor:* ${data.autor}
┃ ✦ *📈 Vistas:* ${data.vistas}
┃ ✦ *👍 Likes:* ${data.likes}
╰━━━━━━━━━━━━━━━━━━⬣
⏳ *Enviando audio...*`;

  // Enviar imagen con detalles
  await conn.sendFile(m.chat, data.imagen, 'thumb.jpg', texto, m);

  // Enviar audio
  await conn.sendFile(
    m.chat,
    data.audioUrl,
    data.fileName || 'audio.mp3',
    null,
    m,
    true,
    { mimetype: 'audio/mpeg' }
  );

  await m.react('✅');
};

handler.help = ['ytmp32 <url>'];
handler.tags = ['downloader'];
handler.command = ['ytmp32', 'ytmp33'];
handler.register = true;

export default handler;