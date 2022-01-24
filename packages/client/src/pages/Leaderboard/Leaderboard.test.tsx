import { mount } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "../../store";
import { getInitialState } from "../../store/getInitialState";
import Leaderboard from "./Leaderboard";

describe("render leaderboard", () => {
	let component:any;

	beforeEach(async () => {
		const { store } = configureStore(getInitialState());
		component = await mount(
			<BrowserRouter>
				<Provider store={store}>
					<Leaderboard />
				</Provider>
			</BrowserRouter>
		);

		component.update();
	});

	it("renders without crashing", async () => {
		expect(component.length).toEqual(1);
	});
});
