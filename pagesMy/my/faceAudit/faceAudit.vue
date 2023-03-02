<template>
	<view class="face-audit-container" :style="{backgroundImage: `url(${bgImg})`}">
    <view class="histroy" @click="goToHistroy">
      <view class="btn">采集记录</view>
    </view>
    <view class="avatar-content">
      <image
        v-if="faceImg"
        :src="faceImg" 
        style="
          width: 400rpx;
          height: 420rpx;
          border-radius: 50%;
          margin-top: 340rpx;
        "
      />
    </view>

    <view class="tools-con">
      <view class="inner-content">
        <view class="tip">
          <view class="tip1">您即将进行</view>
          <view class="tip2">人脸采集认证</view>
        </view>
        
        <u-button :text="faceImg ? '重新采集' : '快速采集'" @click="openFace" color="#2f85e5" />
        <view class="btn" v-if="faceImg">
          <u-button :loading="loading" loading-text="绑定中..." text="绑定至门禁" @click="saveFace" color="#2f85e5" />
          <!-- <view class="agreement">
            <u-checkbox-group v-model="isAgree">
              <u-checkbox shape="circle" name="同意" label=" " />
            </u-checkbox-group>
            <view class="anonymous-tip">
              同步至系统头像
            </view>
          </view> -->
        </view>
      </view>

    </view>

    <face-detect
      ref="faceDetect"
      @detectFailed="detectFailed"
      @photoChange="photoChange"
      @detectOver="detectOver"
    />
    <upload v-show="false" ref="upload" @uploadSuccess="uploadSuccessFun" />
    <bind-process
      ref="bindProcess"
      :doorList="doorList"
      :doorBindPro="doorBindPro"
      @bindAgain="registDoorUserFun"
    />
	</view>
</template>

<script>
import FaceDetect from '../components/face-detect.vue'
import Upload from "@/components/upload/uploadFun.vue";
import { registDoorUserApi, getDoorListApi } from '@/api/girdManagement/door.js'
import { linkFileApi } from '@/api/common.js'
import BindProcess from './bindProcess.vue';
export default {
  components: { FaceDetect, Upload, BindProcess },
  data() {
    return {
      loading: false,
      faceImg: '',
      saveedImg: {},
      bgImg: `${this.imgUrl}/my/faceAudit/face.png`,
      isAgree: [],
      doorList: [],
      doorNum: 0,
      doorBindNum: 0,

      doorBindPro: []
    }
  },
  mounted() {
    this.getDoorListFun()
  },
  methods: {
    // 进入历史记录页面
    goToHistroy() {
      uni.navigateTo({ url: '/pagesMy/my/faceAudit/faceHistory' })
    },
    openFace(){
      this.$refs.faceDetect.initData()
    },

    //人脸核验提交成功执行 
    detectOver(){
      uni.showToast({
        title:"人脸核验流程结束~",
        icon: 'none'
      })
    },
    // 人脸核验完成[回调]
    photoChange(imgData){
      console.log(imgData);
      const imgPath = imgData.tempImagePath
      // 回显图片
      this.faceImg = imgPath
      this.$refs.faceDetect.detectOver()
      uni.showToast({
        type: 'success',
        title: '采集成功!'
      })
    },
    
    // 人脸核验相机执行失败[回调]
    detectFailed(){
      uni.showToast({
        title:"人脸核验失败~",
        icon: 'none'
      })
    },

    // 保存采集到的人脸[按钮]
    saveFace() {
      const { faceImg } = this
      // 获取图片的size
      uni.getFileInfo({
        filePath: faceImg,
        success: (res) => {
          this.loading = true
          console.log(res, 'size');
          const fileData = {
            url: faceImg,
            size: res.size,
          };
          // 上传图片操作
          this.$refs.upload.afterRead(fileData)
        },
        fail: (err) => {
          uni.$u.toast('上传失败，请稍后重试')
          this.loading = false
          console.log(err);
        }
      })
    },

    // 人脸上传成功[回调]
    uploadSuccessFun(data) {
      console.log(data);
      this.saveedImg = data

      // 绑定人脸到门禁系统
      this.regiestDoor()

      // 将人脸的图片id绑定该用户的成员id
      this.linkFileFun(data.id)

    },

    // 给每个门禁绑定人脸信息
    regiestDoor() {
      const { doorList } = this
      if(doorList && doorList.length > 0) {
        this.$refs.bindProcess.show()
        doorList.forEach((ele, index) => {
          if(ele.code) {
            this.doorNum++
            this.registDoorUserFun(ele.code, index)
          }
        })
      }
    },

    // =============== API ===============
    // 获取 门禁列表
    getDoorListFun() {
      getDoorListApi().then((res) => {
        this.doorList = res

        // 门禁绑定状态
        // 0: 绑定中, 1:绑定成功 2:绑定失败
        for (let i = 0; i < res.length; i++) {
          this.doorBindPro.push({ status: 0 })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // 门禁信息采集
    registDoorUserFun(doorCode, doorIndex) {
      const { saveedImg } = this
      const dateRange = [
        this.$u.timeFormat(new Date().getTime(), 'yyyy-mm-ddThh:MM:ss'),
        this.$u.timeFormat(new Date().getTime() + (86400000 * 365) , 'yyyy-mm-ddThh:MM:ss')
      ]
      const params = {
        beginTime: dateRange[0],
        endTime: dateRange[1],
        employeeNo: uni.getStorageSync('userInfo').id,
        gender: "male",
        name: uni.getStorageSync('userInfo').realName,
        userType: "normal",
        url: saveedImg.address,
      }
      
      registDoorUserApi(doorCode, params).then((res) => {
        this.doorBindPro[doorIndex].status = 1
        this.doorBindNum = this.doorBindNum + 1
        console.log(this.doorBindNum, this.doorNum, 'sss');
        
        // if(this.doorBindNum === this.doorNum) {
          this.loading = false
          uni.showToast({
            type: 'success',
            title: '采集完成!'
          })
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/my/my'
            });
          }, 1500)
        // }
      }).catch(err => {
        this.doorBindPro[doorIndex].status = 2
        console.log(err);
      })
    },

    // 将上传的附件绑定业务id
    linkFileFun(id) {
      const params = {
        businessId: uni.getStorageSync('userInfo').id,
        ids: [id]
      }
      linkFileApi(params).then((res) => {
        console.log('绑定成功');
      }).catch(err => {
        console.log('绑定失败');
        console.log(err);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .face-audit-container{
    height: 1334rpx;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    flex-direction: column;
    .histroy{
      color: #2f85e5;
      font-size: 30rpx;
      text-align: right;
      text-decoration: underline;
      position: absolute;
      width: 100%;
      .btn{
        padding: 30rpx 40rpx;
      }
    }
    .avatar-content{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tools-con{
      position: absolute;
      width: 100%;
      bottom: 150rpx;
      .inner-content{
        padding: 0 34rpx;
        .tip{
          text-align: center;
          margin-bottom: 50rpx;
          .tip1{
            color: rgba(128, 128, 128, 1);
            font-size: 32rpx;
          }
          .tip2{
            color: rgba(0, 0, 0, 1);
            font-size: 48rpx;
            margin-top: 10rpx;
            font-weight: bold;
            letter-spacing: 1rpx;
          }
        }
        .btn{
          margin-top: 20rpx;
        }
        .agreement{
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 50rpx 0 0;
          .anonymous-tip{
            color: rgba(166, 166, 166, 1);
            font-size: 28rpx;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
</style>
