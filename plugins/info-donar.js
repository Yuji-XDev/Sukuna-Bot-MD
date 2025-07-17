let media = './src/catalogo.jpg'
let handler = async (m, { conn, command }) => {
let user = db.data.users[m.sender]
let text = `Hola y Adios
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
${bot}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`
await conn.sendButton(m.chat, text, `𝗦𝗛𝗔𝗗𝗢𝗪'𝗖𝗢𝗥𝗘` + wm, media, [
['ɢʀᴜᴘᴏs', '.grupos'],
['ᴏᴡɴᴇʀ', '#owner'],
['ᴍᴇɴᴜ ᴏғᴄ', '/menu']], null, [
['ɢɪᴛʜᴜʙ', `git`]], fkontak)}
/*conn.sendMessage(m.chat, { 
text: text, 
contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[m.sender],
"externalAdReply": {
"showAdAttribution": true,
"renderLargerThumbnail": true,
"thumbnail": imagen1, 
"title": `ᴘᴏᴡᴇʀᴇᴅ ʙʏ sʜᴀᴅᴏᴡ'ᴄᴏʀᴇ`, 
body: bot, 
"containsAutoReply": true,
"mediaType": 1, 
"mediaUrl": redes, 
"sourceUrl": redes, 
}}}, { quoted: fkontak })}*/
/*conn.sendHydrated(m.chat, text, `𝐒𝐇𝐀𝐃𝐎𝐖'𝐂𝐎𝐑𝐄 𝐁𝐘 𝐒𝐔𝐊𝐔𝐍𝐀 𝐌𝐃` + wm, media, 'https://github.com/Yuji-XDev', 'ɢɪᴛᴜʜʙ', null, null, [
['ɢʀᴜᴘᴏs', '.grupos'],
['ᴄʀᴇᴀᴅᴏʀ', '#owner'],
['ᴍᴇɴᴜ', '/menu']
], m,)}*/
handler.command = ['alv']
handler.exp = 80
export default handler
