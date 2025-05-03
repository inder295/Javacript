import express from 'express';
import healthcheckRouter from "./routes/healthcheck.routes.js"

const app=express();

app.use("/api/v1/health",healthcheckRouter);





export default app;