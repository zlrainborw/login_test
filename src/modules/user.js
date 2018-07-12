import connection from './config'

const checkUser = (userInfo,ck) =>{
    console.log(userInfo);
    connection.query('select * from users where name = ?',userInfo.user,function(err,result){
       console.log(result)
      let check = result.some(function(item){
          return item.pwd == userInfo.pwd
       })
       ck(check)
   })
}
export {
    checkUser
}