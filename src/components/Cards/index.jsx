import WhatsImage from '../../assets/paper-plane-tilt.png'
import { WhatsappShareButton } from "react-share"
import { useEffect, useState } from "react"
import { Popup } from "../Popup"
import { phase } from "lune"
import './styles.css'

const allCards = [
  //Lua Nova 
    {
      id: 1, 
      title: "Semente do Silêncio", 
      message: "O silêncio é fértil. Mesmo quando nada parece acontecer, sua alma está trabalhando. Respeite os momentos de pausa: é no escuro que a semente desperta.", 
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
    {
      id: 8, 
      title: "Coragem em Movimento", 
      message: "Toda ação começa com um primeiro passo. Não espere se sentir pronta para agir — o movimento trará clareza.", 
      text:"Eu ajo com coragem, mesmo diante do desconhecido.",
      insta:"@portalmuna",
      moonPhase: "Crescente"
    },
    {
      id: 9, 
      title: "Vestir o Propósito", 
      message: "Sua imagem comunica. Vista-se como quem já é. Ao alinhar sua expressão externa com sua verdade interna, você manifesta presença e direção.", 
      text:"Eu visto o que vibra com meu propósito.",
      insta:"@portalmuna",
      moonPhase: "Crescente"
    },
    {
      id: 10, 
      title: "Nutrir o Que Importa", 
      message: "Nem tudo que cresce merece continuar. Foque sua energia no que realmente importa para você.", 
      text:"Eu escolho nutrir apenas o que floresce em mim.",
      insta:"@portalmuna",
      moonPhase: "Crescente"
    },
    {
      id: 11, 
      title: "Expansão com Raiz", 
      message: "Expandir não é se espalhar, é crescer com consciência. Quanto mais você se ancora em quem é, mais longe pode ir.", 
      text:"Minha expansão nasce do meu enraizamento.",
      insta:"@portalmuna",
      moonPhase: "Crescente"
    },
    {
      id: 12, 
      title: "Ação Alinhada", 
      message: "Fazer por fazer desgasta. Fazer com sentido nutre. Alinhe suas ações com o que você acredita, e o caminho se abre.", 
      text:"Cada passo meu honra quem eu sou.",
      insta:"@portalmuna",
      moonPhase: "Crescente"
    },
    {
      id: 13, 
      title: "Força Feminina", 
      message: "Ser forte não é resistir, é sustentar. Sua força feminina está em reconhecer seus limites e ainda assim seguir com leveza.", 
      text:"Minha força floresce quando sou inteira.",
      insta:"@portalmuna",
      moonPhase: "Crescente"
    },
    {
      id: 14, 
      title: "Compromisso com a Jornada", 
      message: "A pressa é inimiga da profundidade. Cultivar algo leva tempo. Seu compromisso é o que transforma o desejo em realidade.", 
      text:"Eu sustento meu caminho com amor e firmeza.",
      insta:"@portalmuna",
      moonPhase: "Crescente"
    },
    //Lua Cheia
    {
      id: 15, 
      title: "Brilho Sem Medo", 
      message: "Você foi feita para brilhar. Não peça desculpas pela sua luz. Assumir quem você é é um ato de coragem e amor-próprio.", 
      text:"Minha luz não diminui a de ninguém. Eu brilho com verdade.",
      insta:"@portalmuna",
      moonPhase: "Cheia"
    },
    {
      id: 16, 
      title: "Corpo-Expressão", 
      message: "Seu corpo é sua maior forma de expressão. Ele fala, dança, veste, revela. O que ele quer dizer hoje?", 
      text:"Eu honro meu corpo como meu canal de expressão.",
      insta:"@portalmuna",
      moonPhase: "Cheia"
    },
    {
      id: 17, 
      title: "Transbordo Consciente", 
      message: "A Lua Cheia pode intensificar tudo: alegria, raiva, sensibilidade. Permita-se sentir, sem se afogar. O que transborda te mostra o que é real.", 
      text:"Eu acolho meu transbordo com presença e sabedoria.",
      insta:"@portalmuna",
      moonPhase: "Cheia"
    },
    {
      id: 18, 
      title: "Celebrar é Rezar", 
      message: "Celebrar é uma forma de agradecer. Reconhecer o que já floresceu é fertilizar o que ainda virá.", 
      text:"Celebrar é meu jeito de dizer obrigada à vida.",
      insta:"@portalmuna",
      moonPhase: "Cheia"
    },
    {
      id: 19, 
      title: "Olhos Que Revelam", 
      message: "A luz da Lua Cheia mostra o que antes estava escondido. O que sua alma está revelando agora? O que precisa ser olhado com mais honestidade?", 
      text:"Vejo com verdade. Aceito com compaixão.",
      insta:"@portalmuna",
      moonPhase: "Cheia"
    },
    {
      id: 20, 
      title: "Presença Poderosa", 
      message: "Não é o quanto você faz, mas o quanto de você existe em cada ação. Sua presença é sua maior ferramenta de transformação.", 
      text:"Minha presença é medicina.",
      insta:"@portalmuna",
      moonPhase: "Cheia"
    },
    {
      id: 21, 
      title: "Círculo de Mulheres", 
      message: "Na Lua Cheia, o feminino se fortalece em roda. Compartilhar sua verdade com outras mulheres é cura coletiva.", 
      text:"Sou parte de um todo que me nutre.",
      insta:"@portalmuna",
      moonPhase: "Cheia"
    },
    //Lua Minguante
    {
      id: 22, 
      title: "Soltar com Amor", 
      message: "Desapegar não é perder, é confiar que tudo tem seu tempo. O que você insiste em manter pode estar impedindo seu florescer.", 
      text:"Eu solto com amor e confio no fluxo da vida.",
      insta:"@portalmuna",
      moonPhase: "Minguante"
    },
    {
      id: 23, 
      title: "O Que Fica em Mim", 
      message: "Tudo o que você viveu trouxe aprendizados. Antes de seguir, reconheça o que permanece em você como sabedoria.", 
      text:"Eu acolho o que fica e me despeço do que não serve mais.",
      insta:"@portalmuna",
      moonPhase: "Minguante"
    },
    {
      id: 24, 
      title: "Pele Nova", 
      message: "Você está mudando. Como a serpente, é hora de soltar a pele velha. Não há como crescer sem deixar algo para trás.", 
      text:"Desfaço os nós e me permito renascer.",
      insta:"@portalmuna",
      moonPhase: "Minguante"
    },
    {
      id: 25, 
      title: "Pausa Necessária", 
      message: "Você não precisa produzir o tempo todo. A pausa é produtiva porque regenera. Dê-se esse tempo com gentileza.", 
      text:"A pausa me fortalece.",
      insta:"@portalmuna",
      moonPhase: "Minguante"
    },
    {
      id: 26, 
      title: "Cura Ancestral", 
      message: "Você carrega histórias que vieram antes de você. A cada passo que cura em si, uma linhagem inteira é liberada.", 
      text:"Eu sou o elo da cura entre passado e futuro.",
      insta:"@portalmuna",
      moonPhase: "Minguante"
    },
    {
      id: 27, 
      title: "Espaço Sagrado", 
      message: "Para o novo chegar, é preciso haver espaço. Limpar o que está fora ajuda a organizar o que está dentro.", 
      text:"Tudo em mim encontra seu lugar.",
      insta:"@portalmuna",
      moonPhase: "Minguante"
    },
    {
      id: 28, 
      title: "Sabedoria do Fim", 
      message: "O fim também é sagrado. Ele guarda lições que só podem ser vistas quando aceitamos fechar um ciclo.", 
      text:"Honro os fins como mestres da minha jornada.",
      insta:"@portalmuna",
      moonPhase: "Minguante"
    },
]

function getPhase(moonPhase) {
  if (moonPhase >= 0 && moonPhase < 0.25)
    return 'Nova'
  if (moonPhase >= 0.25 && moonPhase < 0.5)
    return 'Crescente'
  if (moonPhase >= 0.5 && moonPhase < 0.75)
    return 'Cheia'
  
  return 'Minguante'
}

export function Cards() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [flippedIndex, setFlippedIndex] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [phaseName, setPhaseName] = useState('')

  // Função de copiar texto da carta desativada
  // const [copied, setCopied] = useState(false)

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

  // Função de verificação das fases da lua
  function getNextPhaseChangeDate(moonPhase, today = new Date()) {
  const lunarCycleDays = 29.53;

  // Arredonda moonPhase para garantir que está entre 0 e 1
  moonPhase = moonPhase % 1;

  // Define os marcos das fases
  const phases = [0, 0.25, 0.5, 0.75];

  // Encontra a próxima fase
  let nextPhase = phases.find(p => moonPhase < p);
  if (!nextPhase) nextPhase = 0; // volta para Lua Nova

  const fractionToNextPhase = (nextPhase - moonPhase);
  const daysToNextPhase = fractionToNextPhase * lunarCycleDays;
  console.log(daysToNextPhase)

  // Calcula a data futura
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysToNextPhase);

  // Retorna o nome do dia da semana
  const weekDayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return weekDayNames[nextDate.getDay()];
}

// Exemplo de uso:
const lunarCycleDays = 29.53
const day = lunarCycleDays - 0.93
const moonPhase = day; // Fase atual
const weekDay = getNextPhaseChangeDate(moonPhase);
console.log("Próxima fase muda na:", weekDay);
// Fim da função de verificação das fases da lua

  const pageUrl = window.location.href
  const message = 'Lembrei de você!'


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
                  {/* {flippedIndex === i && (
                    <button className="copy-button"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedCard.message)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 1500)}}>
                        ❐
                    </button>
                  )} */}
              </div>
                  {/* {copied && 
                    <div className="copied-message">
                      Copiado com sucesso!
                    </div>} */}
            </div>
          ) 
        })
        }
        </div>
          <div className="btn-container">
            {revealed && selectedCard && (
            <div className="btn-whats">
              <WhatsappShareButton url={pageUrl} title={message}>
                <img src={WhatsImage} />
              </WhatsappShareButton>
            </div>
          )}
          </div>
    </div>
  )
}