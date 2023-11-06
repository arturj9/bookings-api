import pgPromise from "pg-promise";
import {join} from 'node:path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config_values from "../config.js";

const pgp = pgPromise()

const db = pgp(`postgres://${config_values.dbUser}:${config_values.dbPassword}@${config_values.dbHost}:${config_values.dbPort}/${config_values.dbName}`)

// db.query("SELECT 1 + 1 AS result").then((result)=>console.log(result))
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'create_tables.sql')
const query = new pgp.QueryFile(filePath)
db.query(query)

export default db