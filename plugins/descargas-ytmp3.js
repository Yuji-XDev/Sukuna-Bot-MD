// codigo creado por Black.ofc 💥
// no robes creaditos

import fetch from 'node-fetch';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { fileTypeFromBuffer } from 'file-type';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*⛩️ Ingresa un link o nombre de YouTube 🌲*`);

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });

    const api = `https://api.nekorinn.my.id/downloader/ytplay-savetube?q=${encodeURIComponent(text)}`;
    const res = await fetch(api);
    if (!res.ok) throw new Error('No se pudo conectar con la API');

    const json = await res.json();
    if (!json.status || !json.result?.downloadUrl) {
      return m.reply('❌ Ocurrió un error. Intenta con otro título o link.');
    }

    const { title, cover, url: sourceUrl } = json.result.metadata;
    const audioUrl = json.result.downloadUrl;

    // Descargar el audio en buffer
    const audioRes = await fetch(audioUrl);
    const buffer = Buffer.from(await audioRes.arrayBuffer());

    // Obtener tipo de archivo
    const type = await fileTypeFromBuffer(buffer);
    const ext = type?.ext || 'mp3';

    // Guardar temporalmente
    const tempPath = path.join(tmpdir(), `ytmp3.${ext}`);
    writeFileSync(tempPath, buffer);

    // Descargar thumbnail
    let thumb = null;
    try {
      thumb = await (await fetch(cover)).buffer();
    } catch (e) {
      console.warn('❌ Error al obtener miniatura:', e);
    }

    // Enviar como audio real (sin preview)
    await conn.sendMessage(m.chat, {
      audio: { url: tempPath },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: 'YOUTUBE • MP3',
          mediaUrl: sourceUrl || text,
          sourceUrl: sourceUrl || text,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
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