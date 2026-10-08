import { Reveal, SectionTitle, CodeBlock } from './Ui.jsx'
import { PduDiagram, Quiz } from './Interactive.jsx'
import Icon from './Icons.jsx'
import { LAYERS } from '../data/layersMeta.js'

const SECTIONS = [
  ['ringkasan', 'Ringkasan'],
  ['fungsi', 'Fungsi'],
  ['cara-kerja', 'Cara Kerja'],
  ['protokol', 'Protokol & Perangkat'],
  ['pdu', 'Anatomi PDU'],
  ['contoh', 'Contoh Lengkap'],
  ['troubleshooting', 'Troubleshooting'],
  ['quiz', 'Quiz'],
]

function scrollToSection(e, id) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function LayerView({ data }) {
  const meta = LAYERS[data.n - 1]
  const style = { '--c': meta.color }

  return (
    <article className="layer" style={style}>
      <header className="layer-hero">
        <div className="layer-hero-bg" aria-hidden="true">
          <span className="layer-bigno">{data.n}</span>
        </div>
        <div className="layer-hero-body">
          <span className="chip">
            <Icon name="chip" /> Layer {data.n} dari 7
          </span>
          <h1>
            <Icon name={String(data.n)} className="layer-hero-icon" />
            <span className="grad-text">{meta.name}</span>
          </h1>
          <p className="layer-id">{meta.id}</p>
          <p className="layer-tag">{meta.tagline}</p>
          <div className="layer-badges">
            <span className="badge">
              <small>PDU</small>
              {meta.pdu}
            </span>
            <span className="badge">
              <small>Alamat</small>
              {data.address}
            </span>
            <span className="badge">
              <small>Setara TCP/IP</small>
              {data.tcpip}
            </span>
          </div>
        </div>
      </header>

      <nav className="section-nav" aria-label="Navigasi bagian">
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={(e) => scrollToSection(e, id)}>
            {label}
          </a>
        ))}
      </nav>

      <section id="ringkasan" className="block">
        <Reveal>
          <SectionTitle eyebrow="Ringkasan" title={`Apa itu Layer ${data.n} — ${meta.name}?`} icon="bolt" />
          {data.summary.map((p, i) => (
            <p className="lead" key={i}>
              {p}
            </p>
          ))}
          <div className="analogy">
            <span className="analogy-label">Analogi</span>
            <p>{data.analogy}</p>
          </div>
        </Reveal>
      </section>

      <section id="fungsi" className="block">
        <Reveal>
          <SectionTitle eyebrow="Fungsi Utama" title="Tugas yang dikerjakan lapisan ini" icon="chip" />
        </Reveal>
        <div className="grid fn-grid">
          {data.functions.map((f, i) => (
            <Reveal key={f.t} delay={i * 70} className="card fn-card">
              <span className="fn-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="cara-kerja" className="block">
        <Reveal>
          <SectionTitle eyebrow="Cara Kerja" title="Mekanisme di balik layar" icon="bolt" />
        </Reveal>
        <div className="deep">
          {data.deep.map((d, i) => (
            <Reveal key={d.t} delay={i * 60} className="deep-item">
              <h3>{d.t}</h3>
              <p>{d.d}</p>
              {d.points && (
                <ul>
                  {d.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <section id="protokol" className="block">
        <Reveal>
          <SectionTitle eyebrow="Protokol & Perangkat" title="Standar dan hardware yang bekerja di layer ini" icon="chip" />
        </Reveal>
        <div className="two-col">
          <Reveal className="panel">
            <h3 className="panel-title">Protokol / Standar</h3>
            <ul className="tag-list">
              {data.protocols.map((p) => (
                <li key={p.n}>
                  <b>{p.n}</b>
                  <span>{p.d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="panel" delay={90}>
            <h3 className="panel-title">Perangkat & Media</h3>
            <ul className="tag-list">
              {data.devices.map((p) => (
                <li key={p.n}>
                  <b>{p.n}</b>
                  <span>{p.d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="pdu" className="block">
        <Reveal>
          <SectionTitle eyebrow="Anatomi PDU" title={data.pdu.title} icon="chip" />
          <PduDiagram data={data.pdu} />
        </Reveal>
      </section>

      <section id="contoh" className="block">
        <Reveal>
          <SectionTitle eyebrow="Contoh Lengkap" title="Praktik nyata, langkah demi langkah" icon="play" />
        </Reveal>
        {data.examples.map((ex, ei) => (
          <Reveal key={ex.title} className="example" delay={ei * 80}>
            <h3 className="example-title">
              <span>Contoh {ei + 1}</span>
              {ex.title}
            </h3>
            <p className="example-scn">{ex.scenario}</p>
            <ol className="timeline">
              {ex.steps.map((s, i) => (
                <li key={s.t} style={{ '--i': i }}>
                  <span className="tl-dot">{i + 1}</span>
                  <div>
                    <h4>{s.t}</h4>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <CodeBlock title={ex.code.title} text={ex.code.text} />
            {ex.note && <p className="example-note">{ex.note}</p>}
          </Reveal>
        ))}
      </section>

      <section id="troubleshooting" className="block">
        <Reveal>
          <SectionTitle eyebrow="Troubleshooting" title="Masalah umum & cara mendiagnosis" icon="bolt" />
        </Reveal>
        <div className="grid ts-grid">
          {data.troubleshooting.map((t, i) => (
            <Reveal key={t.p} delay={i * 70} className="card ts-card">
              <h3>
                <span className="ts-flag">Masalah</span>
                {t.p}
              </h3>
              <p>
                <b>Solusi:</b> {t.s}
              </p>
              {t.cmd && <code className="inline-cmd">{t.cmd}</code>}
            </Reveal>
          ))}
        </div>
        <Reveal className="facts">
          <h3 className="panel-title">Fakta Menarik</h3>
          <ul>
            {data.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="quiz" className="block">
        <Reveal>
          <SectionTitle eyebrow="Uji Pemahaman" title="Quiz singkat" icon="check" />
          <Quiz items={data.quiz} />
        </Reveal>
      </section>
    </article>
  )
}
