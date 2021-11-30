# Redux Example

This example demos a redux application that async loads remote components that inject reducers.

- `container` is the host application.
  - Exposes `store.injectReducer` to append reducers at runtime. More info can be found in the [redux docs](https://redux.js.org/recipes/code-splitting/#defining-an-injectreducer-function).
  - Includes serialized redux state to visualize current state.
  - Has a button to load `input`'s Name component and reducer on demand.

- Step to execute
  - run `npm install` on both projects
  - start input-with-redux 
  - start container
