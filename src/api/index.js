import requests from './requests'
// 获取商品数据
export const reqGetGoodsData = ()=>requests({url:'/getGoodsData',method:'get'})
// 获取订单数据
export const reqGetOrderData = ()=>requests({url:'/getOrderData',method:'get'})