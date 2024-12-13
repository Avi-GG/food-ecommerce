import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
const Grocery = lazy(() => import("./components/Grocery"));
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
		<Provider store={appStore}> {/*redux*/}
		<div className="app font-['Poppins'] pt-28 ">
			<Header/>
			<Outlet/>
			<footer className="shadow-sm font-semibold text-center border-t border-black p-5  bottom-0 w-full">Created by   ❤️ Avi Gupta  <span className="mx-1">&copy;</span> 2024 Khaana <span className="text-orange-800">Food</span></footer>
		</div>
		</Provider>
	);
};

const appRouter = createBrowserRouter([
	{
		path: "/",
        element: <AppLayout />,
		children: [
			{
				path: "/", 
				element: <Body />,
			},
			{
				path: "/about", 
				element: <About />,
			},
			{
				path: "/contact", 
				element: <Contact />,
			},
			{
				path: "/cart", 
				element: <Cart />,
			},
			{
				path: "/contact", 
				element: <Contact />,
			},
			{
				path: "/grocery", 
				element: <Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense>,
			},
			{
				path: "/restaurants/:resId", 
				element: <RestaurantMenu/>,
			},
		],
		errorElement: <Error/>
	},
	
])
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
