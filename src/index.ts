import App from './app';
import db from './database';

//Starting database
db();
//Starting the server
const app = new App();
app.start();

