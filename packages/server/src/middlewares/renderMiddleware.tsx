import path from "path";

app.use(async (req: Request, res: Response) => {
	const serverExtractor = new ChunkExtractor({
		statsFile: path.resolve(buildPath, 'server', 'loadable-stats.json'),
	});
	const { default: App, routes } = serverExtractor.requireEntrypoint() as any;

	const clientExtractor = new ChunkExtractor({
		statsFile: path.resolve(buildPath, 'client', 'loadable-stats.json'),
	});

	// load data

	const appUserContext = await App.createContext();

	const pageData = await loadRoutesData(routes, req.path, appUserContext);

	// render

	const routerContext = {};

	const context = {
		pageData,
		appContextSerialized: appUserContext.serialize(),
	};

	const view = (
		<StaticRouter location={req.url} context={routerContext}>
	<App serverContext={context} appContext={appUserContext} />
	</StaticRouter>
);

	const jsx = clientExtractor.collectChunks(view);

	const appString = renderToString(jsx);

	const scripts = clientExtractor.getScriptTags();
	const styles = clientExtractor.getStyleTags();

	const renderedHtml = ejs.render(templateHtml, {
		app: appString,
		scripts,
		styles,
		context: serializeJavascript(context),
	});

	return res.status(200).send(renderedHtml);
});
