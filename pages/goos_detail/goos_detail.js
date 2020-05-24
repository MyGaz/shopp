import { request } from "../../request/index.js";
import { showToast } from "../../utils/address";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goos_detail:[],
    isCollect:false
  },
  Goods_pics:{},
  Goods_Info:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let options=pages[pages.length-1].options;
    const {goods_id} =options;
    this.getGoosDetail(goods_id);
  },
  checkCollect(){
    let isCollect=false
    const collect=wx.getStorageSync("collect")||[];
    let index= collect.findIndex(v=>v.goods_id===this.Goods_Info.goods_id)
    if (index===-1) {
      collect.push(this.Goods_Info)
      isCollect=true
      showToast({title:"收藏成功"})
    }else{
      collect.splice(index,1)
      isCollect=false
      showToast({title:"取消成功"})
    }
    wx.setStorage({
      key: 'collect',
      data: collect
    });
    this.setData({
      isCollect
    })
  },

getGoosDetail(goods_id){
  request({url:"/goods/detail",data:{goods_id}}).then(res=>{
    this.Goods_pics=res.data.message.pics
    this.Goods_Info=res.data.message
    const collect=wx.getStorageSync("collect")||[];
    let isCollect= collect.some(v=>v.goods_id===this.Goods_Info.goods_id)
    this.setData({
      goos_detail:{
        goods_name:res.data.message.goods_name,
        goods_price:res.data.message.goods_price,
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:res.data.message.pics
      },
      isCollect
    })
  })
},
preview(e){
  const urls =this.Goods_pics.map(v=>v.pics_mid);
  const current =e.currentTarget.dataset.url; 
  wx.previewImage({
    current,
    urls
  });
},
goodsAdd(){
  let carts=wx.getStorageSync("carts")||[];
  const num= carts.findIndex(v=>v.goods_id===this.Goods_Info.goods_id)
  if (num===-1) {
    this.Goods_Info.nums=1,
    this.Goods_Info.checked=true,
    carts.push(this.Goods_Info)
  }else{
    carts[num].nums++;
  }
  wx.setStorage({
    key: 'carts',
    data: carts
  });
  wx.showToast({
    title: '添加成功',
    icon: 'succes',
    mask: true
  });
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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