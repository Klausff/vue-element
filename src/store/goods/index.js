import {reqGetGoodsData} from '@/api'
let state={
    goodsData:[]
}
let mutations={
    GETGOODSDATA(state,goodsData){
        state.goodsData=goodsData
    }
}
let actions={
    async getGoodsData({commit}){
        let result = await reqGetGoodsData()
        if(result){
            commit('GETGOODSDATA',result)
        }
    }
}
let getters={

}
export default{
    state,mutations,actions,getters
}