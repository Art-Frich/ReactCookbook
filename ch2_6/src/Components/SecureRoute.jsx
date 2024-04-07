import Login from '../pages/Login'
import useSecurity from '../SecureContext/useSecurity'

const SecureRoute = (props) => {
  const { isLogged } = useSecurity()

  return (
    isLogged ? props.element : <Login />
  )
}

export default SecureRoute