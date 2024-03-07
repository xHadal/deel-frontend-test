1. What is the difference between Component and PureComponent? Give an example where it might break my app.

   - The main difference:
     is how they handle the shouldComponentUpdate method.
     Componets do not have a shallow comparation of props or state in shouldComponentUpdate, so every time setState is called a render will be invoked causing unnecesary renders.
     PureComponents automatically checks if new props or state are the same as the previous ones. This prevent unnecesary renders to optimize performance.
   - Breaking the app:
     If props or state cointais a complex data structure like object/array or mutable data it won't invoke a re-render because the shallow comparison in PureComponent might not detect the change.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

   - If the value provided by the conext is an object or complex structure and the reference of this object is the same between renders the shouldComponentUpdate method may won't notice the props or state update and do not render the component

3. Describe 3 ways to pass information from a component to its PARENT.

   - Callback function: The parent component pass a callback function as prop to the child component to be executed on it.
   - useContext: If the parent and child are both connected to a common context they can both update and subscribe to it to get the changes.

4. Give 2 ways to prevent components from re-rendering.

   - useMemo
   - useRef
     Those hooks are use to "cache" value and reference item to avoid unnecessary renders if no changes has been made on it value

5. What is a fragment and why do we need it? Give an example where it might break my app.

   - Fragment is a component from react to encapsule different elements. React do not allow render multiple elements so we need to use a wrapper.
   - Example: render(<p>Hi</p> <span>{user.name}</span>);

6. Give 3 examples of the HOCpattern.

   - Data fetch. The High Order Component will be in charge to do the request and pass data, loading status and error to the component.
   - Highlight text. This HOC can be used to highlight text across de app.
   - Auth user. This HOC will be in charge to provide token and access to private pages of the app.

7. What's the difference in handling exceptions in promises, callbacks and async...await?

   - All of them can be used to asynchronous request but the sintax is pretty different.
     Promises uses then() and catch() to handle response and error.
     callbacks use params to handle response and error.
     async uses try and catch blocks to handle success and error.

8. How many arguments does setState take and why is it async.

   - It takes 2 arguments an object(state to update) and optional callback that is executed when the state has been update and component has been re-rendered.

9. List the steps needed to migratea Class to Function Component.

   - Update class to funcion syntax and set props as params.
   - Remove constructor and state
   - Update lifecycle methos to hooks
   - Update binding events and class methods to arrow functions
   - Update render() method for return() to return the content

10. List a few ways styles can be used with components.

    - Styled components
    - SASS
    - css modules
    - inline styles

11. How to render an HTML string coming from the server.
    - Using dangerouslySetInnerHtml prop with previous sanitizeHtml function or external library like DOMPurify.
