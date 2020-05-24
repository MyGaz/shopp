import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },
  cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cates =wx.getStorageSync("cate");
    if (!cates.data) {
      this.getData();
    }
    else{
      if (Date.now() - cates.time > 1000*10) {
        this.getData();
      }else{
        this.cates=cates.data;
        let leftMenuList=this.cates.map(v=>v.cat_name);
        let rightContent=this.cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
        
      }
    }
  },
  getData(){
    request({
      url:"/categories"
    }).then(res=>{
      this.cates=res.data.message;

      wx.setStorageSync("cate",{time:Date.now(),data:this.cates});

      let leftMenuList=this.cates.map(v=>v.cat_name);
      let rightContent=this.cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  itemIndexTap(e){
   const {index} =e.currentTarget.dataset;
   let rightContent=this.cates[index].children;
   this.setData({
    currentIndex:index,
     rightContent,
     scrollTop:0
   })
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})