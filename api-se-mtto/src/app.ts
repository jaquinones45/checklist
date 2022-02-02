import express, { Application } from 'express';
import morgan from 'morgan';
import routes from './routes';
import path from 'path'
import cors from 'cors'

var virtualDirPath = process.env.virtualDirPath || "";
class App {

  private app: Application;

  constructor(private port?: Number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this.app.set('port', process.env.PORT || this.port || 3500);
  }

  private middlewares() {
    // We also want to make sure that our virtualDirPath
    // always starts with a forward slash
    // if (!virtualDirPath.startsWith("/", 0))
    //   virtualDirPath = "/" + virtualDirPath;
    // Public Directory
    this.app.use(express.static(path.join(virtualDirPath, "public"))); 
    // Bower
    this.app.use(
      "/bower_components",
      express.static(path.join(virtualDirPath, "bower_components"))
    );
    const corsOptions = {
      origin: "*",
      credentials: true, //access-control-allow-credentials:true
      optionSuccessStatus: 200,
    };
    this.app.use(cors(corsOptions));
    this.app.use(morgan('dev'));
    this.app.use(express.json())
  }

  private routes() { this.app.use(virtualDirPath, routes) }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log(`Server on port: ${this.app.get('port')}`);
  }
}

export default App;