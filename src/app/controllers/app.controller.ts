import { Request, Response, Router } from "express";
import { pino } from 'pino';

export class AppController {
  public router: Router = Router();
  private log: pino.Logger = pino();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {

    this.router.get("/login"),(req: Request , res:Response) =>{
      res.render("login");
    }

    this.router.post("/login"),(req: any, res:Response) =>{
      req.session.user = req.body.username;
      res.redirect("/")
    }
    //PROTECT THE HOME PAGE

    this.router.use((req : any , res: Response, next) =>{
      if(req.seesion.user){
        next();
      } else {
        res.redirect("/login");
      }
    });

    // Serve the home page
    this.router.get("/", (req: any, res: Response) => {
      try {
        // Render the "home" template as HTML
        res.render("home",{
          user : req.session.user
        });
      } catch (err) {
        this.log.error(err);
      }
    });
    
  }
}
