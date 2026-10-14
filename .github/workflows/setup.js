// Собирает debug-APK: node setup.js
const { execSync } = require('child_process');
const fs = require('fs');
const run = (c, o = {}) => execSync(c, { stdio: 'inherit', shell: true, ...o });

run('npm install @capacitor/core @capacitor/cli @capacitor/android');
if (!fs.existsSync('android')) run('npx cap add android');

// Горизонтальная ориентация
const mf = 'android/app/src/main/AndroidManifest.xml';
let m = fs.readFileSync(mf, 'utf8');
if (!m.includes('screenOrientation')) {
  m = m.replace(/<activity\b/, '<activity android:screenOrientation="sensorLandscape"');
  fs.writeFileSync(mf, m);
}

run('npx cap sync android');

try {
  const gw = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
  run(gw + ' assembleDebug', { cwd: 'android' });
  console.log('\nГОТОВО: android/app/build/outputs/apk/debug/app-debug.apk');
} catch (e) {
  console.log('\nGradle не справился. Открой проект в Android Studio: npx cap open android');
  console.log('и выбери Build > Build APK(s). Часто помогает установка нужной версии JDK/SDK.');
}
