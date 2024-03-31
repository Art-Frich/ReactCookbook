import { useState } from 'react';
import Ticker from './Ticker';

export default function Clocks() {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <h1>Clocks</h1>
      <button onClick={() => setHidden((h) => !h)}>{hidden ? 'Show' : 'Hide'}</button>
      {hidden || <Ticker />}
    </>
  );
}
