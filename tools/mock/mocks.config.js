// For a detailed explanation regarding each configuration property, visit:
// https://www.mocks-server.org/docs/configuration/how-to-change-settings
// https://www.mocks-server.org/docs/configuration/options

module.exports = {
  // Log level. Can be one of silly, debug, verbose, info, warn or error
  //log: "info",
  config: {
    // Allow unknown arguments
    //allowUnknownArguments: false,
  },
  plugins: {
    // Plugins to be registered
    //register: [],
    proxyRoutesHandler: {},
    adminApi: {
      // Port number for the admin API server to be listening at.
      // Moved off the 3110 default so it does not clash with another checkout of
      // the template running its own mock server. Keep in step with `server.port`
      // below and with the port `apps/e2e/global-setup.ui.ts` waits on.
      port: 3210,
      // Host for the admin API server
      //host: "0.0.0.0",
      https: {
        // Use https protocol or not
        //enabled: false,
        // Path to a TLS/SSL certificate
        //cert: undefined,
        // Path to the certificate private key
        //key: undefined,
      },
    },
    inquirerCli: {
      // Start interactive CLI or not
      //enabled: true,
      // Render emojis or not
      //emojis: true,
    },
    openapi: {
      collection: {
        id: "base",
        // Name for the collection created from OpenAPI definitions
        //id: "openapi",
        // Name of the collection to extend from
        //from: undefined,
      },
    },
  },
  mock: {
    routes: {
      // Global delay to apply to routes
      //delay: 0,
    },
    collections: {
      // Selected collection
      //selected: "base",
    },
  },
  server: {
    // Port number for the server to be listening at.
    // Moved off the 3100 default so it does not clash with another checkout of
    // the template running its own mock server. Keep in step with
    // `VITE_CONNECT_PORT` in `apps/web/.env.mocks`.
    port: 3200,
    // Host for the server
    //host: "0.0.0.0",
    cors: {
      // Use CORS middleware or not
      //enabled: true,
      // Options for the CORS middleware. Further information at https://github.com/expressjs/cors#configuration-options
      //options: {"preflightContinue":false},
    },
    jsonBodyParser: {
      // Use json body-parser middleware or not
      //enabled: true,
      // Options for the json body-parser middleware. Further information at https://github.com/expressjs/body-parser
      //options: {},
    },
    urlEncodedBodyParser: {
      // Use urlencoded body-parser middleware or not
      //enabled: true,
      // Options for the urlencoded body-parser middleware. Further information at https://github.com/expressjs/body-parser
      //options: {"extended":true},
    },
    https: {
      // Use https protocol or not
      //enabled: false,
      // Path to a TLS/SSL certificate
      //cert: undefined,
      // Path to the certificate private key
      //key: undefined,
    },
  },
  files: {
    // Allows to disable files load
    //enabled: true,
    // Define folder from where to load collections and routes
    //path: "mocks",
    // Enable/disable files watcher
    //watch: true,
    babelRegister: {
      // Load @babel/register
      //enabled: false,
      // Options for @babel/register
      //options: {},
    },
  },
  variantHandlers: {
    // Variant Handlers to be registered
    //register: [],
  },
};
