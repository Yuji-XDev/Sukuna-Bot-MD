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

    let txt = `🥥 *PLAY LIST* 🌴

💫 *Título:* ${yt_play[0].title}
🥞 *Publicado:* ${yt_play[0].ago}
🌹 *Duración:* ${secondString(yt_play[0].duration.seconds)}
🍡 *Link:* ${yt_play[0].url}`;

    // 1. Primero envía la imagen con la descripción
    await conn.sendMessage(m.chat, {
      image: { url: yt_play[0].thumbnail },
      caption: txt
    }, { quoted: m });

    // 2. Luego envía el menú tipo lista
    const listSections = [{
      title: `𔒝 𝐋𝐈𝐒𝐓 𝐃𝐄 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 𔒝`,
      highlight_label: `𝐏𝐋𝐀𝐘𝐋𝐈𝐒𝐓`,
      rows: [
        {
          header: "⫶☰ 𝑷𝑳𝑨𝒀 𝑳𝑰𝑺𝑻",
          title: "𔓕 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰.",
          description: `✎ ᵇᵘˢᶜᵃʳ ᵐᵃˢ ᶜᵃⁿᶜⁱᵒⁿᵉˢ ᵈᵉˡ ᶜᵃⁿᵗᵃⁿᵗᵉ.`,
          id: `${usedPrefix}play5 ${text}`,
        },
        {
          header: "⫹⫺ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐑 𝐀𝐔𝐃𝐈𝐎",
          title: "𔓕 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒓.",
          description: `✎ Audio en formato normal.`,
          id: `${usedPrefix}ytmp3 ${yt_play[0].url}`,
        },
        {
          header: "⫹⫺ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐑 𝐕𝐈𝐃𝐄𝐎",
          title: "𔓕 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒓.",
          description: `✎ Video en formato normal.`,
          id: `${usedPrefix}ytmp4 ${yt_play[0].url}`,
        },
        {
          header: "⫹⫺ 𝐀𝐔𝐃𝐈𝐎 𝐃𝐎𝐂𝐔𝐌𝐄𝐍𝐓𝐎",
          title: "𔓕 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒓.",
          description: `✎ Audio en formato de documento.`,
          id: `${usedPrefix}ytmp3doc ${yt_play[0].url}`,
        },
        {
          header: "⫹⫺ 𝐕𝐈𝐃𝐄𝐎 : 𝐃𝐎𝐂𝐔𝐌𝐄𝐍𝐓𝐎",
          title: "𔓕 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒓.",
          description: `✎ Video en formato de documento.`,
          id: `${usedPrefix}ytmp4doc ${yt_play[0].url}`,
        },
      ]
    }];

    await conn.sendListMsg(m.chat, '🥞 OPCIONES DISPONIBLES', 'Selecciona una opción de descarga:', '💫 Elegir opción', listSections, m);

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, errorcode, m);
  }
};

handler.command = ['play5'];
handler.register = true;
export default handler;

// Buscar en YouTube
async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}

// Convertir segundos a formato bonito
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