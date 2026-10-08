# OSI Pixel_Detective Lab

Aplikasi belajar 7 Layer OSI Model (React + Vite, tema dark robot) — lengkap dengan fungsi, cara kerja, protokol, anatomi header, contoh praktik, dan quiz untuk setiap layer.

**Demo:** https://floryid.github.io/osilayer/

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/
```

Setiap layer berada di satu file: `src/layers/Layer1Physical.jsx` … `Layer7Application.jsx`.

Deploy otomatis ke GitHub Pages lewat `.github/workflows/deploy.yml` setiap push ke `main`
(Settings → Pages → Source: **GitHub Actions**).
