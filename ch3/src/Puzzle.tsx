import './Puzzle.css';
import { useReducer, useState } from "react";
import reducer, { initCards } from './reducer.js';

export default function Puzzle() {
  const [size] = useState(3);
  const [state, dispatch] = useReducer(reducer, { items: initCards(size), complete: false, size });

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
        <button
          className="puzzle__shuffle"
          onClick={() => dispatch({ type: 'shuffle' })}>
          Перемешать
        </button>
        <button
          className="puzzle__reset"
          onClick={() => dispatch({ type: 'complete' })}
          disabled={state.complete}>
          Сброс
        </button>
      </div>
    </section>
  )
}