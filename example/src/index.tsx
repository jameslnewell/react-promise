import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {UsageExample} from './UsageExample';
import {UsePromiseExample} from './UsePromiseExample';
import {UseInvokablePromiseExample} from './UseInvokablePromiseExample';

const App: React.FC = () => {
  const [example, setExample] = React.useState<
    'example' | 'usePromise' | 'useInvokablePromise'
  >('example');
  return (
    <>
      <select onChange={event => setExample(event.target.value as any)}>
        <option value="example">Example</option>
        <option value="usePromise">usePromise()</option>
        <option value="useInvokablePromise">useInvokablePromise()</option>
      </select>
      <hr />
      {example === 'example' && (
        <>
          <h1>Usage</h1>
          <UsageExample id="1" />
        </>
      )}
      {example === 'usePromise' && (
        <>
          <h1>usePromise()</h1>
          <UsePromiseExample />
        </>
      )}
      {example === 'useInvokablePromise' && (
        <>
          <h1>useInvokablePromise()</h1>
          <UseInvokablePromiseExample />
        </>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
