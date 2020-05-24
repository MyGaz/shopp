// pages/feedback/feedback.js
import { showToast } from "../../utils/address";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    image: [],
    textVal: ""
  },
  uploadImage:[],
  setTime: -1,
  inputText(e) {
    const {
      value
    } = e.detail;
    this.setData({
      textVal: value
    }) 
  },
  feedbackCommit(){
    let {image,textVal}= this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    if (image.length!=0) {
      showToast({title:"正在上传"});
      image.forEach((v,i)=>{
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          filePath: v,
          name: "file",
          formData: {},
          success: (result)=>{
            if (i===image.length-1) {
              console.log("提交到服务器");
              this.setData({
                image:[],
                textVal:""
              })
              showToast({title:"上传完成"});
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      })
    }else{
      showToast({title:"正在上传"})
    }
   
  },
  clearImage(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let {
      image
    } = this.data;
    image.splice(index, 1)
    this.setData({
      image
    })
  },
  handChooseImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          image: [...this.data.image, ...result.tempFilePaths]
        })
      }
    });
  },
  tabCheckColor(e) {
    const {
      index
    } = e.detail;
    const {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
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