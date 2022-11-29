import { reqGetOrderData } from "../../api";
let state={
    orderData:[]
}
let mutations={
    GETORDERDATA(state,orderData){
        state.orderData=orderData
    }
}
let actions={
    async getOrderData({commit}){
        let result = await reqGetOrderData()
        if(result){
            commit('GETORDERDATA',result)
        }
    }
}
let getters={
    
}
export default{
    state,mutations,actions,getters
}