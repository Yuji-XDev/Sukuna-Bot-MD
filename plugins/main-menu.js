let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
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

  
  let videoUrl = 'https://files.catbox.moe/zsc2fq.mp4';
  let menuText = `┏━━━━━━━━━━━━━━━┓
┃     🧃 𝑺𝑼𝑲𝑼𝑵𝑨 𝑩𝑶𝑻 𝑴𝑫 🍷     
┗━━━━━━━━━━━━━━━┛

> !𝐇𝐨𝐥𝐚¡ @${userId.split('@')[0]}, sᴏʏ sᴜᴋᴜɴᴀ - ᴍᴅ

╭─「 🎖️ 𝙄𝙉𝙁𝙊 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 」─
│ 👤 𝑵𝒐𝒎𝒃𝒓𝒆: ${name}
│ ⚡ 𝑬𝒙𝒑: ${exp}
│ 💰 𝑪𝒐𝒊𝒏𝒔: ${coin}
│ 📈 𝑵𝒊𝒗𝒆𝒍: ${level}
│ 🏅 𝑹𝒂𝒏𝒈𝒐: ${role}
╰────────────

╭───「 ⚙️ 𝙄𝙉𝙁𝙊 𝘽𝙊𝙏 」──
│ 🔗 𝑪𝒓𝒆𝒂𝒅𝒐𝒓: wa.link/z1w9sq
│ 🌴 𝑴𝒐𝒅𝒐: Privado
│ 🧍 𝑼𝒔𝒖𝒂𝒓𝒊𝒐𝒔: ${totalreg}
│ 🌴 𝑻𝒊𝒑𝒐 𝑫𝒆 𝑩𝒐𝒕: ${(conn.user.jid == global.conn.user.jid ? '👑 `𝐁𝐎𝐓 𝐎𝐅𝐈𝐂𝐈𝐀𝐋`' : '🪄 `𝐒𝐔𝐁 𝐁𝐎𝐓`')}
│ 🔮 𝑪𝒐𝒎𝒂𝒏𝒅𝒐𝒔: ${totalCommands}
│ ⏳ 𝑻𝒊𝒆𝒎𝒑𝒐 𝑨𝒄𝒕𝒊𝒗𝒐: ${uptime}
╰────────────
`.trim();

  await conn.sendMessage(m.chat, {
    video: { url: videoUrl },
    caption: menuText,
    gifPlayback: true,
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
        title: '`Sukuna Bot MD`',
        body: '`Sistema desarrollado por Shadow•core`',
        mediaType: 2,
        mediaUrl: videoUrl,
        sourceUrl: redes,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      },
    }
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto'];
export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  return `${h}H ${m}M ${s}S`;
}