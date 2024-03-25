// REDUX IMPORTS
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { AppState, AppDispatch } from './store/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export { useAppDispatch, useAppSelector }
