import {reducer} from '../../src/utils/reducer';
import {Status} from '../../src/types';
import {State} from '../../src/utils/State';
import {reset, pending, fulfilled, rejected} from '../../src/utils/Action';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resetState: State<any> = {
  status: undefined,
  error: undefined,
  value: undefined,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolvingState: State<any> = {
  status: Status.Pending,
  error: undefined,
  value: undefined,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolvedState: State<any> = {
  status: Status.Fulfilled,
  error: undefined,
  value: {foo: 'bar'},
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rejectedState: State<any> = {
  status: Status.Rejected,
  error: 'Uh oh!',
  value: undefined,
};

describe('reducer()', () => {
  it('should be in a reset state when reset', () => {
    expect(reducer(resolvingState, reset())).toEqual(resetState);
  });

  it('should be in a resolving state when resolving', () => {
    expect(reducer(resetState, pending())).toEqual(resolvingState);
  });

  it('should be in a resolved state when resolved', () => {
    expect(reducer(resolvingState, fulfilled({foo: 'bar'}))).toEqual(
      resolvedState,
    );
  });

  it('should be in an rejected state when rejected', () => {
    expect(reducer(resolvingState, rejected('Uh oh!'))).toEqual(rejectedState);
  });
});
