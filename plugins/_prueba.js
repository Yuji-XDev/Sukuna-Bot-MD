import fs from 'fs';
import path from 'path';

let handler = async (m, { text, conn, args, command }) => {
  if (!text.includes('|')) return m.reply('⚠️ Usa el formato: #crearcomando nombre|descripción del comando');

  const [nombreComando, descripcion] = text.split('|').map(v => v.trim());

  if (!nombreComando || !descripcion) return m.reply('❗ Faltan datos. Usa: #crearcomando nombre|descripción');

  const ruta = `./comandos/${nombreComando}.js`;
  if (fs.existsSync(ruta)) return m.reply(`⚠️ El comando "${nombreComando}" ya existe.`);

  let contenidoBase = generarContenido(nombreComando, descripcion);

  fs.writeFileSync(ruta, contenidoBase);
  m.reply(`✅ Comando "${nombreComando}" creado correctamente.\n\nReinicia el bot para que esté activo.`);
};

handler.help = ['crearcomando'].map(v => v + ' <nombre|descripción>');
handler.tags = ['owner'];
handler.command = ['crearcomando'];
handler.owner = true;

export default handler;

// Función para generar el contenido del nuevo comando
function generarContenido(nombre, descripcion) {
  if (descripcion.toLowerCase().includes('música')) {
    return `import yts from 'yt-search';\nimport ytdl from 'ytdl-core';\n\nlet handler = async (m, { text, conn }) => {\n  if (!text) return m.reply('📥 Ingresa el nombre de una canción');\n\n  let res = await yts(text);\n  let video = res.videos[0];\n  if (!video) return m.reply('❌ No se encontró ningún resultado.');\n\n  let url = video.url;\n  let title = video.title;\n\n  conn.sendFile(m.chat, url, title + '.mp3', null, m, false, { asDocument: true });\n};\n\nhandler.command = ['${nombre}'];\nexport default handler;`;
  }

  // Contenido por defecto si no es música
  return `let handler = async (m, { conn }) => {\n  m.reply('✅ Comando ${nombre} ejecutado: ${descripcion}');\n};\n\nhandler.command = ['${nombre}'];\nexport default handler;`;
}