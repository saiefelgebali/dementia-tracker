import { Outlet } from "solid-app-router";
import { Component } from "solid-js";
import Header from "../components/Header/Header";

const MainLayout: Component = () => {
	return (
		<div>
			<Header />
			<div class='flex justify-center'>
				<div className='main'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
