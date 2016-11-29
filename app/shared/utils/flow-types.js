export type ByIdState = {
  [x: string]: any
}

export type IdsState = string[];

export type Action = {
  type: string,
  payload: any,
  meta: any
}
