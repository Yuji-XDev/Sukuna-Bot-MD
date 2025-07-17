import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let text = args.join(' ');
  if (!text) return m.reply(`*🌸 Ingresa un nombre o link de un pack de Sticker.ly*\n\n*Ejemplo:* \n${usedPrefix + command} mi melodía\n${usedPrefix + command} https://sticker.ly/s/4I2FC0`);

  await m.react('🌀');

  try {
    let finalUrl = text;


    if (!text.includes('sticker.ly')) {
      let busqueda = await fetch(`https://delirius-apiofc.vercel.app/search/stickerly?query=${encodeURIComponent(text)}`);
      let result = await busqueda.json();
      if (!result.estado || !result.datos?.length) throw '❌ No se encontraron resultados.';
      finalUrl = result.datos[0].url;
    }


    let res = await fetch(`https://delirius-apiofc.vercel.app/download/stickerly?url=${finalUrl}`);
    let json = await res.json();

    if (!json.estado || !json.datos) throw '⚠️ No se pudo obtener el pack.';

    const data = json.datos;
    const info = `
🎀 *Nombre:* ${data.nombre}
👤 *Autor:* ${data.autor}
📎 *Username:* @${data['nombre de usuario']}
👥 *Seguidores:* ${data.seguidores}
👁️ *Vistas:* ${data['conteo de vistas']}
📤 *Exportados:* ${data.exportCount}
🧩 *Stickers:* ${data.total}
🔗 *Perfil:* ${data.compartir}
`.trim();

    await conn.sendFile(m.chat, data.avatar, 'avatar.jpg', info, m);

    
    for (let i = 0; i < Math.min(data.pegatinas.length, 5); i++) {
      await conn.sendFile(m.chat, data.pegatinas[i], `sticker${i}.webp`, '', m, { asSticker: true });
    }

    await m.react('✅');
  } catch (e) {
    console.error(e);
    m.reply(`❌ Ocurrió un error:\n${e}`);
  }
};

handler.command = ['stickerly', 'stkly', 'stickersly'];
export default handler;