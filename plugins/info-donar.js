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
['ɢɪᴛʜᴜʙ', `https://gituhb.com/Yuji-XDev`]], fkontak)}

handler.command = ['alv']
handler.exp = 80
export default handler
