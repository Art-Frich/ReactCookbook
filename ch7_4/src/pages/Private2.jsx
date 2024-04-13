import { useState } from 'react'
import LogoutButton from '../Components/LogoutButton.jsx';
import axios from 'axios'
import { create } from '@github/webauthn-json'

const Private2 = () => {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState()

  return (
    <div className="Private2">
      <h1>Account page</h1>

      {window.PublicKeyCredential && (
        <>
          <p>Register new hardware key</p>
          <button
            onClick={async () => {
              setBusy(true)
              try {
                const response = await axios.post('/startRegister')
                setMessage('Send response')

                const attestation = await create({
                  publicKey: response.data,
                })
                setMessage('Create attestation')

                const attestationResponse = await axios.post('/register', 
                  { attestation,}
                )
                setMessage('registered!')

                if ( attestationResponse.data?.verified) {
                  alert('New key registered')
                }

              } catch (err) {
                setMessage('' + err)
              } finally {
                setBusy(false)
              }
            }}
            disabled={busy}
          >
            Register
          </button>
        </>
      )}
      <div className="Account-message">{message}</div>

      <LogoutButton />
    </div>
  )
}

export default Private2