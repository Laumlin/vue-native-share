# vue-native-share

> 一个vue移动端的h5分享组件
支持的浏览器：UC浏览器，QQ浏览器，百度浏览器
不支持则提示：手动调起浏览器自带的分享面板

##使用
```js
npm i vue-native-share 

import vueNativeShare from 'vue-native-share'

components: {
    vueNativeShare
}

data () {
 return {
    shareMenu: [0,3,5],
    config: {
    title: '分享标题',
    desc:'描述',
    img:'图片地址',
    img_title:'图片标题',
    link: '当前链接',
    success: () => {console.log('success')}, //成功回调
    cancel: () => {console.log('cancel')}, //取消回调
    }
}

<vue-native-share :shareMenu="shareMenu" :config="config" />
```

### 关于shareMenu
| shareMenu | 分享面板 |
| -- | -- | 
| [0] | 微信好友 |
| [1] | 朋友圈 |
| [2] | 新浪微博 |
| [3] | qq好友 |
| [4] | qq空间 |
| [5] | 更多 |
不传入shareMenu则默认设为[0,1,2,3,4,5]



