### What is the difference between Component and PureComponent? give an example where it might break my app.

In React, Component and PureComponent are both classes that you can use to create your components. The difference between the two lies in how they handle updates to their props and state.

There is a `shouldComponentUpdate` lifecycle method, which is called before an update to the component's props or state occurs. Default implementation of, `shouldComponentUpdate` always returns true. It means such component rerenders every time.

PureComponent, on the other hand, implements shouldComponentUpdate with a shallow prop and state comparison. This means that the component will only re-render if its props or state have changed at the top level. It will compare primitives correctly, but object are going to be "shallow" checked. (Only first level)

In some cases implementing your own `shouldComponentUpdate` can only decrease the performance of your app. If you use PureComponents where you should not, usually you will get bugs with unpredictable skipped deep component rerendering.
Usually you should go with plain Component. And use "rerender" optimizations only when it is really needed.

### Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Component that has `shouldComponentUpdate` that returns `false` never rerenders. So if component's shouldComponentUpdate method returns false and the context that it is subscribed to has changed, the component will not re-render.

### Describe 3 ways to pass information from a component to its PARENT.

1. Passing down the callback from the parent component to the child one.
2. If you use context, you also can pas the function from the top level component to the nested one.
3. forwardRef and useImperativeHandle
4. Implementing own pub-sub/observable solutions or use third party solution. (e.g mobx)

### Give 2 ways to prevent components from re-rendering.

1. `shouldComponentUpdate` returns false
2. React.memo for functional components

### What is a fragment and why do we need it? Give an example where it might break my app.

React fragment is a feature that allows us to render a group of elements without container element. React Fragments are removed from real DOM.
In some cases react fragments help to improve performance and keep a better semantic markup.
In newer react versions fragments can be replaced with arrays.

I am not sure I know when it can break my app :)

### Give 3 examples of the HOC pattern.

- withUser. HOC to pass user/authentication data to the base component
- withTheme. HOC to pass UI theme to the base component
- observer. HOC from mobx lib, to track changes to observable fields and rerender base component
- connect. Redux hoc to connect the base component to the store.

### what's the difference in handling exceptions in promises, callbacks and async...await.

1. Promises has Promise.prototype.catch(), which accepts a callback to handle exception case.
2. async/await basically are the same as promises but in a more "synchronous" style. Instead of Promise.prototype.catch() you can use try/catch blocks
3. The problem you can face with passing callbacks to handle error, called "callback hell". So you have to pass an `onError` callback to a function.

### How many arguments does setState take and why is it async.

setState takes two argument.
First argument can be new state value. Or function that take as an argument "prevState" value.
Second argument is a function that will be invoked after state changes and commits.

setState is asynchronous because of optimization and internal react implementation. calling setState it is not an immediate state changing. When multiple setState are called, they are going to be batched and update in next render frame.

### List the steps needed to migrate a Class to Function Component.

1. Create functional component
2. Move all "lifecycle logic" to appropriate react hooks
3. Instead of this.state and this.setState use React.useState()
4. Update method implementation and remove `this` usage.
5. Instead of render method use function return
6. Instead of this.props, use props passed as function params.
7. Update all class specific features and approaches to appropriate "functional" options.

If I am not mistaken for now there is only one case where we can not replace with functional approach. It is a `componentDidCatch` method and ErrorBoundaries component.

### List a few ways styles can be used with components.

- Inline styles objects
- Global css
- css modules (scss and others preprocessors)
- css in js approached (emotional, styled components)

### How to render an HTML string coming from the server.

dangerouslySetInnerHtml
