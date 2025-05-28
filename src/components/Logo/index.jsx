import imageLogo from '../../assets/logo-orac-muna.png'
import './styles.css'

export function Logo() {

    return (
        <div className='container-logo'>
            <img 
                src={imageLogo} alt="Logotipo Muna" 
            />
        </div>
    )
}