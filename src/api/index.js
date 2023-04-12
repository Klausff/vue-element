import requests from './requests'
// 获取商品数据
export const reqGetGoodsData = ()=>requests({url:'/getGoodsData',method:'get'})
// 获取订单数据
export const reqGetOrderData = ()=>requests({url:'/getOrderData',method:'get'})
// 获取百度热搜数据
export const reqGetBaiduHotData = ()=>requests({url:'/getBaiduHotData',method:'get'})
// 获取微博热搜数据
export const reqGetWeiboHotData = ()=>requests({url:'/getWeiboHotData',method:'get'})
// 获取知乎热搜热搜数据
export const reqGetZhihuHotData = ()=>requests({url:'/getZhihuHotData',method:'get'})
// 获取用户数据
export const reqGetUserData = ()=>requests({url:'/getUserData',method:'get'})