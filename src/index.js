import express from "express";
import bodyParser from "body-parser";
import router from "./routes/router.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', router);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
