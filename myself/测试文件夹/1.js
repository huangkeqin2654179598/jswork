//node12版本以上才能对es6有足够的支持

//2020/10/9 第一部分

//用户名、密码获取
const fs = require('fs')
const readline = require("readline")
let {
    user,
    password
} = JSON.parse(fs.readFileSync('zf.json'))
const baseurl = 'https://jwc.gdmec.edu.cn'
const vcodeurl = 'https://jwc.gdmec.edu.cn/CheckCode.aspx'
const https = require('https')
const cheerio = require('cheerio')
const child_process = require('child_process')
const querystring = require('querystring')
const iconv = require("iconv-lite")
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
    res.on('end', () => {
        cookie = res.headers['set-cookie']
        console.log(cookie)
        let $ = cheerio.load(chunks.toString())
        _VIEWSTATE = $('input[name="__VIEWSTATE"]').val()
        console.log(_VIEWSTATE)
    })
})

//获取验证码和cookie
https.get(vcodeurl, (res) => {
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
                console.log("错误：",err)
                return
            }
            if (process.platform == 'win32')
                child_process.exec('vcode.png')
            else
                child_process.exec('open vcode.png')
        })
    })
})

//2020/10/16 第二部分


function login() {
    let postData = querystring.stringify({
        _VIEWSTATE,
        TextBox1: user,
        TextBox2: password,
        TextBox3: vcode,
        Button1: '',
        RadioBottonList1: ''
    })
    postData += '%u5B66%u751F'
    //准备reques 的options
    let opt = {
        host: 'jwc.gdmec.edu.cn',
        port: 443,
        path: '/default2.aspx',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Content-Length":Buffer.byteLength(postData),
            'Cookie': cookie
        }
    }

    let req = https.request(opt, (res) => {
        let chunks = []
        res.on('data', (chunk) => {
            chunks.push(chunk)
        })
        res.on('end', () => {
            console.log(iconv.decode(Buffer.concat(chunks),"gbk"))
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
    // https.get(url1, opt, (res) => {
    //     let chunks = []
    //     res.on('data', (chunk) => {
    //         chunks.push(chunk)
    //     })
    //     res.on('end', () => {
    //         let buffer = buffer.concat(chunks)
    //         let str = iconv.decode(buffer, 'gbk')
    //         console.log(str)
    //     })
    // })