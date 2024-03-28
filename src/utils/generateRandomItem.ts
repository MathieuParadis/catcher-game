// LODASH IMPORTS
import { random } from 'lodash'

// TYPES IMPORTS
import type { ItemType, ItemWithPositionType } from '../types/itemsType'

interface Props {
  x: number
  y: number
  w: number
  h: number
  items: ItemType[]
}

const generateRandomItem = ({ x, y, w, h, items }: Props): ItemWithPositionType => {
  const randomIndex = random(0, items.length - 1, false)
  return {
    ...items[randomIndex],
    x,
    y,
    w,
    h,
    speed: random(0.05, 0.5, true)
  }
}

export default generateRandomItem
