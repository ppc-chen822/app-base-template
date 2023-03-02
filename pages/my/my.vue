<template>
  <view class="page-container">
    <!-- 个人信息 -->
    <view class="head-content">

      <view class="left">
        <view class="head">
          <view class="avatar" @click="changeAvatar">
            <u-avatar
              :src="avatar"
              bg-color="#ffffff"
              color="#2279ff"
              font-size="26"
              :text="avatar ? '' : $getFirstName(user.realName)"
              size="140rpx"
              mode="aspectFill"
            />
          </view>
          <!-- <view class="sex">
            <u-icon :name="user.sex === 1 ? 'man' : 'woman'" color="#ffffff" size="16"></u-icon>
          </view> -->
        </view>

        <view class="info">
          <view class="one">
            <text class="name">{{ user.realName }}</text>
            <text class="age">{{ initAge || '--' }}岁</text>
          </view>
          <view class="two" v-if="user.isParty">
            <image
              :src="partImg"
              mode="scaleToFill"
              style="width: 112rpx;height: 44rpx;"
            />
          </view>
          <view class="three">
            <text>联系方式 {{ user.phone || '--' }}</text>
          </view>
        </view>
      </view>
      <view class="right">

      </view>
    </view>

    <!-- 快捷方式 -->
    <!-- <view class="b-content">
      <view class="content">
        <view
          class="item"
          v-for="(item, index) in items"
          :key="index"
          @click="itemClick(item.navigate)"
        >
          <image class="img" :src="item.icon" />
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view> -->

    <!-- 其他设置 -->
    <view class="other">
      <view class="title">
        <commonTitle :title="other.title" />
      </view>
      <view class="other-content">
        <u-cell-group :border="false">
          <!-- :url="item.navigate" -->
          <u-cell
            v-for="item in other.list"
            :key="item.name"
            :title="item.name"
            :border="item.border"
            :isLink="true"
            :titleStyle="{ fontSize: '26rpx', fontWeight: 500 }"
            :rightIconStyle="{ marginRight: '-40rpx' }"
            :name="item.navigate"
            @click="clickCell"
          >
            <image
              slot="icon"
              :src="item.icon"
              :style="{ width: item.width, height: item.height }"
              class="list-icon"
            />
          </u-cell>
        </u-cell-group>
      </view>
    </view>

    <!-- <fab /> -->
    <uploadFun ref="upload" @uploadSuccess="updateAvatarFun" />
  </view>
</template>

