<template>
        <div class="main">
            <div class="head">
                <b class="jiage">总价：￥{{sumPrice[0]}}</b>
                <button @click="upOrder">下单</button>
            </div>
            <div class="menu">
                <el-collapse v-model="activeNames" @change="handleChange">
                <!-- <div class="submenu" v-for="(submenu, index) in menu" :key="index">
                    <h2>{{submenu}}</h2> -->
                    <el-collapse-item class="submenu" v-for="(submenu, index) in menu" :key="index" :title="submenu" :name="index">
                    <div class="foods">
                        <div class="food" v-for="(item, index) in food[submenu]" :key="index">
                            <img class="image" :src=" item.img ">
                            <div class="info">
                                <p>{{item.name}}</p>
                                <p>￥{{item.current_price}}</p>
                            </div>
                            <div class="bianji">
                                <button :kind="submenu" :it="index" @click="subNum">-</button>
                                <b>{{item.num}}</b>
                                <button :kind="submenu" :it="index" @click="addNum">+</button>
                            </div>
                        </div>
                    </div>
                    </el-collapse-item>
                <!-- </div> -->
                </el-collapse>
            </div>
        </div>
</template>





<script>

export default {
    name: 'Menu',
    props:['desk'],
    components: {
    },
    data:function(){
        return{
            food:{
                "素食": [],
                "肉食": [],
                "烧烤": [],
                "主食": [],
                "饮品": []
            },
            menu:["素食", "肉食", "烧烤", "主食", "饮品"],
            sumPrice: [0],//总价
            //desk: 1//桌号
        }
    },
    methods: {
        async getMenu() {
            try {
                const res = await this.$cloudbase.callFunction({
                name: "getMenu_v2",
                data: {
                
                },
                });
                for (var i=0; i<res.result.length; i++) {
                    var temp = res.result[i]
                    

                    this.$set(this.food[temp[5]], this.food[temp[5]].length, {
                        id            : temp[0],
                        name          : temp[1],
                        original_price: temp[2],
                        current_price : temp[3],
                        described     : temp[5],
                        img           : temp[7],
                        num           : 0
                    })

                }
                console.log(this.food)


            } catch (e) {
                console.error(e)

            }
            },
        async upOrder() {
                var selectFood = []
                for (var i=0; i<this.menu.length; i++){
                    var temp = this.food[this.menu[i]];
                    for (var j=0; j<temp.length; j++){
                        selectFood[selectFood.length] = temp[j]
                    }
                }
                console.log(selectFood)
                const date = new Date()
                const now = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + ": " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            try {
                console.log(selectFood)
                const res = await this.$cloudbase.callFunction({
                name: "upOrder",
                data: {
                    desk: Number(this.desk),
                    food: selectFood,
                    sumPrice: Number(this.sumPrice[0]),
                    date: now
                },
             
                });
                
                console.log(res)
                alert('下单成功')

            } catch (e) {
                console.error(e)
            }

            },
        addNum: function(e){
            var target = e.currentTarget
            var kind = target.getAttribute("kind")
            var index = target.getAttribute("it")
            var temp = this.food[kind][index].num + 1;
            this.$set(this.food[kind][index], "num", temp)
            var sum = Number(this.sumPrice[0])
            sum = sum + Number(this.food[kind][index].current_price)
            this.$set(this.sumPrice, 0, sum)
        },
        subNum: function(e){
            var target = e.currentTarget
            var kind = target.getAttribute("kind")
            var index = target.getAttribute("it")
            if (this.food[kind][index].num > 0){
                var temp = this.food[kind][index].num - 1;
                this.$set(this.food[kind][index], "num", temp)
                var sum = Number(this.sumPrice[0])
                sum = sum - Number(this.food[kind][index].current_price)
                this.$set(this.sumPrice, 0, sum)
            }
        }
    },
    mounted() {
        this.getMenu() ;
    }
           
}
</script>

<style>
.main{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.head{
    width: 960px;
    height: 100px;
    background-color: rgba(54, 86, 116, 0.64);
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.jiage{
    margin-left: 20px;
    margin-right: 25px;
}
.menu{
    width: 960px;
}
.el-collapse-item__header{
    background-color: #40a0ff5e;
    height:110px;
  font-size: 40px;
  display: flex;
  text-align: center;
  align-items: center;
}
.el-collapse-item__content{
    background-color: #40a0ff3b;
}
.foods {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.food {
    width: 300px;
    height: 100px;
    margin-right: 20px;
    margin-top: 20px;
    background-color: #40a0ff49;
    border-radius: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.image {
    width: 100px;
    height: 100px;
    border-radius: 2px;
}
.info {
    margin-left: 10px;
}
.bianji{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>