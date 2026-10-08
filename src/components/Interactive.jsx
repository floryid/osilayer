import { useState } from 'react'
import Icon from './Icons.jsx'

export function PduDiagram({ data }) {
  const [active, setActive] = useState(0)
  const f = data.fields[active]
  return (
    <div className="pdu">
      <p className="pdu-intro">{data.intro}</p>
      <div className="pdu-bar" role="tablist" aria-label={data.title}>
        {data.fields.map((fl, i) => (
          <button
            key={fl.n}
            role="tab"
            aria-selected={i === active}
            type="button"
            className={`pdu-field ${i === active ? 'on' : ''}`}
            style={{ flexGrow: fl.w ?? 1, '--i': i }}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
          >
            <b>{fl.n}</b>
            {fl.size && <small>{fl.size}</small>}
          </button>
        ))}
      </div>
      <div className="pdu-detail" key={active}>
        <span className="pdu-tag">{f.n}</span>
        <p>{f.d}</p>
      </div>
    </div>
  )
}

export function Quiz({ items }) {
  const [answers, setAnswers] = useState({})
  const score = Object.entries(answers).filter(([qi, a]) => items[qi].a === a).length
  const done = Object.keys(answers).length === items.length

  return (
    <div className="quiz">
      {items.map((q, qi) => {
        const picked = answers[qi]
        const answered = picked !== undefined
        return (
          <div className="quiz-q" key={qi}>
            <p className="quiz-text">
              <span>Q{qi + 1}</span> {q.q}
            </p>
            <div className="quiz-opts">
              {q.o.map((opt, oi) => {
                let cls = ''
                if (answered) {
                  if (oi === q.a) cls = 'ok'
                  else if (oi === picked) cls = 'bad'
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={answered}
                    className={`quiz-opt ${cls}`}
                    onClick={() => setAnswers((s) => ({ ...s, [qi]: oi }))}
                  >
                    <i>{String.fromCharCode(65 + oi)}</i>
                    {opt}
                  </button>
                )
              })}
            </div>
            {answered && (
              <p className={`quiz-exp ${picked === q.a ? 'ok' : 'bad'}`}>
                <Icon name={picked === q.a ? 'check' : 'close'} /> {picked === q.a ? 'Benar! ' : 'Kurang tepat. '}
                {q.e}
              </p>
            )}
          </div>
        )
      })}
      {done && (
        <div className="quiz-score">
          Skor kamu: <b>{score}</b> / {items.length}
          <button type="button" className="btn ghost" onClick={() => setAnswers({})}>
            <Icon name="reset" /> Ulangi
          </button>
        </div>
      )}
    </div>
  )
}
