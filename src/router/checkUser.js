import  express from 'express'
import {checkUser} from '../modules/user'
import {aesEncrypt, aesDecrypt} from "../utils/crypto"
const router = express.Router()
const e = 10
let sTime = new Date().getTime() / 1000
let eTime
router.post('/api/user',function(req,res){
    const { token } = req.headers
    console.log(req.body);
    checkUser(req.body, function(result){
                result &&
                res.send({
                    code:result,
                    msg:"登陆成功",
                    user:req.body.user,
                    token:aesEncrypt(req.body.user,'1601a')
                })
                ||
                res.send({
                    code:result,
                    msg:"登录失败",
                    user:req.body.user
                })
            })
      
    const postResult = () =>{
         checkUser(req.body, function(result){
            result &&
            res.send({
                code:result,
                msg:"登陆成功",
                user:req.body.user,
                token:aesEncrypt(req.body.user,'aaa')
            })
            ||
            res.send({
                code:result,
                msg:"登录失败",
                user:req.body.user
            })
        })
    }
    if(!token){
        postResult()
        sTime = new Date().getTime() / 1000//首次进入

    }else{
        eTime = new Date().getTime() / 1000
        let user = aesDecrypt(token,"1601a")
        if(req.body.user === user && (eTime-sTime)<e){
            res.send({
                code:1,
                msg:"登陆成功 ===>token===>old user",
                user:req.body.user,
                token:aesEncrypt(req.body.user,'1601a')
            })
        }else{
            postResult()
            sTime = new Date().getTime() / 1000
            console.log("重新计算")
        }
    }
})
export default router;

// utils的文件夹下利用crypto进行aesEncrpt加密aesDecrypt解密
//首先验证请求层有无token
//请求头为空时为首次进行登录 需进行token计算
//登陆成功时返回客户端 进行计算得到token字段 客户端把token值存到localstorage
//有token时 
//二次进入接口 （原来的用户 新用户）
//判断新/老用户 老用户且不超时直接返回结果 新用户超时重置起始时间重新计算token
//在时效时间内 并是老用户 有访问权限 返回对应数据

//下载express,body-parser,mysql
//下载babel-preset-es2015 babel-stage-0 使es5编译成es6
//实例express,监听端口号为8080的接口,定义路由
// 初始化文件目录
// 搭建工程目录
// 在src文件夹下定义入口app.js
// 配置.babel文件或者package.json文件
// 在app.js 文件下利用babel转义并引用es6语法
// 配置一个config的文件夹，把相应的路由等文件引入
// 利用路由定义一个接口，并把body-parser包引入
// 搭建一个用户模块，把相应的用户模块放入其中
// 利用post请求，并且连接数据库，利用body-parser接受返回的数据
// 把输入的信息与请求数据库的信息进行判断，如果相同返回true,代表请求成功，相反请求失败
// 利用babel-node src/app.js起服务


