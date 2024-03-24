export type TItem = number | null;
export type TItems = TItem[];

export interface IState {
  complete: boolean,
  items: TItems
  size: number
}

interface IActionMove {
  type: 'move',
  payload: number,
}

interface IActionOther {
  type: 'complete' | 'shuffle'
}

export type TAction = IActionMove | IActionOther;