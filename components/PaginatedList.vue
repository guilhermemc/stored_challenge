<template>
    <div>
        <!-- <el-table
            ref="singleTable"
            :data="paginatedData"
            stripe
            highlight-current-row
            @current-change="selectPlaylist"
            style="width: 100%">
            <el-table-column
                prop="owner.display_name"
                label="Proprietário">
                </el-table-column>
                <el-table-column
                prop="name"
                label="Nome">
            </el-table-column>
        </el-table> -->
        <el-row type="flex wrap" class="row-bg" justify="space-around">
            <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-for="o in paginatedData" :key="o.id" :offset="1">
                <el-card class="card-playlist" :body-style="{ padding: '0px' }" >
                <img :src="o.images[0].url" class="image">
                <div style="padding: 14px;">
                    <span>{{o.name}}</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ o.owner.display_name }}</time>
                    <el-button type="text" class="button">Operating button</el-button>
                    </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
        <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left"  @click="prevPage" :disabled="pageNumber==0">Previous Page</el-button>
            <el-button type="primary" @click="nextPage" :disabled="pageNumber > pageCount -1">Next Page<i class="el-icon-arrow-right el-icon-right"></i></el-button>
        </el-button-group>

    </div>
</template>
<script>
export default {
    data() {
        return {
            pageNumber: 0,
            currentDate: new Date()
        }
    },
    props:{
        listData:{
            type:Array,
            required:true
        },
        size:{
            type:Number,
            required:false,
            default: 10
        }
    },
    computed: {
        pageCount(){
            let l = this.listData.length,
                s = this.size;
            return Math.floor(l/s);
        },
        paginatedData(){
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.listData.slice(start, end);
        }
    },
    methods : {
        nextPage(){
            this.pageNumber++;
        },
        prevPage(){
            this.pageNumber--;
        },
        selectPlaylist(data) {
            console.log(data)
        }
    },
}
</script>
<style lang="scss" scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
 .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .card-playlist {
      min-height: 260px;
      margin-bottom: 15px;
  }
</style>