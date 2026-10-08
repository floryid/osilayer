import { LAYERS, MNEMONIC } from '../data/layersMeta.js'
import { Reveal, SectionTitle } from '../components/Ui.jsx'
import Robot from '../components/Robot.jsx'
import Icon from '../components/Icons.jsx'
import Simulator from '../components/Simulator.jsx'

const TCPIP = [
  { name: 'Application', span: 3, layers: 'L7 · L6 · L5', note: 'HTTP, DNS, TLS, SSH, SMTP', color: LAYERS[6].color },
  { name: 'Transport', span: 1, layers: 'L4', note: 'TCP, UDP, QUIC', color: LAYERS[3].color },
  { name: 'Internet', span: 1, layers: 'L3', note: 'IP, ICMP, OSPF', color: LAYERS[2].color },
  { name: 'Network Access', span: 2, layers: 'L2 · L1', note: 'Ethernet, Wi-Fi, kabel', color: LAYERS[0].color },
]

export default function Home({ go }) {
  const toSimulator = (e) => {
    e.preventDefault()
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <span className="chip pulse">
            <i className="dot" /> SYSTEM ONLINE · OSI-7 PIXEL_DETECTIVE LAB
          </span>
          <h1>
            Pahami <span className="grad-text">7 Layer OSI Model</span> bersama robot jaringan
          </h1>
          <p>
            Penjelasan detail setiap lapisan — fungsi, cara kerja, protokol, anatomi header, hingga contoh nyata dan
            perintah yang bisa langsung kamu coba. Satu halaman lengkap untuk setiap layer.
          </p>
          <div className="hero-cta">
            <button type="button" className="btn primary lg" onClick={() => go(1)}>
              <Icon name="bolt" /> Mulai dari Layer 1
            </button>
            <a className="btn ghost lg" href="#simulator" onClick={toSimulator}>
              <Icon name="play" /> Coba Simulator
            </a>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>7</dt>
              <dd>Layer</dd>
            </div>
            <div>
              <dt>14</dt>
              <dd>Contoh Praktik</dd>
            </div>
            <div>
              <dt>21</dt>
              <dd>Soal Quiz</dd>
            </div>
          </dl>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-ring r1" />
          <div className="hero-ring r2" />
          <Robot />
          <div className="hero-orbit">
            {LAYERS.map((l, i) => (
              <span key={l.n} style={{ '--c': l.color, '--i': i }}>
                {l.n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="home-block">
        <Reveal>
          <SectionTitle eyebrow="Peta Model" title="Tumpukan 7 Layer — pilih untuk menyelami" icon="chip" />
        </Reveal>
        <div className="stack">
          {[...LAYERS].reverse().map((l, i) => (
            <Reveal key={l.n} delay={i * 60}>
              <button type="button" className="stack-card" style={{ '--c': l.color }} onClick={() => go(l.n)}>
                <span className="stack-no">{l.n}</span>
                <span className="stack-icon">
                  <Icon name={String(l.n)} />
                </span>
                <span className="stack-text">
                  <b>{l.name}</b>
                  <small>{l.id}</small>
                  <em>{l.tagline}</em>
                </span>
                <span className="stack-pdu">
                  <small>PDU</small>
                  {l.pdu}
                </span>
                <Icon name="arrowR" className="stack-arrow" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-block" id="simulator">
        <Reveal>
          <SectionTitle eyebrow="Simulator Interaktif" title="Enkapsulasi & dekapsulasi data" icon="play" />
          <p className="lead narrow">
            Saat dikirim, data turun dari Layer 7 ke 1 dan setiap layer menambahkan header sendiri (<b>enkapsulasi</b>).
            Di penerima, prosesnya dibalik naik dari Layer 1 ke 7 (<b>dekapsulasi</b>).
          </p>
          <Simulator />
        </Reveal>
      </section>

      <section className="home-block">
        <Reveal>
          <SectionTitle eyebrow="Jembatan Ingatan" title="Mnemonic menghafal urutan layer" icon="bolt" />
        </Reveal>
        <div className="mnemo">
          {[
            ['Layer 7 → 1', MNEMONIC.down, true],
            ['Layer 1 → 7', MNEMONIC.up, false],
          ].map(([label, words, down]) => (
            <Reveal key={label} className="panel">
              <h3 className="panel-title">{label}</h3>
              <ul className="mnemo-list">
                {words.map((w, i) => {
                  const n = down ? 7 - i : i + 1
                  return (
                    <li key={w} style={{ '--c': LAYERS[n - 1].color }}>
                      <b>{w[0]}</b>
                      <span>{w}</span>
                      <small>
                        L{n} {LAYERS[n - 1].name}
                      </small>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-block">
        <Reveal>
          <SectionTitle eyebrow="Perbandingan" title="OSI Model vs TCP/IP" icon="chip" />
          <div className="tcpip">
            <div className="tcpip-osi">
              {[...LAYERS].reverse().map((l) => (
                <div key={l.n} style={{ '--c': l.color }}>
                  <b>{l.n}</b> {l.name}
                </div>
              ))}
            </div>
            <div className="tcpip-arrow">
              <Icon name="arrowR" />
            </div>
            <div className="tcpip-stack">
              {TCPIP.map((t) => (
                <div key={t.name} style={{ '--c': t.color, flexGrow: t.span }}>
                  <b>{t.name}</b>
                  <small>{t.layers}</small>
                  <em>{t.note}</em>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
