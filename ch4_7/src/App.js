import { useState } from 'react';
import { pulse, zoomOut, shake, merge } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import './App.css';

// стили для каждого типа действия
const styles = {
  created: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(pulse, 'pulse'),
  },
  deleted: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(merge(zoomOut, shake), 'zoomOut'),
  },
};

function getStyleForItem(item) {
  if (item.deleting) return styles.deleted;
  if (item.creating) return styles.created;
  return null;
}

function App() {
  const [data, setData] = useState([]);

  // удаление за счет обновления стейта и перерендера
  let deleteItem = (i) =>
    setData((d) => {
      const result = [...d];
      result[i].deleting = true;
      return result;
    });

  // создание за счет динамической генерации ссылки вместо api запроса
  let createItem = () => {
    setData((d) => [
      ...d,
      {
        url: `https://picsum.photos/id/${d.length * 3}/200`,
        creating: true,
      },
    ]);
  };

  // обработка завершения анимации
  let completeAnimation = (d, i) => {
    if (d.deleting) {
      setData((d) => {
        const result = [...d];
        result.splice(i, 1);
        return result;
      });
    } else if (d.creating) {
      setData((d) => {
        const result = [...d];
        result[i].creating = false;
        return result;
      });
    }
  };

  return (
    <div className="App">
      <StyleRoot>
        <p>
          Images from&nbsp;
          <a href="https://picsum.photos/">Lorem Picsum</a>
        </p>
        <button onClick={createItem}>Add</button>
        {data.map((d, i) => (
          <div style={getStyleForItem(d)} onAnimationEnd={() => completeAnimation(d, i)}>
            <img
              id={`image${i}`}
              src={d.url}
              width={200}
              height={200}
              alt="Random"
              title="Click to delete"
              onClick={() => deleteItem(i)}
            />
          </div>
        ))}
      </StyleRoot>
    </div>
  );
}

export default App;
