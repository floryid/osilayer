import LayerView from '../components/LayerView.jsx'

const data = {
  n: 4,
  address: 'Port (0 - 65535)',
  tcpip: 'Transport',
  summary: [
    'Transport Layer menyediakan komunikasi end-to-end antar proses (aplikasi) di dua host. Jika IP hanya mengantar paket ke komputer yang tepat, Transport Layer memastikan data sampai ke aplikasi yang tepat melalui nomor port — dan, bila diperlukan, menjamin keandalannya.',
    'Dua protokol utamanya sangat berbeda filosofi: TCP (connection-oriented, andal, berurutan) dan UDP (connectionless, cepat, tanpa jaminan). Pilihan di antara keduanya menentukan karakter aplikasi.',
  ],
  analogy:
    'TCP seperti kurir dengan tanda terima: paket diberi nomor urut, penerima mengonfirmasi, yang hilang dikirim ulang. UDP seperti kartu pos: kirim saja dan berharap sampai — cepat dan ringan.',
  functions: [
    { t: 'Segmentasi & reassembly', d: 'Memecah data aplikasi besar menjadi segmen sesuai MSS dan menyusunnya kembali di penerima dengan sequence number.' },
    { t: 'Multiplexing via port', d: 'Banyak aplikasi berbagi satu IP. Port (mis. 80, 443, 53) menentukan aplikasi mana yang menerima data. Pasangan IP:port disebut socket.' },
    { t: 'Keandalan (reliability)', d: 'TCP memakai ACK, retransmisi, dan checksum sehingga data sampai utuh dan berurutan.' },
    { t: 'Flow control', d: 'Window size mencegah pengirim cepat membanjiri penerima lambat (sliding window).' },
    { t: 'Congestion control', d: 'Slow start, congestion avoidance, fast retransmit mengurangi laju kirim saat jaringan padat.' },
    { t: 'Connection management', d: 'Membuka koneksi lewat three-way handshake dan menutupnya dengan four-way termination.' },
  ],
  deep: [
    {
      t: 'TCP three-way handshake',
      d: 'Sebelum data dikirim, TCP membangun koneksi:',
      points: [
        'SYN: klien mengirim segmen SYN dengan sequence number awal (ISN) acak.',
        'SYN-ACK: server menjawab SYN + ACK (ack = ISN klien + 1) dan ISN miliknya.',
        'ACK: klien mengonfirmasi (ack = ISN server + 1). Koneksi ESTABLISHED.',
      ],
    },
    {
      t: 'Sliding window & retransmisi',
      d: 'Penerima mengiklankan window size (jumlah byte yang boleh dikirim tanpa ACK). Pengirim menyimpan segmen yang belum di-ACK dalam buffer; bila ACK tidak datang dalam RTO (retransmission timeout) atau datang 3 duplicate ACK, segmen dikirim ulang (fast retransmit).',
    },
    {
      t: 'Congestion control',
      d: 'Pengirim memulai dengan congestion window (cwnd) kecil lalu tumbuh eksponensial (slow start) hingga threshold, dilanjutkan pertumbuhan linear (congestion avoidance). Ketika terjadi packet loss, cwnd dipangkas. Algoritma modern: CUBIC (Linux), BBR (Google).',
    },
    {
      t: 'Kapan memilih UDP?',
      d: 'UDP tidak ada handshake, retransmisi, atau urutan sehingga latensinya rendah. Cocok untuk aplikasi yang lebih mementingkan kecepatan atau mengelola keandalan sendiri.',
      points: ['DNS (query pendek)', 'VoIP / video call / game online', 'Streaming langsung', 'QUIC / HTTP/3 (keandalan dibangun di atas UDP)'],
    },
  ],
  protocols: [
    { n: 'TCP', d: 'Transmission Control Protocol — andal, berurutan, berbasis koneksi (HTTP, SSH, SMTP, FTP).' },
    { n: 'UDP', d: 'User Datagram Protocol — ringan, tanpa koneksi (DNS, DHCP, VoIP, NTP).' },
    { n: 'QUIC', d: 'Transport modern di atas UDP dengan multiplexing & TLS 1.3 bawaan (HTTP/3).' },
    { n: 'SCTP', d: 'Stream Control Transmission Protocol — multi-streaming, dipakai di telekomunikasi.' },
    { n: 'DCCP', d: 'Congestion control tanpa keandalan, untuk streaming.' },
    { n: 'Well-known ports', d: '80 HTTP, 443 HTTPS, 22 SSH, 53 DNS, 25 SMTP, 3306 MySQL, 3389 RDP.' },
  ],
  devices: [
    { n: 'Firewall stateful', d: 'Melacak status koneksi TCP (SYN, ESTABLISHED) dan memfilter berdasar port.' },
    { n: 'Load Balancer L4', d: 'Membagi koneksi TCP/UDP berdasarkan IP:port (mis. HAProxy mode tcp, AWS NLB).' },
    { n: 'NAT / PAT', d: 'Menerjemahkan port agar banyak host berbagi satu IP publik.' },
    { n: 'Stack TCP/IP OS', d: 'Kernel sistem operasi mengelola socket, buffer, dan timer TCP.' },
  ],
  pdu: {
    title: 'PDU Layer 4: TCP Segment Header',
    intro: 'Header TCP minimum 20 byte. UDP jauh lebih sederhana — hanya 8 byte (port sumber, port tujuan, length, checksum).',
    fields: [
      { n: 'Port Sumber', size: '16 bit', w: 2, d: 'Port ephemeral milik klien (49152–65535), dipilih acak oleh OS.' },
      { n: 'Port Tujuan', size: '16 bit', w: 2, d: 'Port layanan di server, mis. 443 untuk HTTPS.' },
      { n: 'Sequence Number', size: '32 bit', w: 4, d: 'Nomor urut byte pertama pada segmen ini. Dipakai penerima untuk menyusun ulang data.' },
      { n: 'ACK Number', size: '32 bit', w: 4, d: 'Nomor byte berikutnya yang diharapkan penerima — konfirmasi bahwa semua byte sebelumnya sudah diterima.' },
      { n: 'Offset + Flags', size: '16 bit', w: 2.4, d: 'Data offset dan flag kontrol: SYN (buka), ACK (konfirmasi), FIN (tutup), RST (reset), PSH, URG.' },
      { n: 'Window', size: '16 bit', w: 2, d: 'Jumlah byte yang masih dapat ditampung buffer penerima (flow control).' },
      { n: 'Checksum', size: '16 bit', w: 2, d: 'Mendeteksi kerusakan pada header, data, dan pseudo-header IP.' },
      { n: 'Urgent Ptr', size: '16 bit', w: 2, d: 'Menunjuk data urgent bila flag URG aktif (jarang dipakai).' },
      { n: 'Data', size: 'variabel', w: 5, d: 'Payload dari Layer 5-7 (mis. permintaan HTTP terenkripsi TLS).' },
    ],
  },
  examples: [
    {
      title: 'Three-way handshake dan transfer data (analisis tcpdump)',
      scenario:
        'Klien 192.168.1.10 membuka koneksi ke web server 93.184.216.34 pada port 443, mengirim data, lalu menutup koneksi.',
      steps: [
        { t: 'SYN', d: 'Klien (port acak 51514) mengirim segmen dengan flag SYN, seq=1000, ke port 443.' },
        { t: 'SYN-ACK', d: 'Server membalas SYN+ACK, seq=5000, ack=1001, window=64240.' },
        { t: 'ACK', d: 'Klien mengonfirmasi ack=5001. Koneksi terbentuk — kini aplikasi dapat bertukar data.' },
        { t: 'Transfer data', d: 'Setiap segmen berisi data dibalas ACK. Bila ACK tidak datang, segmen dikirim ulang.' },
        { t: 'FIN / ACK', d: 'Salah satu pihak mengirim FIN, pihak lain membalas ACK dan FIN-nya sendiri; koneksi ditutup (TIME_WAIT).' },
      ],
      code: {
        title: 'bash — tcpdump',
        text: `$ sudo tcpdump -n -i eth0 'host 93.184.216.34 and tcp port 443'
10:01:00.001 IP 192.168.1.10.51514 > 93.184.216.34.443: Flags [S],  seq 1000, win 64240
10:01:00.025 IP 93.184.216.34.443 > 192.168.1.10.51514: Flags [S.], seq 5000, ack 1001, win 65535
10:01:00.025 IP 192.168.1.10.51514 > 93.184.216.34.443: Flags [.],  ack 5001, win 502
10:01:00.030 IP 192.168.1.10.51514 > 93.184.216.34.443: Flags [P.], seq 1001:1518, ack 5001
10:01:00.055 IP 93.184.216.34.443 > 192.168.1.10.51514: Flags [.],  ack 1518
10:01:05.900 IP 192.168.1.10.51514 > 93.184.216.34.443: Flags [F.], seq 1518, ack 6200
10:01:05.925 IP 93.184.216.34.443 > 192.168.1.10.51514: Flags [F.], seq 6200, ack 1519

# [S]=SYN  [S.]=SYN+ACK  [.]=ACK  [P.]=PSH+ACK  [F.]=FIN+ACK`,
      },
    },
    {
      title: 'Mengamati socket, port, dan membandingkan TCP vs UDP',
      scenario:
        'Administrator ingin tahu port apa yang terbuka di server dan mengetes konektivitas TCP maupun UDP.',
      steps: [
        { t: 'Lihat port listening', d: 'ss menampilkan socket TCP/UDP beserta proses pemiliknya.' },
        { t: 'Uji port TCP', d: 'Netcat mencoba menyelesaikan three-way handshake ke port tujuan; sukses = port terbuka.' },
        { t: 'Uji UDP', d: 'UDP tidak punya handshake, sehingga hasil tes bergantung pada respons aplikasi.' },
        { t: 'Server UDP sederhana (Python)', d: 'Contoh kode memperlihatkan perbedaan: UDP cukup recvfrom/sendto tanpa connect/accept.' },
      ],
      code: {
        title: 'bash + python',
        text: `$ ss -tulpn
Netid State  Local Address:Port  Process
tcp   LISTEN 0.0.0.0:22          sshd
tcp   LISTEN 0.0.0.0:443         nginx
udp   UNCONN 0.0.0.0:53          named

$ nc -zv example.com 443
Connection to example.com 443 port [tcp/https] succeeded!

# --- server UDP sederhana (python) ---
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)   # UDP
s.bind(("0.0.0.0", 9999))
data, addr = s.recvfrom(1024)       # tanpa handshake
s.sendto(b"pong", addr)

# --- server TCP: perlu listen() dan accept() (handshake) ---
t = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # TCP
t.bind(("0.0.0.0", 9999)); t.listen()
conn, addr = t.accept()`,
      },
    },
  ],
  troubleshooting: [
    { p: 'Connection refused', s: 'Server menjawab RST: tidak ada proses yang listening di port tersebut. Pastikan layanan berjalan.', cmd: 'ss -tlpn | grep :8080' },
    { p: 'Connection timed out', s: 'SYN tidak dijawab — firewall men-drop paket atau host mati. Periksa firewall dan security group.', cmd: 'nc -zv -w 3 host 443' },
    { p: 'Throughput rendah / banyak retransmisi', s: 'Packet loss atau window kecil. Analisis dengan Wireshark dan pertimbangkan tuning TCP (BBR, window scaling).', cmd: 'ss -ti dst host' },
    { p: 'Banyak koneksi TIME_WAIT / port exhaustion', s: 'Perbesar rentang port ephemeral, aktifkan keep-alive/connection reuse pada aplikasi.', cmd: 'ss -s' },
  ],
  facts: [
    'TCP dibuat tahun 1974 oleh Vint Cerf dan Bob Kahn, dan hampir tidak berubah mendasar hingga hari ini.',
    'Serangan SYN flood memanfaatkan handshake: menghabiskan tabel koneksi server dengan SYN palsu. Pertahanannya: SYN cookies.',
    'Port 0–1023 disebut well-known ports, 1024–49151 registered, 49152–65535 dynamic/ephemeral.',
    'HTTP/3 meninggalkan TCP dan memakai QUIC di atas UDP untuk menghindari head-of-line blocking.',
  ],
  quiz: [
    { q: 'Berapa langkah pada TCP handshake pembuka koneksi?', o: ['2', '3', '4', '5'], a: 1, e: 'SYN → SYN-ACK → ACK (three-way handshake).' },
    { q: 'Protokol manakah yang paling cocok untuk video call real-time?', o: ['TCP', 'UDP', 'FTP', 'SMTP'], a: 1, e: 'UDP lebih disukai karena latensi rendah — paket telat lebih baik dilewati daripada ditunggu.' },
    { q: 'Pasangan IP + port disebut …', o: ['Gateway', 'Socket', 'VLAN', 'Subnet'], a: 1, e: 'Socket = alamat IP + nomor port yang mengidentifikasi satu ujung komunikasi.' },
  ],
}

export default function Layer4Transport() {
  return <LayerView data={data} />
}
