interface Props {
	obj1: {
		x: number
		y: number
		w: number
		h: number
	}
	obj2: {
		x: number
		y: number
		w: number
		h: number
	}
}

const checkCatch = ({ obj1, obj2 }: Props): boolean => {
	return (
		obj1.x < obj2.x + obj2.w &&
		obj1.x + obj1.w > obj2.x &&
		obj1.y + obj1.h > obj2.y && 
		obj1.y < obj2.y + obj2.h
	)
}

export default checkCatch