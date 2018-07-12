import {aesEncrypt, aesDecrypt} from "./crypto"
let e = 7200
let sTime
let eTime

export default (req,res,next) =>{
    const { token } = req.headers
    //首次请求登录
    if(!token && req.url === "/api/user"){
        sTime = new Date().getTime() / 1000
        next()
    }else if(!token && req.url !== "/api/user"){
        //首次请求登录
        res.send({
            code:0,
            msg:"无权限访问"
        })
    }else if(token && req.url === "/api/user"){
        //多次进入登录接口
        eTime = new Date().getTime() / 1000
        const uid = aesDecrypt(token,"1601a")
        if(uid===req.body.user && (eTime - sTime) < e){
            res.send({
                code:1,
                msg:"登陆成功 == >token",
                token:aesEncrypt(req.body.user,'1601a')
            })
        }else{
            sTime = new Date().getTime() / 1000
            next()
        }
    }else if(token && req.url !== "/api/user"){
        //多次进入非登录接口
        eTime = new Date().getTime() / 1000
        const uid = aesDecrypt(token, "1601a")
        if(!uid){
            res.send({
                code:0,
                msg:"无权限访问"
            })
        }else if ((eTime - sTime) > e){
            res.send({
                code:0,
                msg:"token失效，请重新登录"
            })
           
        }else{
            next()
        }
    }
}