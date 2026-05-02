const sharp = require('sharp');
const files = ['moraweg', 'gafar', 'golearn', 'center', 'sahab', 'me'];

files.forEach(f => {
  const isMe = f === 'me';
  sharp(`src/assets/${f}.webp`)
    .resize(isMe ? 600 : 800)
    .webp({ quality: 72 })
    .toFile(`src/assets/${f}-opt.webp`)
    .then(info => console.log(`✓ ${f} — ${Math.round(info.size / 1024)} KB`))
    .catch(err => console.error(`✗ ${f}:`, err.message));
});
