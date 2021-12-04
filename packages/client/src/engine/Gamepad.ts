export default class GamepadAPI {
	// @ts-ignore
	public gamepad: Gamepad = navigator.getGamepads ? navigator.getGamepads()[0] : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

	constructor() {

		window.addEventListener("gamepadconnected", this.gamepadConnected);
		window.addEventListener("gamepaddisconnected", this.gamepadDisconnected);
	}

	gamepadConnected = (e: GamepadEvent) => {
		this.gamepad = navigator.getGamepads()[e.gamepad.index] as Gamepad;
		console.info(
			"Gamepad connected at index %d: %s. %d buttons, %d axes.",
			this.gamepad.index, this.gamepad.id, this.gamepad.buttons.length, this.gamepad.axes.length
		);
	};

	gamepadDisconnected = (e: GamepadEvent) => {
		console.info("Gamepad disconnected from index %d: %s",
			e.gamepad.index, e.gamepad.id);
	};

	getDirection(): { right: boolean, up: boolean, down: boolean, left: boolean } {
		// @ts-ignore
		this.gamepad = navigator.getGamepads ? navigator.getGamepads()[0] : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

		return {
			up: this.gamepad.buttons[12].pressed,
			down: this.gamepad.buttons[13].pressed,
			left: this.gamepad.buttons[14].pressed,
			right: this.gamepad.buttons[15].pressed
		};
	}

	destroy() {
		window.removeEventListener("gamepadconnected", this.gamepadConnected);
	}
}
