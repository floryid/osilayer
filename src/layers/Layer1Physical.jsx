import LayerView from '../components/LayerView.jsx'

const data = {
  n: 1,
  address: 'Tidak ada (sinyal)',
  tcpip: 'Network Access / Link',
  summary: [
    'Physical Layer adalah fondasi dari seluruh komunikasi jaringan. Layer ini tidak peduli apa isi data, siapa pengirimnya, atau ke mana tujuannya. Tugasnya hanya satu: memindahkan bit mentah (0 dan 1) dari satu perangkat ke perangkat lain melalui media fisik.',
    'Semua yang bisa disentuh atau diukur dengan alat fisik — kabel tembaga, serat optik, konektor RJ-45, hub, repeater, antena Wi-Fi, bahkan level tegangan listrik — berada di layer ini. Bit diwakili oleh perubahan tegangan, pulsa cahaya, atau modulasi gelombang radio.',
  ],
  analogy:
    'Bayangkan jalan raya beserta aspalnya. Jalan tidak peduli apa muatan truk atau ke mana tujuannya — ia hanya menyediakan jalur fisik agar kendaraan dapat lewat. Begitu pula Layer 1: menyediakan "jalan" untuk bit.',
  functions: [
    {
      t: 'Transmisi bit mentah',
      d: 'Mengirim dan menerima aliran bit tanpa interpretasi. Layer ini tidak mengenal frame, paket, atau alamat — hanya urutan 0 dan 1.',
    },
    {
      t: 'Pengkodean sinyal (line coding)',
      d: 'Mengubah bit menjadi sinyal menggunakan skema seperti NRZ, Manchester, 4B/5B, atau PAM-5 agar penerima dapat mengekstrak clock dan membedakan bit dengan benar.',
    },
    {
      t: 'Spesifikasi media & konektor',
      d: 'Menentukan jenis kabel (UTP Cat5e/6/6a, koaksial, fiber single-mode/multi-mode), bentuk konektor (RJ-45, LC, SC), panjang maksimum, dan pin-out.',
    },
    {
      t: 'Sinkronisasi bit (clocking)',
      d: 'Pengirim dan penerima harus sepakat kapan satu bit dimulai dan berakhir. Tanpa sinkronisasi, bit akan salah dibaca (bit slip).',
    },
    {
      t: 'Mode transmisi',
      d: 'Mengatur arah komunikasi: simplex (satu arah), half-duplex (bergantian), atau full-duplex (dua arah bersamaan), serta kecepatan (10 Mbps - 400 Gbps).',
    },
    {
      t: 'Topologi fisik',
      d: 'Menentukan bentuk penyusunan perangkat: bus, star, ring, mesh, atau hybrid — dan bagaimana kabel menghubungkan perangkat.',
    },
  ],
  deep: [
    {
      t: 'Dari bit menjadi sinyal',
      d: 'Network Interface Card (NIC) menerima frame dari Layer 2, lalu PHY chip mengubah setiap bit menjadi bentuk sinyal sesuai standar. Pada Ethernet 10BASE-T digunakan Manchester encoding: bit 1 = transisi rendah ke tinggi di tengah periode bit, bit 0 = transisi tinggi ke rendah. Pada Gigabit Ethernet (1000BASE-T) digunakan PAM-5 dengan 4 pasang kabel sekaligus.',
      points: [
        'Media tembaga: bit = perbedaan tegangan pada pasangan twisted pair (differential signaling).',
        'Serat optik: bit = ada / tidaknya pulsa cahaya (LED atau laser).',
        'Nirkabel: bit = perubahan fase, amplitudo, atau frekuensi gelombang radio (modulasi QAM, OFDM).',
      ],
    },
    {
      t: 'Atenuasi, noise, dan crosstalk',
      d: 'Sinyal melemah sepanjang jarak (atenuasi), terganggu oleh interferensi elektromagnetik (EMI), dan bocor antar pasangan kabel (crosstalk). Karena itu UTP dibatasi 100 meter, kabel dipilin (twisted) untuk menetralkan EMI, dan serat optik dipakai untuk jarak jauh karena kebal terhadap EMI.',
    },
    {
      t: 'Medium akses & collision',
      d: 'Pada hub (repeater multiport), seluruh port berbagi satu collision domain sehingga sinyal yang dikirim dua perangkat bersamaan akan bertabrakan. Karena itu hub kini jarang dipakai dan digantikan switch (Layer 2) yang memisahkan collision domain per port.',
    },
    {
      t: 'Auto-negotiation',
      d: 'Saat kabel dicolok, kedua sisi saling bertukar Fast Link Pulse (FLP) untuk menyepakati kecepatan dan duplex terbaik (misal 1 Gbps full-duplex). Auto-MDI/MDIX juga otomatis menukar pasangan TX/RX sehingga tidak perlu kabel crossover.',
    },
  ],
  protocols: [
    { n: 'IEEE 802.3', d: 'Standar Ethernet kabel (10BASE-T, 100BASE-TX, 1000BASE-T, 10GBASE-SR, dst).' },
    { n: 'IEEE 802.11', d: 'Standar Wi-Fi (a/b/g/n/ac/ax/be) — modulasi OFDM/OFDMA pada 2.4 / 5 / 6 GHz.' },
    { n: 'RS-232 / RS-485', d: 'Standar serial untuk komunikasi perangkat industri dan konsol router.' },
    { n: 'DSL / DOCSIS', d: 'Teknologi akses pita lebar melalui kabel telepon / kabel TV.' },
    { n: 'SONET / SDH', d: 'Standar transmisi serat optik berkecepatan tinggi pada jaringan backbone.' },
    { n: 'Bluetooth / Zigbee', d: 'Standar radio jarak pendek untuk perangkat personal dan IoT.' },
  ],
  devices: [
    { n: 'Kabel UTP / STP', d: 'Twisted pair Cat5e (1G), Cat6 (10G ≤55 m), Cat6a (10G 100 m), Cat8 (25/40G).' },
    { n: 'Serat optik', d: 'Single-mode (jarak puluhan km) dan multi-mode (hingga ratusan meter).' },
    { n: 'Hub & Repeater', d: 'Memperkuat dan meneruskan sinyal ke semua port tanpa memfilter.' },
    { n: 'NIC / Transceiver (SFP)', d: 'Mengubah data digital menjadi sinyal di media tertentu.' },
    { n: 'Access Point (radio)', d: 'Bagian radio / antena yang memancarkan sinyal Wi-Fi.' },
    { n: 'Modem & Media Converter', d: 'Mengubah jenis sinyal antar media (mis. tembaga ↔ fiber).' },
  ],
  pdu: {
    title: 'PDU Layer 1: Bit dan Sinyal',
    intro:
      'Layer 1 tidak punya header. Namun sebelum frame dikirim, NIC menambahkan Preamble & SFD untuk sinkronisasi clock. Arahkan kursor / klik bagian di bawah:',
    fields: [
      { n: 'Preamble', size: '7 byte', w: 3, d: 'Pola 10101010 × 7 byte. Digunakan penerima untuk menyinkronkan clock dengan pengirim sebelum data sebenarnya tiba.' },
      { n: 'SFD', size: '1 byte', w: 1.4, d: 'Start Frame Delimiter (10101011). Dua bit terakhir "11" menandai bahwa frame Layer 2 dimulai setelah ini.' },
      { n: 'Frame (Layer 2)', size: '64-1518 byte', w: 6, d: 'Isi frame Ethernet dari Layer 2 yang diubah menjadi aliran bit.' },
      { n: 'IFG', size: '12 byte', w: 2, d: 'Inter-Frame Gap: jeda minimum antar frame agar penerima sempat memproses dan media "tenang" kembali.' },
    ],
  },
  examples: [
    {
      title: 'Mendiagnosis kabel & link fisik pada Linux',
      scenario:
        'Komputer kantor tiba-tiba tidak mendapat jaringan. Kita mulai dari Layer 1 — apakah kabel terpasang, kecepatan benar, dan tidak ada error fisik?',
      steps: [
        { t: 'Periksa lampu LED port', d: 'Lampu hijau menyala = link terdeteksi. Jika mati, kabel putus, konektor longgar, atau port rusak.' },
        { t: 'Cek status link dengan ethtool', d: 'Perintah ethtool menampilkan speed, duplex, dan "Link detected" langsung dari driver NIC.' },
        { t: 'Lihat counter error', d: 'Error CRC, collision, atau frame drop yang tinggi menandakan kabel buruk atau interferensi.' },
        { t: 'Ganti kabel / port', d: 'Uji dengan kabel lain atau port switch berbeda untuk memastikan masalah ada di media fisik.' },
      ],
      code: {
        title: 'bash — ethtool',
        text: `$ ethtool eth0
Settings for eth0:
    Supported ports: [ TP ]
    Supported link modes:   10baseT/Half 10baseT/Full
                            100baseT/Half 100baseT/Full
                            1000baseT/Full
    Speed: 1000Mb/s
    Duplex: Full
    Auto-negotiation: on
    Port: Twisted Pair
    Link detected: yes

$ ethtool -S eth0 | grep -Ei "crc|collision|err"
     rx_crc_errors: 0
     tx_carrier_errors: 0
     collisions: 0

# Link detected: yes + error 0  => Layer 1 sehat.
# Jika "Speed: 10Mb/s Half" tiba-tiba muncul => kabel kemungkinan rusak (hanya 2 dari 8 kabel terhubung).`,
      },
      note: 'Aturan emas troubleshooting: selalu mulai dari bawah (Layer 1) lalu naik ke atas.',
    },
    {
      title: 'Bagaimana huruf "A" dikirim sebagai sinyal',
      scenario:
        'Kita ingin mengirim karakter "A" (ASCII 65 = 01000001) melalui kabel Ethernet 10BASE-T yang menggunakan Manchester encoding.',
      steps: [
        { t: 'Karakter menjadi biner', d: 'Huruf "A" pada ASCII bernilai 65, yaitu 01000001 dalam biner (8 bit).' },
        { t: 'Penerapan Manchester encoding', d: 'Setiap bit menjadi dua level tegangan. Bit 1 → rendah lalu tinggi (↑), bit 0 → tinggi lalu rendah (↓).' },
        { t: 'Sinyal dikirim ke pasangan TX', d: 'Transceiver mengirim perbedaan tegangan (±2.5 V) melalui pasangan kabel TX dengan kecepatan 10 juta bit per detik.' },
        { t: 'Penerima menyampel sinyal', d: 'PHY di sisi penerima membaca transisi di tengah periode bit, merekonstruksi 01000001, lalu menyerahkannya ke Layer 2.' },
      ],
      code: {
        title: 'manchester.txt',
        text: `Karakter   : A
ASCII      : 65
Biner      : 0 1 0 0 0 0 0 1

Bit        :   0    1    0    0    0    0    0    1
Manchester :  ‾|_  _|‾  ‾|_  ‾|_  ‾|_  ‾|_  ‾|_  _|‾
Level      :  H L  L H  H L  H L  H L  H L  H L  L H

# 0 = transisi High -> Low   (turun)
# 1 = transisi Low  -> High  (naik)
# Kecepatan 10 Mbps => 1 bit = 100 nanodetik`,
      },
    },
  ],
  troubleshooting: [
    { p: 'Lampu link mati', s: 'Periksa konektor RJ-45, ganti kabel, coba port lain, dan pastikan NIC tidak dalam keadaan disabled.', cmd: 'ip link show eth0' },
    { p: 'Kecepatan hanya 100 Mbps padahal gigabit', s: 'Biasanya kabel punya pasangan kabel rusak/kurang. Re-crimp ujung kabel atau ganti dengan kabel Cat5e+ yang utuh.', cmd: 'ethtool eth0 | grep Speed' },
    { p: 'Banyak CRC error / packet loss', s: 'Kabel terlalu panjang (>100 m), dekat sumber EMI, atau konektor longgar. Pindahkan jalur kabel atau ganti.', cmd: 'ethtool -S eth0' },
    { p: 'Duplex mismatch', s: 'Satu sisi full-duplex dan sisi lain half-duplex menimbulkan late collision. Aktifkan auto-negotiation di kedua sisi.', cmd: 'ethtool -s eth0 autoneg on' },
  ],
  facts: [
    'Kecepatan sinyal pada kabel tembaga sekitar 2/3 kecepatan cahaya (≈ 200.000 km/detik).',
    'Kabel bawah laut transatlantik membawa lebih dari 95% lalu lintas internet antar benua — semuanya serat optik di Layer 1.',
    'Twisted pair dipilin agar medan elektromagnetik dari kedua kabel saling meniadakan sehingga noise berkurang.',
    'Wi-Fi 6E menambahkan pita 6 GHz sehingga saluran radio makin lapang dan minim interferensi.',
  ],
  quiz: [
    { q: 'Apa PDU pada Physical Layer?', o: ['Frame', 'Bit', 'Segment', 'Packet'], a: 1, e: 'PDU Layer 1 adalah bit (sinyal listrik, cahaya, atau radio).' },
    { q: 'Perangkat manakah yang bekerja pada Layer 1?', o: ['Switch', 'Router', 'Hub / Repeater', 'Firewall'], a: 2, e: 'Hub dan repeater hanya memperkuat dan meneruskan sinyal tanpa membaca alamat apa pun.' },
    { q: 'Panjang maksimum segmen kabel UTP Ethernet adalah …', o: ['55 meter', '100 meter', '500 meter', '1 kilometer'], a: 1, e: 'Standar Ethernet UTP membatasi 100 m per segmen karena atenuasi sinyal.' },
  ],
}

export default function Layer1Physical() {
  return <LayerView data={data} />
}
