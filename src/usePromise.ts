import {useReducer, useEffect, Reducer} from 'react';
import {Factory, Dependencies} from './types';
import {State} from './utils/State';
import {Action, reset} from './utils/Action';
import {useMounted} from './utils/useMounted';
import {reducer} from './utils/reducer';
import {initialState} from './utils/initialState';
import {invoke} from './utils/invoke';
import {getOutput, Output} from './utils/getOutput';

export function usePromise<T>(
  fn: Factory<T, []> | undefined,
  deps: Dependencies = [],
): Output<T> {
  const isMounted = useMounted();
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(
    reducer,
    initialState,
  );

  useEffect(() => {
    // reset state whenever the dependencies change i.e. the result returned by the function will be a new promise
    // execute and track the promise state
    dispatch(reset());
    invoke<T, []>(
      {
        fn,
        dispatch,
        isMounted,
      },
      [],
    );
  }, deps);

  return getOutput(state);
}
