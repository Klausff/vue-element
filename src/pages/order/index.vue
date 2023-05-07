<template>
  <el-table v-loading="loading" border :data="orderData" style="width: 100%">
    <el-table-column :label="orderNum" prop="orderNum"> </el-table-column>
    <el-table-column :label="orderName" prop="name"> </el-table-column>
    <el-table-column :label="orderTel" prop="tel"> </el-table-column>
    <el-table-column :label="orderGoods" prop="goods"> </el-table-column>
    <el-table-column :label="orderCount" prop="count"> </el-table-column>
    <el-table-column :label="totalAmount" prop="total"> </el-table-column>
    <el-table-column :label="orderAddress" prop="address"> </el-table-column>
    <el-table-column :label="orderDate" prop="date"> </el-table-column>
    <el-table-column :label="orderStatus" prop="status"> </el-table-column>

    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          class="elInput"
          v-model="searchWord"
          @input="searchHandle"
          @clear="clear"
          size="mini"
          :placeholder="keyWord"
        />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('message.edit')}}</el-button>
        <el-dialog open="updateData" :visible.sync="dialogFormVisible">
          <div slot="title" style="text-align:left;font-size:20px">{{$t('message.modifyTheOrder')}}</div>
          <el-form>
            <el-form-item :label="orderNum" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.orderNum" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item :label="orderName" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.name" clearable></el-input>
            </el-form-item>
            <el-form-item :label="orderTel"  :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.tel" clearable></el-input>
            </el-form-item>
            <el-form-item :label="orderGoods" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.goods" clearable></el-input>
            </el-form-item>
            <el-form-item :label="orderCount" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.count" clearable></el-input>
            </el-form-item>
            <el-form-item :label="totalAmount" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.total" clearable></el-input>
            </el-form-item>
            <el-form-item :label="orderAddress" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.address" clearable></el-input>
            </el-form-item>
            <el-form-item :label="orderDate" :label-width="formLabelWidth" >
              <el-input s v-model="changeOrderData.date" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item :label="orderStatus" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.status" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelUpdate">{{$t('message.cancel')}}</el-button>
            <el-button type="primary" @click="updateOrderData">{{$t('message.confirm')}}</el-button>
          </div>
        </el-dialog>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >{{$t('message.delete')}}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      orderData: [],
      changeOrderData:{
        orderNum:'',
        name:'',
        tel:'',
        goods:'',
        count:'',
        total:'',
        address:'',
        date:'',
        status:''
      },
      searchWord: "",
      dialogFormVisible: false,
      formLabelWidth: '120px',
      loading:true,
      orderNum:this.$t('message.orderNum'),
      orderName:this.$t('message.orderName'),
      orderTel:this.$t('message.orderTel'),
      orderGoods:this.$t('message.orderGoods'),
      orderCount:this.$t('message.orderCount'),
      totalAmount:this.$t('message.totalAmount'),
      orderAddress:this.$t('message.orderAddress'),
      orderDate:this.$t('message.orderDate'),
      orderStatus:this.$t('message.orderStatus'),
      keyWord:this.$t('message.keyWord')
    };
  },
  methods: {
    updateData(row){
      let {changeOrderData} = this
      changeOrderData.orderNum = row.orderNum
      changeOrderData.name = row.name
      changeOrderData.address = row.address
      changeOrderData.date = row.date
      changeOrderData.status = row.status
      changeOrderData.tel = row.tel
      changeOrderData.goods = row.goods
      changeOrderData.count = row.count
      changeOrderData.total = row.total
    },
    handleEdit(index, row) {
      this.updateData(row)
      this.dialogFormVisible=true
    },
    // 删除订单数据
    handleDelete(index, row) {
      axios
        .get("http://localhost:3000/deleteOrderData", {
          params: { id: row.id },
        })
        .then((res) => {})
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
      this.getOrderData();
      this.$message({
        type: "success",
        message: "删除成功",
      });
    },
    // 修改订单数据
    updateOrderData(){
      this.dialogFormVisible = false
      let {changeOrderData} = this
      axios.get('http://localhost:3000/updateOrderData',{
        params:{
          name:changeOrderData.name,
          tel:changeOrderData.tel,
          goods:changeOrderData.goods,
          count:changeOrderData.count,
          total:changeOrderData.total,
          address:changeOrderData.address,
          orderNum:changeOrderData.orderNum
          }
        }).then((res)=>{
        }).catch((err)=>{
        console.log('修改数据失败'+err)
      })
      this.getOrderData()
      this.$message({
        type:'success',
        message:'修改成功'
      })
    },
    // 搜索订单数据
    searchHandle(){
      let {searchWord} = this
      axios.get("http://localhost:3000/searchOrderData",{
        params:{searchWord}
      })
      .then((res)=>{
        this.orderData=res.data
      })
      .catch((err)=>{})
    },
    // 清空input框后还原原表数据
    clear() {
      this.getGoodsData();
    },
    // 取消修改
    cancelUpdate(){
      this.dialogFormVisible = false
      this.$message({
        type:'info',
        message:'取消修改'
      })
    },
    async getOrderData() {
      await this.$store.dispatch("getOrderData");
      this.orderData = this.$store.state.order.orderData;
      this.loading=false
    },
  },
  
  mounted() {
    this.getOrderData();
  },
};
</script>
<style scoped>
.elInput >>> .el-input__inner {
  color: black;
}
.el-button{
  margin: 0 10px;
}
.el-dialog__title{
  border: 1px solid red;
  color: red;
}
.el-form .el-input{
  height:35px;
}
.el-form >>> .el-input__inner{
  color: black;
}
</style>