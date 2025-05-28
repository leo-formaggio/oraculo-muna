import { useEffect, useState } from "react"
import { phase } from "lune"
import { Popup } from "../Popup"
import './styles.css'

const allCards = [
  //Lua Nova 
    {
      id: 1, 
      title: "Semente do Silêncio", 
      message: "Inspiração: O silêncio é fértil. Mesmo quando nada parece acontecer, sua alma está trabalhando. Respeite os momentos de pausa: é no escuro que a semente desperta.", 
      text:"Mesmo no escuro, eu floresço.",
      insta:"@portalmuna",
      moonPhase: "Nova"
    },
    {
      id: 2, 
      title: "Intenção Sagrada", 
      message: "Você é a guardiã do seu destino. Toda mudança começa por uma intenção clara. O que você quer viver com mais presença?", 
      text:"Minha intenção é uma semente viva.",
      insta:"@portalmuna",
      moonPhase: "Nova"
    },
    {
      id: 3, 
      title: "O Vazio Criativo", 
      message: "Não ter respostas é o portal para as melhores criações. Confie no vazio como parte do processo.", 
      text:"O vazio é minha tela em branco.",
      insta:"@portalmuna",
      moonPhase: "Nova"
    },
    {
      id: 4, 
      title: "Corpo-Oráculo", 
      message: "Seu corpo é sábio e fala com você. Ele sabe o que está pronto para começar, parar ou mudar. Escute os sussurros dele.", 
      text:"Meu corpo me guia com sabedoria.",
      insta:"@portalmuna",
      moonPhase: "Nova"
    },
    {
      id: 5, 
      title: "Essência Invisível", 
      message: "O que te move não é visível aos olhos. Cultivar a sua essência é mais importante do que parecer algo para o mundo.", 
      text:"Eu honro quem sou, mesmo sem aplausos.",
      insta:"@portalmuna",
      moonPhase: "Nova"
    },
    {
      id: 6, 
      title: "Terra Fértil", 
      message: "Você é terra que acolhe. O que você deseja nutrir com carinho e tempo? Confie no processo natural de crescimento.", 
      text:"Sou fértil em sonhos e ações.",
      insta:"@portalmuna",
      moonPhase: "Nova"
    },
    {
      id: 7, 
      title: "Ouvir para Receber", 
      message: "Escutar é um ato de coragem. Ao abrir espaço para o que você realmente precisa ouvir, tudo se alinha.", 
      text:"Eu escuto com o coração aberto.",
      insta:"@portalmuna",
      moonPhase: "Nova"
    },
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
  if (moonPhase >= 0 && moonPhase < 0.125)
    return 'Nova'
  if (moonPhase >= 0.125 && moonPhase < 0.5)
    return 'Crescente'
  if (moonPhase >= 0.5 && moonPhase < 0.875)
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
    const moon = phase(new Date())
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
              onClick={() => handleClick(i)} style={{ transform: `rotate(${rotation}deg)` }}>
              <div className="card-inner">
                <div className="card-front"></div>
                <div className="card-back">
                  <div className="text-card">
                    <h3 className="text-title">
                    {selectedCard?.title}
                  </h3>
                  <p className="text-message">
                    {selectedCard?.message}
                  </p>
                  <h4 className="text-subtitle">
                    {selectedCard?.text}
                  </h4>
                  <p className="text-social">
                    {selectedCard?.insta}
                  </p>
                  </div>
                </div>
                  {flippedIndex === i && (
                    <button className="copy-button"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedCard.message)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 1500)}}>
                        ❐
                    </button>
                  )}
              </div>
                  {copied && 
                    <div className="copied-message">
                      Copiado com sucesso!
                    </div>}
            </div>
          ) 
        })
        }
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