let num=0;
export const request=(param)=>{
    num++,
    wx.showLoading({
        title: '加载中'
      })
      const header={...param}
      if (param.url.includes("/my/")) {
        header["Authorization"] = wx.getStorageSync("token");
      }
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolive,reject)=>{
        wx.request({
            ...param,
            header,
            url:baseUrl+param.url,
             success: (result) => {
                resolive(result);
             },
             fail: (err) => {
                reject(err);
             },
             complete(){
                 num--;
                 if (num===0) {
                    wx.hideLoading()
                 }
             }
         });
    })
      
}