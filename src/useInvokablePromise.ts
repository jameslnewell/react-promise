import {useReducer, useEffect, Reducer} from 'react';
import {Dependencies, Factory} from './types';
import {State} from './utils/State';
import {Action, reset} from './utils/Action';
import {useMounted} from './utils/useMounted';
import {reducer} from './utils/reducer';
import {initialState} from './utils/initialState';
import {invoke} from './utils/invoke';
import {getOutput, Output} from './utils/getOutput';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useInvokablePromise<T, P extends any[]>(
  fn: Factory<T, P> | undefined,
  deps: Dependencies = [],
): Output<T> & {invoke: (...args: P) => Promise<void>} {
  const isMounted = useMounted();
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(
    reducer,
    initialState,
  );

  // reset promise state whenever the dependencies change i.e. the result returned by the function will be a new promise
  useEffect(() => {
    dispatch(reset());
  }, deps);

  return {
    ...getOutput(state),
    invoke: async (...args) =>
      invoke<T, P>(
        {
          fn,
          dispatch,
          isMounted,
        },
        args,
      ),
  };
}
