export const escape = (str: string) => {
	return str
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
};

type RenderPageParms = {
	reactHtml: string, reduxState: string, css: string, nonce: string, meta: any
}

export function renderPage({ meta, css, reactHtml, reduxState, nonce }:RenderPageParms) {
	return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
              <meta charset="utf-8" />
              <meta content="width=device-width, initial-scale=1" name="viewport" />
              <meta content="#000000" name="theme-color" />
              <meta content="Mario game" name="description" />
              <link href="manifest.json" rel="manifest" />
              <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&family=VT323&display=swap" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
              <title>Mario Pro Max | SSR</title>
              <meta property="csp-nonce" content="${nonce}">
              ${meta}
              <style id="jss-server-side" nonce="${nonce}">${css}</style>
          </head>
          <body>
              <div id="root">${reactHtml}</div>
              <script nonce="${nonce}" id="initial-data" type="text/plain" data-json="${escape(reduxState)}"></script>
              <script defer src="/runtime~main.js" nonce="${nonce}"></script>
              <script defer src="/main.js" nonce="${nonce}"></script>
          </body>
        </html>
    `;
}
