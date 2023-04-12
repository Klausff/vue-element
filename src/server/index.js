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
    host: 'localhost',
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
app.get('/getBaiduHotData',(req,res)=>{
    query('select * from baiduhot',(req,result)=>{
        res.send(result)
    })
})
// 获取微博头条数据
app.get('/getWeiboHotData',(req,res)=>{
    query('select * from weibohot',(req,result)=>{
        res.send(result)
    })
})
// 获取知乎头条数据
app.get('/getZhihuHotData',(req,res)=>{
    query('select * from zhihuhot',(req,result)=>{
        res.send(result)
    })
})
// 获取用户数据
app.get('/getUserData',(req,res)=>{
    query('select * from user',(req,result)=>{
        res.send(result)
    })
})
// 获取商品数据
app.get('/getGoodsData',(req,res)=>{
    query('select * from goods',(req,result)=>{
        res.send(result)
    })
})
// 添加商品
app.get('/addGoodsData',(req,res)=>{
    let goods_code = req.query.code
    let goods_name = req.query.name
    let goods_price = req.query.price
    let goods_count = req.query.count
    let goods_size = req.query.size
    let goods_color = req.query.color
    query(`insert into goods(goods_code,goods_name,goods_price,goods_count,goods_RAM,goods_color) values(${goods_code},'${goods_name}',${goods_price},${goods_count},'${goods_size}','${goods_color}')`,(req,result)=>{
    })
})
// 修改商品
app.get('/orderGoodsData',(req,res)=>{
    // console.log(req.query)
    let oldId = req.query.oldId
    let newId= req.query.newId
    let goods_name = req.query.name
    let goods_price = req.query.price
    let goods_count = req.query.count
    query(`update goods set goods_id=${newId},goods_name='${goods_name}',goods_price=${goods_price},goods_count=${goods_count} where id=${oldId}`,(req,result)=>{
    })
})
// 删除商品
app.get('/deleteGoodsData',(req,res)=>{
    let id=req.query.id
    query(`delete from goods where id = ${id}`,(req,result)=>{
    })
})
// 获取订单数据
app.get('/getOrderData',(req,res)=>{
    query('select * from orderlist',(req,result)=>{
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
app.get('/deleteOrderData',(req,res)=>{
    let id = req.query.id
    query(`delete from orderlist where id =${id}`,(req,result)=>{

    })
})
// 修改订单数据
app.get('/updateOrderData',(req,res)=>{
    let orderNum = req.query.orderNum
    let name = req.query.name
    let tel = req.query.tel
    let goods = req.query.goods
    let count = req.query.count
    let total = req.query.total
    let address = req.query.address
    query(`update orderlist set name='${name}',tel=${tel},goods='${goods}',count=${count},total=${total},address='${address}' where orderNum='${orderNum}'`,(req,result)=>{
    })
})
app.listen(3000, () => {
    console.log('server running at http://localhost:3000')
})