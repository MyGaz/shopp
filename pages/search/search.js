// pages/search/search.js
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inputValue:""
  },
  setTime:-1,
  handBindInput(e){
    const {value}=e.detail;
    if (!value.trim()) {
      clearTimeout(this.setTime)
      this.setTime= setTimeout(() => {
        this.setData({
          goods:[],
          isFocus:false
        })
      }, 1000);
      return;
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.setTime)
    this.setTime=setTimeout(() => {
      this.qSearch(value);       
    }, 1000);
  },
  qSearch(query){
    request({url:"/goods/qsearch",data:{query}}).then(res=>{
      this.setData({
        goods:res.data.message
        
      })
    })
  },
  clearSearchContent(){
    this.setData({
      goods:[],
      isFocus:false,
      inputValue:""
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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