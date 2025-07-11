let handler = async (m, { conn, args }) => {  
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender  
  let userData = global.db.data.users[userId] || {};  
  let exp = userData.exp || 0;  
  let coin = userData.coin || 0;  
  let level = userData.level || 0;  
  let role = userData.role || 'Sin Rango';  

  let name = await conn.getName(userId);  
  let _uptime = process.uptime() * 1000;  
  let uptime = clockString(_uptime);  
  let totalreg = Object.keys(global.db.data.users).length;  
  let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length;  

  let images = [
    'https://files.catbox.moe/nmseef.png',
    'https://files.catbox.moe/qnvpyq.jpg',
    'https://files.catbox.moe/w4hviq.png',
    'https://files.catbox.moe/7osb4d.jpg'
  ]
  let imgUrl = images[Math.floor(Math.random() * images.length)]  

  let txt = `
┏━━━━━━━━━━━━━━━┓
┃     🧃 𝑺𝑼𝑲𝑼𝑵𝑨 𝑩𝑶𝑻 𝑴𝑫 🍷     
┗━━━━━━━━━━━━━━━┛

> !𝐇𝐨𝐥𝐚¡ @${userId.split('@')[0]}, sᴏʏ sᴜᴋᴜɴᴀ - ᴍᴅ

╭─「 🎖️ 𝙄𝙉𝙁𝙊 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 」─╮
│ 👤 𝑵𝒐𝒎𝒃𝒓𝒆: ${name}
│ ⚡ 𝑬𝒙𝒑: ${exp}
│ 💰 𝑪𝒐𝒊𝒏𝒔: ${coin}
│ 📈 𝑵𝒊𝒗𝒆𝒍: ${level}
│ 🏅 𝑹𝒂𝒏𝒈𝒐: ${role}
╰────────────────────╯

╭───「 ⚙️ 𝙄𝙉𝙁𝙊 𝘽𝙊𝙏 」───╮
│ 🤖 𝑩𝒐𝒕: ${bot}
│ 🔗 𝑪𝒓𝒆𝒂𝒅𝒐𝒓: wa.link/z1w9sq
│ 🌴 𝑴𝒐𝒅𝒐: Privado
│ 🧍 𝑼𝒔𝒖𝒂𝒓𝒊𝒐𝒔: ${totalreg}
│ 🌴 𝑻𝒊𝒑𝒐 𝑫𝒆 𝑩𝒐𝒕:  ${(conn.user.jid == global.conn.user.jid ? '👑 `𝐁𝐎𝐓 𝐎𝐅𝐈𝐂𝐈𝐀𝐋`' : '🪄 `𝐒𝐔𝐁 𝐁𝐎𝐓`')}
│ 🔮 𝑪𝒐𝒎𝒂𝒏𝒅𝒐𝒔: ${totalCommands}
│ ⏳ 𝑻𝒊𝒆𝒎𝒑𝒐 𝑨𝒄𝒕𝒊𝒗𝒐: ${uptime}
╰────────────────────╯

‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
𝙇𝙄𝙎𝙏 - 𝘿𝙀 - 𝘾𝙊𝙈𝘼𝙉𝘿𝙊𝙎

╭──────❍༓❍༓❍──────╮
> 🌴 ᴄʀᴇᴀ ᴜɴ sᴜʙʙᴏᴛ ᴜᴛɪʟɪᴢᴀɴᴅᴏ
> 💥 \`#ǫʀ\` - ᴄᴏᴅɪɢᴏ ǫʀ
> 🐾 \`#ᴄᴏᴅᴇ\` - ᴄᴏᴅɪɢᴏ ᴅᴇ 8 ᴅɪɢɪᴛᴏs
╰──────❍༓❍༓❍──────╯
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
╭───────────────◆
│ ✩🧃 𝐈𝐍𝐅𝐎 ⛩️ ✩
╰───────────────◆
> ⫸ .menu
> ⫸ .uptime
> ⫸ .script
> ⫸ .staff
> ⫸ .creador
> ⫸ .grupos
> ⫸ .estado
> ⫸ .infobot
> ⫸ .sug
> ⫸ .ping
> ⫸ .reportar *<text>*
> ⫸ .reglas
> ⫸ .speed
> ⫸ .sistema
> ⫸ .usuarios
> ⫸ .ds
> ⫸ .funciones
> ⫸ .editautoresponder
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐌𝐄𝐍𝐔𝐒-𝐁𝐎𝐓 ⛩️ ✩
╰───────────────◆
> ⫸ .menulist
> ⫸ .dev - *Menu owner*
> ⫸ .menuse - *Menu search*
> ⫸ .menudl - *Menu descargas*
> ⫸ .menulogos - *logos*
> ⫸ .menu18 - *Menu hot*
> ⫸ .menugp - *Menu grupo*
> ⫸ .menu2 - *Menu audios*
> ⫸ .menurpg - *Menu economia*
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐁𝐔𝐒𝐂𝐀𝐃𝐎𝐑𝐄𝐒 ⛩️ ✩
╰───────────────◆
> ⫸ .animeinfo
> ⫸ .animesearch
> ⫸ .cuevana
> ⫸ .githubsearch
> ⫸ .searchhentai
> ⫸ .google *<búsqueda>*
> ⫸ .imagen *<query>*
> ⫸ .infoanime
> ⫸ .githubstalk *<query>*
> ⫸ .soundcloudsearch *<txt>*
> ⫸ .pinterest
> ⫸ .pornhubsearch
> ⫸ .spotifysearch *<texto>*
> ⫸ .ytsearch2 *<text>*
> ⫸ .npmjs
> ⫸ .gnula
> ⫸ .apksearch
> ⫸ .wikis
> ⫸ .tiktoksearch *<txt>*
> ⫸ .tweetposts
> ⫸ .xnxxs
> ⫸ .xvsearch
> ⫸ .yts
> ⫸ .fdroidsearch *<término>*
> ⫸ .happymodsearch *<búsqueda>*
> ⫸ .cinecalidadsearch *<búsqueda>*
> ⫸ .yahoosearch *<búsqueda>*
> ⫸ .movie *<término>*
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐒𝐔𝐁 𝐁𝐎𝐓𝐒 ⛩️ ✩
╰───────────────◆
> ⫸ .qr
> ⫸ .code
> ⫸ .token
> ⫸ .sockets
> ⫸ .deletesesion
> ⫸ .pausarai
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 ⛩️ ✩
╰───────────────◆
> ⫸ .fb2
> ⫸ .fdroid *<url>*
> ⫸ .fb
> ⫸ .sound
> ⫸ .gitclone *<url git>*
> ⫸ .gdrive
> ⫸ .ig
> ⫸ .sukunaiafire *<url>*
> ⫸ .mega
> ⫸ .apk *<nombre>*
> ⫸ .pinvid *<link>*
> ⫸ .apk2 *<busqueda>*
> ⫸ .npmdl
> ⫸ .tt2
> ⫸ .kwaidl
> ⫸ .likee *<url>*
> ⫸ .aplay2 • applemusic2
> ⫸ .capcut *<url>*
> ⫸ .play
> ⫸ .play2
> ⫸ .ytmp3doc
> ⫸ .ytmp4doc
> ⫸ .iaimg *<texto>*
> ⫸ .yta
> ⫸ .ytv
> ⫸ .mp3
> ⫸ .tiktokrandom
> ⫸ .spotify
> ⫸ .tiktokhd
> ⫸ .tiktoktrends
> ⫸ .snapchat *<link>*
> ⫸ .terabox
> ⫸ .tiktok *<url>*
> ⫸ .tiktokmp3 *<url>*
> ⫸ .tiktokimg *<url>*
> ⫸ .twitter *<url>*
> ⫸ .xvideosdl
> ⫸ .xnxxdl
> ⫸ .pindl
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐅𝐔𝐍 ⛩️ ✩
╰───────────────◆
> ⫸ .gay <@tag> | <nombre> 
> ⫸ .lesbiana <@tag> | <nombre> 
> ⫸ .pajero <@tag> | <nombre> 
> ⫸ .pajera <@tag> | <nombre> 
> ⫸ .puto <@tag> | <nombre> 
> ⫸ .puta <@tag> | <nombre> 
> ⫸ .manco <@tag> | <nombre> 
> ⫸ .manca <@tag> | <nombre> 
> ⫸ .rata <@tag> | <nombre>
> ⫸ .prostituta <@tag> | <nombre> 
> ⫸ .amigorandom
> ⫸ .jalamela
> ⫸ .simi
> ⫸ .chiste
> ⫸ .consejo
> ⫸ .doxear *<mension>*
> ⫸ .facto
> ⫸ .reto
> ⫸ .verdad
> ⫸ .prostituto *<@tag> | <nombre>*
> ⫸ .formarpareja
> ⫸ .formarpareja5
> ⫸ .frase
> ⫸ .huevo *@user*
> ⫸ .chupalo *<mencion>*
> ⫸ .aplauso *<mencion>*
> ⫸ .marron *<mencion>*
> ⫸ .suicidar
> ⫸ .iqtest <mencion>*
> ⫸ .meme
> ⫸ .morse
> ⫸ .nombreninja *<texto>*
> ⫸ .paja
> ⫸ .personalidad *<mencion>*
> ⫸ .pregunta 
> ⫸ .piropo 
> ⫸ .zodiac *2002 02 25*
> ⫸ .ship 
> ⫸ .sorte 
> ⫸ .top *[texto]*
> ⫸ .formartrio *<mencion>*
> ⫸ .tt 
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐆𝐀𝐌𝐄 ⛩️ ✩
╰───────────────◆
> ⫸ .ahorcado
> ⫸ .delxo
> ⫸ .genio *<pregunta>*
> ⫸ .math *<mode>*
> ⫸ .ppt 
> ⫸ .pvp
> ⫸ .sopa
> ⫸ .acertijo
> ⫸ .ttt
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐀𝐍𝐈𝐌𝐄 ⛩️ ✩
╰───────────────◆
> ⫸ .angry/enojado @tag
> ⫸ .bath/bañarse @tag
> ⫸ .bite/morder @tag
> ⫸ .bleh/lengua @tag
> ⫸ .blush/sonrojarse @tag
> ⫸ .bored/aburrido @tag
> ⫸ .nights/noches
> ⫸ .dias/days
> ⫸ .coffe/cafe @tag
> ⫸ .cry/llorar @tag
> ⫸ .cuddle/acurrucarse @tag
> ⫸ .dance/bailar @tag
> ⫸ .drunk/borracho @tag
> ⫸ .eat/comer @tag
> ⫸ .messi
> ⫸ .cr7
> ⫸ .facepalm/palmada @tag
> ⫸ .happy/feliz @tag
> ⫸ .hello/hola @tag
> ⫸ .hug/abrazar @tag
> ⫸ .kill/matar @tag
> ⫸ .kiss2/besar2 @tag
> ⫸ .kiss/besar @tag
> ⫸ .laugh/reirse @tag
> ⫸ .lick/lamer @tag
> ⫸ .love2/enamorada @tag
> ⫸ .patt/acariciar @tag
> ⫸ .poke/picar @tag
> ⫸ .pout/pucheros @tag
> ⫸ .ppcouple
> ⫸ .preg/embarazar @tag
> ⫸ .punch/golpear @tag
> ⫸ .run/correr @tag
> ⫸ .sad/triste @tag
> ⫸ .scared/asustada @tag
> ⫸ .seduce/seducir @tag
> ⫸ .shy/timida @tag
> ⫸ .slap/bofetada @tag
> ⫸ .sleep/dormir @tag
> ⫸ .smoke/fumar @tag
> ⫸ .think/pensando @tag
> ⫸ .undress/encuerar @tag
> ⫸ .waifu
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐏𝐄𝐑𝐅𝐈𝐋 ⛩️ ✩
╰───────────────◆
> ⫸ .reg
> ⫸ .unreg
> ⫸ .profile
> ⫸ .marry *[mension / etiquetar]*
> ⫸ .divorce
> ⫸ .setgenre *<text>*
> ⫸ .delgenre
> ⫸ .setbirth *<text>*
> ⫸ .delbirth
> ⫸ .setdesc *<text>*
> ⫸ .deldesc
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐒𝐓𝐀𝐋𝐊 ⛩️ ✩
╰───────────────◆
> ⫸ .tiktokstalk *<usuario>*
> ⫸ .kwaistalk *<usuario>*
> ⫸ .telegramstalk *<nombre_usuario>*
> ⫸ .youtubestalk *<nombre de usuario>*
> ⫸ .instagramstalk *<usuario>*
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 ⛩️ ✩
╰───────────────◆
> ⫸ .comprarpremium
> ⫸ .premium
> ⫸ .vip
> ⫸ .spamwa <number>|<mesage>|<no of messages>
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐄𝐂𝐎𝐍𝐎𝐌𝐈𝐀 ⛩️ ✩
╰───────────────◆
> ⫸ .aventura
> ⫸ .baltop
> ⫸ .bank / bal
> ⫸ .cazar 
> ⫸ .codigo *<cantida de coins>*
> ⫸ .canjear *<código>*
> ⫸ .cartera
> ⫸ .apostar *<cantidad>*
> ⫸ .cf
> ⫸ .cofre
> ⫸ .crimen
> ⫸ .daily
> ⫸ .depositar 
> ⫸ .explorar
> ⫸ .gremio
> ⫸ .regalo
> ⫸ .halloween
> ⫸ .heal
> ⫸ .inventario 
> ⫸ .mensual
> ⫸ .mazmorra
> ⫸ .minar
> ⫸ .navidad
> ⫸ .retirar
> ⫸ .robar
> ⫸ .robarxp
> ⫸ .ruleta *<cantidad> <color>*
> ⫸ .buyall
> ⫸ .buy
> ⫸ .protituirse
> ⫸ .work
> ⫸ .pay / transfer 
> ⫸ .semanal
> ⫸ .levelup
> ⫸ .lvl @user
> ⫸ .slot *<apuesta>*
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐆𝐀𝐂𝐇𝐀 ⛩️ ✩
╰───────────────◆
> ⫸ .rw
> ⫸ .reclamar 
> ⫸ .harem
> ⫸ .waifuimage
> ⫸ .charinfo
> ⫸ .topwaifus *[pagina]*
> ⫸ .regalar *<nombre del personaje> @usuario*
> ⫸ .vote *<personaje>*
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒 ⛩️ ✩
╰───────────────◆
> ⫸ .sticker *<img>*
> ⫸ .sticker *<url>*
> ⫸ .setmeta
> ⫸ .delmeta
> ⫸ .bratvid *<texto>*
> ⫸ .pfp *@user*
> ⫸ .qc
> ⫸ .toimg *(reply)*
> ⫸ .brat
> ⫸ .bratvid *<texto>*
> ⫸ .emojimix  *<emoji+emoji>*
> ⫸ .wm *<packname>|<author>*
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐇𝐄𝐑𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒 ⛩️ ✩
╰───────────────◆
> ⫸ .letra *<texto>*
> ⫸ .fake
> ⫸ .hd
> ⫸ .detectar
> ⫸ .clima *<ciudad/país>*
> ⫸ .join
> ⫸ .nuevafotochannel
> ⫸ .nosilenciarcanal
> ⫸ .silenciarcanal
> ⫸ .noseguircanal
> ⫸ .seguircanal 
> ⫸ .avisoschannel 
> ⫸ .resiviravisos 
> ⫸ .inspect 
> ⫸ .inspeccionar 
> ⫸ .eliminarfotochannel 
> ⫸ .reactioneschannel 
> ⫸ .reaccioneschannel 
> ⫸ .nuevonombrecanal 
> ⫸ .nuevadescchannel
> ⫸ .setavatar
> ⫸ .setbanner
> ⫸ .seticono
> ⫸ .setmoneda
> ⫸ .setname nombre1/nombre2
> ⫸ .cal *<ecuacion>*
> ⫸ .horario
> ⫸ .read
> ⫸ .traducir <idoma>
> ⫸ .say
> ⫸ .whatmusic <audio/video>
> ⫸ .paisinfo
> ⫸ .ssweb
> ⫸ .tamaño *<cantidad>*
> ⫸ .document *<audio/video>*
> ⫸ .translate
> ⫸ .up
> ⫸ .enhance
> ⫸ .wikipedia
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐎𝐍 / 𝐎𝐅𝐅 ⛩️ ✩
╰───────────────◆
> ⫸ .welcome
> ⫸ .bienvenida
> ⫸ .antiprivado
> ⫸ .antiprivate
> ⫸ .restrict
> ⫸ .restringir
> ⫸ .antibot
> ⫸ .antibots
> ⫸ .autoaceptar
> ⫸ .aceptarauto
> ⫸ .autorechazar
> ⫸ .rechazarauto
> ⫸ .autoresponder
> ⫸ .autorespond
> ⫸ .antisubbots
> ⫸ .antibot2
> ⫸ .modoadmin
> ⫸ .soloadmin
> ⫸ .reaction
> ⫸ .reaccion
> ⫸ .nsfw
> ⫸ .modohorny
> ⫸ .antispam
> ⫸ .jadibotmd
> ⫸ .modejadibot
> ⫸ .subbots
> ⫸ .detect
> ⫸ .avisos
> ⫸ .antilink
> ⫸ .audios
> ⫸ .antiver
> ⫸ .antiocultar
> ⫸ .antilink2
> ⫸ .antiarabe
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐆𝐑𝐔𝐏𝐎𝐒 ⛩️ ✩
╰───────────────◆
> ⫸ .admins
> ⫸ .agregar
> ⫸ .advertencia <@user>
> ⫸ .delwarn
> ⫸ .grupo abrir / cerrar
> ⫸ .group open / close
> ⫸ .delete
> ⫸ .demote <@user>
> ⫸ .promote <@user>
> ⫸ .encuesta <text|text2>
> ⫸ .kickfantasmas
> ⫸ .gpbanner
> ⫸ .gpdesc
> ⫸ .gpname
> ⫸ .hidetag
> ⫸ .infogrupo
> ⫸ .kickall
> ⫸ .kick <@user>
> ⫸ .kicknum
> ⫸ .listonline
> ⫸ .link
> ⫸ .listadv
> ⫸ .mute
> ⫸ .unmute
> ⫸ .config
> ⫸ .restablecer
> ⫸ .setbye
> ⫸ .setwelcome
> ⫸ .testwelcome
> ⫸ .setemoji <emoji>
> ⫸ .invocar *<mensaje opcional>*
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐍𝐒𝐅𝐖 ⛩️ ✩
╰───────────────◆
> ⫸ .sixnine/69 @tag
> ⫸ .anal/culiar @tag
> ⫸ .blowjob/mamada @tag
> ⫸ .boobjob/rusa @tag
> ⫸ .cum/leche @tag
> ⫸ .fap/paja @tag
> ⫸ .follar @tag
> ⫸ .fuck/coger @tag
> ⫸ .footjob/pies @tag
> ⫸ .fuck2/coger2 @tag
> ⫸ .grabboobs/agarrartetas @tag
> ⫸ .grop/manosear @tag
> ⫸ .penetrar @user
> ⫸ .lickpussy/coño @tag
> ⫸ .r34 <tag>
> ⫸ .sexo/sex @tag
> ⫸ .spank/nalgada @tag
> ⫸ .suckboobs/chupartetas @tag
> ⫸ .violar/perra @tag
> ⫸ .lesbianas/tijeras @tag
> ⫸ .pack
> ⫸ .tetas
> ⫸ .undress/encuerar
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐎𝐖𝐍𝐄𝐑 ⛩️ ✩
╰───────────────◆
> ⫸ .addcoins *<@user>*
> ⫸ .addowner / delowner
> ⫸ .addprem [@user] <days>
> ⫸ .añadirxp
> ⫸ .copia
> ⫸ .autoadmin
> ⫸ .banuser <@tag> <razón>
> ⫸ .banlist
> ⫸ .bcgc
> ⫸ .block / unblock
> ⫸ .blocklist
> ⫸ .chetar *@user* / *<número>*
> ⫸ .cleartmp
> ⫸ .creargc
> ⫸ .deletefile
> ⫸ .delprem <@user>
> ⫸ .deschetar *@user* / *<número>*
> ⫸ .dsowner
> ⫸ =>
> ⫸ >
> ⫸ .fetch
> ⫸ .getplugin
> ⫸ .grouplist
> ⫸ .salir
> ⫸ .let
> ⫸ .prefix [prefix]
> ⫸ .quitarcoin *<@user>* / all
> ⫸ .quitarxp *<@user>*
> ⫸ .resetprefix
> ⫸ .restablecerdatos
> ⫸ .restart / reiniciar
> ⫸ .reunion
> ⫸ .savefile <ruta/nombre>
> ⫸ .saveplugin
> ⫸ .setcmd *<texto>*
> ⫸ .delcmd
> ⫸ .listcmd
> ⫸ .setimage
> ⫸ .setstatus <teks>
> ⫸ .spam2
> ⫸ .unbanuser <@tag>
> ⫸ .ip <alamat ip>
> ⫸ .update / fix
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐈𝐀 - 𝐀𝐈 ⛩️ ✩
╰───────────────◆
> ⫸ .dalle
> ⫸ .demo *<texto>*
> ⫸ .flux *<texto>*
> ⫸ .gemini
> ⫸ .ia
> ⫸ .llama
┗━━━━━━━━━━━━━━━━━━━━

╭───────────────◆
│ ✩🧃 𝐓𝐑𝐀𝐍𝐒𝐅𝐎𝐑𝐌𝐀𝐃𝐎𝐑 ⛩️ ✩
╰───────────────◆
> ⫸ .tourl <imagen>
> ⫸ .catbox
> ⫸ .tourl3
> ⫸ .togifaud
> ⫸ .tomp3
> ⫸ .tovideo
> ⫸ .tts <lang> <teks>
> ⫸ .tts2
┗━━━━━━━━━━━━━━━━━━━━

𖤐𝑩𝒍𝒂𝒄𝒌𖤐
`.trim();

  let imgBuffer = await fetch(imgUrl).then(res => res.buffer());  

  await conn.sendMessage(m.chat, {   
    text: txt,  
    image: imgBuffer,  
    contextInfo: {  
      mentionedJid: [m.sender, userId],  
      isForwarded: true,  
      forwardedNewsletterMessageInfo: {  
        newsletterJid: '120363401008003732@newsletter',  
        newsletterName: '⛩️ SUKUNA BOT MD 🌴',  
        serverMessageId: -1,  
      },  
      forwardingScore: 999,  
      externalAdReply: {  
        title: 'Sukuna Bot MD',  
        body: 'Sistema oficial desarrollado por Black.OFC',
        thumbnailUrl: imgUrl,  
        sourceUrl: redes,  
        mediaType: 1,  
        showAdAttribution: true,  
        renderLargerThumbnail: true,  
      },  
    },  
  }, { quoted: m });  
}  

handler.help = ['menu'];  
handler.tags = ['main'];  
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto'];

export default handler;  

function clockString(ms) {  
  let seconds = Math.floor((ms / 1000) % 60);  
  let minutes = Math.floor((ms / (1000 * 60)) % 60);  
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);  
  return `${hours}H ${minutes}M ${seconds}S`;  
}