import dotenv from "dotenv";
import FtpDeploy from "ftp-deploy";
import path from "path";

dotenv.config();

async function deploy() {
  const deployment = new FtpDeploy();
  const localRoot = path.join(process.cwd(), "build"); // or your actual build folder

  try {
    await deployment.deploy({
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS,
      host: process.env.FTP_HOST,
      port: parseInt(process.env.FTP_PORT, 10),

      localRoot: localRoot,
      remoteRoot: "/",
      forcePasv: true,
      verbose: true,

      include: ["*", "**/*"],
      deleteRemote: false,
    });
    console.log("Deployment successful!");
  } catch (error) {
    console.error("Deployment failed:", error);
  }
}

deploy();
 