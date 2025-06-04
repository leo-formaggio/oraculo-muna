import { Cards } from '../../components/Cards'
import { Footer } from '../../components/Footer'
import { Logo } from '../../components/Logo'
import './styles.css'

export function Home() {

  return (
    <div className='container-main'>
      <Logo />
      <Cards />
      <Footer />
    </div>
  )
}