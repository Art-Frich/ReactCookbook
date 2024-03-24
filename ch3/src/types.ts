export type TItem = number | null;
export type TItems = TItem[];

export interface IReduceState {
  complete: boolean,
  items: TItems
  size: number
}

export interface IState extends IReduceState {
  undoHistory: IReduceState[],
  undoActions: TAction[],
}


interface IActionMove {
  type: 'move',
  payload: number,
}

interface IActionOther {
  type: 'complete' | 'shuffle' | 'undo'
}

export type TAction = IActionMove | IActionOther;
export type TReducer = (state: IReduceState, action: TAction) => IReduceState;