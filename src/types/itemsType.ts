export interface ItemType {
  img: string
  value: number
}

export interface ItemWithPositionType extends ItemType {
  x: number
  y: number
  w: number
  h: number
  speed: number
}
