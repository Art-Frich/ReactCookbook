import { TAction, IState, TItems } from "./types";

function trySwap(newItems: TItems, position: number, t: number) {
  if (newItems[t] === null) {
    const temp = newItems[position];
    newItems[position] = newItems[t];
    newItems[t] = temp;
  }
}

export function initCards(size: number) {
  const res = new Array(size ** 2).fill(null).map((_, i) => i + 1 === 9 ? null : i + 1);
  return res;
}

function isComplete(array: TItems) {
  if (array[array.length - 1] !== null) return false;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] !== i + 1) return false;
  }
  return true;
}

function toShuffle(state: IState) {
  let newState = { ...state };
  do {
    for (let i = 0; i < 400; i++) {
      newState = reducer(
        { ...newState },
        {
          type: 'move',
          payload: Math.floor(Math.random() * newState.size ** 2)
        })
    }
  } while (newState.complete)
  return newState;
}

export default function reducer(state: IState, action: TAction) {
  const { size, items } = state;
  const { type } = action;
  switch (type) {
    case 'move': {
      const position = action.payload;
      const newItems = [...items];

      for (let step of [size, -size, 1, -1]) {
        trySwap(newItems, position, position + step);
      }

      return {
        ...state,
        items: newItems,
        complete: isComplete(newItems),
      };
    }
    case 'complete': {
      return {
        ...state,
        items: [...items.sort()],
        complete: true,
      };
    }
    case 'shuffle': {
      return toShuffle(state);
    }
    default: {
      throw new Error('Неизвестное действие: ' + type);
    }
  }
}
