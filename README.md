# @jameslnewell/react-promise

![npm (scoped)](https://img.shields.io/npm/v/@jameslnewell/react-promise.svg)
[![Build Status](https://travis-ci.org/jameslnewell/react-promise.svg?branch=master)](https://travis-ci.org/jameslnewell/react-promise)

🤝 React hooks for working with promises.

## Installation

```bash
yarn add @jameslnewell/react-promise
```

## Usage

> [Example](https://codesandbox.io/s/jameslnewellreactpromise-xe0om?fontsize=14) - You can find a more realistic usage example in CodeSandbox.

### usePromise()

Fetch the user's username when the component mounts or the user ID has changed.

```js
import React from 'react';
import {usePromise} from '@jameslnewell/react-promise';

const getUsername = async id => {
  const res = await fetch(`/user/${id}`, {method: 'GET'});
  const data = await res.json();
  return data.username;
};

const User = ({id}) => {
  const {status, value, error} = usePromise(() => getUsername(id), [id]);
  return (
    <>
      {status === 'pending' && '🔄 Loading...'}
      {status === 'fulfilled' && `👋 Hello ${value}`}
      {status === 'rejected' && `❌ ${String(error)}`}
    </>
  );
};
```

### useInvokablePromise()

Post the user's username when the `invoke()` method is called.

```js
import React, {useRef} from 'react';
import {useInvokablePromise} from '@jameslnewell/react-promise';

const function putUsername = async (id, username) => {
  await fetch(`/user/${id}`, {
    method: 'POST',
    body: JSON.stringify({username}),
  });
};

const User = ({id}) => {
  const input = useRef(null);
  const {invoke, status, value, error} = useInvokablePromise((username) => putUsername(id, username), [id]);
  return (
    <>
      <input ref={ref}/>
      <button onClick={() => invoke(input.current.value)}>Invoke</button>
      <hr />
      {status === 'pending' && '🔄 Loading...'}
      {status === 'fulfilled' && `👋 Hello ${value}`}
      {status === 'rejected' && `❌ ${String(error)}`}
    </>
  );
};
```

## API

### usePromise()

Immediately invoke a promise and manage the state.

**Parameters:**

- `fn` - A function that returns a promise to invoke.
- `deps` - Any variables that the function is dependent on and should cause a new promise to be invoked.

**Returns:**

- `status` - Whether the promise is `pending`, `fulfilled` or `rejected`
- `value` - The value resolved by the promise.
- `error` - The error resolving the promise.
- `isPending` - Whether the promise is pending.
- `isFulfilled` - Whether the promise is fulfilled.
- `isRejected`- Whether the promise is rejected.

### useInvokablePromise()

Invoke a promise on demand and manage the state.

**Parameters:**

- `fn` - A function that returns a promise to invoke.
- `deps` - Any variables that the function is dependent on and should cause a new promise to be invoked.

**Returns:**

- `invoke` - A function to invoke the promise and manage state.
- `status` - Whether the promise is `pending`, `fulfilled` or `rejected`
- `value` - The value resolved by the promise.
- `error` - The error resolving the promise.
- `isPending` - Whether the promise is pending.
- `isFulfilled` - Whether the promise is fulfilled.
- `isRejected`- Whether the promise is rejected.

## License
