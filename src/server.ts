import { Request, Response } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  /**************************************************************************** */

  //! END @TODO1
  app.get("/filteredimage", async ( req: Request, res: Response ) => {
    let url = req.query.image_url;

    if (!url) {
      return res.status(400).send("Image url is missing! try GET /filteredimage?image_url={{}}");
    }

    const filePath = await filterImageFromURL(url);
    res.sendFile(filePath, function(){
      deleteLocalFiles([filePath]);
    });
  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res:Response ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();