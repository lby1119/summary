<template>
  <div>
    桌号：{{ tableid }}
    <br>
    <!--        当前状态：{{ tablestate }}-->
    当前状态：
    <br>
    <!--    <el-radio-group v-model="tablestate" @change="changestate">-->
    <!--      <el-radio-button label="空闲"></el-radio-button>-->
    <!--      <el-radio-button label="使用中"></el-radio-button>-->
    <!--      <el-radio-button label="待清洁"></el-radio-button>-->
    <!--    </el-radio-group>-->
    <el-radio-group fill="#2EFE2E" v-model="tablestate" @change="changestate">
      <el-radio-button label="空闲"></el-radio-button>
    </el-radio-group>
    <el-radio-group fill="#F7FE2E" v-model="tablestate" @change="changestate">
      <el-radio-button label="使用中"></el-radio-button>
    </el-radio-group>
    <el-radio-group fill="#FE2E2E" v-model="tablestate" @change="changestate">
      <el-radio-button label="待清洁"></el-radio-button>
    </el-radio-group>
    <el-button @click="choose" round>选择桌子</el-button>
    <br>

  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: ["tableid", "tablestate"],
  data: function () {
    return {};
  },
  methods: {
    choose: function () {
      this.$emit('choosetable', this.tableid);
    },
    async changestate() {
      try {
        //this.stop_refresh();
        await this.$cloudbase.callFunction({
          name: "change_table_state",
          data: {
            tableid: this.tableid,
            tablestate: this.tablestate
          },
        });
        //setTimeout(this.start_refresh(),2000);
      } catch (e) {
        console.error(e)
      }
    },
    stop_refresh() {
      this.$emit('stoprefresh');
    },
    start_refresh(){
      this.$emit('startrefresh');
    },
    // changestate(){
    //   alert(this.tablestate)
    // }

  },
}
</script>
