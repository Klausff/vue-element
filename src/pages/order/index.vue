<template>
  <el-table v-loading="lodaing" border :data="searchOrderData" style="width: 100%">
    <el-table-column label="订单编号" prop="orderNum"> </el-table-column>
    <el-table-column label="姓名" prop="name"> </el-table-column>
    <el-table-column label="手机号" prop="tel"> </el-table-column>
    <el-table-column label="购买产品" prop="goods"> </el-table-column>
    <el-table-column label="数量" prop="count"> </el-table-column>
    <el-table-column label="总金额" prop="total"> </el-table-column>
    <el-table-column label="地址" prop="address"> </el-table-column>
    <el-table-column label="下单日期" prop="date"> </el-table-column>
    <el-table-column label="状态" prop="status"> </el-table-column>

    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          class="elInput"
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
        />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-dialog open="updateData" :visible.sync="dialogFormVisible">
          <div slot="title" style="text-align:left;font-size:20px">修改订单</div>
          <el-form>
            <el-form-item label="订单编号" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.orderNum" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.tel" clearable></el-input>
            </el-form-item>
            <el-form-item label="购买产品" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.goods" clearable></el-input>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.count" clearable></el-input>
            </el-form-item>
            <el-form-item label="总金额" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.total" clearable></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.address" clearable></el-input>
            </el-form-item>
            <el-form-item label="日期" :label-width="formLabelWidth" >
              <el-input s v-model="changeOrderData.date" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth" >
              <el-input  v-model="changeOrderData.status" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelUpdate">取 消</el-button>
            <el-button type="primary" @click="updateOrderData">确 定</el-button>
          </div>
        </el-dialog>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
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
      search: "",
      dialogFormVisible: false,
      formLabelWidth: '120px',
      loading:true
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
      axios.get('http://localhost:3000/updateOrderData',{params:{name:changeOrderData.name,tel:changeOrderData.tel,
      goods:changeOrderData.goods,count:changeOrderData.count,
      total:changeOrderData.total,address:changeOrderData.address,orderNum:changeOrderData.orderNum}}).then((res)=>{
      }).catch((err)=>{
        console.log('修改数据失败'+err)
      })
      this.getOrderData()
      this.$message({
        type:'success',
        message:'修改成功'
      })
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
  computed: {
    // 计算实现前端关键字检索
    searchOrderData() {
      let { orderData, search } = this;
      if(search.length>=0&&search.length<1){
        return orderData.filter((data) =>!search || data.name.toLowerCase().includes(search.toLowerCase()))
      }else if(search.length>1&&search.length<=11){
        return orderData.filter((data) =>!search || data.tel.includes(search))
      }else if(search.length>11&&search.length<=18){
        return orderData.filter((data) =>!search || data.orderNum.includes(search))
      }
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