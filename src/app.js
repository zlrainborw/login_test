import express from "express"
import router from "./config/router"
import bodyParser from "body-parser"
import proof from "./utils/proof"
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./static'))
//请求头 解决跨域问题
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-Type, Accept, token, sysCode');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('X-Powered-By', '3.2.1');
    res.header('Content-Type', 'application/plain; charset=utf-8');
    next();
})
app.use(proof)
router(app)
app.listen(8080,function(){
    console.log("listen to 8081...")
})


//重启node-dev
//nodemon设置修改代码后服务自动重启
//守护进程nodemon node bulid/app.js

//react
//dav-cli -g  dav new 项目名