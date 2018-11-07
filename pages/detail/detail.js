// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newDetail: null,
  },

  // 获取新闻详情
  getDetail(id) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id
      },
      success: res => {
        let newDetail = res.data.result
        let date = newDetail.date;
        newDetail.date = date.slice(5, 10) + ' ' + date.slice(11, 16)
        this.setData({
          newDetail: res.data.result,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
  },
})