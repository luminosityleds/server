<h2>Source</h2>
<a>https://www.w3schools.com/react/react_components.asp#:~:text=Components%20are%20independent%20and%20reusable,will%20concentrate%20on%20Function%20components.</a>

<h1>React Components</h1>

<b>When creating a React component, the component's name MUST start with an upper case letter.</b>


<p>
Components are like functions that return HTML elements.
Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML.

Components come in two types, Class components and Function components, in this tutorial we will concentrate on Function components.

In older React code bases, you may find Class components primarily used. It is now suggested to use Function components along with Hooks, which were added in React 16.8. There is an optional section on Class components for your reference.
</p>

<h2>Class Component</h2>
<p>
A class component must include the extends React.Component statement. This statement creates an inheritance to React.Component, and gives your component access to React.Component's functions.

The component also requires a render() method, this method returns HTML.
</p>

<h2>Function Component</h2>
<p>
A Function component also returns HTML, and behaves much the same way as a Class component, but Function components can be written using much less code, are easier to understand, and will be preferred in this tutorial.
</p>

<h2>Props</h2>
<p>
Components can be passed as props, which stands for properties.

Props are like function arguments, and you send them into the component as attributes.
</p>

<h2>Components in Files</h2>
<p>
React is all about re-using code, and it is recommended to split your components into separate files.

To do that, create a new file with a `.tsx` file extension and put the code inside it.
</p>