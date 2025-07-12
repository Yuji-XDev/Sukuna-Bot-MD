import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  let emoji = '🎵';
  let pontexto = `*${emoji} Ingresa un título para buscar en YouTube.*`;
  let espere = '*🌴 _Buscando resultados, espere un momento..._*';
  let errorcode = `⚠︎ Ocurrió un error al buscar el video. Inténtalo de nuevo más tarde.`;

  if (!text) return conn.reply(m.chat, pontexto, m);
  await conn.reply(m.chat, espere, m);

  try {
    const yt_play = await search(args.join(' '));
    if (!yt_play.length) throw new Error('No se encontraron resultados');

    let txt = `       🥥 PLAY LIST 🌴

💫 *𝚃𝙸𝚃𝚄𝙻𝙾:* ${yt_play[0].title}

🥞 *𝙿𝚄𝙱𝙻𝙸𝙲𝙰𝙳𝙾:* ${yt_play[0].ago}

🌹 *𝙳𝚄𝚁𝙰𝙲𝙸𝙾𝙽:* ${secondString(yt_play[0].duration.seconds)}

🍡 *𝙻𝙸𝙽𝙺:* ${yt_play[0].url}`;


    const listMessage = {
      text: txt,
      footer: '🥞 OPCIONES DISPONIBLES',
      title: null,
      buttonText: '💫 Elegir una opción',
      sections: [
        {
          title: '𔒝 LISTA DE DESCARGAS 𔒝',
          rows: [
            {
              title: '🔍 Buscar más canciones',
              description: 'Buscar más canciones similares',
              rowId: `${usedPrefix}playlist ${text}`
            },
            {
              title: '🎵 Descargar audio',
              description: 'Descargar en formato mp3',
              rowId: `${usedPrefix}ytmp3 ${yt_play[0].url}`
            },
            {
              title: '🎬 Descargar video',
              description: 'Descargar en formato mp4',
              rowId: `${usedPrefix}ytmp4 ${yt_play[0].url}`
            },
            {
              title: '📄 Audio como documento',
              description: 'Recibir audio como archivo',
              rowId: `${usedPrefix}ytmp3doc ${yt_play[0].url}`
            },
            {
              title: '📄 Video como documento',
              description: 'Recibir video como archivo',
              rowId: `${usedPrefix}ytmp4doc ${yt_play[0].url}`
            }
          ]
        }
      ]
    };

    await conn.sendMessage(m.chat, listMessage, { quoted: m });

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, errorcode, m);
  }
};

handler.command = ['play5'];
handler.register = true;
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}