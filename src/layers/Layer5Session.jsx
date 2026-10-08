import LayerView from '../components/LayerView.jsx'

const data = {
  n: 5,
  address: 'Session ID / Token',
  tcpip: 'Application',
  summary: [
    'Session Layer bertugas membuka, mengelola, dan menutup sesi (dialog) antar aplikasi. Sesi adalah "percakapan" berkelanjutan yang punya awal, tengah, dan akhir — misalnya login ke sebuah situs, panggilan video, atau sesi remote desktop.',
    'Pada praktiknya, fungsi Layer 5 sering dikerjakan oleh protokol aplikasi atau library (cookie, token JWT, session ID, RPC, NetBIOS, SOCKS). Dalam model TCP/IP lapisan sesi, presentasi, dan aplikasi digabung menjadi satu, namun konsepnya tetap penting.',
  ],
  analogy:
    'Layer 5 seperti operator telepon kantor: menyambungkan panggilan, menjaga saluran tetap terbuka selama percakapan, dan memutuskan sambungan setelah selesai — serta dapat menyambung ulang bila terputus di tengah jalan.',
  functions: [
    { t: 'Session establishment', d: 'Membuat sesi baru: autentikasi, negosiasi parameter, dan pemberian session ID / token kepada klien.' },
    { t: 'Dialog control', d: 'Mengatur giliran komunikasi: simplex, half-duplex, atau full-duplex pada tingkat percakapan.' },
    { t: 'Sinkronisasi & checkpoint', d: 'Menyisipkan titik sinkron pada data besar agar bila terputus, transfer dilanjutkan dari checkpoint terakhir, bukan dari awal.' },
    { t: 'Session maintenance', d: 'Menjaga sesi tetap hidup (keep-alive, heartbeat) dan mengelola timeout ketika tidak ada aktivitas.' },
    { t: 'Session recovery', d: 'Memulihkan sesi setelah gangguan (reconnect, session resumption) sehingga pengguna tidak perlu mengulang dari nol.' },
    { t: 'Session termination', d: 'Menutup sesi dengan rapi: logout, pembebasan sumber daya, dan invalidasi token.' },
  ],
  deep: [
    {
      t: 'Siklus hidup sesi',
      d: 'Setiap sesi mengikuti tahap yang sama, apa pun protokolnya:',
      points: [
        '1. Setup — klien dan server bernegosiasi dan klien terautentikasi.',
        '2. Active — data dipertukarkan; server mengenali klien melalui session ID.',
        '3. Idle / keep-alive — tidak ada data, sesi dipertahankan hingga timeout.',
        '4. Teardown — logout atau expire; server menghapus data sesi.',
      ],
    },
    {
      t: 'Session ID, cookie, dan token',
      d: 'HTTP bersifat stateless — server tidak ingat permintaan sebelumnya. Untuk "mengingat" pengguna, server menerbitkan session ID (disimpan di cookie) atau token bertanda tangan (JWT). Setiap permintaan membawa ID itu sehingga server mengenali sesi. Atribut cookie HttpOnly, Secure, dan SameSite penting untuk mencegah pembajakan sesi (session hijacking).',
    },
    {
      t: 'Checkpoint & resume',
      d: 'Bayangkan mengirim file 10 GB. Layer sesi menyisipkan checkpoint tiap 100 MB. Jika koneksi putus di 4,3 GB, transfer dilanjutkan dari checkpoint 4,2 GB — inilah dasar fitur resume download (HTTP Range) dan sinkronisasi database.',
    },
    {
      t: 'Stateful vs stateless',
      d: 'Server stateful menyimpan data sesi di memori / Redis; server stateless menaruh seluruh status di token sehingga mudah di-scale horizontal. WebSocket dan gRPC streaming adalah contoh sesi dua arah jangka panjang.',
    },
  ],
  protocols: [
    { n: 'NetBIOS / SMB session', d: 'Sesi berbagi file dan printer pada jaringan Windows.' },
    { n: 'RPC / gRPC', d: 'Remote Procedure Call: memanggil fungsi di server jauh dalam sesi terstruktur.' },
    { n: 'SIP / H.323', d: 'Membuka, mengubah, dan menutup sesi panggilan VoIP & video.' },
    { n: 'PPTP / L2TP', d: 'Pengelolaan sesi tunnel VPN.' },
    { n: 'SOCKS / SSH session', d: 'Sesi proxy dan shell remote terautentikasi.' },
    { n: 'WebSocket, HTTP session', d: 'Sesi dua arah persisten dan sesi login berbasis cookie / JWT.' },
  ],
  devices: [
    { n: 'Session / Application Gateway', d: 'Mengelola sesi pengguna (mis. VDI broker, reverse proxy dengan sticky session).' },
    { n: 'Load Balancer (session persistence)', d: 'Menjaga pengguna tetap diarahkan ke server yang sama selama sesi.' },
    { n: 'Session Store (Redis, Memcached)', d: 'Penyimpanan cepat untuk data sesi pengguna.' },
    { n: 'Identity Provider (SSO)', d: 'Menerbitkan token sesi tunggal untuk banyak aplikasi (Keycloak, Okta).' },
  ],
  pdu: {
    title: 'PDU Layer 5: Data + Informasi Sesi',
    intro: 'Layer 5 tidak punya format header universal; informasi sesi dibawa oleh protokol di atasnya. Contoh umum yang dibawa dalam permintaan HTTP:',
    fields: [
      { n: 'Session ID / Cookie', size: '128+ bit', w: 3, d: 'Pengenal acak yang diterbitkan server (mis. sid=9f2c...). Setiap permintaan membawanya agar server tahu siapa pengirimnya.' },
      { n: 'Auth Token (JWT)', size: 'variabel', w: 3.4, d: 'JSON Web Token: header.payload.signature — berisi identitas, hak akses, dan waktu kedaluwarsa (exp).' },
      { n: 'Sequence / Checkpoint', size: 'variabel', w: 2.6, d: 'Penanda sinkronisasi untuk melanjutkan transfer atau dialog dari titik tertentu.' },
      { n: 'Keep-Alive / Timeout', size: 'variabel', w: 2.6, d: 'Parameter heartbeat dan idle timeout supaya sesi tidak menggantung selamanya.' },
      { n: 'Data', size: 'variabel', w: 5, d: 'Payload aplikasi yang diteruskan ke lapisan presentasi.' },
    ],
  },
  examples: [
    {
      title: 'Siklus login web: session cookie',
      scenario:
        'Pengguna login ke toko online, menjelajah, menambahkan produk ke keranjang, lalu logout. Bagaimana server mengenali pengguna yang sama di setiap permintaan?',
      steps: [
        { t: 'Login (setup sesi)', d: 'Browser mengirim username & password via HTTPS. Server memverifikasi, membuat sesi di Redis, dan memberi session ID acak.' },
        { t: 'Cookie diset', d: 'Server membalas dengan header Set-Cookie berisi session ID (HttpOnly, Secure, SameSite).' },
        { t: 'Permintaan berikutnya', d: 'Browser otomatis menyertakan cookie. Server mencari sesi, menemukan user_id, dan mengembalikan keranjang yang benar.' },
        { t: 'Idle timeout', d: 'Jika tidak ada aktivitas 30 menit, sesi kedaluwarsa dan pengguna diminta login ulang.' },
        { t: 'Logout (teardown)', d: 'Sesi dihapus dari server dan cookie dikosongkan sehingga ID lama tidak dapat dipakai lagi.' },
      ],
      code: {
        title: 'http — session flow',
        text: `>> POST /login HTTP/1.1
>> Host: shop.example.com
>> Content-Type: application/json
>> {"user":"budi","pass":"********"}

<< HTTP/1.1 200 OK
<< Set-Cookie: sid=9f2c7ab1e04d; HttpOnly; Secure; SameSite=Lax; Max-Age=1800
<< {"message":"Login berhasil"}

>> GET /cart HTTP/1.1
>> Host: shop.example.com
>> Cookie: sid=9f2c7ab1e04d

<< HTTP/1.1 200 OK
<< {"items":[{"sku":"KBD-01","qty":1}]}

>> POST /logout   (Cookie: sid=9f2c7ab1e04d)
<< Set-Cookie: sid=; Max-Age=0      # sesi dihapus`,
      },
      note: 'Selalu regenerasi session ID setelah login untuk mencegah session fixation.',
    },
    {
      title: 'Implementasi sesi sederhana (Node.js Express) + resume download',
      scenario:
        'Backend perlu menyimpan sesi pengguna dan mendukung melanjutkan unduhan file besar yang terputus.',
      steps: [
        { t: 'Konfigurasi middleware sesi', d: 'express-session membuat session ID, menyimpannya di store, dan mengirim cookie.' },
        { t: 'Simpan data di sesi', d: 'Setelah autentikasi, user_id disimpan pada req.session.' },
        { t: 'Proteksi route', d: 'Route private memeriksa req.session.userId; jika tidak ada → 401.' },
        { t: 'Resume download', d: 'Klien mengirim header Range sehingga server melanjutkan dari byte terakhir (checkpoint).' },
      ],
      code: {
        title: 'server.js',
        text: `import express from "express";
import session from "express-session";

const app = express();
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, sameSite: "lax", maxAge: 30 * 60 * 1000 },
}));

app.post("/login", (req, res) => {
  req.session.regenerate(() => {          // cegah session fixation
    req.session.userId = 42;              // setup sesi
    res.json({ ok: true });
  });
});

app.get("/profile", (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Sesi tidak valid" });
  res.json({ userId: req.session.userId });
});

app.post("/logout", (req, res) => req.session.destroy(() => res.sendStatus(204)));

// Resume download: klien kirim  Range: bytes=4500000-
// server balas 206 Partial Content + Content-Range`,
      },
    },
  ],
  troubleshooting: [
    { p: 'Pengguna sering logout sendiri', s: 'Idle timeout terlalu pendek atau load balancer tanpa sticky session / session store terpusat. Gunakan Redis bersama.', cmd: 'redis-cli keys "sess:*"' },
    { p: 'Session hijacking', s: 'Pakai HTTPS, cookie HttpOnly+Secure, regenerasi ID setelah login, dan batasi masa berlaku.' },
    { p: 'Sesi SMB / RDP terputus sendiri', s: 'Periksa keepalive, timeout firewall (idle TCP dibuang), dan kestabilan jaringan.', cmd: 'net session' },
    { p: 'Token JWT kedaluwarsa terus', s: 'Implementasikan refresh token dan sinkronkan jam server (NTP).', cmd: 'timedatectl status' },
  ],
  facts: [
    'Layer 5 adalah salah satu lapisan yang paling "kabur" — di dunia nyata sering menyatu dengan Layer 6 dan 7.',
    'Cookie pertama kali diperkenalkan oleh Netscape tahun 1994 untuk keranjang belanja online.',
    'WebSocket mempertahankan sesi dua arah dengan hanya satu handshake HTTP Upgrade.',
    'TLS session resumption mempercepat koneksi ulang karena tidak perlu handshake penuh lagi.',
  ],
  quiz: [
    { q: 'Tugas utama Session Layer adalah …', o: ['Routing paket', 'Mengelola sesi komunikasi', 'Mengubah sinyal', 'Mengatur MAC'], a: 1, e: 'Layer 5 membuka, memelihara, dan menutup sesi antar aplikasi.' },
    { q: 'Mengapa checkpoint berguna?', o: ['Mempercepat kabel', 'Melanjutkan transfer dari titik terakhir', 'Menambah port', 'Menghapus cookie'], a: 1, e: 'Dengan checkpoint, transfer tidak perlu diulang dari awal bila terputus.' },
    { q: 'Atribut cookie yang mencegah akses JavaScript adalah …', o: ['Secure', 'SameSite', 'HttpOnly', 'Path'], a: 2, e: 'HttpOnly mencegah JavaScript membaca cookie sehingga mengurangi risiko pencurian lewat XSS.' },
  ],
}

export default function Layer5Session() {
  return <LayerView data={data} />
}
