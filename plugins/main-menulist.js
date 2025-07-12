import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('💔');

  try {
    const titulo = '💠 𝐌𝐄𝐍𝐔́ 𝐋𝐈𝐒𝐓𝐀 💠';
    const texto = `
⌬〘 👤 𝐃𝐀𝐓𝐎𝐒 𝐇𝐀𝐂𝐊𝐄𝐑 〙⌬
▣ 🧠 ID: *${conn.getName(m.sender)}*
▣ 🧬 RANGO: *${global.db.data.users[m.sender]?.role || '┇𝙎𝙞𝙣 𝙍𝙖𝙣𝙜𝙤┇'}*
▣ 🧭 NIVEL: *${global.db.data.users[m.sender]?.level || 0}*
▣ ⚡ EXP: *${global.db.data.users[m.sender]?.exp || 0}*
⌬━━━━━━━━━━━━━━━━━━━━━⌬

🧿 [ 𝐀𝐂𝐂𝐄𝐒𝐎 𝐀 𝐌𝐎𝐃𝐔𝐋𝐎𝐒 ] 🧿

▣ 🛠️ *#menugp* → 👥 Grupos y Admin
▣ 🎭 *#menulogos* → 🎨 Logos & Diseños
▣ 💻 *#dev* → 👑 Panel de Owner
▣ 🔞 *#menu18* → ⚠️ Zona +18
▣ 🎧 *#menu2* → 📻 Extras y Audios
▣ 🔎 *#menusearch* → 🌐 Buscadores OSINT
▣ 📥 *#menudl* → ⬇️ Descargas de redes
▣ 🗡️ *#menurpg* → ⚔️ Sistema RPG

⌬ Sistema Operativo: *SUᴋᴜɴᴀ.ᴇxᴇ*
⌬ Powered by: *Shadow'Core OS*`;

    const imagen = 'https://files.catbox.moe/35wxsf.jpg';
    const imgBuffer = await (await fetch(imagen)).buffer();

    const buttons = [
      { buttonId: `${usedPrefix}reg black.18`, buttonText: { displayText: 'USER › ACTIVAR ESCUDO' }, type: 1 },
      { buttonId: `${usedPrefix}allmenu`, buttonText: { displayText: 'FULL PANEL – SYS' }, type: 1 }
    ];

    const sections = [
      {
        title: "✦ MENÚS DISPONIBLES ✦",
        rows: [
          { title: "📥 𝙈𝙚𝙣𝙪́ 𝙙𝙚 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨", description: "🎧 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖 𝙘𝙤𝙣𝙩𝙚𝙣𝙞𝙙𝙤...", id: `${usedPrefix}menudl` },
          { title: "🧿 𝑴𝑬𝑵𝑼́ 𝑬𝑪𝑶𝑵𝑶𝑴𝑰́𝑨", description: "🎮 𝘾𝙧𝙚𝙖 𝙩𝙪 𝙖𝙫𝙚𝙣𝙩𝙪𝙧𝙖...", id: `${usedPrefix}menurpg` },
          { title: "🔍 𝐌𝐄𝐍𝐔́ 𝐁𝐔́𝐒𝐐𝐔𝐄𝐃𝐀", description: "⟡ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐝𝐞 𝐛𝐮́𝐬𝐪𝐮𝐞𝐝𝐚...", id: `${usedPrefix}menuse` },
          { title: "👑 𝑴𝑬𝑵𝑼 𝑶𝑾𝑵𝑬𝑹", description: "𝐂𝐨𝐧𝐭𝐫𝐨𝐥 𝐝𝐞 𝐨𝐰𝐧𝐞𝐫", id: `${usedPrefix}dev` },
          { title: "🎐 𝑴𝑬𝑵𝑼 𝑨𝑼𝑫𝑰𝑶𝑺", description: "𝐌𝐞𝐧𝐮 𝐝𝐞 𝐚𝐮𝐝𝐢𝐨𝐬", id: `${usedPrefix}menu2` },
          { title: "👤 𝑷𝑬𝑹𝑭𝑰𝑳", description: "𝐄𝐝𝐢𝐭𝐚 𝐭𝐮 𝐩𝐞𝐫𝐟𝐢𝐥", id: `${usedPrefix}perfildatesl` },
          { title: "👥 𝑮𝑹𝑼𝑷𝑶𝑺", description: "𝐌𝐞𝐧𝐮 𝐝𝐞 𝐠𝐫𝐮𝐩𝐨𝐬", id: `${usedPrefix}menugp` },
          { title: "🔞 𝑴𝑬𝑵𝑼 +18", description: "𝐂𝐨𝐧𝐭𝐞𝐧𝐢𝐝𝐨 𝐍𝐒𝐅𝐖", id: `${usedPrefix}menu18` },
          { title: "❤️ 𝑴𝑬𝑵𝑼 𝑳𝑶𝑮𝑶𝑺", description: "𝐌𝐞𝐧𝐮 𝐝𝐞 𝐥𝐨𝐠𝐨𝐬", id: `${usedPrefix}menulogos` },
        ]
      }
    ];

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: titulo + '\n\n' + texto.trim(),
      footer: '⏤͟͞ू⃪ SUKUNA - 𝑩𝑶𝑻 • Powered by black',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓',
              sections
            })
          }
        }
      ],
      headerType: 1,
      viewOnce: true,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 1000,
        isForwarded: true
      }
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.react('❌');
    await conn.reply(m.chat, '*❌ Error al mostrar el menú.*\n' + e.message, m);
  }
};

handler.help = ['menulist'];
handler.tags = ['main'];
handler.command = ['menulist'];
export default handler;