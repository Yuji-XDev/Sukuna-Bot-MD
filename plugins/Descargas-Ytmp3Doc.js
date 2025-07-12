import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'aac', 'flac', 'opus', 'ogg', 'wav'];

const ddownr = {
  download: async (url, format) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id } = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return downloadUrl;
      } else {
        throw new Error('Fallo al obtener los detalles del video.');
      }
    } catch (error) {
      throw error;
    }
  },

  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };

    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      throw error;
    }
  }
};

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `👻 Ingresa el nombre del video a descargar.`, m);
    }


    await conn.sendMessage(m.chat, { react: { text: '🎶', key: m.key }});

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('❌ No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, url, image } = videoInfo;
    const format = 'mp3';
    const downloadUrl = await ddownr.download(url, format);

    if (downloadUrl) {
      const fileName = `${title.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/ +/g, '_')}.${format}`;

      await conn.sendMessage(m.chat, {
        document: { url: downloadUrl },
        fileName,
        mimetype: 'audio/mpeg',
        contextInfo: {
          externalAdReply: {
            title: title,
            body: `YOUTUBE • MP3 DOC`,
            mediaUrl: url,
            sourceUrl: url,
            thumbnailUrl: image,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });


      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});

    } else {
      return m.reply(`⚠️ No se pudo descargar el audio.`);
    }
  } catch (error) {
    console.error(error);
    return m.reply(`❌ Ocurrió un error: ${error.message}`);
  }
};

handler.command = handler.help = ['ytmp3doc', 'ytadoc'];
handler.tags = ['descargas'];

export default handler;