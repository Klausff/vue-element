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

// 获取商品数据
app.get('/getGoodsData',(req,res)=>{
    query('select * from goods',(req,result)=>{
        res.send(result)
    })
})
// 添加商品
app.get('/addGoodsData',(req,res)=>{
    let id= req.query.id
    let name = req.query.name
    let price = req.query.price
    let count = req.query.count
    if(id==''){
        return
    }else{
        query(`insert into goods values(${id},'${name}',${price},${count})`,(req,result)=>{
        })
    }
})
// 修改商品
app.get('/orderGoodsData',(req,res)=>{
    // console.log(req.query)
    let oldId = req.query.oldId
    let newId= req.query.newId
    let name = req.query.name
    let price = req.query.price
    let count = req.query.count
    query(`update goods set id=${newId},name='${name}',price=${price},count=${count} where id=${oldId}`,(req,result)=>{
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