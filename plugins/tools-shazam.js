// codigo creado por black.OFC
// No robes creditos 

import acrcloud from 'acrcloud';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu',
});

let handler = async (m, { conn, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/audio|video/.test(mime)) {
    try {
      await m.react('⏱️');
      let buffer = await q.download();
      if (!buffer) throw '❌ ocurrio un error xd.';
      if (buffer.length > 1024 * 1024 * 5) throw '⚠️ El archivo es muy grande. Usa uno menor a 5MB.';

      let filename = `${randomUUID()}.mp3`;
      let filepath = join(tmpdir(), filename);
      await writeFile(filepath, buffer);

      let res = await acr.identify(buffer);
      await unlink(filepath);

      if (res.status.msg !== 'Success') throw '❌ No se encontró coincidencia.';

      let meta = res.metadata?.music?.[0];
      if (!meta) throw '❌ No se detectó ninguna canción.';

      let genres = meta.genres || [];

      let txt = `╭─⬣「 *乂 WHATMUSIC 乂* 」⬣\n`;
      txt += `│ ≡◦ *🌳 Título ∙* ${meta.title || 'Desconocido'}\n`;
      txt += `│ ≡◦ *👤 Artista ∙* ${meta.artists?.[0]?.name || 'Desconocido'}\n`;
      txt += `│ ≡◦ *📚 Álbum ∙* ${meta.album?.name || 'Desconocido'}\n`;
      txt += `│ ≡◦ *🌵 Género ∙* ${genres.map(v => v.name).join(', ') || 'Desconocido'}\n`;
      txt += `│ ≡◦ *🕜 Lanzamiento ∙* ${meta.release_date || 'Desconocido'}\n`;
      txt += `╰─⬣`;

      await conn.sendMessage(m.chat, {
        text: txt,
        contextInfo: {
          externalAdReply: {
            title: meta.title || 'Canción detectada',
            body: meta.artists?.[0]?.name || '',
            thumbnailUrl: meta?.album?.images?.[0]?.url || '',
            sourceUrl: meta?.external_metadata?.youtube?.url || '',
            mediaType: 1,
            renderLargerThumbnail: true,
          }
        },
        buttons: [
          {
            buttonId: `${usedPrefix}play ${meta.title}`,
            buttonText: { displayText: '📥 Descargar' },
            type: 1
          }
        ],
        footer: '🎶 Usa el botón para descargar',
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      conn.reply(m.chat, `❌ Error: ${e}`, m);
    }
  } else {
    conn.reply(m.chat, `☃️ Etiqueta un audio o video con el comando *${usedPrefix + command}* para reconocer la música.`, m);
  }
};

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = ['whatmusic', 'shazam'];
handler.register = true;

export default handler;