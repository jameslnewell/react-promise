import * as React from 'react';
import {usePromise} from '../../src';
import {PromiseType, factory} from './factory';
import {PromiseState} from './PromiseState';
import {PromiseConfig} from './PromiseConfig';
import './styles.css';

export const UsePromiseExample: React.FunctionComponent = () => {
  const [type, setType] = React.useState<PromiseType>('resolve');
  const [delay, setDelay] = React.useState(1000);
  const {status, error, value} = usePromise(factory(type, delay), [
    type,
    delay,
  ]);

  const handleChange = ({type, delay}: {type: PromiseType; delay: number}) => {
    setType(type);
    setDelay(delay);
  };

  return (
    <>
      <PromiseState status={status} error={error} value={value} />
      <PromiseConfig
        initialType={type}
        initialDelay={delay}
        onChange={handleChange}
      />
    </>
  );
};
