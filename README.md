# Syakal Ramaliyyah - Android WebView

Project ini membungkus aplikasi HTML/CSS/JS menjadi APK Android native WebView.

## Isi utama

- `app/src/main/assets/index.html`
- `app/src/main/assets/style.css`
- `app/src/main/assets/app.js`
- `app/src/main/java/com/alisyehan/syakal/MainActivity.java`
- `.github/workflows/build-apk.yml`

## Versi build yang dipakai

- Android Gradle Plugin: `8.12.2`
- Gradle di GitHub Actions: `8.13`
- JDK: `17`
- compileSdk / targetSdk: `35`
- minSdk: `23`

Kombinasi ini sengaja dibuat konservatif agar tidak sering error karena mismatch Gradle, AGP, dan JDK.

## Cara build lokal

Pastikan Android Studio sudah terpasang, lalu buka folder project ini.

Terminal:

```bash
gradle assembleDebug
```

APK debug akan muncul di:

```text
app/build/outputs/apk/debug/app-debug.apk
```

## Cara upload ke GitHub

```bash
git init
git add .
git commit -m "Initial Android WebView project"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

## Cara build APK via GitHub Actions

1. Upload/push project ini ke GitHub.
2. Buka tab **Actions** di repository.
3. Pilih workflow **Build Android APK**.
4. Klik **Run workflow** atau push commit baru ke branch `main`.
5. Setelah selesai, unduh artifact bernama **syakal-debug-apk**.

## Update file web

Jika ingin mengganti tampilan/aplikasi web, edit file di:

```text
app/src/main/assets/
```

Jangan lupa commit dan push ulang.
