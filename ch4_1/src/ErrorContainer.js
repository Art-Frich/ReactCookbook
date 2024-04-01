import React, { useCallback, useEffect, useState } from 'react';
import { ErrorHandlerProvider } from './ErrorHandlerContext';
import ErrorDialog from './ErrorDialog';

const ErrorContainer = (props) => {
  const [error, setError] = useState();
  const [errorTitle, setErrorTitle] = useState();

  useEffect(() => {
    if (error) {
      console.error('An error has been thrown', errorTitle, JSON.stringify(error));
    }
  }, [error, errorTitle]);

  const callback = useCallback((title, err) => {
    console.error('ERROR RAISED');
    console.error('Error title: ', title);
    console.error('Error content', JSON.stringify(err));
    setError(err);
    setErrorTitle(title);
  }, []);

  return (
    <ErrorHandlerProvider callback={callback}>
      {props.children}
      {error && (
        <ErrorDialog
          title={errorTitle}
          onClose={() => {
            setError(null);
            setErrorTitle('');
          }}
          error={error}
        />
      )}
    </ErrorHandlerProvider>
  );
};

export default ErrorContainer;
