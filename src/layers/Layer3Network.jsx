import LayerView from '../components/LayerView.jsx'

const data = {
  n: 3,
  address: 'IP Address (IPv4/IPv6)',
  tcpip: 'Internet',
  summary: [
    'Network Layer menangani pengalamatan logis dan penentuan jalur (routing) agar paket dapat berpindah antar jaringan yang berbeda — bahkan lintas benua. Jika Layer 2 hanya menjangkau tetangga langsung, Layer 3 menjangkau seluruh internet.',
    'Setiap perangkat diberi alamat IP yang bersifat hierarkis (bagian jaringan + bagian host). Router membaca IP tujuan, mencocokkannya dengan routing table, lalu meneruskan paket ke next-hop terbaik hop demi hop sampai tiba di tujuan.',
  ],
  analogy:
    'Layer 3 adalah sistem pos antar-kota: alamat lengkap (jalan, kota, kode pos) di amplop adalah IP, dan setiap kantor pos transit (router) memutuskan paket dikirim ke kota berikutnya yang mana.',
  functions: [
    { t: 'Pengalamatan logis', d: 'Memberi alamat IP unik dan hierarkis (192.168.1.10/24 atau 2001:db8::1/64) yang tidak terikat perangkat keras.' },
    { t: 'Routing', d: 'Menentukan jalur terbaik berdasarkan metrik (hop, bandwidth, delay) menggunakan routing table statis atau dinamis (OSPF, BGP).' },
    { t: 'Forwarding paket', d: 'Memindahkan paket dari interface masuk ke interface keluar router sesuai hasil lookup longest-prefix-match.' },
    { t: 'Fragmentasi & reassembly', d: 'Memecah paket yang lebih besar dari MTU link menjadi fragmen lebih kecil lalu disatukan kembali di tujuan.' },
    { t: 'Logical subnetting', d: 'Membagi jaringan besar menjadi subnet (VLSM/CIDR) agar efisien dan terkontrol.' },
    { t: 'Diagnostik & error reporting', d: 'ICMP melaporkan masalah (Destination Unreachable, TTL Exceeded) dan mendukung ping / traceroute.' },
  ],
  deep: [
    {
      t: 'Subnet mask dan CIDR',
      d: 'Alamat IP dipecah menjadi bagian network dan host oleh subnet mask. Contoh 192.168.10.37/26 berarti 26 bit pertama = network. Maka: mask 255.255.255.192, network 192.168.10.0, broadcast 192.168.10.63, dan host valid 192.168.10.1 – .62 (62 host).',
      points: [
        'Hitung jumlah host: 2^(32 - prefix) - 2.',
        'Private IPv4: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.',
        'NAT menerjemahkan IP privat menjadi IP publik pada router/gateway.',
      ],
    },
    {
      t: 'Cara router memutuskan jalur',
      d: 'Router mencari entri routing table dengan prefix paling panjang yang cocok (longest prefix match). Jika tidak ada yang cocok, gunakan default route 0.0.0.0/0. TTL dikurangi 1 di tiap hop; jika TTL mencapai 0, paket dibuang dan ICMP Time Exceeded dikirim — mencegah paket berputar selamanya.',
    },
    {
      t: 'Routing statis vs dinamis',
      d: 'Static route dibuat manual — sederhana dan stabil. Dynamic routing membuat router saling bertukar informasi rute secara otomatis:',
      points: [
        'RIP: distance vector, metrik hop count (maks 15).',
        'OSPF: link-state, algoritma Dijkstra, cepat konvergen, dipakai di jaringan enterprise.',
        'EIGRP: hybrid (proprietary Cisco).',
        'BGP: path vector, pengikat antar Autonomous System di internet global.',
      ],
    },
    {
      t: 'IPv6',
      d: 'IPv4 hanya ±4,3 miliar alamat sehingga habis. IPv6 menggunakan 128 bit (3,4 × 10^38 alamat), menghapus broadcast (diganti multicast/anycast), menyederhanakan header, dan mendukung autokonfigurasi SLAAC serta IPsec secara native.',
    },
  ],
  protocols: [
    { n: 'IPv4 / IPv6', d: 'Protokol utama pengalamatan & pengiriman paket.' },
    { n: 'ICMP / ICMPv6', d: 'Pesan kontrol & error: ping, traceroute, unreachable.' },
    { n: 'OSPF, EIGRP, RIP, BGP', d: 'Protokol routing dinamis.' },
    { n: 'IPsec', d: 'Enkripsi & autentikasi pada tingkat IP (VPN site-to-site).' },
    { n: 'NAT / PAT', d: 'Menerjemahkan alamat privat ke publik.' },
    { n: 'DHCP*, IGMP', d: 'Pemberian IP otomatis (aplikasi di L7 namun terkait L3) dan manajemen grup multicast.' },
  ],
  devices: [
    { n: 'Router', d: 'Perangkat utama Layer 3: menghubungkan jaringan berbeda dan merutekan paket.' },
    { n: 'Switch Layer 3', d: 'Switch dengan kemampuan routing hardware (inter-VLAN routing berkecepatan kabel).' },
    { n: 'Firewall (packet filter)', d: 'Memfilter berdasar IP sumber/tujuan.' },
    { n: 'Gateway / NAT Box', d: 'Titik keluar jaringan lokal menuju internet.' },
    { n: 'Load Balancer (L3)', d: 'Mendistribusikan lalu lintas berdasarkan IP.' },
  ],
  pdu: {
    title: 'PDU Layer 3: IPv4 Packet Header',
    intro: 'Header IPv4 minimum 20 byte. Setiap field memengaruhi bagaimana router memproses paket:',
    fields: [
      { n: 'Version', size: '4 bit', w: 1, d: 'Versi IP: 4 untuk IPv4, 6 untuk IPv6.' },
      { n: 'IHL', size: '4 bit', w: 1, d: 'Internet Header Length — panjang header dalam kata 32-bit (minimum 5 = 20 byte).' },
      { n: 'DSCP/ECN', size: '8 bit', w: 1.4, d: 'Menentukan prioritas QoS (mis. suara/VoIP) dan notifikasi kemacetan.' },
      { n: 'Total Length', size: '16 bit', w: 2, d: 'Panjang seluruh paket (header + data), maksimum 65.535 byte.' },
      { n: 'Identification', size: '16 bit', w: 2, d: 'ID untuk mengenali fragmen yang berasal dari paket yang sama.' },
      { n: 'Flags + Frag Offset', size: '16 bit', w: 2, d: 'Flag DF (Don\'t Fragment), MF (More Fragments), dan posisi fragmen di paket asli.' },
      { n: 'TTL', size: '8 bit', w: 1.4, d: 'Time To Live — dikurangi 1 di setiap router. Bila 0, paket dibuang. Nilai awal umum: 64 (Linux), 128 (Windows).' },
      { n: 'Protocol', size: '8 bit', w: 1.4, d: 'Protokol di payload: 1 = ICMP, 6 = TCP, 17 = UDP, 89 = OSPF.' },
      { n: 'Header Checksum', size: '16 bit', w: 2, d: 'Checksum khusus header; dihitung ulang tiap hop karena TTL berubah.' },
      { n: 'IP Sumber', size: '32 bit', w: 3, d: 'Alamat IP pengirim.' },
      { n: 'IP Tujuan', size: '32 bit', w: 3, d: 'Alamat IP penerima yang dipakai router untuk routing.' },
      { n: 'Payload', size: 'variabel', w: 4, d: 'Segmen TCP / UDP / pesan ICMP dari Layer 4.' },
    ],
  },
  examples: [
    {
      title: 'Ping dan traceroute: melihat perjalanan paket',
      scenario:
        'Kita ingin mengetahui apakah server 8.8.8.8 dapat dijangkau dan melewati router mana saja menuju ke sana.',
      steps: [
        { t: 'Ping memakai ICMP Echo', d: 'Host mengirim ICMP Echo Request (type 8) ke 8.8.8.8 dan menunggu Echo Reply (type 0).' },
        { t: 'Host memilih next-hop', d: '8.8.8.8 bukan di subnet lokal, maka paket dikirim ke default gateway (router rumah) — Layer 2 memakai MAC gateway.' },
        { t: 'Router mengurangi TTL', d: 'Setiap router mengurangi TTL, mencari rute terbaik, lalu meneruskan ke hop berikutnya.' },
        { t: 'Traceroute memanfaatkan TTL', d: 'Traceroute mengirim paket dengan TTL=1, 2, 3, ...; setiap router yang membuang paket membalas ICMP Time Exceeded sehingga identitasnya terlihat.' },
      ],
      code: {
        title: 'bash — ping & traceroute',
        text: `$ ping -c 3 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.4 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=12.1 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=12.6 ms
--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss

$ traceroute 8.8.8.8
 1  192.168.1.1 (192.168.1.1)    1.2 ms     # router rumah
 2  10.20.0.1 (10.20.0.1)        5.8 ms     # gateway ISP
 3  103.xx.xx.1                  8.9 ms     # backbone ISP
 4  72.14.xx.xx                 11.7 ms     # jaringan Google
 5  8.8.8.8                     12.3 ms     # tujuan

# ttl=117  => paket awalnya 128/64 lalu melewati beberapa router.`,
      },
    },
    {
      title: 'Subnetting dan konfigurasi routing statis',
      scenario:
        'Perusahaan memiliki blok 192.168.10.0/24 dan perlu dibagi menjadi 4 subnet sama besar untuk 4 departemen, serta router perlu rute ke subnet tersebut.',
      steps: [
        { t: 'Tentukan jumlah subnet', d: 'Butuh 4 subnet = 2 bit tambahan. Prefix /24 menjadi /26 (mask 255.255.255.192).' },
        { t: 'Hitung kapasitas', d: 'Tiap subnet: 2^6 = 64 alamat, 62 host valid (dikurangi network & broadcast).' },
        { t: 'Daftar subnet', d: '192.168.10.0, .64, .128, dan .192 — masing-masing /26.' },
        { t: 'Atur rute statis', d: 'Router pusat diberi rute ke subnet di balik router cabang menggunakan next-hop yang tepat.' },
      ],
      code: {
        title: 'subnetting + cisco-ios',
        text: `Subnet        Range host                    Broadcast
192.168.10.0/26   .1   - .62                 .63
192.168.10.64/26  .65  - .126                .127
192.168.10.128/26 .129 - .190                .191
192.168.10.192/26 .193 - .254                .255

Router# configure terminal
Router(config)# interface gigabitEthernet 0/0
Router(config-if)# ip address 192.168.10.1 255.255.255.192
Router(config-if)# no shutdown

# Rute statis ke subnet departemen lain via router cabang 10.0.0.2
Router(config)# ip route 192.168.10.128 255.255.255.192 10.0.0.2
# Default route menuju ISP
Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1

Router# show ip route`,
      },
    },
  ],
  troubleshooting: [
    { p: 'Tidak bisa ping IP di luar subnet', s: 'Periksa default gateway, subnet mask, dan routing table. Pastikan gateway dapat di-ping.', cmd: 'ip route show' },
    { p: 'Request timed out di tengah traceroute', s: 'Router tertentu mem-blokir ICMP atau tidak punya rute balik. Periksa ACL / firewall dan asymmetric routing.', cmd: 'traceroute -n <tujuan>' },
    { p: 'IP conflict', s: 'Dua perangkat memiliki IP sama. Gunakan DHCP reservation atau cari pelakunya dari ARP table.', cmd: 'arping -D 192.168.1.10' },
    { p: 'Paket besar gagal tetapi paket kecil lolos (MTU issue)', s: 'Path MTU lebih kecil dari ukuran paket dan DF diset. Turunkan MTU atau aktifkan MSS clamping.', cmd: 'ping -M do -s 1472 8.8.8.8' },
  ],
  facts: [
    'Paket pertama dalam sejarah ARPANET (1969) hanya berhasil mengirim "LO" sebelum sistem crash — niatnya adalah "LOGIN".',
    'Tabel routing global BGP kini memuat lebih dari 900.000 prefix IPv4.',
    'IPv6 menyediakan sekitar 340 undesiliun alamat — cukup untuk memberi IP bagi setiap butir pasir di bumi.',
    'Alamat 127.0.0.1 (loopback) selalu menunjuk ke perangkat sendiri.',
  ],
  quiz: [
    { q: 'Perangkat utama pada Layer 3 adalah …', o: ['Hub', 'Switch L2', 'Router', 'Repeater'], a: 2, e: 'Router membaca alamat IP dan merutekan paket antar jaringan.' },
    { q: 'Berapa jumlah host valid pada subnet /26?', o: ['30', '62', '64', '126'], a: 1, e: '2^(32-26) - 2 = 64 - 2 = 62 host valid.' },
    { q: 'Field IP yang mencegah paket berputar selamanya adalah …', o: ['Protocol', 'TTL', 'Checksum', 'Flags'], a: 1, e: 'TTL dikurangi di setiap router; bila 0 paket dibuang.' },
  ],
}

export default function Layer3Network() {
  return <LayerView data={data} />
}
