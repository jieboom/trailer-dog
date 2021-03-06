const app = getApp()
Page({
    key:'',
   data:{
    initValue:'',
    hotKeyList:["蜘蛛侠","复仇者联盟4","何以为家",'无名之辈','霸王别姬'],
    historyKeyList:[]
   },
   onLoad(){
     const self = this
     const historyKeyList = app.globalData.userMovieInfo.historyKey 
     self.setData({
        historyKeyList
     })
     wx.cloud.callFunction({
         name:"fetchHotSearch",
         data:{

         }
     }).then(res => {
           console.log(res);
           
           if(res.result.hotKeyList.length > 0){
                self.setData({
                    hotKeyList: res.result.hotKeyList
                })
           }
     } )
   },
   onShow(){
      this.setData({
          initValue: ''
      })
   },
   setKey(e){
       this.key = e.detail.value
   },
   searchByKey(e){
       const self = this
      //判断是否是热门和历史搜索触发的
      if(e.currentTarget.dataset.key){
          self.key = e.currentTarget.dataset.key
      }
      //判断搜索关键字是否与历史搜索重复,
      //如若重复,就将该关键字提升到历史搜索的第一位

      let historyKeyList = self.data.historyKeyList
      historyKeyList = historyKeyList.filter(el => {
          if( el !== self.key) return el
      })

      //判断搜索历史长度是否超过长度,如若是,就删除最后一个关键字
      if( self.data.historyKeyList.length === 10 ){
        historyKeyList.pop()
      }

      historyKeyList.unshift(self.key)
      setTimeout( () => {
        self.setData({
            historyKeyList: historyKeyList
        })
      },1000)
      app.globalData.userMovieInfo.historyKey  = historyKeyList
      wx.navigateTo({
          url: '../searchResult/searchResult?key='+self.key 
      })
   }
   
   
})