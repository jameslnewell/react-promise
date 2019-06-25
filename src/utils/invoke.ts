import {Dispatch, RefObject} from 'react';
import {Factory} from '../types';
import {Action, pending, fulfilled, rejected} from './Action';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function invoke<T, P extends any[]>(
  {
    fn,
    dispatch,
    isMounted,
  }: {
    fn: Factory<T, P> | undefined;
    dispatch: Dispatch<Action<T>>;
    isMounted: RefObject<boolean>;
  },
  args: P,
): Promise<void> {
  if (fn) {
    dispatch(pending());
    try {
      const data = await fn(...args);
      if (isMounted.current) {
        dispatch(fulfilled(data));
      }
    } catch (error) {
      if (isMounted.current) {
        dispatch(rejected(error));
      }
    }
  }
}
