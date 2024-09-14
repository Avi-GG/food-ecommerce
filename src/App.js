import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// const heading  =  React.createElement("h1", {id: "heading"}, "Hello World by React!");

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);

// const parent = React.createElement(
// 	"div",
// 	{ id: "parent" },
// 	React.createElement(
// 		"div",
// 		{ id: "child" },
// 		[React.createElement("h1", {}, "Hello World by React!😊"), React.createElement("h1", {}, "Hello World by React!")]
// 	)
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));
//  root.render(parent);

// const heading = React.createElement("h1", {id: "heading"}, "Hello World😊");

//JSX - it is not html inside js, it just looks like html and js
// transpiled before it reaches, in (JS wala react) using parcel - Babel
// const jsxHeading = <h1 className="head">Hello World</h1>

// const headComponents = () => true;
// const headComponents = () => {
// 	return true;
// };
// const headComponents = () => (
// 	 true
// );

// const Navbar = () => {
// 	return <h1>Hello its me</h1>
// }

// const HeadingComponents = () => {
// 	return <>
// 		{Navbar()}
// 		<Navbar/>
// 		<Navbar></Navbar>
// 	</>
// }







const AppLayout = () => {
	return (
		<div className="app">
			<Header />
			<Body />
			<footer>Footer</footer>
		</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
