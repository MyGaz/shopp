import { request } from "../../request/index.js";
wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getSwiperList(){
    request({url:"/home/swiperdata"}).then(request=>{
      this.setData({
              swiperList:request.data.message
       })
    })
  },
  getCatesList(){
    request({url:"/home/catitems"}).then(request=>{
      request.data.message[0].navigator_url="/pages/category/category";
      this.setData({
        catesList:request.data.message
       })
    })
  },
  getFloorList(){
    request({url:"/home/floordata"}).then(request=>{
      request.data.message.forEach(v=>{
        v.product_list.forEach(p=>{          
          let req= p.navigator_url.substring(17,26);
          let baseUrl="/pages/goods_list/goods_list";
          p.navigator_url=baseUrl+req;
        })
      })
      // console.log(request.data.message.product_list.navigator_url);
      this.setData({
        floorList:request.data.message
       })
    })
  },
  onLoad: function (options) {
     this.getSwiperList();
     this.getCatesList();
     this.getFloorList();
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