//index.js
const newsType1 = ['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other']
const newsType2 = ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他']
var currentType = 'gn'

Page({
  data: {
    newsType2 : ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    newsList : [],
  },
  // 页面加载
  onLoad() {
    this.getNews('gn')
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getNews(currentType)
    wx.stopPullDownRefresh()
  },
  // 点选新闻类别
  bindNews(event) {
    let index = event.currentTarget.dataset.index
    let newsType = newsType1[index]
    currentType = newsType
    this.getNews(newsType)
  },
  // 获取新闻信息
  getNews(newsType) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType
      },
      success: res => {
        let newsList = res.data.result
        for (var i=0; i<newsList.length; i++) {
          let date = newsList[i].date;
          newsList[i].date = date.slice(0,10) + ' ' + date.slice(11,16)
        }
        this.setData({
          newsList: res.data.result,
        })
        wx.showToast({
          title: '获取数据成功',
        })
      }
    })
  },
  // 获取新闻详情
  getDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  }
})
