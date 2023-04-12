import {reqGetBaiduHotData,reqGetWeiboHotData,reqGetZhihuHotData} from '@/api'
let state={
    baiduHotData:[],
    weiboHotData:[],
    zhihuHotData:[]
}
let mutations={
    GETBAIDUHOTDATA(state,baiduHotData){
        state.baiduHotData=baiduHotData
    },
    GETWEIBOHOTDATA(state,weiboHotData){
        state.weiboHotData=weiboHotData
    },
    GETZHIHUHOTDATA(state,zhihuHotData){
        state.zhihuHotData=zhihuHotData
    },
}
let actions={
    async getBaiduHotData({commit}){
        let result = await reqGetBaiduHotData()
        if(result){
            commit('GETBAIDUHOTDATA',result)
        }
    },
    async getWeiboHotData({commit}){
        let result = await reqGetWeiboHotData()
        if(result){
            commit('GETWEIBOHOTDATA',result)
        }
    },
    async getZhihuHotData({commit}){
        let result = await reqGetZhihuHotData()
        if(result){
            commit('GETZHIHUHOTDATA',result)
        }
    }
    
}
let getters={

}
export default{
    state,mutations,actions,getters
}