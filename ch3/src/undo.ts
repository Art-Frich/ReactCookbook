import { IReduceState, IState, TAction, TReducer } from "./types";

export function undo(reducer: TReducer) {
  return (state: IState, action: TAction) => {
    const { type } = action;
    let undoHistory = [...state.undoHistory];
    let undoActions = [...state.undoActions];
    let innerState = {} as IReduceState;
    for (let [key, value] of Object.entries(state)) {
      if (key === 'undoHistory' || key === 'undoActions') continue
      innerState[key as keyof IReduceState] = value as never;
    }

    switch (type) {
      case 'undo': {
        if (undoHistory.length) {
          innerState = undoHistory.pop()!;
          undoActions.pop();
        }
        break;
      }
      default: {
        undoHistory = [...undoHistory, { ...innerState }];
        undoActions = [...undoActions, action];
        innerState = reducer(innerState, action);
      }
    }

    return { ...innerState, undoActions, undoHistory }
  }
}