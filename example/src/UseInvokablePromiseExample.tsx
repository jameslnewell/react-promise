import * as React from 'react';
import {useInvokablePromise} from '../../src';
import {PromiseType, factory} from './factory';
import {PromiseState} from './PromiseState';
import {PromiseConfig} from './PromiseConfig';
import './styles.css';

export const UseInvokablePromiseExample: React.FunctionComponent = () => {
  const [type, setType] = React.useState<PromiseType>('resolve');
  const [delay, setDelay] = React.useState(1000);
  const {status, error, value, invoke} = useInvokablePromise(
    factory(type, delay),
    [type, delay],
  );

  const handleChange = ({type, delay}: {type: PromiseType; delay: number}) => {
    setType(type);
    setDelay(delay);
  };

  return (
    <>
      <PromiseState status={status} error={error} value={value} />
      <button onClick={() => invoke()}>Invoke</button>
      <PromiseConfig
        initialType={type}
        initialDelay={delay}
        onChange={handleChange}
      />
    </>
  );
};
