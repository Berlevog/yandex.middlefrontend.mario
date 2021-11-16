export type WebpackBuildConfigOptionsType = {
  srcPath: string;
  buildPath: string;
  rootPath: string;
  target: "web" | "node",
  isProduction?: boolean;
  devServer?: boolean;
};
