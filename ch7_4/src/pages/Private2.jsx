import { useState } from 'react'
import axios from 'axios'
import LogoutButton from '../Components/LogoutButton'
import { create } from '@github/webauthn-json'

const Private2 = () => {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState()

  const registerToken = async (startRegistrationEndpoint) => {
    setBusy(true)
    try {
      const response = await axios.post(startRegistrationEndpoint)
      setMessage('Send response')
      const attestation = await create({ publicKey: response.data })
      setMessage('Create attestation')
      const attestationResponse = await axios.post('/register', {
        attestation,
      })
      setMessage('registered!')
      if (
        attestationResponse.data &&
        attestationResponse.data.verified
      ) {
        alert('New key registered')
      }
    } catch (err) {
      setMessage('' + err)
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className="Private2">
      <h1>Account page</h1>

      {window.PublicKeyCredential && (
        <>
          <p>Register new hardware key</p>
          <button
            onClick={() => registerToken('/startRegister')}
            disabled={busy}
          >
            Register Removable Token
          </button>
          <button
            onClick={() => registerToken('/startFingerprint')}
            disabled={busy}
          >
            Register Fingerprint
          </button>
        </>
      )}
      <div className="Account-message">{message}</div>

      <LogoutButton />
    </div>
  )
}

export default Private2