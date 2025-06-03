import { db, collection, addDoc } from '../../utils/firebaseConfig'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import './style.css'

export function Popup() {
    
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        const emailSent = localStorage.getItem('emailSent')
        if (!emailSent) {
            setShowPopup(true)
        } 
    }, [])

    const handleEmailSubmit = async () => {
        if (!email || !email.includes('@')) {
            // alert("Insira um e-mail válido.")
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Insira um e-mail válido!',
                position: 'top',
                background: '#f4f4f4',
                confirmButtonColor: '#4C073D',
                customClass: {
                    popup: 'my-popup',
                    title: 'my-title'
                }
            })
            return
        }

        try {
            setLoading(true)
            await addDoc(collection(db, "emails"), {
                email,
                timestamp: new Date()
            })

            localStorage.setItem('emailSent', email)
            setShowPopup(false)
        } catch (error) {
            console.log(error.code, error.message)
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar',
                text: 'Tente novamente mais tarde.',
                position: 'top',
                background: '#f4f4f4'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {showPopup && (
            <div className="popup-overlay">
                <div className="popup">
                    <h3>Bem-vinda!</h3>
                    {/* <p className='tx-email'>Antes de tirar a sua carta...</p> */}
                    <input 
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button 
                        onClick={handleEmailSubmit} 
                        disabled={loading}>
                        {loading ? 'Enviando...' : 'Escolher Carta'}
                    </button>
                </div>
            </div>
            )}
        </div>
    )
}