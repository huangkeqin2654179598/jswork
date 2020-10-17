const fs =require('fs')
let jsonstr = fs.readFileSync('zf.json','utf8')
let {user,passwrd} =  JSON.parse(jsonstr)

let baseurl ='https://jwc.gdmec.edu.cn'
let vocodeurl = 

https.get(baseurl,(res)=>{
    res.on('data',(chun)=>{
        chunk.push(chunk)
    })
    res.on('end',()=>{
        let html = chunks.toString()
        let $ = cheerio.load(html)
        _VIEWSTATE = $('input[name=""]')
    })


//读取验证码 获取cookie
    https.get(vocodeurl,(res)=>{
        console.log(res)
        cookie =res.header['set-cookie']
        //设置响应流编码为二进制
        res.setEncoding('binary')
        let imgData
        res.on('data',(data)=>{
            imgData += data
        })
        res.on('end',()=>{
            fs.writeFile('vcode.png',imgData,'binary',(err)=>{
                if(err){[
                    console.log(err)
                    return
                ]}
            })
        })
    })

})