import { search, download } from 'aptoide-scraper';

const handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, `\`\`\`🌪️ Por favor, ingresa el nombre de la APK para buscar.\`\`\``, m, rcanal);

  try {
    await m.react('⏳');
    conn.reply(m.chat, `\`\`\`🌀 Buscando y descargando la aplicación. Espere un momento...\`\`\``, m, rcanal);

  
    const searchResult = await search(text);
    if (!searchResult.length) return conn.reply(m.chat, `❌ No se encontraron resultados para "${text}".`, m);

 
    const appData = await download(searchResult[0].id);

    const details = `\`\`\`乂 APTOIDE - DESCARGA 乂\n
☁️ Nombre   : ${appData.name}
🔖 Paquete  : ${appData.package}
🚩 Última actualización : ${appData.lastup}
⚖ Tamaño   : ${appData.size}\`\`\``;

    await conn.sendFile(m.chat, appData.icon, 'thumbnail.jpg', details, m);

    await m.react('✅');


    if (appData.size.includes('GB') || parseFloat(appData.size.replace(' MB', '')) > 999) {
      return conn.reply(m.chat, `⚠️ El archivo es demasiado pesado para enviarlo.`, m);
    }

   
    const caption = `*${appData.name}*\n\n> ${club}`;
    await conn.sendMessage(m.chat, {
      document: { url: appData.dllink },
      fileName: `${appData.name}.apk`,
      mimetype: 'application/vnd.android.package-archive',
      caption,
      thumbnail: appData.icon,
      contextInfo: {
        externalAdReply: {
          title: appData.name,
          body: `Powered by ShadowCore`,
          mediaUrl: null,
          sourceUrl: null,
          thumbnailUrl: appData.icon,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error('[APK ERROR]', e);
    conn.reply(m.chat, `❌ Ocurrió un fallo al procesar la solicitud.`, m);
  }
};

handler.tags = ['descargas'];
handler.help = ['apk', 'modapk', 'aptoide'].map(v => v + ' <nombre>');
handler.command = ['apk', 'modapk', 'aptoide'];
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler;