<template>
  <div class="goodsContainer">
    <div class="goodsButton">
      <div class="left">
        <el-row>
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="dialogAddFormVisible = true"
            >添加</el-button
          >
          <el-dialog title="添加商品" :visible.sync="dialogAddFormVisible">
            <el-form :model="addForm">
              <el-form-item label="商品编码" :label-width="formLabelWidth">
                <el-input
                  class="elFormInput"
                  v-model="addForm.code"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input class="elFormInput" v-model="addForm.name" clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input class="elFormInput" v-model="addForm.price" clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="库存" :label-width="formLabelWidth">
                <el-input class="elFormInput" v-model="addForm.count" clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="颜色" :label-width="formLabelWidth">
                <el-input class="elFormInput" v-model="addForm.color" clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="内存大小" :label-width="formLabelWidth">
                <el-input class="elFormInput" v-model="addForm.size" clearable>
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogAddFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addGoodsData">确 定</el-button>
            </div>
          </el-dialog>
          <el-button type="primary" icon="el-icon-edit" @click="changeData"
            >编辑</el-button
          >
          <el-dialog title="编辑商品" :visible.sync="dialogChangeFormVisible">
            <el-form>
              <el-form-item label="商品编码" :label-width="formLabelWidth">
                <el-input v-model="changeForm.goodsCode" class="elFormInput" clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input
                  v-model="changeForm.name"
                  class="elFormInput"
                  clearable
                >
                </el-input>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input
                  v-model="changeForm.price"
                  class="elFormInput"
                  clearable
                >
                </el-input>
              </el-form-item>
              <el-form-item label="库存" :label-width="formLabelWidth">
                <el-input
                  v-model="changeForm.count"
                  class="elFormInput"
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogChangeFormVisible = false"
                >取 消</el-button
              >
              <el-button type="primary" @click="changeGoodsData"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <el-button
            type="primary"
            icon="el-icon-delete"
            @click="deleteGoodsData"
            >删除</el-button
          >
        </el-row>
      </div>
      <div class="right">
        <el-input
          class="elSearchInput"
          placeholder="请输入商品编码或商品名称"
          v-model="searchWord"
          clearable
        >
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchGoodsData"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="goodsTable">
      <el-table v-loading="loading" ref="multipleTable" :data="tableData" tooltip-effect="dark" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="100"> </el-table-column>
        <el-table-column prop="goods_code" label="商品编码" width="300" sortable resizable></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="300" resizable></el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="300" sortable resizable></el-table-column>
        <el-table-column prop="goods_count" label="库存" sortable=""></el-table-column>
        <el-table-column prop="goods_color" label="颜色" sortable=""></el-table-column>
        <el-table-column prop="goods_RAM" label="内存大小" sortable=""></el-table-column>
      </el-table>
    </div>
    <el-pagination style="float:right;" background layout="prev, pager, next" :total="1000" @current-change="currentChange"></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      value: "",
      tableData: [],
      multipleSelection: [],
      dialogAddFormVisible: false,
      dialogChangeFormVisible: false,
      addForm: {
        id: "",
        name: "",
        price: "",
        count: "",
        code:'',
        color:'',
        size:''
      },
      changeForm: {
        id: "",
        name: "",
        price: "",
        count: "",
        goodsCode:"",
        color:"",
        size:""
      },
      formLabelWidth: "120px",
      searchWord: "",
      page:1,
      data:[],
      loading:true
    };
  },
  methods: {
    // 获取所选中的数据内容
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除数据
    deleteGoodsData() {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelBUttonText: "取消",
        type: "warning",
      })
        .then(() => {
          const { multipleSelection } = this;
          // 判断是否选中多条数据进行删除
          if (multipleSelection.length >= 2) {
            for (let i = 0; i < multipleSelection.length; i++) {
              axios
                .get("http://localhost:3000/deleteGoodsData", {
                  params: { id: multipleSelection[i].id },
                })
                .then((res) => {})
                .catch((err) => {
                  console.log("获取数据失败" + err);
                });
            }
            this.getGoodsData();
            this.$message({
              type: "success",
              message: `删除成功`,
            });
          } else {
            axios
              .get("http://localhost:3000/deleteGoodsData", {
                params: { id: multipleSelection[0].id },
              })
              .then((res) => {})
              .catch((err) => {
                console.log("获取数据失败" + err);
              });
            this.getGoodsData();
            this.$message({
              type: "success",
              message: `删除成功`,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加数据
    addGoodsData() {
      // 关闭对话框
      this.dialogAddFormVisible = false;
      let { addForm } = this;
      if (
        addForm.code== "" ||
        addForm.name == "" ||
        addForm.price == "" ||
        addForm.count == "" ||
        addForm.color == "" ||
        addForm.size == ""
      ) {
        this.$message({
          type: "warning",
          message: "请输入正确的数据",
        });
      } else {
        axios
          .get("http://localhost:3000/addGoodsData", {
            params: {
              code: addForm.code,
              name: addForm.name,
              price: addForm.price,
              count: addForm.count,
              color: addForm.color,
              size: addForm.size
            },
          })
          .then((res) => {})
          .catch((err) => {
            console.log("获取数据失败" + err);
          });
        // 添加完成后把表格置空
        addForm.code = "";
        addForm.name = "";
        addForm.price = "";
        addForm.count = "";
        addForm.color = ""
        addForm.size = ""
        this.getGoodsData();
        this.$message({
          type: "success",
          message: `添加成功`,
        });
      }
    },
    // 发送修改数据请求
    changeGoodsData() {
      this.dialogChangeFormVisible = false;
      let { changeForm, multipleSelection } = this;
      axios
        .get("http://localhost:3000/orderGoodsData", {
          params: {
            oldId: multipleSelection[0].id,
            newId: changeForm.id,
            goods_name: changeForm.name,
            goods_price: changeForm.price,
            goods_count: changeForm.count,
          },
        })
        .then((res) => {})
        .catch((err) => {
          console.log("修改数据失败" + err);
        });
      this.getGoodsData();
      this.$message({
        type: "success",
        message: `修改成功`,
      });
    },
    // 点击编辑按钮的回调
    changeData() {
      // 判断是否选中一条数据进行修改
      if (this.multipleSelection[0] == null) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
      } else {
        this.dialogChangeFormVisible = true;
        let { changeForm, multipleSelection } = this;
        console.log(multipleSelection)
        changeForm.id = multipleSelection[0].goods_id;
        changeForm.name = multipleSelection[0].goods_name;
        changeForm.price = multipleSelection[0].goods_price;
        changeForm.count = multipleSelection[0].goods_count;
        changeForm.goodsCode = multipleSelection[0].goods_code;
      }
    },
    // 点击搜索按钮的回调
    searchGoodsData() {
      let { tableData, searchWord } = this;
      if (searchWord == "") {
        this.$message({
          type: "warning",
          message: "不能输入为空",
        });
      } else {
        // 实现将要搜索的数据置顶的功能
        // 把要搜索的数据从数组中删除然后插到数组开头实现置顶
        let data = [];
        for (let i = 0; i < tableData.length; i++) {
          if (tableData[i].goodsCode == searchWord||tableData[i].name==searchWord) {
            data = tableData[i];
            tableData.splice(i, 1);
          }
        }
        tableData.unshift(data);
      }
    },
    // 数组拆分
    splitArray(array,size){
      let index=0
      let data =[]
      while(index<array.length){
        data.push(array.slice(index,index+=size))
      }
      return data
    },
    // 发请求获取数据库中的数据
    async getGoodsData() {
      await this.$store.dispatch("getGoodsData");
      this.data = this.splitArray(this.$store.state.goods.goodsData,10)
      this.tableData = this.data[0]
      this.loading=false
    },
    currentChange(val){
      this.tableData= this.data[val-1]
    }
  },
  mounted() {
    // 获取商品数据
    this.getGoodsData();
  },
};
</script>

<style scoped>
.goodsButton {
  display: flex;
  margin-bottom: 5px;
}
.goodsButton .el-button {
  margin: 0 20px;
}
.elFormInput >>> .el-input__inner {
  width: 100%;
  height: 40px;
  color: black;
}
.elSearchInput >>> .el-input__inner {
  margin-left: 50px;
  width: 350px;
  height: 40px;
  color: black;
}
.right{
  margin: 10px 0;
}
.left{
  margin: 10px 0;
}
.right .el-button {
  position: absolute;
  float: left;
}
</style>