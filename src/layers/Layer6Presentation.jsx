import LayerView from '../components/LayerView.jsx'

const data = {
  n: 6,
  address: 'Format / Encoding',
  tcpip: 'Application',
  summary: [
    'Presentation Layer bertindak sebagai "penerjemah" jaringan. Layer ini memastikan data yang dikirim aplikasi di satu sisi dapat dibaca dan dimengerti aplikasi di sisi lain, apa pun sistem operasi, bahasa pemrograman, atau arsitektur perangkatnya.',
    'Tiga tugas utamanya: translasi (character encoding & format data), kompresi (menghemat bandwidth), dan enkripsi (menjaga kerahasiaan, misalnya TLS/SSL). Standar seperti ASCII, UTF-8, JSON, XML, JPEG, MP3, serta TLS dikaitkan dengan layer ini.',
  ],
  analogy:
    'Layer 6 adalah penerjemah dan notaris sekaligus: menerjemahkan bahasa Indonesia ke Inggris (format), meringkas dokumen agar ringan (kompresi), dan memasukkannya ke amplop tersegel (enkripsi) sebelum dikirim.',
  functions: [
    { t: 'Translasi data', d: 'Mengubah format antar sistem yang berbeda: EBCDIC ↔ ASCII, little-endian ↔ big-endian, serta serialisasi objek ke JSON, XML, atau Protobuf.' },
    { t: 'Character encoding', d: 'Menentukan bagaimana karakter direpresentasikan sebagai byte: ASCII, UTF-8, UTF-16. UTF-8 memungkinkan semua aksara dunia dan emoji.' },
    { t: 'Kompresi data', d: 'Mengurangi ukuran data (gzip, Brotli, JPEG, MP3, H.264) sehingga pengiriman lebih cepat dan hemat kuota.' },
    { t: 'Enkripsi & dekripsi', d: 'Mengamankan data dengan TLS/SSL: kerahasiaan (AES), integritas (HMAC/AEAD), dan autentikasi (sertifikat X.509).' },
    { t: 'Media & format file', d: 'Mendefinisikan format multimedia dan dokumen: JPEG, PNG, GIF, MPEG, PDF, MIME types.' },
    { t: 'Serialisasi', d: 'Mengubah struktur data di memori menjadi urutan byte yang dapat dikirim dan dibangun kembali di penerima (JSON, MessagePack, Protobuf, ASN.1).' },
  ],
  deep: [
    {
      t: 'Pipeline pengiriman: encode → compress → encrypt',
      d: 'Sebelum data meninggalkan aplikasi, urutannya selalu begini (dan dibalik di penerima):',
      points: [
        'Encode: objek {nama: "Ayu"} diserialisasi ke JSON lalu di-encode UTF-8 menjadi byte.',
        'Compress: byte dikompresi (gzip/Brotli). Kompres sebelum enkripsi — data terenkripsi tidak bisa dikompres.',
        'Encrypt: byte diubah menjadi ciphertext oleh TLS dengan kunci sesi simetris (AES-GCM / ChaCha20).',
      ],
    },
    {
      t: 'TLS handshake (TLS 1.3)',
      d: 'TLS menetapkan kunci rahasia bersama tanpa pernah mengirim kunci itu lewat jaringan:',
      points: [
        'ClientHello: klien menawarkan cipher suite dan key share (ECDHE).',
        'ServerHello + Certificate: server memilih cipher, mengirim key share dan sertifikat X.509.',
        'Verifikasi sertifikat: klien memeriksa rantai CA, domain, dan masa berlaku.',
        'Kedua pihak menurunkan kunci sesi; semua data berikutnya dienkripsi (hanya 1 round-trip).',
      ],
    },
    {
      t: 'Kriptografi simetris vs asimetris',
      d: 'Asimetris (RSA, ECDSA, ECDHE) lambat tetapi dapat memverifikasi identitas dan menyepakati kunci. Simetris (AES, ChaCha20) sangat cepat dan dipakai untuk mengenkripsi data sebenarnya. TLS memadukan keduanya: asimetris untuk handshake, simetris untuk data.',
    },
    {
      t: 'Mengapa endianness penting?',
      d: 'Sistem big-endian menyimpan byte paling signifikan lebih dulu; little-endian sebaliknya. Angka 0x12345678 dikirim sebagai 12 34 56 78 (network byte order = big-endian). Presentation layer memastikan kedua sisi menafsirkan angka yang sama.',
    },
  ],
  protocols: [
    { n: 'TLS / SSL', d: 'Enkripsi, autentikasi server, dan integritas (HTTPS, SMTPS, FTPS).' },
    { n: 'ASCII / Unicode (UTF-8)', d: 'Standar pengkodean karakter.' },
    { n: 'JSON, XML, YAML, Protobuf', d: 'Format serialisasi data terstruktur.' },
    { n: 'JPEG, PNG, GIF, MPEG, MP3', d: 'Format dan kompresi media.' },
    { n: 'gzip, Brotli, zlib', d: 'Algoritma kompresi untuk konten web.' },
    { n: 'MIME, Base64, ASN.1', d: 'Pengkodean tipe konten dan data biner menjadi teks.' },
  ],
  devices: [
    { n: 'Library & Codec', d: 'OpenSSL, libjpeg, ffmpeg — implementasi perangkat lunak layer ini.' },
    { n: 'SSL/TLS Accelerator (HSM)', d: 'Perangkat keras untuk mempercepat enkripsi dan menyimpan kunci privat.' },
    { n: 'Reverse Proxy (TLS termination)', d: 'Nginx / HAProxy / Cloudflare mendekripsi TLS di tepi jaringan.' },
    { n: 'Gateway konversi format', d: 'Mengubah protokol/format antar sistem (mis. SOAP ↔ REST, XML ↔ JSON).' },
  ],
  pdu: {
    title: 'PDU Layer 6: TLS Record',
    intro: 'Data aplikasi dibungkus dalam TLS Record sebelum dikirim melalui TCP. Panjang maksimum payload 16 KB.',
    fields: [
      { n: 'Content Type', size: '1 byte', w: 2, d: 'Jenis record: 22 = Handshake, 23 = Application Data, 21 = Alert, 20 = ChangeCipherSpec.' },
      { n: 'Version', size: '2 byte', w: 2, d: 'Versi protokol pada header record (0x0303 dipakai TLS 1.2 maupun 1.3 demi kompatibilitas).' },
      { n: 'Length', size: '2 byte', w: 2, d: 'Panjang fragmen terenkripsi yang mengikuti, maksimum 2^14 + overhead.' },
      { n: 'Encrypted Payload', size: 'variabel', w: 7, d: 'Data aplikasi yang sudah dikompres/dikodekan lalu dienkripsi (AES-GCM / ChaCha20-Poly1305). Tidak dapat dibaca tanpa kunci sesi.' },
      { n: 'Auth Tag', size: '16 byte', w: 2.4, d: 'Authentication tag (AEAD) untuk memastikan data tidak diubah selama perjalanan.' },
    ],
  },
  examples: [
    {
      title: 'Handshake TLS dan inspeksi sertifikat',
      scenario:
        'Browser membuka https://example.com. Sebelum HTTP dikirim, Presentation Layer menegosiasi enkripsi. Kita periksa hasilnya dengan openssl.',
      steps: [
        { t: 'ClientHello', d: 'Klien mengirim versi TLS 1.3, daftar cipher suite, SNI (nama host), dan key share ECDHE.' },
        { t: 'ServerHello & sertifikat', d: 'Server memilih TLS_AES_256_GCM_SHA384, mengirim sertifikatnya yang ditandatangani CA.' },
        { t: 'Verifikasi', d: 'Klien memeriksa tanda tangan CA, nama domain, dan masa berlaku. Jika gagal, browser menampilkan peringatan keamanan.' },
        { t: 'Kunci sesi', d: 'Kedua sisi menurunkan kunci simetris yang sama dari ECDHE; handshake selesai (Finished).' },
        { t: 'Application Data terenkripsi', d: 'Seluruh permintaan HTTP kini dikirim sebagai TLS Record terenkripsi — penyadap hanya melihat byte acak.' },
      ],
      code: {
        title: 'bash — openssl s_client',
        text: `$ openssl s_client -connect example.com:443 -servername example.com -brief
CONNECTION ESTABLISHED
Protocol version: TLSv1.3
Ciphersuite: TLS_AES_256_GCM_SHA384
Peer certificate: CN = www.example.org
Hash used: SHA256
Signature type: ECDSA
Verification: OK
Server Temp Key: X25519, 253 bits

$ echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates -subject -issuer
subject=CN = www.example.org
issuer=C = US, O = DigiCert Inc, CN = DigiCert Global G3 TLS ECC SHA384 2020 CA1
notBefore=Jan 30 00:00:00 2025 GMT
notAfter=Mar  1 23:59:59 2026 GMT`,
      },
    },
    {
      title: 'Encode, kompresi, dan enkripsi data dengan Python',
      scenario:
        'Aplikasi mengirim data pelanggan. Data harus diserialisasi ke JSON, di-encode UTF-8, dikompres gzip, lalu dienkripsi AES-GCM — dan dibalik di sisi penerima.',
      steps: [
        { t: 'Serialisasi + encode', d: 'Dictionary Python diubah menjadi JSON, lalu menjadi byte UTF-8 (karakter "é" menjadi 2 byte).' },
        { t: 'Kompresi', d: 'gzip menghilangkan pola berulang sehingga ukuran turun drastis.' },
        { t: 'Enkripsi', d: 'AES-256-GCM dengan nonce acak menghasilkan ciphertext + tag integritas.' },
        { t: 'Sisi penerima', d: 'Dekripsi (tag diverifikasi), dekompresi, decode UTF-8, lalu parse JSON kembali menjadi objek.' },
      ],
      code: {
        title: 'presentation.py',
        text: `import json, gzip, os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

key = AESGCM.generate_key(bit_length=256)   # di TLS: hasil handshake
aes = AESGCM(key)

data = {"nama": "Zoé", "kota": "Jakarta", "pesan": "halo " * 50}

# ---- PENGIRIM: encode -> compress -> encrypt
raw        = json.dumps(data, ensure_ascii=False).encode("utf-8")
compressed = gzip.compress(raw)
nonce      = os.urandom(12)
cipher     = aes.encrypt(nonce, compressed, None)
print(len(raw), "->", len(compressed), "->", len(cipher), "byte")

# ---- PENERIMA: decrypt -> decompress -> decode
plain  = gzip.decompress(aes.decrypt(nonce, cipher, None))
result = json.loads(plain.decode("utf-8"))
assert result == data

# Output: 303 -> 79 -> 95 byte  (data lebih kecil & tidak terbaca)`,
      },
      note: 'Jangan pernah membuat algoritma kriptografi sendiri — gunakan library terverifikasi.',
    },
  ],
  troubleshooting: [
    { p: 'ERR_CERT_DATE_INVALID / sertifikat kedaluwarsa', s: 'Perbarui sertifikat (Let\'s Encrypt + auto-renew) dan pastikan jam perangkat benar.', cmd: 'openssl x509 -in cert.pem -noout -enddate' },
    { p: 'Karakter aneh (mojibake: "Ã©")', s: 'Ketidakcocokan encoding. Pastikan semua komponen memakai UTF-8, termasuk header Content-Type charset dan database.', cmd: 'file -i data.txt' },
    { p: 'SSL handshake failure', s: 'Versi TLS atau cipher tidak cocok antara klien & server. Aktifkan TLS 1.2/1.3 dan cek rantai sertifikat.', cmd: 'openssl s_client -connect host:443 -tls1_2' },
    { p: 'Mixed content di halaman HTTPS', s: 'Sumber daya (gambar/script) masih dimuat lewat http://. Ganti ke https:// atau gunakan URL relatif.' },
  ],
  facts: [
    'UTF-8 dirancang tahun 1992 dan kini dipakai lebih dari 98% halaman web.',
    'Let\'s Encrypt telah menerbitkan ratusan juta sertifikat gratis sehingga HTTPS menjadi standar web.',
    'Base64 bukan enkripsi — hanya pengkodean yang menambah ukuran ±33%.',
    'Heartbleed (2014), bug di OpenSSL, memperlihatkan betapa kritisnya implementasi Layer 6.',
  ],
  quiz: [
    { q: 'Manakah yang BUKAN fungsi Presentation Layer?', o: ['Enkripsi', 'Kompresi', 'Translasi format', 'Routing paket'], a: 3, e: 'Routing adalah tugas Network Layer (Layer 3).' },
    { q: 'Urutan yang benar di sisi pengirim adalah …', o: ['Enkripsi → Kompresi → Encode', 'Encode → Kompresi → Enkripsi', 'Kompresi → Encode → Enkripsi', 'Enkripsi → Encode → Kompresi'], a: 1, e: 'Data dikodekan dulu, dikompres, baru dienkripsi (data terenkripsi tidak dapat dikompres).' },
    { q: 'TLS menggunakan enkripsi asimetris terutama untuk …', o: ['Mengenkripsi seluruh data', 'Menyepakati kunci & autentikasi', 'Kompresi gambar', 'Routing'], a: 1, e: 'Asimetris dipakai saat handshake; data dienkripsi dengan kunci simetris yang lebih cepat.' },
  ],
}

export default function Layer6Presentation() {
  return <LayerView data={data} />
}
