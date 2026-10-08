import LayerView from '../components/LayerView.jsx'

const data = {
  n: 2,
  address: 'MAC Address (48-bit)',
  tcpip: 'Network Access / Link',
  summary: [
    'Data Link Layer bertanggung jawab memindahkan data antar dua perangkat yang terhubung langsung dalam satu segmen jaringan lokal (LAN). Layer ini membungkus paket dari Layer 3 menjadi frame, menambahkan alamat MAC fisik, dan mengecek apakah frame rusak di perjalanan.',
    'IEEE membagi layer ini menjadi dua sub-lapisan: LLC (Logical Link Control, 802.2) yang berhubungan dengan lapisan atas, dan MAC (Media Access Control) yang mengatur siapa boleh bicara di media dan memakai alamat fisik.',
  ],
  analogy:
    'Layer 2 seperti kurir antar-RT dalam satu kompleks perumahan: ia hanya tahu nomor rumah (MAC) di kompleks itu dan memastikan paket sampai di rumah yang benar di sebelah, tanpa tahu jalan menuju kota lain.',
  functions: [
    { t: 'Framing', d: 'Membungkus paket Layer 3 menjadi frame dengan header dan trailer sehingga penerima tahu di mana frame dimulai dan berakhir.' },
    { t: 'Pengalamatan fisik (MAC)', d: 'Setiap NIC punya MAC unik 48-bit (mis. 3C:52:82:A1:7F:09). Frame membawa MAC sumber dan tujuan untuk pengiriman dalam LAN.' },
    { t: 'Deteksi error (FCS/CRC)', d: 'Trailer FCS berisi CRC-32. Penerima menghitung ulang CRC; bila berbeda, frame dibuang karena dianggap rusak.' },
    { t: 'Media access control', d: 'Mengatur kapan perangkat boleh mengirim: CSMA/CD (Ethernet klasik) dan CSMA/CA (Wi-Fi) untuk menghindari tabrakan.' },
    { t: 'Switching & forwarding', d: 'Switch mempelajari MAC address di tiap port (MAC table) dan hanya meneruskan frame ke port tujuan yang tepat.' },
    { t: 'Segmentasi VLAN & flow control', d: 'VLAN (802.1Q) memisahkan LAN logis dalam satu switch fisik. Frame PAUSE (802.3x) mengatur laju pengiriman agar buffer tidak penuh.' },
  ],
  deep: [
    {
      t: 'Bagaimana switch belajar (MAC learning)',
      d: 'Switch memiliki tabel CAM yang memetakan MAC ke port. Cara kerjanya:',
      points: [
        'Learning: ketika frame masuk di port X, switch mencatat MAC sumber → port X.',
        'Forwarding: bila MAC tujuan ada di tabel, frame dikirim hanya ke port itu (unicast).',
        'Flooding: bila MAC tujuan belum dikenal (atau broadcast FF:FF:FF:FF:FF:FF), frame dikirim ke semua port kecuali asal.',
        'Aging: entri yang tidak aktif ±300 detik dihapus dari tabel.',
      ],
    },
    {
      t: 'ARP: jembatan Layer 3 ke Layer 2',
      d: 'Komputer tahu IP tujuan (Layer 3) tetapi butuh MAC tujuan untuk membuat frame. Address Resolution Protocol (ARP) mengirim broadcast "Siapa pemilik IP 192.168.1.1?" dan pemilik IP menjawab dengan MAC-nya. Hasilnya disimpan di ARP cache.',
    },
    {
      t: 'CSMA/CD dan CSMA/CA',
      d: 'Pada Ethernet half-duplex, CSMA/CD: "dengarkan dulu sebelum bicara, deteksi tabrakan, lalu backoff acak". Pada Wi-Fi digunakan CSMA/CA karena tabrakan sulit dideteksi di udara: perangkat menunggu waktu acak dan memakai ACK + RTS/CTS. Pada switch full-duplex modern, tabrakan tidak terjadi lagi.',
    },
    {
      t: 'Spanning Tree Protocol (STP)',
      d: 'Bila switch dihubungkan melingkar, frame broadcast dapat berputar tanpa henti (broadcast storm). STP (802.1D/RSTP 802.1w) memblokir sebagian link redundan secara logis dan mengaktifkannya hanya ketika link utama gagal.',
    },
  ],
  protocols: [
    { n: 'Ethernet (IEEE 802.3)', d: 'Teknologi LAN kabel paling umum, mendefinisikan format frame dan CSMA/CD.' },
    { n: 'Wi-Fi MAC (802.11)', d: 'Format frame nirkabel dan CSMA/CA dengan ACK.' },
    { n: 'ARP / NDP', d: 'Memetakan alamat IP ke MAC (IPv4: ARP, IPv6: Neighbor Discovery).' },
    { n: 'VLAN 802.1Q', d: 'Menandai frame dengan VLAN ID (12-bit, 4094 VLAN).' },
    { n: 'STP / RSTP / MSTP', d: 'Mencegah loop pada topologi switch redundan.' },
    { n: 'PPP, HDLC, LACP', d: 'Protokol point-to-point WAN dan penggabungan link (link aggregation 802.3ad).' },
  ],
  devices: [
    { n: 'Switch (L2)', d: 'Meneruskan frame berdasarkan MAC address; satu collision domain per port.' },
    { n: 'Bridge', d: 'Leluhur switch — menghubungkan dua segmen LAN.' },
    { n: 'Wireless Access Point', d: 'Menjembatani klien Wi-Fi ke LAN kabel pada Layer 2.' },
    { n: 'NIC', d: 'Menyimpan MAC address, membuat dan memeriksa frame.' },
    { n: 'Network Bridge Virtual', d: 'Linux bridge / vSwitch di hypervisor untuk virtual machine.' },
  ],
  pdu: {
    title: 'PDU Layer 2: Ethernet II Frame',
    intro: 'Frame Ethernet II dengan ukuran 64 – 1518 byte (payload maksimum 1500 byte = MTU). Klik tiap field:',
    fields: [
      { n: 'MAC Tujuan', size: '6 byte', w: 3, d: 'Alamat MAC penerima. FF:FF:FF:FF:FF:FF berarti broadcast ke semua perangkat dalam LAN.' },
      { n: 'MAC Sumber', size: '6 byte', w: 3, d: 'Alamat MAC pengirim. Digunakan switch untuk belajar lokasi perangkat (MAC learning).' },
      { n: '802.1Q Tag', size: '4 byte (ops.)', w: 1.6, d: 'Opsional. Berisi TPID 0x8100, prioritas 802.1p (3 bit), dan VLAN ID (12 bit).' },
      { n: 'EtherType', size: '2 byte', w: 1.6, d: 'Menandakan protokol di payload: 0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP.' },
      { n: 'Payload', size: '46-1500 byte', w: 7, d: 'Paket Layer 3 (IP). Jika kurang dari 46 byte, ditambah padding agar frame minimal 64 byte.' },
      { n: 'FCS', size: '4 byte', w: 1.6, d: 'Frame Check Sequence — CRC-32 untuk mendeteksi bit yang rusak selama transmisi.' },
    ],
  },
  examples: [
    {
      title: 'Melihat MAC address, ARP table, dan MAC table',
      scenario:
        'PC-A (192.168.1.10) ingin berkomunikasi dengan PC-B (192.168.1.20) dalam satu switch. Bagaimana frame sampai ke PC-B?',
      steps: [
        { t: 'PC-A mengecek ARP cache', d: 'PC-A belum tahu MAC milik 192.168.1.20 sehingga harus mencari tahu.' },
        { t: 'ARP Request (broadcast)', d: 'PC-A mengirim frame ke FF:FF:FF:FF:FF:FF: "Siapa punya 192.168.1.20? Beritahu 192.168.1.10". Switch mem-flood ke semua port dan mencatat MAC PC-A di port 1.' },
        { t: 'ARP Reply (unicast)', d: 'PC-B menjawab langsung ke MAC PC-A: "192.168.1.20 ada di BB:BB:BB:00:00:02". Switch belajar MAC PC-B di port 2.' },
        { t: 'Frame data dikirim', d: 'PC-A membuat frame dengan MAC tujuan PC-B. Switch hanya meneruskan ke port 2 (tidak ke port lain).' },
        { t: 'Verifikasi FCS', d: 'PC-B menghitung CRC-32; bila cocok, header Ethernet dibuang dan paket IP dinaikkan ke Layer 3.' },
      ],
      code: {
        title: 'bash — ARP & MAC table',
        text: `$ ip link show eth0
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP
    link/ether aa:aa:aa:00:00:01 brd ff:ff:ff:ff:ff:ff

$ arp -n
Address          HWtype  HWaddress           Iface
192.168.1.1      ether   00:1a:2b:3c:4d:5e   eth0
192.168.1.20     ether   bb:bb:bb:00:00:02   eth0

# Pada switch Cisco:
Switch# show mac address-table dynamic
 Vlan    Mac Address       Type        Ports
 ----    -----------       --------    -----
    1    aaaa.aa00.0001    DYNAMIC     Fa0/1
    1    bbbb.bb00.0002    DYNAMIC     Fa0/2`,
      },
      note: 'Tahukah kamu? ARP tidak punya autentikasi — itulah sebabnya serangan ARP spoofing masih ada. Gunakan Dynamic ARP Inspection pada switch.',
    },
    {
      title: 'Konfigurasi VLAN pada switch Cisco',
      scenario:
        'Sebuah kantor ingin memisahkan departemen Keuangan (VLAN 10) dan Marketing (VLAN 20) pada switch yang sama agar broadcast tidak saling mengganggu.',
      steps: [
        { t: 'Buat VLAN', d: 'Definisikan VLAN 10 dan 20 beserta namanya pada switch.' },
        { t: 'Atur access port', d: 'Port yang terhubung ke PC dijadikan mode access dan diberi VLAN masing-masing.' },
        { t: 'Atur trunk port', d: 'Port ke switch lain / router dijadikan trunk 802.1Q agar membawa banyak VLAN dengan tag.' },
        { t: 'Verifikasi', d: 'PC di VLAN 10 tidak dapat berkomunikasi dengan VLAN 20 pada Layer 2 — butuh router (inter-VLAN routing).' },
      ],
      code: {
        title: 'cisco-ios — VLAN',
        text: `Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name KEUANGAN
Switch(config-vlan)# vlan 20
Switch(config-vlan)# name MARKETING
Switch(config-vlan)# exit

Switch(config)# interface range fastEthernet 0/1 - 10
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10

Switch(config)# interface range fastEthernet 0/11 - 20
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 20

Switch(config)# interface gigabitEthernet 0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20

Switch# show vlan brief`,
      },
    },
  ],
  troubleshooting: [
    { p: 'Dua perangkat tidak bisa saling ping padahal satu subnet', s: 'Cek tabel ARP. Entry "incomplete" berarti ARP reply tidak datang — periksa VLAN, port security, atau firewall.', cmd: 'arp -a' },
    { p: 'Broadcast storm / jaringan tiba-tiba lambat', s: 'Kemungkinan loop switch. Aktifkan STP/RSTP dan BPDU Guard di port akses.', cmd: 'show spanning-tree summary' },
    { p: 'MAC address ganda / flapping', s: 'Satu MAC muncul di dua port: ada loop atau perangkat dengan MAC duplikat (clone/ARP spoof). Periksa log switch.', cmd: 'show mac address-table | include <MAC>' },
    { p: 'Port err-disabled', s: 'Biasanya karena port-security, BPDU guard, atau flapping. Perbaiki penyebab lalu shutdown / no shutdown pada port.', cmd: 'show interfaces status err-disabled' },
  ],
  facts: [
    'MAC address terdiri dari 24 bit OUI (vendor) + 24 bit nomor seri perangkat — kamu bisa menebak merek perangkat dari 3 byte pertamanya.',
    'Ukuran frame minimum 64 byte berasal dari kebutuhan CSMA/CD mendeteksi collision pada kabel 2.5 km di era Ethernet awal.',
    'Jumbo frame (MTU 9000) dipakai di data center untuk meningkatkan efisiensi dengan mengurangi overhead header.',
    'Switch modern melakukan forwarding dengan ASIC dalam hitungan nanodetik sehingga disebut wire-speed.',
  ],
  quiz: [
    { q: 'Alamat apa yang dipakai pada Layer 2?', o: ['IP Address', 'Port', 'MAC Address', 'URL'], a: 2, e: 'Layer 2 memakai MAC address 48-bit sebagai alamat fisik.' },
    { q: 'Apa fungsi FCS pada trailer frame?', o: ['Menentukan rute', 'Mendeteksi error pada frame', 'Mengenkripsi data', 'Menentukan port tujuan'], a: 1, e: 'FCS berisi CRC-32 yang dipakai untuk mendeteksi frame rusak.' },
    { q: 'Protokol yang mencegah loop pada switch adalah …', o: ['OSPF', 'STP', 'DHCP', 'ICMP'], a: 1, e: 'Spanning Tree Protocol memblokir link redundan agar tidak terjadi loop Layer 2.' },
  ],
}

export default function Layer2DataLink() {
  return <LayerView data={data} />
}
