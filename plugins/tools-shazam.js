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

const DEFAULT_IMAGE = 'https://files.catbox.moe/qnvpyq.jpg';

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  return `${minutes}M ${seconds}S`;
}

let handler = async (m, { conn, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = q.mimetype || q.mediaType || '';

  if (/audio|video/.test(mime)) {
    try {
      await m.react('⏱️');
      let buffer = await q.download();
      if (!buffer) throw '❌ Ocurrió un error.';
      if (buffer.length > 5 * 1024 * 1024) throw '⚠️ El archivo es muy grande. Usa uno menor a 5MB.';

      let filename = `${randomUUID()}.mp3`;
      let filepath = join(tmpdir(), filename);
      await writeFile(filepath, buffer);

      let res;
      try {
        res = await acr.identify(filepath);
      } finally {
        await unlink(filepath);
      }

      if (res.status.msg !== 'Success') throw '❌ No se encontró coincidencia.';

      let meta = res.metadata?.music?.[0];
      if (!meta) throw '❌ No se detectó ninguna canción.';

      let genres = meta.genres || [];
      let duration = meta.duration_ms ? msToTime(meta.duration_ms) : 'Desconocido';
      let image = meta.album?.images?.[0]?.url || meta.external_metadata?.spotify?.album?.images?.[0]?.url || DEFAULT_IMAGE;

      let txt = `╭─⬣「 *乂 WHATMUSIC 乂* 」⬣\n`;
      txt += `│ ≡◦ *🌳 Título ∙* ${meta.title || 'Desconocido'}\n`;
      txt += `│ ≡◦ *👤 Artista ∙* ${meta.artists?.[0]?.name || 'Desconocido'}\n`;
      txt += `│ ≡◦ *📚 Álbum ∙* ${meta.album?.name || 'Desconocido'}\n`;
      txt += `│ ≡◦ *🌵 Género ∙* ${genres.map(v => v.name).join(', ') || 'Desconocido'}\n`;
      txt += `│ ≡◦ *🕜 Lanzamiento ∙* ${meta.release_date || 'Desconocido'}\n`;
      txt += `│ ≡◦ *⏱️ Duración ∙* ${duration}\n`;
      txt += `╰─⬣`;

      await conn.sendMessage(m.chat, {
        text: txt,
        footer: '🎶 Usa el botón para descargar',
        contextInfo: {
          externalAdReply: {
            title: meta.title || 'Canción detectada',
            body: meta.artists?.[0]?.name || '',
            thumbnailUrl: image,
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
        ]
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      conn.reply(m.chat, `❌ Error: ${e}`, m);
    }
  } else {
    conn.reply(m.chat, `🌪️ Etiqueta un audio o video con el comando *${usedPrefix + command}* para reconocer la música.`, m);
  }
};

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = ['whatmusic', 'shazam'];
handler.register = true;

export default handler;