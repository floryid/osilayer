import LayerView from '../components/LayerView.jsx'

const data = {
  n: 7,
  address: 'URL / Domain / Username',
  tcpip: 'Application',
  summary: [
    'Application Layer adalah lapisan yang paling dekat dengan pengguna. Layer ini menyediakan antarmuka layanan jaringan bagi aplikasi — browser, email client, aplikasi chat, atau API — untuk mengakses jaringan. Penting: "aplikasi" di sini bukan program itu sendiri (Chrome, Outlook), melainkan protokol yang dipakai program tersebut (HTTP, SMTP, DNS).',
    'Layer 7 mendefinisikan aturan percakapan: perintah apa yang valid, format permintaan dan respons, kode status, dan bagaimana data dipertukarkan antara klien dan server.',
  ],
  analogy:
    'Layer 7 adalah meja pelayanan pelanggan: kamu (pengguna) mengajukan permintaan dengan format yang disepakati ("Saya mau melihat halaman X"), dan petugas memberi jawaban dalam format baku, tanpa pelanggan perlu tahu bagaimana paket diantar di belakang layar.',
  functions: [
    { t: 'Layanan jaringan untuk aplikasi', d: 'Menyediakan protokol: web (HTTP/S), email (SMTP/IMAP/POP3), transfer file (FTP/SFTP), akses jauh (SSH), dan lainnya.' },
    { t: 'Resolusi nama (DNS)', d: 'Menerjemahkan nama domain yang mudah diingat (example.com) menjadi alamat IP yang dipakai Layer 3.' },
    { t: 'Konfigurasi otomatis (DHCP)', d: 'Memberikan IP address, gateway, dan DNS secara otomatis kepada perangkat yang baru tersambung.' },
    { t: 'Model klien-server & peer-to-peer', d: 'Mendefinisikan siapa yang meminta dan siapa yang melayani; juga model P2P seperti BitTorrent.' },
    { t: 'Autentikasi & otorisasi pengguna', d: 'Mekanisme login, API key, OAuth 2.0, dan Basic/Bearer auth pada tingkat aplikasi.' },
    { t: 'Identifikasi sumber daya', d: 'Menentukan resource yang diminta melalui URL/URI, metode (GET, POST, PUT, DELETE), dan tipe konten.' },
  ],
  deep: [
    {
      t: 'Siklus request-response HTTP',
      d: 'Setiap kali membuka halaman web, terjadi urutan berikut:',
      points: [
        'DNS: browser mencari IP dari nama domain.',
        'Koneksi TCP + TLS dibuat (Layer 4 dan 6).',
        'Browser mengirim HTTP Request: metode, path, header, dan opsional body.',
        'Server memproses (mungkin query database), lalu mengirim HTTP Response: status code, header, body (HTML/JSON).',
        'Browser merender halaman dan memuat resource tambahan (CSS, JS, gambar).',
      ],
    },
    {
      t: 'Metode dan status code HTTP',
      d: 'Metode menyatakan niat: GET (ambil), POST (buat), PUT/PATCH (ubah), DELETE (hapus). Status code merangkum hasil: 2xx sukses (200 OK, 201 Created), 3xx redirect (301, 304), 4xx kesalahan klien (400, 401, 403, 404, 429), dan 5xx kesalahan server (500, 502, 503).',
    },
    {
      t: 'DNS: buku telepon internet',
      d: 'Resolver mengirim query ke root server → server TLD (.com) → authoritative server domain. Hasilnya di-cache sesuai TTL. Tipe record penting: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (verifikasi/SPF), NS (name server).',
    },
    {
      t: 'Email: SMTP, IMAP, dan POP3',
      d: 'SMTP (port 25/587) untuk mengirim email antar server; IMAP (143/993) dan POP3 (110/995) untuk mengambil email. Keamanan ditambah SPF, DKIM, dan DMARC agar email palsu (spoofing) dapat dideteksi.',
    },
  ],
  protocols: [
    { n: 'HTTP / HTTPS / HTTP/3', d: 'Protokol web — halaman, API REST, GraphQL.' },
    { n: 'DNS', d: 'Resolusi nama domain menjadi IP (UDP/TCP 53).' },
    { n: 'SMTP / IMAP / POP3', d: 'Pengiriman dan pengambilan email.' },
    { n: 'FTP / SFTP / SCP', d: 'Transfer file.' },
    { n: 'SSH / Telnet / RDP', d: 'Akses remote ke server dan desktop.' },
    { n: 'DHCP, NTP, SNMP, LDAP', d: 'Konfigurasi IP, sinkronisasi waktu, manajemen perangkat, direktori pengguna.' },
  ],
  devices: [
    { n: 'Web Server', d: 'Nginx, Apache, IIS — melayani permintaan HTTP.' },
    { n: 'Application Gateway / WAF', d: 'Firewall aplikasi web yang memeriksa isi HTTP (SQLi, XSS).' },
    { n: 'Reverse Proxy & CDN', d: 'Cloudflare, Fastly, Nginx — cache, routing berdasar URL/host (Layer 7 load balancing).' },
    { n: 'Mail / DNS / DHCP Server', d: 'Postfix, BIND, Unbound, ISC DHCP.' },
    { n: 'Browser & API Client', d: 'Chrome, Firefox, curl, Postman — sisi klien protokol.' },
  ],
  pdu: {
    title: 'PDU Layer 7: HTTP Message',
    intro: 'Pesan HTTP/1.1 berbasis teks dan terdiri dari request line, header, baris kosong, lalu body. Klik bagian-bagiannya:',
    fields: [
      { n: 'Request Line', size: 'GET /api HTTP/1.1', w: 3, d: 'Berisi metode, path/URI, dan versi HTTP. Pada respons berubah menjadi status line: HTTP/1.1 200 OK.' },
      { n: 'Host', size: 'wajib (1.1)', w: 2, d: 'Nama domain tujuan; memungkinkan satu IP melayani banyak situs (virtual host).' },
      { n: 'Headers', size: 'variabel', w: 3.6, d: 'Metadata: User-Agent, Accept, Content-Type, Authorization, Cache-Control, Cookie, dll.' },
      { n: 'CRLF', size: 'baris kosong', w: 1.6, d: 'Baris kosong pemisah antara header dan body.' },
      { n: 'Body', size: 'opsional', w: 4, d: 'Isi pesan: HTML, JSON, form data, file, dll. Panjang ditentukan Content-Length atau chunked encoding.' },
    ],
  },
  examples: [
    {
      title: 'Perjalanan satu permintaan HTTP ke REST API',
      scenario:
        'Aplikasi mobile mengambil daftar produk dari https://api.toko.id/v1/products?limit=2. Kita lihat permintaan dan respons dengan curl.',
      steps: [
        { t: 'Resolusi DNS', d: 'api.toko.id diterjemahkan menjadi 203.0.113.25 melalui DNS (record A).' },
        { t: 'Koneksi TCP & TLS', d: 'Handshake TCP (Layer 4) dan TLS (Layer 6) selesai sebelum HTTP dikirim.' },
        { t: 'HTTP Request', d: 'Klien mengirim GET beserta header Accept: application/json dan Authorization: Bearer token.' },
        { t: 'Pemrosesan server', d: 'Server memeriksa token, mengambil data dari database, dan membuat JSON.' },
        { t: 'HTTP Response', d: 'Server membalas 200 OK + header Content-Type + body JSON. Klien me-render daftar produk.' },
      ],
      code: {
        title: 'bash — curl -v',
        text: `$ curl -v -H "Authorization: Bearer eyJhbGciOi..." "https://api.toko.id/v1/products?limit=2"
*   Trying 203.0.113.25:443...          # setelah DNS
* Connected to api.toko.id port 443
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384

>> GET /v1/products?limit=2 HTTP/2
>> Host: api.toko.id
>> User-Agent: curl/8.5.0
>> Accept: application/json
>> Authorization: Bearer eyJhbGciOi...

<< HTTP/2 200
<< content-type: application/json; charset=utf-8
<< cache-control: max-age=60
<< x-ratelimit-remaining: 98

{"data":[{"id":1,"nama":"Keyboard Mekanik","harga":750000},
         {"id":2,"nama":"Mouse Gaming","harga":350000}],"total":58}`,
      },
    },
    {
      title: 'DNS lookup, DHCP, dan mengirim email via SMTP',
      scenario:
        'Perangkat baru tersambung ke jaringan kantor, otomatis memperoleh IP, mencari alamat mail server, lalu mengirim email.',
      steps: [
        { t: 'DHCP (DORA)', d: 'Discover → Offer → Request → Acknowledge: perangkat memperoleh IP, gateway, dan DNS server.' },
        { t: 'Query DNS MX', d: 'Mencari mail server untuk domain tujuan melalui record MX.' },
        { t: 'Sesi SMTP', d: 'Klien berbicara dengan perintah teks: EHLO, MAIL FROM, RCPT TO, DATA.' },
        { t: 'Server menerima', d: 'Kode 250 menandakan sukses; email diteruskan ke kotak masuk penerima via IMAP/POP3.' },
      ],
      code: {
        title: 'bash — dig & SMTP session',
        text: `$ dig +short example.com A
93.184.216.34
$ dig +short example.com MX
10 mail.example.com.

$ openssl s_client -starttls smtp -connect mail.example.com:587
<< 220 mail.example.com ESMTP Postfix
>> EHLO client.local
<< 250-mail.example.com
<< 250-STARTTLS
<< 250 AUTH PLAIN LOGIN
>> MAIL FROM:<budi@kantor.id>
<< 250 2.1.0 Ok
>> RCPT TO:<ani@example.com>
<< 250 2.1.5 Ok
>> DATA
<< 354 End data with <CR><LF>.<CR><LF>
>> Subject: Halo OSI
>> Selamat pagi, Ani!
>> .
<< 250 2.0.0 Ok: queued as 7F3C2A1B
>> QUIT
<< 221 2.0.0 Bye`,
      },
    },
  ],
  troubleshooting: [
    { p: 'Situs tidak bisa dibuka tetapi ping IP berhasil', s: 'Hampir pasti masalah DNS. Ganti DNS server (1.1.1.1 / 8.8.8.8) dan flush cache.', cmd: 'nslookup example.com 1.1.1.1' },
    { p: '502 Bad Gateway / 503 Service Unavailable', s: 'Reverse proxy tidak dapat menjangkau backend. Periksa layanan aplikasi, log, dan health check.', cmd: 'curl -I http://backend:8080/health' },
    { p: '401 / 403 saat memanggil API', s: '401 = belum terautentikasi (token salah/kedaluwarsa), 403 = terautentikasi tetapi tidak berhak. Periksa token dan role.', cmd: 'curl -i -H "Authorization: Bearer $TOKEN" URL' },
    { p: 'Email masuk folder spam', s: 'Konfigurasi SPF, DKIM, dan DMARC pada DNS domain pengirim.', cmd: 'dig +short TXT example.com' },
  ],
  facts: [
    'Tim Berners-Lee menciptakan HTTP dan World Wide Web di CERN pada 1989–1991.',
    'Pesan HTTP/1.1 berbasis teks yang dapat dibaca manusia, sedangkan HTTP/2 dan HTTP/3 bersifat biner.',
    'Ada 13 kelompok root DNS server logis di dunia (A sampai M), tetapi ribuan instance fisik berkat anycast.',
    'Kode status 418 "I\'m a teapot" adalah lelucon April Mop resmi (RFC 2324).',
  ],
  quiz: [
    { q: 'Protokol yang mengubah nama domain menjadi IP adalah …', o: ['DHCP', 'DNS', 'SMTP', 'ARP'], a: 1, e: 'DNS (Domain Name System) menerjemahkan nama domain ke alamat IP.' },
    { q: 'Status code 404 berarti …', o: ['Sukses', 'Server error', 'Resource tidak ditemukan', 'Redirect permanen'], a: 2, e: '404 Not Found: server aktif tetapi tidak menemukan resource yang diminta.' },
    { q: 'Layer 7 OSI merujuk pada …', o: ['Program browser itu sendiri', 'Protokol layanan jaringan untuk aplikasi', 'Kabel jaringan', 'Alamat MAC'], a: 1, e: 'Layer Aplikasi adalah protokol layanan jaringan (HTTP, DNS, SMTP), bukan program aplikasinya.' },
  ],
}

export default function Layer7Application() {
  return <LayerView data={data} />
}
