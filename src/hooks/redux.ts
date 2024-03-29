import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from 'react-redux';
import { AppDispatch, RootState } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
