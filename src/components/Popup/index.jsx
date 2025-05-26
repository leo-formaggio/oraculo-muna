import { db, collection, addDoc } from '../../utils/firebaseConfig'
import { useEffect, useState } from 'react'
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
            alert("Insira um e-mail válido.")
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
            console.error("Erro firebase!", error.code, error.message)
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
                    <p className='tx-email'>Insira seu email e escolha sua carta.</p>
                    <input 
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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