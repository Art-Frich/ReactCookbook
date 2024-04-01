import { createContext, useContext } from 'react';

const ErrorHandlerContext = createContext(() => {});

let setError = () => {};
const ErrorHandlerProvider = (props) => {
  if (props?.callback) {
    setError = props.callback;
  }

  return <ErrorHandlerContext.Provider value={setError}>{props.children}</ErrorHandlerContext.Provider>;
};
const useErrorHandler = () => useContext(ErrorHandlerContext);

export { ErrorHandlerContext, ErrorHandlerProvider, useErrorHandler };
