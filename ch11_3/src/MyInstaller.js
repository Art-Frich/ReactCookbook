import React, { useEffect, useState } from 'react';

const MyInstaller = ({ children }) => {
  const [installEvent, setInstallEvent] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallEvent(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <>
      {installEvent && (
        <button
          onClick={async () => {
            installEvent.prompt();
            await installEvent.userChoice;
            setInstallEvent(null);
          }}
        >
          Install this app!
        </button>
      )}
      {children}
    </>
  );
};

export default MyInstaller;
