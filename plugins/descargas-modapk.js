import { search, download } from 'aptoide-scraper'

var handler = async (m, {conn, usedPrefix, command, text}) => {
if (!text) return conn.reply(m.chat, `${emoji} Por favor, ingrese el nombre de la apk para descargarlo.`, m, rcanal)
try {
await m.react(rwait)
conn.reply(m.chat, `\`🍰 Descargando su aplicación, espere un momento...\``, m, rcanal)
let searchA = await search(text)
let data5 = await download(searchA[0].id)
let txt = `*乂  APTOIDE - DESCARGAS* 乂\n\n`
txt += `☁️ *Nombre* : ${data5.name}\n`
txt += `🔖 *Package* : ${data5.package}\n`
txt += `🚩 *Update* : ${data5.lastup}\n`
txt += `⚖ *Peso* :  ${data5.size}`
await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, m) 
await m.react(done)  
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
return await conn.reply(m.chat, `${emoji2} El archivo es demaciado pesado.`, m)}

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
   
} catch {
return conn.reply(m.chat, `${msm} Ocurrió un fallo...`, m)}}

handler.tags = ['descargas']
handler.help = ['apkmod']
handler.command = ['apk', 'modapk', 'aptoide']
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler