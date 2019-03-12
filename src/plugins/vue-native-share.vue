<template>
  <div id="nativeShare">
    <div class="label">分享到</div>
    <div class="list">
      <span class="list-item" v-for="(button, index) in shareButtons" :key="index">
        <img :src="button.src" class="i" @click="call(button)">
        {{button.text}}
      </span>
    </div>
  </div>
</template>

<script>
import NativeShare from 'nativeshare'
import mShare from 'm-share'
export default {
  name: 'vue-share-native',
  data() {
    return {
      Buttons:[
        {text: '微信好友', nativeshare:'wechatFriend', m_share: 'wx' , src: require('../assets/weixin.png')},
        {text: '朋友圈', nativeshare:'wechatTimeline', m_share: 'wxline', src: require('../assets/wxfriend.png')},
        {text: '新浪微博', nativeshare:'weibo', m_share: 'sina', src: require('../assets/weibo.png')},
        {text: 'QQ好友', nativeshare:'qqFriend', m_share: 'qq', src: require('../assets/qq.png')},
        {text: 'QQ空间', nativeshare:'qZone', m_share: 'qzone', src: require('../assets/qqzone.png')},
        {text: '更多', nativeshare:'', m_share: '', src: require('../assets/more.png')},
      ]
    }
  },
  props: {
    config: Object,
    shareMenu: Array,
  },
  computed: {
    shareButtons() {
        if (!this.shareMenu) {
            return this.Buttons
        }
        return this.shareMenu.map(i => this.Buttons[i]).filter(i => i !== undefined)
    }
  },
  methods: {
    call(command) {
      let shareData = {  //nativeShare的参数模型
          title: this.config.title,
          desc: this.config.desc,
          // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
          link: this.config.link,
          icon: this.config.url,
          // 不要过于依赖以下两个回调，很多浏览器是不支持的
          success: this.config.success,
          fail: this.config.cancel,
      }
      let mShareData = {  //m-share的参数模型
            title: this.config.title, // 标题，默认读取document.title
            desc: this.config.desc, // 描述, 默认读取head标签：<meta name="description" content="desc" />
            link: this.config.link, // 网址，默认使用window.location.href
            imgUrl: this.config.img, // 图片, 默认取网页中第一个img标签
            fnDoShare: this.config.success,
      }
      let nativeShare = new NativeShare()
      nativeShare.setShareData(shareData)
      try {
        nativeShare.call(command.nativeshare)
      } catch(e) {
        //iphone的qq浏览器调用此api
        //除iphone的qq浏览器外其他浏览器调用的api
        //在iphone的qq浏览器中比较奇葩，第一次调用nativeShare.call()会报错，第二次之后不报，这里是让每次调用nativeShare.call()之后都报错，然后统一去调m-share.to()方法
        mShare.to(command.m_share, mShareData)
      }
    }
  }
}
</script>

<style scoped>
#nativeShare {
  font-size: 13px;
}
  .label {
    font-size: 18px;
    text-align: center;
  }
  .list {
    text-align: center;
  }
    .list-item {
      width: 30%;
      display: inline-block;
      text-align: center;
      margin: 10px 0;
    }
      .i {
        width: 40px;
        height: 40px;
        display: block;
        margin: 0 auto;
        margin-bottom: 5px;
        background-size: cover;
      }
</style>