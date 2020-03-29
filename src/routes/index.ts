import { Router, Request, Response } from 'express';


class IndexRoutes {

    public router: Router;

    constructor() { 
        this.router = Router();
        this.routes();
    }

    initIndex(req: Request, res: Response) {
        res.render('index');
     }

    routes() { 
        this.router.get('/', this.initIndex)
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;