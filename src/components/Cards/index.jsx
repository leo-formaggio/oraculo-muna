import React, { useEffect, useState } from "react"
import { phase } from "lune"
import { Popup } from "../Popup"
import './styles.css'

const allCards = [
  //Lua Nova
    {id: 1, message: "mensagem 01", moonPhase: "Nova"},
    {id: 2, message: "mensagem 02", moonPhase: "Nova"},
    {id: 3, message: "mensagem 03", moonPhase: "Nova"},
    {id: 4, message: "mensagem 04", moonPhase: "Nova"},
    {id: 5, message: "mensagem 05", moonPhase: "Nova"},
    {id: 6, message: "mensagem 06", moonPhase: "Nova"},
    {id: 7, message: "mensagem 07", moonPhase: "Nova"},

    //Lua Crescente
    {id: 8, message: "mensagem 08", moonPhase: "Crescente"},
    {id: 9, message: "mensagem 09", moonPhase: "Crescente"},
    {id: 10, message: "mensagem 10", moonPhase: "Crescente"},
    {id: 11, message: "mensagem 11", moonPhase: "Crescente"},
    {id: 12, message: "mensagem 12", moonPhase: "Crescente"},
    {id: 13, message: "mensagem 13", moonPhase: "Crescente"},
    {id: 14, message: "mensagem 14", moonPhase: "Crescente"},

    //Lua Cheia
    {id: 16, message: "mensagem 16", moonPhase: "Cheia"},
    {id: 17, message: "mensagem 17", moonPhase: "Cheia"},
    {id: 18, message: "mensagem 18", moonPhase: "Cheia"},
    {id: 19, message: "mensagem 19", moonPhase: "Cheia"},
    {id: 20, message: "mensagem 20", moonPhase: "Cheia"},
    {id: 21, message: "mensagem 21", moonPhase: "Cheia"},

    //Lua Minguante
    {id: 22, message: "mensagem 22", moonPhase: "Minguante"},
    {id: 23, message: "mensagem 23", moonPhase: "Minguante"},
    {id: 24, message: "mensagem 24", moonPhase: "Minguante"},
    {id: 25, message: "mensagem 25", moonPhase: "Minguante"},
    {id: 26, message: "mensagem 26", moonPhase: "Minguante"},
    {id: 27, message: "mensagem 27", moonPhase: "Minguante"},
    {id: 28, message: "mensagem 28", moonPhase: "Minguante"},
]

function getPhase(moonPhase) {
  // if (moonPhase < 0.1 || moonPhase > 0.9)
  //   return 'Nova'
  // if (moonPhase < 0.5)
  //   return 'Crescente'
  // if (moonPhase < 0.6)
  //   return 'Cheia'
  
  // return 'Minguante'

  if (moonPhase >= 0 && moonPhase < 0.125)
    return 'Nova'
  if (moonPhase >= 0.125 && moonPhase < 0.5)
    return 'Crescente'
  if (moonPhase > 0.5 && moonPhase < 0.875)
    return 'Cheia'
  
  return 'Minguante'
}

export function Cards() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [flippedIndex, setFlippedIndex] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [phaseName, setPhaseName] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const moon = new Date(phase)
    const name = getPhase(moon.phase)
    setPhaseName(name)

    const today = new Date().toISOString().split('T')[0]
    const saved = JSON.parse(localStorage.getItem('dailyCard'))

    if (saved && saved.date ===  today && saved.phase === name) {
      setSelectedCard(saved.card)
    } else {
      const cards = allCards.filter(c => c.moonPhase === name)
      const randomIndex = Math.floor(Math.random() * cards.length)
      const card = cards[randomIndex]
      setSelectedCard(card)

      localStorage.setItem(
        'dailyCard', 
        JSON.stringify({date: today, phase: name, card})
      )
    }
  }, [])

  const handleClick = (index) => {
    if (revealed) return
    setRevealed(true)
    setFlippedIndex(index)
  }

  return (
    <div className="container">
      <h2>Fase da Lua: {phaseName}</h2>
        <p><i>Escolha a sua carta</i></p>
        <Popup />
      <div className="cards">
        {[...Array(28)].map((_, i) => {
          const rotation = (i - 3) * 15
          return (
            <div
              key={i}
              className={`card ${flippedIndex === i ? 'flipped selected' : ''} ${revealed && flippedIndex !== i ? 'disabled' : ''}`}
              onClick={() => handleClick(i)}
              style={{ transform: `rotate(${rotation}deg)` }}
              >
              <div className="card-inner">
                <div className="card-front"></div>
                <div className="card-back">{selectedCard?.message}
                </div>
                  {flippedIndex === i && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedCard.message)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 1500)
                        }}
                      className="copy-button"
                    >❐
                    </button>
                  )}
              </div>
                  {copied && <div className="copied-message">Copiado com sucesso!</div>}
            </div>
          ) 
        })}
      </div>
    </div>
  )

  // return (
  //   <div className="container">
  //     <h2>Fase atual da Lua: {phaseName}</h2>
  //     <div className={`card ${revealed ? 'flipped' : ''}`} onClick={() => setRevealed(true)}>
  //       <div className="card-inner">
  //         <div className="card-front">🔮 Clique para revelar</div>
  //         <div className="card-back">{selectedCard?.message}</div>
  //       </div>
  //     </div>
  //   </div>
  // )
}