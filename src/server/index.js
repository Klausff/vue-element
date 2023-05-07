// 引入mysql
let mysql = require('mysql')
// 引入express
let express = require('express')
const app = express();
// 引入cors解决跨域问题
let cors = require('cors')
app.use(cors())
let moment = require('moment')
// 创建连接池 连接数据库
let pool = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: '127.0.0.1',
    user: 'root',
    password: 'root1234',
    database: 'data'
})
// 封装一个sql
const query = (sql, params, callback) => {
    //获取链接
    pool.getConnection((err, connect) => {
        if (err) {
            console.log('err', err);
            pool.releaseConnection();
        }
        connect.query(sql, params, (err, result, fields) => {
            if (err) {
                connect.release();
                console.log('Error', err);
                return
            }
            callback(result, fields)
            connect.release();
        })
    })
}
// 获取百度热搜数据
app.get('/getBaiduHotData', (req, res) => {
    query({sql:'select * from baiduhot',timeout:50000},(req, result) => {
        res.send(result)
    })
})
// 获取微博头条数据
app.get('/getWeiboHotData', (req, res) => {
    query({sql:'select * from weibohot',timeout:50000}, (req, result) => {
        res.send(result)
    })
})
// 获取知乎头条数据
app.get('/getZhihuHotData', (req, res) => {
    query({sql:'select * from zhihuhot',timeout:50000}, (req, result) => {
        res.send(result)
    })
})
// 获取用户数据
app.get('/getUserData', (req, res) => {
    query({sql:'select * from user',timeout:50000}, (req, result) => {
        res.send(result)
    })
})
// 获取商品数据
app.get('/getGoodsData', (req, res) => {
    query({sql:'select * from goods',timeout:50000}, (req, result) => {
        res.send(result)
    })
})
// 添加商品数据
app.get('/addGoodsData', (req, res) => {
    let goods_code = req.query.code
    let goods_name = req.query.name
    let goods_price = req.query.price
    let goods_count = req.query.count
    let goods_size = req.query.size
    let goods_color = req.query.color
    query({sql:`insert into goods(goods_code,goods_name,goods_price,goods_count,goods_RAM,goods_color) values(${goods_code},'${goods_name}',${goods_price},${goods_count},'${goods_size}','${goods_color}')`,timeout:50000}, (req, result) => {
    })
})
// 修改商品数据
app.get('/orderGoodsData', (req, res) => {
    let oldId = req.query.oldId
    let goods_name = req.query.goods_name
    let goods_price = req.query.goods_price
    let goods_count = req.query.goods_count
    let goods_color = req.query.goods_color
    let goods_RAM = req.query.goods_RAM
    query({sql:`update goods set goods_name='${goods_name}',goods_price=${goods_price},goods_count=${goods_count},goods_color='${goods_color}',goods_RAM='${goods_RAM}' where id=${oldId}`,timeout:50000}, (req, result) => {
    })
})
// 搜索商品数据
app.get('/searchGoodsData', (req, res) => {
    let searchWord = req.query.searchWord
    query({sql:"select * from goods where concat(`goods_name`,`goods_code`) like '%" + searchWord + "%'",timeout:50000}, (req, result) => {
        res.send(result)
    })
})
// 删除商品
app.get('/deleteGoodsData', (req, res) => {
    let id = req.query.id
    query({sql:`delete from goods where id = ${id}`,timeout:50000}, (req, result) => {
    })
})
// 获取订单数据
app.get('/getOrderData', (req, res) => {
    query({sql:'select * from orderlist',timeout:50000}, (req, result) => {
        // 解决从数据库获取的日期格式问题
        result.forEach(item => {
            item.date = moment(item.date).format("YYYY-MM-DD HH:mm:ss");
            item.tel = item.tel.toString()
            item.orderNum = item.orderNum.toString()
        });
        res.send(result)
    })
})
// 删除订单数据
app.get('/deleteOrderData', (req, res) => {
    let id = req.query.id
    query({sql:`delete from orderlist where id =${id}`,timeout:50000}, (req, result) => {

    })
})
// 搜索订单数据
app.get('/searchOrderData',(req,res)=>{
    let searchWord = req.query.searchWord
    query({sql:"select * from orderlist where concat(`name`,`orderNum`,`tel`,`goods`) like '%"+searchWord+"%'",timeout:50000},(req,result)=>{
        // 解决从数据库获取的日期格式问题
        result.forEach(item => {
            item.date = moment(item.date).format("YYYY-MM-DD HH:mm:ss");
            item.tel = item.tel.toString()
            item.orderNum = item.orderNum.toString()
        });
        res.send(result)
    })
})
// 修改订单数据
app.get('/updateOrderData', (req, res) => {
    let orderNum = req.query.orderNum
    let name = req.query.name
    let tel = req.query.tel
    let goods = req.query.goods
    let count = req.query.count
    let total = req.query.total
    let address = req.query.address
    query({sql:`update orderlist set name='${name}',tel=${tel},goods='${goods}',count=${count},total=${total},address='${address}' where orderNum='${orderNum}'`,timeout:50000}, (req, result) => {
    })
})
app.listen(3000, () => {
    console.log('server running at http://localhost:3000')
})