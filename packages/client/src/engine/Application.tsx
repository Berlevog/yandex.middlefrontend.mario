import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { DisplayObject } from "./DisplayObject";

interface ApplicationProps {
	color: string;
	width: number;
	height: number;
}

class Application extends PureComponent<ApplicationProps> {
	static propTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
		color: PropTypes.string
	};
	public canvas: HTMLCanvasElement | undefined;
	public ctx: CanvasRenderingContext2D | undefined;
	private readonly canvasRef: React.RefObject<HTMLCanvasElement>;
	private requestIdRef: any;
	private children: DisplayObject[] = [];

	constructor(props: ApplicationProps) {
		super(props);
		this.canvasRef = React.createRef<HTMLCanvasElement>();
		this.requestIdRef = React.createRef<number>();
		const {width, height, color} = props;
		this.state = {
			width,
			height,
			color,
			scale:1,
		}
	}

	componentDidMount() {
		if (this.canvasRef.current) {
			this.canvas = this.canvasRef.current;
			this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
			if (this.ctx) {
				this.requestIdRef.current = requestAnimationFrame(this.tick);
			}
			document.addEventListener("keydown", this.handleFullScreen, false);
		}
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleFullScreen, false);
		this.destroy();
	}

	handleFullScreen = (e: any) => {
		if (e.altKey && e.key === "Enter") {
			this.toggleFullScreen();
		}
	};

	toggleFullScreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen().finally(() => {
				const { width, height } = this.state as any;
				const scale = Math.min(screen.availWidth/width, screen.availHeight/height);
				this.setState({scale})
			});
		} else {
			if (document.exitFullscreen) {
				this.setState({scale:1})
				document.exitFullscreen();
			}
		}
	}

	addChild(child: DisplayObject) {
		this.children.push(child);
	}

	renderFrame() {
		this.clear();
		this.children.forEach((child) => {
			if (this.canvas && this.ctx) {
				child.render({ canvas: this.canvas, context: this.ctx });
			}
		});
	}

	tick = () => {
		if (!this.canvasRef.current) return;
		this.renderFrame();
		this.requestIdRef.current = requestAnimationFrame(this.tick);
	};

	clear = () => {
		if (this.canvas && this.ctx) {
			this.ctx.clearRect(0, 0, this.props.width, this.props.height);
			this.ctx.fillStyle = this.props.color;
			this.ctx.fillRect(0, 0, this.props.width, this.props.height);
		}
	};

	render() {
		const { width, height, color, scale } = this.state as any;
		return <canvas ref={this.canvasRef} width={width} height={height} style={{ backgroundColor: color, transform:`scale(${scale})` }} />;
	}

	destroy() {
		cancelAnimationFrame(this.requestIdRef.current);
		this.children.forEach((child) => {
			child.destroy();
		});
	}
}

export default Application;
