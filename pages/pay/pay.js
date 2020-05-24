import {
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment
} from "../../utils/address.js";
import { request } from "../../request/index";
Page({
  data: {
    address: {},
    carts: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function () {
    let carts = wx.getStorageSync("carts") || [];
    const address = wx.getStorageSync("address") || [];
    carts = carts.filter(v => v.checked === true)
    let totalPrice = 0;
    let totalNum = 0;
    carts.forEach(e => {
      totalPrice += e.nums * e.goods_price;
      totalNum += e.nums;
    });
    this.setData({
      carts,
      totalPrice,
      totalNum,
      address
    })
  },
  payment() {
   try {
      wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
    const token= wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
      return
    }
    // const header={Authorization:token};
    const order_price=this.data.totalPrice;
    let consignee_addr=this.data.address.all;
    const goods=[];   
    this.data.carts.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.nums,
      goods_price:v.goods_price
    }))
    let orderParams={order_price,consignee_addr,goods};
      request({url:"/my/orders/create",method:"POST",data:orderParams}).then(res=>{        
       const {order_number}=res.data.message;
       request({url:"/my/orders/req_unifiedorder",method:"POST",data:{order_number}}).then(result=>{
         wx.navigateTo({
           url: '/pages/order/order?type=1'
         });
        let carts= wx.getStorageSync("carts");
        carts= carts.filter(v=>!v.checked)
        wx.setStorage({
          key: 'carts',
          data: carts
        });
        //  const {pay}=res.data.message;
        //   requestPayment(pay).then(result=>{
        //   showToast({title:"支付成功"})
        //  })
       })
      })
   
   } catch (error) {
     console.log(error);
     
   }   
  }

})