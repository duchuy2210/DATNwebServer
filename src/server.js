import nodes7 from 'nodes7';
import express from 'express';
import http from 'http';

import { connectPLC } from './config/connectPLC';
import { configViewEngine } from './config/viewEngine';
import { configStaticFiles } from './config/staticFiles';
import initWebRoutes from './routes/routes';
import { initRealtime} from './config/realTime';

const app = express();
const server = http.Server(app);

configStaticFiles(app);
configViewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`App listening on port http:/localhost:${port}`);
});

const conn_plc = new nodes7(); //PLC1
connectPLC(conn_plc);
initRealtime(server, conn_plc);
