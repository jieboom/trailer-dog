
# **小程序预告汪**
**这是一个基于小程序开发的一款预告片浏览、观看、分享和评论的应用程序，并且可以使用关键词搜索相关内容、个人中心支持保存个人信息，以及浏览历史记录和个人收藏等功能。**

---


## __基本架构__

- __数据的爬取__
1. 数据的来自于豆瓣电影,因为豆瓣电影限制了小程序对其直接发起的请求，且豆瓣所提供的资源链接存在时效性，所以需要将资源爬取存储在云空间里。
2. 借助node.js的[puppeteer](https://github.com/GoogleChrome/puppeteer)库(使用一个高级API来通过DevTools协议来控制Chrome或Chromium)爬取豆瓣电影预告片的相关数据,数据爬取之后保存在[七牛云](https://www.qiniu.com/)中。
  
- __小程序开发__
1. 小程序前端部分使用小程序的原生开发。
  
2. 后端部分使用小程序提供的云能力，即小程序的云开发。
      > 云开发为开发者提供完整的云端支持，弱化后端和运维概念，无需搭建服务器，使用平台提供的 API 进行核心业务开发，即可实现快速上线和迭代，同时这一能力，同开发者已经使用的云服务相互兼容，并不互斥。
   - 云函数实现相关业务逻辑的操作,可以自动实现微信鉴权
   - 云数据库保存了电影预告片的相关数据,可以在小程序端操作,也可以在云函数端操作。
  

  ---
## __历史版本__

     
  ###  __2019/04/02__  数据爬取完成

  - 电影预告片的爬取基本完成,并存储在云空间中。
  
 
 ### __2019/04/21__  小程序demo完成(上传体验版)
- 主体分为四部分 推荐页、频道页、看点页、个人中心
- 推荐页包含了 电影预告片搜索、热门电影预告片轮播、高分电影预告片列表展示
- 频道页通过对电影标签的分析进行分类展示
- 看点页对用户的浏览记录和收藏列表进行分析处理，推送用户喜欢的内容
- 个人中心页保存了用户个人数据和观看记录等等

  __下一步要优化相关的页面和功能__
  - 电影搜索结果和电影列表为空时,需要有置空处理 √
  - 历史记录和收藏列表也需要置空处理 √
  - 频道页，看点页还需要完善 √
  - 相似推荐的算法过于简单，还需要优化 √
  - ios设备不能兼容webp格式的图片，需要转化为jpg或png
  - 页面内容加载时需要添加相关样式实现懒加载  √
  - 添加分享功能 √
  - tabBar 自定义修改  


### __2019/04/30__  页面相关优化以及看点页

#### 看点页逻辑处理
- 统计历史记录中电影预告片的类型
- 分析统计结果,判断用户电影预告片的喜好
- 向用户推荐感兴趣内容

  ##### __方案__
  1. 获取历史记录中所有类型,并统计类型的权重
  2. 数据库中每一个doc进行相对于用户的权重计算
  3. 对权重计算结果进行排序,然后进行推送
  > 推荐系统的整体结构如图所示，各个模块的作用如下：
   1.用户画像：包含用户的人群属性、历史行为、兴趣内容和偏好倾向等多维度的分析，是个性化的基石
2.特征工程：包含了了视频的类别属性，内容分析，人群偏好和统计特征等全方位的描绘和度量，是视频内容和质量分析的基础
3.召回算法：包含了多个通道的召回模型，比如协同过滤，主题模型，内容召回和SNS等通道，能够从视频库中选出多样性的偏好内容
4.排序模型：对多个召回通道的内容进行同一个打分排序，选出最优的少量结果。




 
     
     
