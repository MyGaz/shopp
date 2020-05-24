import {
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/address.js";
Page({
  data: {
    address: {},
    IsHidden: false,
    carts: [],
    isChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  addressAdd() {
    try {
      wx.getSetting({
        success: (result) => {
          const address = result.authSetting["scope.address"];
          if (address === true || address === undefined) {
            chooseAddress().then(res => {
              this.setData({
                address: res,
                IsHidden: true
              })
              wx.setStorage({
                key: 'address',
                data: res,
                IsHidden: true
              });
            });
          } else {
            openSetting();
            chooseAddress().then(res => {
              wx.setStorage({
                key: 'address',
                data: res,
                IsHidden: true
              });
              this.setData({
                address: res,
                IsHidden: true
              })
            });
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  },
  checkStatic(e) {
    let {
      carts
    } = this.data;
    const index = carts.findIndex(v => v.goods_id === e.currentTarget.dataset.id);
    carts[index].checked = !carts[index].checked;

    this.setCart(carts);
  },
  setCart(carts) {
    let isChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    carts.forEach(e => {
      if (e.checked) {
        totalPrice += e.nums * e.goods_price;
        totalNum += e.nums;
      } else {
        isChecked = false;
      }
    });
    isChecked = carts.length !== 0 ? isChecked : false;
    this.setData({
      carts,
      isChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("carts", carts);
  },
  bindChangeStatic() {
    let {
      carts,
      isChecked
    } = this.data;
    isChecked = !isChecked
    carts.forEach(e => e.checked = isChecked);
    const cart = wx.getStorageSync("carts") || [];
    cart.forEach(e => e.checked = isChecked);
    wx.setStorage({
      key: 'carts',
      data: cart
    });
    this.setCart(carts);
  },
  calculation(e) {
    let {
      carts
    } = this.data;
    let {
      id,
      set
    } = e.currentTarget.dataset;
    const index = carts.findIndex(v => v.goods_id === id);
    if (set === -1 && carts[index].nums === 1) {
    showModal({content:"你要删除此商品吗"}).then(res=>{

      if (res.confirm) {
        carts.splice(index,1)
        this.setCart(carts);
      }
    });
    }else{
      carts[index].nums += set;
      this.setCart(carts)
      wx.setStorage({
        key: 'carts',
        data: carts
      });
    }
  },
  settlement(){
    let {address,totalNum} =this.data;
    if (address.userName) {
      if (totalNum===0) {
        showToast({title:"你还没有选择商品"});
        return;
      }else{
        wx.navigateTo({
          url: '/pages/pay/pay'
        });
      }
    } else {
      showToast({title:"你还没有收货地址"});
      return;
    }
  },
  onShow: function () {
    const carts = wx.getStorageSync("carts") || [];
    this.setCart(carts);
  }


})