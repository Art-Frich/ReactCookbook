import './Puzzle.css';
import { useReducer, useState } from "react";
import reducer, { initCards } from './reducer.js';
import { undo } from './undo.js';

export default function Puzzle() {
  const [size] = useState(3);
  const [defaultVal] = useState({ items: initCards(size), complete: true, size, undoHistory: [], undoActions: [] });
  const [state, dispatch] = useReducer(undo(reducer), { ...defaultVal });

  return (
    <section className="puzzle">
      <ul className={`puzzle__squares`}>
        {
          state.items.map((el, i) => {
            return (
              <li
                key={`square-${i}`}
                className={
                  `puzzle__square 
                  ${el ? '' : 'puzzle__square_empty'} 
                  ${state.complete ? 'puzzle_complete' : ''}`
                }
                onClick={() => {
                  if (state.complete) return
                  dispatch({ type: 'move', payload: i })
                }}
              >
                {el}
              </li>

            )
          })
        }
      </ul>
      <div className='puzzle__controls'>
        <button onClick={() => dispatch({ type: 'shuffle' })}>
          Перемешать
        </button>
        <button
          onClick={() => dispatch({ type: 'complete' })}
          disabled={state.complete}
        >
          Сброс
        </button>
        <button
          onClick={() => dispatch({ type: 'undo' })}
          disabled={(state.undoActions.at(-1)?.type || null) !== 'move' || state.complete}
        >
          Отменить
        </button>
      </div>
    </section>
  )
}