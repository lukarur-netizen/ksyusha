Приключение Ксюши: сборка APK

Нужно: Node.js, Android Studio (она ставит JDK и Android SDK).

1. В этой папке выполни:  node setup.js
2. Готовый файл: android/app/build/outputs/apk/debug/app-debug.apk
3. Установка на телефон: скопируй APK на телефон, открой и разреши
   установку из неизвестных источников. Либо по USB: adb install app-debug.apk

Игра лежит в www/index.html. Правишь её, затем запускаешь:
   npx cap sync android
и собираешь заново.
