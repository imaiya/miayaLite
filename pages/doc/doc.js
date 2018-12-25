// pages/doc/doc.js
Page({

  data: {
    md_content: '',
    showLoading: true,
    name: ''
  },

  onShareAppMessage(res) {
    return {
      title: 'API文档查询',
      path: 'pages/api/api'
    }
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name.replace('.md', '')
    })
    this.data.name = options.name.replace('.md', '')
    //云函数转发调用
    wx.BaaS
      .invokeFunction('githubTranspond', {
        url: options.download_url
      })
      .then(res => {
        console.log(res)
        var md = res.data.replace(new RegExp('\\]\\(', 'g'), '](' + options.download_url.replace(options.name, ''))
        this.setData({
          md_content: md
        })
        var that = this
        setTimeout(function() {
          that.setData({
            showLoading: false
          })
        }, 1000);
      })
  },

})