<script>
import fab from '@/components/fab/fab.vue';
import uploadFun from "@/components/upload/uploadFun.vue";
import { updateAvatarApi, logOutApi } from '@/api/my.js'
export default {
  components: { fab, uploadFun },
  data() {
    return {
      partImg: `${this.imgUrl}/party/enterPartyProcess/party.png`,
      user: uni.getStorageSync('userInfo'),
      avatar: '',
      items: [
        {
          icon: `${this.imgUrl}/my/shortcut/a.png`,
          name: "身份采集",
          navigate: "/pagesMy/my/faceAudit/faceAudit",
        },{
          icon: `${this.imgUrl}/my/shortcut/b.png`,
          name: "我的办事",
          navigate: "/pages/business/businessProcess/businessProcess",
        },{
          icon: `${this.imgUrl}/my/shortcut/f.png`,
          name: "我的任务",
          navigate: "/pagesEnvironment/environment/task/myTaskList",
        },{
          icon: `${this.imgUrl}/my/shortcut/h.png`,
          name: "我的积分",
          navigate: "/pagesEnvironment/environment/task/integral/integral",
        },
        {
          icon: `${this.imgUrl}/my/shortcut/g.png`,
          name: "我的上报",
          navigate: "/pagesMy/my/myReport/myReport",
        },
        {
          icon: `${this.imgUrl}/my/shortcut/e.png`,
          name: "开门记录",
          navigate: "/pagesGirdManagement/openDoorRec",
        },{
          icon: `${this.imgUrl}/my/shortcut/c.png`,
          name: "我的卡证",
          navigate: "",
          // /pagesMy/my/myCard/myCard
        },
        // {
        //   icon: `${this.imgUrl}/my/shortcut/d.png`,
        //   name: "帮助指引",
        //   navigate: "/pagesMy/my/help/help",
        // },
      ],
      other: {
        title: "其他设置",
        list: [
          {
            icon: `${this.imgUrl}/my/personal.png`,
            name: "个人信息",
            navigate: "/pagesMy/my/userInfo",
            border: true,
            width: "38rpx",
            height: "38rpx",
          },
          {
            icon: `${this.imgUrl}/my/help.png`,
            name: "帮助指引",
            navigate: "/pagesMy/my/help/help",
            border: true,
            width: "44rpx",
            height: "44rpx",
          },
          {
            icon: `${this.imgUrl}/my/about.png`,
            name: "关于我们",
            navigate: '/pages/index/threeOpen/newsDetail?id=1576106058639622146&title=关于我们',
            border: true,
            width: "38rpx",
            height: "38rpx",
          },
          {
            icon: `${this.imgUrl}/my/password.png`,
            name: "修改密码",
            navigate: "/pages/login/updatePassword",
            border: true,
            width: "38rpx",
            height: "38rpx",
          },
          {
            icon: `${this.imgUrl}/my/power.png`,
            name: "退出登录",
            navigate: `/pages/login/login?cleanToken=${true}`,
            border: false,
            width: "38rpx",
            height: "38rpx",
          },
        ],
      },
    };
  },
  onShow() {
    this.avatar = uni.getStorageSync('userInfo').avatar
  },
  computed: {
    // 加载年龄
		initAge() {
      const { idCard } = this.user
      if(idCard) {
        const year = idCard.substring(6, 10)
        const nowYear = new Date().getFullYear()
        return nowYear - year
      }
		},
  },
  methods: {
    itemClick(url) {
      if(url) {
        uni.navigateTo({ url })
      }else{
        uni.$u.toast('正在开发中...')
      }
    },
    
    clickCell({ name }) {
      if(name.includes('cleanToken')){
        uni.showModal({
          title: '退出登录',
          content: '确定退出登录吗？',
          success: (res) => {
            if (res.confirm) {
              // logOutApi().then(() => {
                uni.reLaunch({
                  url: name
                });
              // })
            }
          }
        });
      }else{
        uni.navigateTo({
          url: name,
        });
      }
    },

    // 修改头像
    changeAvatar() {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], //从相册选择
        success: (res) => {
          uni.showLoading({ title: '上传中' })
          let faceImg = res.tempFilePaths[0]
          // 获取图片的size
          uni.getFileInfo({
            filePath: faceImg,
            success: (res) => {
              const fileData = {
                url: faceImg,
                size: res.size,
              };
              // 上传图片操作
              this.$refs.upload.afterRead(fileData)
            },
            fail: (err) => {
              uni.$u.toast('上传失败，请稍后重试')
              console.log(err);
            }
          })
        }
      });
    },

    // 人脸上传成功[回调] 上传用户头像
    updateAvatarFun(data) {
      const avatarAddress = data.address
      const userObj = uni.getStorageSync('userInfo')
      const params = {
        avatar: avatarAddress,
      }
      updateAvatarApi(params).then((res) => {
        let newUserObj = Object.assign({}, userObj, {
          avatar: avatarAddress
        })
        uni.setStorageSync('userInfo', newUserObj)
        uni.showToast({
          type: 'success',
          title: '上传成功'
        })
        uni.hideLoading();
        this.avatar = avatarAddress
      }).catch(err => {
        uni.$u.toast('上传失败，请稍后重试')
        uni.hideLoading();
        console.log(err);
      })
    },
  },
};
</script>

<style>
  page {
    background: linear-gradient(90deg, #E6EEFB, #f9fafe);
  }
</style>
<style lang="scss" scoped>
  .page-container {
    .head-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10rpx 32rpx;
      margin-top: 30rpx;
      .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10rpx 32rpx;
        .head {
          .sex{
            width: 40rpx;
            height: 40rpx;
            background: #2a82e4;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            position: relative;
            top: -30rpx;
            left: 95rpx;
          }
        }
        .info{
          // border: 1px solid;
          height: 150rpx;
          margin-left: 36rpx;
          display: flex;
          justify-content: space-evenly;
          flex-direction: column;
          .one {
            .name {
              font-size: 36rpx;
              font-weight: 700;
            }
            .age {
              margin-left: 26rpx;
              font-size: 28rpx;
            }
          }
          .three {
            font-size: 28rpx;
            color: #000000;
          }
        }
      }
      .right{

      }
    }

    .b-content {
      border-radius: 0 20rpx 20rpx 0;
      .content {
        background-color: #ffffff;
        border-radius: 20rpx;
        margin: 0 32rpx;
        padding-top: 0;
        padding-bottom: 30rpx;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 25%;
          margin-top: 30rpx;

          .img {
            width: 72rpx;
            height: 72rpx;
            margin-bottom: 8rpx;
          }

          font-size: 26rpx;
          font-weight: 500;
          color: #808080;
        }
      }
    }
    .other {
      background-color: #ffffff;
      border-radius: 20rpx;
      margin: 32rpx 32rpx;
      padding: 32rpx 32rpx 0 32rpx;
      .title {
        margin-top: 6rpx;
      }
      .other-content {
        margin-top: 18rpx;
        .list-icon {
          width: 30rpx;
          height: 32rpx;
          margin: 19rpx 14rpx 19rpx -26rpx;
        }
      }
    }
  }
</style>
