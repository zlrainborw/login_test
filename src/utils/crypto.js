//封装类库
import crypto from "crypto"
//加密
const aesEncrypt = (data, key) =>{
    const cipher = crypto.createCipher("aes192", key)
    let aesEn = cipher.update(data, "utf8", "hex") //utf8---hex
    aesEn += cipher.final('hex') //继续生成加密内容
    return aesEn
}

//返解密
const aesDecrypt = (aesEn, key) =>{
    const deCipher = crypto.createDecipher("aes192", key)
    let deAes = deCipher.update(aesEn, "hex", "utf8")
    deAes += deCipher.final('utf8')
    return deAes
}
export {
    aesEncrypt,
    aesDecrypt
}
//AES 对称加密算法解密
