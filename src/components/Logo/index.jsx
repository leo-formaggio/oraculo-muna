import imageLogo from '../../assets/logo-orac-muna.png'
import './styles.css'

export function Logo() {

    return (
        <div className='container-logo'>
            <a href="https://portalmuna.com/" target="_blank">
                <img src={imageLogo} alt="Logotipo Muna" />
            </a>
        </div>
    )
}