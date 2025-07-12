import acrcloud from 'acrcloud';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

const acr = new acrcloud({
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
  const q = m.quoted || m;
  const mime = q.mimetype || '';

  if (!/audio|video/.test(mime)) {
    return conn.reply(m.chat, `🎧 Etiqueta un *audio o video* para reconocer la música con *${usedPrefix + command}*`, m);
  }

  try {
    await m.react('🔍');
    const buffer = await q.download();

    if (!buffer) throw 'No se pudo descargar el archivo.';
    if (buffer.length > 5 * 1024 * 1024) throw 'El archivo es demasiado grande. Máximo permitido: 5MB.';

    const tempFile = join(tmpdir(), `${randomUUID()}.mp3`);
    await writeFile(tempFile, buffer);

    let result;
    try {
      result = await acr.identify(tempFile);
    } finally {
      await unlink(tempFile);
    }

    if (!result?.status?.msg || result.status.msg !== 'Success') {
      throw 'No se encontró coincidencia. Intenta con un audio más claro.';
    }

    const meta = result.metadata?.music?.[0];
    if (!meta) throw 'No se detectó ninguna canción en el audio.';

    const title = meta.title || 'Desconocido';
    const artist = meta.artists?.[0]?.name || 'Desconocido';
    const album = meta.album?.name || 'Desconocido';
    const genres = (meta.genres || []).map(g => g.name).join(', ') || 'Desconocido';
    const release = meta.release_date || 'Desconocido';
    const duration = meta.duration_ms ? msToTime(meta.duration_ms) : 'Desconocido';
    const thumb = meta?.album?.images?.[0]?.url || DEFAULT_IMAGE;
    const sourceUrl =
      meta?.external_metadata?.youtube?.url ||
      meta?.external_metadata?.spotify?.track?.external_urls?.spotify ||
      null;

    const text = `
╭─⬣「 *🎧 WHATMUSIC DETECTADO* 」⬣
│ ✦ *Título:* ${title}
│ ✦ *Artista:* ${artist}
│ ✦ *Álbum:* ${album}
│ ✦ *Género:* ${genres}
│ ✦ *Lanzamiento:* ${release}
│ ✦ *Duración:* ${duration}
╰⬣`.trim();

    await conn.sendMessage(m.chat, {
      text,
      footer: '🎶 Usa el botón para descargar la canción',
      contextInfo: {
        externalAdReply: {
          title: title,
          body: artist,
          thumbnailUrl: thumb,
          sourceUrl: sourceUrl || undefined,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
      buttons: [
        {
          buttonId: `${usedPrefix}play ${title}`,
          buttonText: { displayText: '📥 Descargar' },
          type: 1,
        },
      ],
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, `❌ *Error:* ${err}`, m);
  }
};

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = ['whatmusic', 'shazam'];
handler.register = true;

export default handler;