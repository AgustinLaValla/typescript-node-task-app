//Modules
import express, { Application } from 'express';
import colors from 'colors';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
//Routes
import indexRoutes from './routes/index';
import tasksRoutes from './routes/task';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('views', path.join(__dirname, 'views')),
        this.app.engine('.hbs', exphbs({
            extname:'.hbs',
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials')
        }));
        this.app.set('view engine', '.hbs');
    }

    middlewares() { 
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes() { 
        this.app.use(express.static('./'));
        this.app.use(indexRoutes);
        this.app.use('/tasks', tasksRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`${colors.magenta('Server on Port:')} ${colors.green(this.app.get('port'))}`);
        })
    }

}

const server = new Server();
export default Server;