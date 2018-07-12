import mysql from 'mysql'
import { connect } from 'net';
const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    password:"19940102",
    user:"root",
    database:"list"
})
connection.connect();
export default connection;