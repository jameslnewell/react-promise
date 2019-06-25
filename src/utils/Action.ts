import {Status} from '../types';

export interface ResetAction {
  type: 'reset';
}

export interface PendingAction {
  type: Status.Pending;
}

export interface FulfilledAction<T> {
  type: Status.Fulfilled;
  data: T | undefined;
}

export interface RejectedAction {
  type: Status.Rejected;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any | undefined;
}

export type Action<T> =
  | ResetAction
  | PendingAction
  | FulfilledAction<T>
  | RejectedAction;

export function reset(): ResetAction {
  return {type: 'reset'};
}

export function pending(): PendingAction {
  return {type: Status.Pending};
}

export function fulfilled<T>(data: T | undefined): FulfilledAction<T> {
  return {type: Status.Fulfilled, data};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rejected(error: any | undefined): RejectedAction {
  return {type: Status.Rejected, error};
}
