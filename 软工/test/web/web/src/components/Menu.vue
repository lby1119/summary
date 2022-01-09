<template>
        <div class="main">
            <div class="head">
                <b class="jiage">总价：￥{{sumPrice[0]}}</b>
                <button @click="upOrder">下单</button>
            </div>
            <div class="menu">
                <el-collapse >
                <!-- <div class="submenu" v-for="(submenu, index) in menu" :key="index">
                    <h2>{{submenu}}</h2> -->
                    <el-collapse-item class="submenu" v-for="(submenu, index) in menu" :key="index" :title="submenu" :name="index">
                    <div class="foods">
                        <div class="food" v-for="(item, index) in food[submenu]" :key="index">
                            <div class="tupiankuang">
                                <img class="image" :src=" item.img ">
                                <div class="shulianglan" v-if="item.surplus <= 10">
                                    <b v-if="item.surplus > 0">仅剩{{item.surplus}}份</b>
                                    <b v-else>售罄</b>
                                </div>
                            </div>
                            <div class="info">
                                <p>{{item.name}}</p>
                                <p>￥{{item.current_price}}</p>
                            </div>
                            <div class="bianji">
                                <button :kind="submenu" :it="index" @click="subNum" :disabled="item.num <= 0">-</button>
                                <b>{{item.num}}</b>
                                <button :kind="submenu" :it="index" @click="addNum" :disabled="item.num >= item.surplus">+</button>
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
            isFirst: true
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
                var len = {
                    "素食": 0,
                    "肉食": 0,
                    "烧烤": 0,
                    "主食": 0,
                    "饮品": 0
                }
                if (this.isFirst){
                    for (var i=0; i<res.result.length; i++) {
                        var temp = res.result[i]

                        this.$set(this.food[temp[5]], len[temp[5]], {
                            id            : temp[0],
                            name          : temp[1],
                            original_price: temp[2],
                            current_price : temp[3],
                            described     : temp[5],
                            surplus       : temp[6],
                            img           : temp[7],
                            num           : 0
                        })
                        len[temp[5]] = len[temp[5]] + 1
                    }
                    this.isFirst = false
                }
                else {
                    for (i=0; i<res.result.length; i++) {
                        temp = res.result[i]

                        this.$set(this.food[temp[5]], len[temp[5]], {
                            id            : temp[0],
                            name          : temp[1],
                            original_price: temp[2],
                            current_price : temp[3],
                            described     : temp[5],
                            surplus       : temp[6],
                            img           : temp[7],
                            num           : this.food[temp[5]][len[temp[5]]].num
                        })
                        len[temp[5]] = len[temp[5]] + 1
                    }
                }

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
                const date = new Date()
                const now = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + ": " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            try {
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
                if (res.result === "fail"){
                    alert("当前订单中餐品的存货不足")
                }
                else{
                    this.$set(this.sumPrice, 0, 0)
                    for (i in this.data.menu) {
                        var k
                        for (k=0; k<this.data.food[i].length; k++){
                            this.$set(this.food[i][k], "num", 0)
                        }
                    }
                    alert('下单成功')
                }

            } catch (e) {
                console.error(e)
            }

            },
        addNum: function(e){
            var target = e.currentTarget
            var kind = target.getAttribute("kind")
            var index = target.getAttribute("it")
            var temp = this.food[kind][index].num + 1;
            if (this.food[kind][index].num < this.food[kind][index].surplus){
                this.$set(this.food[kind][index], "num", temp)
                var sum = Number(this.sumPrice[0])
                sum = sum + Number(this.food[kind][index].current_price)
                this.$set(this.sumPrice, 0, sum)
            }
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
        setTimeout(this.getMenu,0),
        setInterval(this.getMenu,2000)
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
    height: 50px;
    background-color: #40a0ffa2;
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
.shulianglan {
  background: rgba(255, 252, 252, 0.699);
  text-align: center;
  position: relative;
  top: -25px;
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