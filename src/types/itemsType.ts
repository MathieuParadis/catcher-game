export interface ItemType {
  id: number | string
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
