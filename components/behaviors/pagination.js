let paginationBev = Behavior({
    properties:{},
    data:{
        dataArray:[],
        total:null,
        noneResult: false,
        loading:false
    },
    methods:{
        setMoreData(dataArray){
            const temp = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray:temp
            })
        },

        getCurrentStart(){
            return this.data.dataArray.length
        },
        //初始化
        initialize(){
            this.setData({
                noneResult:false,
                dataArray:[],
                loading:false
              })
            this.data.total = null
        },

        setTotal(total){
            this.data.total = total
            if(total == 0){
                this.setData({
                    noneResult:true
                })
            }
        },

        hasMore(){
            if(this.data.dataArray.length>= this.data.total){
                return false
            } else {
                return true
            }
        },

        isLocked(){
            return this.data.loading ?true :false
        },

        unLocked(){
            this.setData({
                loading:false
            })
        },

        locked(){
            this.setData({
                loading:true
            })
        }


    }
})

export {paginationBev}