import express from "express";
import './models/Orphanage';

import './database/connection';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes)


app.listen(3333);
