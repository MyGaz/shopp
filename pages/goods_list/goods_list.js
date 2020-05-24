import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goods_list:[]
  },
  totalPage:1,
QueryParams:{
  query:"",
  cid:"",
  pagenum:1,
  pagesize:10
},
  tabCheckColor(e){
   const {index} =e.detail;
   const {tabs} =this.data;
   tabs.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false);
   this.setData({
     tabs
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getGoodsList();
  },
  getGoodsList(){
    request({url:"/goods/search",data:this.QueryParams})
    .then(res=>{
      this.totalPage=res.data.message.total;
      this.setData({
        goods_list:[...this.data.goods_list,...res.data.message.goods]
      })
      wx.stopPullDownRefresh();
    })
  },
  onReachBottom: function () {
    if (this.QueryParams.pagenum>=Math.ceil(this.totalPage / this.QueryParams.pagesize)) {
        wx.showToast({
          title: '没有下一条了'
        });
          
    }else{
     
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh: function () {
    this.data.goods_list=[];
    this.QueryParams.pagenum=1;
    this.getGoodsList();
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
 

  /**
   * 页面上拉触底事件的处理函数
   */
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})