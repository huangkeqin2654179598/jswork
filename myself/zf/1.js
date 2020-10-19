//node12版本以上才能对es6有足够的支持

//2020/10/9 第一部分

//用户名、密码获取
const fs = require('fs')
let {
    user,
    password
} = JSON.parse(fs.readFileSync('zf.json'))
console.log(user, password)
const baseurl = 'https://jwc.gdmec.edu.cn'
const vcodeurl = 'https://jwc.gdmec.edu.cn/CheckCode.aspx'
const https = require('https')
const cheerio = require('cheerio')
const child_process = require('readline')
const querystring = require('querystring')
const rl = readline.createInterface({
    input: process.stdin
})
let buf = []
rl.on('line', (line) => {
    buf.push(line)
    if (line.trim() == '') rl.close()
})
rl.on('close', () => {
    vcode = buf[0]
    login()
})
let _VIEWSTATE = ''
let cookie = []
let vode = ''

https.get(baseurl, (res) => {
    let chunks = []
    res.on('data', (chunk) => {
        chunks.push(chunk)
    })
    res.on('end', () => {
        let $ = cheerio.load(chunks.toString())
        _VIEWSTATE = $('input[name="_VIEWSTATE"]').val()
        console.log(_VIEWSTATE)
    })
})

//获取验证码和cookie
https.get(vcodeurl, (res) => {
    console.log(res)
    //获取cookie
    cookie = res.headers['set-cookie']
    res.setEncoding('binary')
    let imgData = ''
    res.on('data', (chunk) => {
        imgData += chunk
    })
    res.on('end', () => {
        fs.writeFile('vcode.png', imgData, 'binary', (err) => {
            if (err) {
                console.log(err)
                return
            }
            if (process.platform == 'win32')
                child_process.exec('vcode.png')
            else
                child_process.exec('opoen vcode.png')
        })
    })
})

//2020/10/16 第二部分

const fs = require('fs')
let {
    user,
    password
} = JSON.parse(fs.readFileSync('zf.json'))
const baseurl = 'https://jwc.gdmec.edu.cn'
const vcodeurl = 'https://jwc.gdmec.edu.cn/CheckCode.aspx'
const https = require('https')
const cheerio = require('cheerio')
const child_process = require('child-process')
const readline = require('readline')
const querystring = require('querystring')
const rl = readline.createInterface({
    input: process.stdin
})
let buf = []
rl.on('line', (line) => {
    buf.push(line)
    if (line.trim() == '') rl.close()
})
rl.on('close', () => {
    vcode = buf[0]
    login()
})
let _VIEWSTATE = ''
let cookie = []
let vcode = ''

https.get(baseurl, (res) => {
    let chunks = []
    res.on('data', (chunk) => {
        chunks.push(chunk)
    })
    res.on('end', (res) => {
        res.setEncoding('binary')
        cookie = res.headers['set-cookie']
        console.log(cookie)
        let imgData = ''
        res.on('data', (chunk) => {
            imgData += chunk
        })
        res.on('end', () => {
            fs.writeFile('vcode.png', imgData, 'binary', (err) => {
                if (err) {
                    console.log(err)
                    return
                }
                if (process.platform == 'win32') {
                    child_process.exec('vcode.png')
                } else {
                    child_process.exec('open vcode.png')
                }
            })

            function login() {
                let postData = querystring.stringify({
                    _VIEWSTATE,
                    TextBox1: user,
                    TextBox2: password,
                    TextBox3: vcode,
                    Button1: '',
                    RadioBottonList1: ''
                })
                postData += ''

                //准备reques 的options
                let opt = {
                    host: 'jwc.gdmec.edu.cn',
                    port: 443,
                    path: '/default2.apsx',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                let req = https.request(opt, (res) => {
                    let chunks = []
                    res.on('data', (chunk) => {
                        chunks.push(chunk)
                    })
                    res.on('end', () => {
                        console.log(chunks.toString())
                    })
                })
                req.write(postData)
                req.end()
            }

            function geturl() {
                let opt = {
                    headers: {
                        'Cookie': cookie,
                        'Referer': 'https://jwc.gdmec.edu.cn/js_main.aspx?xh=07190708'
                    }
                }
            }
            https.get(url1, opt, (res) => {
                let chunks = []
                res.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                res.on('end', () => {
                    let buffer = buffer.concat(chunks)
                    let str = iconv.decode(buffer, 'gbk')
                    console.log(str)
                })
            })

        })
    })
})