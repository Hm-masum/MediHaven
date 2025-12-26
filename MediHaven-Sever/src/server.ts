import { Server } from "http";
import app from "./app";
import config from "./config";
import seedSuperAdmin from "./app/DB";


async function main() {
  const server: Server = app.listen(config.port, () => {
    console.log("server is running in port", config.port);
  });

  seedSuperAdmin();
   
  const exitHandler = () =>{
    if(server){
      server.close(()=>{
        console.info("Server closed!")
      })
    }
    process.exit(1)
  }

  process.on('uncaughtException',(error)=>{
    exitHandler()
  })

  process.on('unhandledRejection',(error)=>{
    exitHandler()
  })
}
main();
