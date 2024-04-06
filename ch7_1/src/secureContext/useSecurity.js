import SecurityContext from './securityContext';
import { useContext } from 'react';

const useSecurity = () => useContext(SecurityContext);

export default useSecurity;
