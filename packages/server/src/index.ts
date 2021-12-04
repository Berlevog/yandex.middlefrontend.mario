import { startDevServer, startProdServer } from "./startServer";
import { buildDev, buildProd, buildServer } from "./build";
import { parseOptions, parseCommand } from "./parseOptions";
import { DEFAULT_SERVER_CONFIG } from "./conf";

export const run = async () => {
  const options = parseOptions();

  parseCommand({
    startDevServer: async ({ port }) => {
      const compiler = await buildDev(options);
      await startDevServer(options, compiler, DEFAULT_SERVER_CONFIG);
    },
    buildProd: () => {
      buildProd(options);
    },
    startProdServer: (args) => {
      startProdServer(options, args);
    },
  });
};
