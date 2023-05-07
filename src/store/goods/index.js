import {reqGetGoodsData,reqSearchGoods} from '@/api'
let state={
    goodsData:[],
    // searchData:[]
}
let mutations={
    GETGOODSDATA(state,goodsData){
        state.goodsData=goodsData
    },
    // GETSEARCHDATA(state,searchData){
    //     state.searchData=searchData
    // }
}
let actions={
    async getGoodsData({commit}){
        let result = await reqGetGoodsData()
        if(result){
            commit('GETGOODSDATA',result)
        }
    },
    // async getSearchData({commit},searchWord){
    //     let result = await reqSearchGoods(searchWord)
    //     if(result){
    //         commit('GETSEARCHDATA',result)
    //     }
    // }
}
let getters={

}
export default{
    state,mutations,actions,getters
}