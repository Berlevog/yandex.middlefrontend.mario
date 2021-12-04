export const SRC_DIRNAME = "src";
export const BUILD_DIRNAME = "dist";

export type ServerConfig = {
  host: string;
  port: number;
};

export const DEFAULT_SERVER_CONFIG: ServerConfig = {
  host: "0.0.0.0",
  port: 3000,
};
