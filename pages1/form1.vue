<template>
  <view class="marry-container">
    <u-form
      labelPosition="left"
      labelWidth="200rpx"
      :model="formData"
      :rules="rules"
      ref="formData"
      :labelStyle="labelStyle"
      errorType="border-bottom"
    >

      <!-- 收养人基本信息 -->
      <view class="content">
        <view class="title">
          <common-title title="收养人基本信息（必须大于30岁）" />
        </view>
        <u-form-item
          label="收养人姓名"
          prop="name"
          borderBottom
        >
          <u-input
            v-model="formData.name"
            placeholder="请填写收养人姓名"
            placeholderClass="placeholderClass"
            clearable
            :inputAlign="inputStyle.inputAlign"
            :border="inputStyle.border"
            :confirmType="inputStyle.confirmType"
            readonly
          />
        </u-form-item>
        <u-form-item
          label="性别"
          prop="gender"
          borderBottom
        >
          <u-radio-group
            v-model="formData.gender"
          >
            <view class="flexRight">
              <u-radio
                :customStyle="{marginLeft: '30rpx'}"
                v-for="(item, index) in sexList"
                :key="index"
                :label="item.label"
                :name="item.value"
                size="18"
                labelSize="28rpx"
                labelColor="#808080"
              />
            </view>
          </u-radio-group>
        </u-form-item>

        <u-form-item
          label="通用选择"
          prop="maritalStatus"
          borderBottom
        >
          <picker-common
            v-model="formData.maritalStatus"
            :pickerOptions="marriageList"
            idName="key"
            resultType="name"
            placeholder="请选择婚姻状况"
          />
        </u-form-item>
      </view>

      
      <!-- 上传图片 -->
      <view class="content">
        <view class="title">
          <common-title title="户口本资料" />
        </view>
        <u-form-item
          :label="item.name"
          prop="file"
          v-for="item in imgArr"
          :key="item.name"
        >
          <upload :maxCount="item.maxCount" :pictureCode="item.pictureCode" ref="pictureRefs" />
        </u-form-item>
      </view>

    </u-form>

    <view class="tool">
      <u-button text="提交" loading-text="提交中..." :loading="loading" color="#2a82e4" @click="submit"></u-button>
    </view>

  </view>
</template>

<script>
import commonTitle from '@/components/commonTitle/commonTitle.vue'
import Upload from '@/components/upload/upload.vue';
import { addProveApi } from '@/api/villageBusiness/prove.js';
import { linkFileApi } from '@/api/common.js'
import pickerCommon from '@/components/pickerCommon/pickerCommon.vue';
export default {
  components: { commonTitle, Upload, pickerCommon },
  data() {
    return {
      loading: false,
      formData: {
        name: uni.getStorageSync('userInfo').realName || '',
        gender: '男',
        maritalStatus: '',
      },
      // 图片上传
      imgArr: [
        {
          name: '图片1',
          pictureCode: 'TABLEadopterIdCardPhoto',
          maxCount: 1
        },
        {
          name: '图片2',
          pictureCode: 'TABLEmarriageStatusCertificate',
          maxCount: 1
        }
      ],
      imgIds: [],

      rules: {
        maritalStatus: {required: true},
        spouseName: [
          {
            required: true,
            message: '请输入新生儿姓名',
            trigger: ['blur', 'change']
          },{
            validator: (rule, value, callback) => {
              return uni.$u.test.chinese(value);
            },
            message: '请输入正确的名字',
            trigger: ['change','blur'],
          }
        ],
        spouseIdCard: [
          {
            required: true, 
            message: '请输入身份证号',
            trigger: ['change','blur'],
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.idCard(value);
            },
            message: '身份证号不正确',
            trigger: ['change','blur'],
          }
        ],
        spouseTel: [
          {
            required: true, 
            message: '请输入手机号',
            trigger: ['change','blur'],
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: '手机号不正确',
            trigger: ['change','blur'],
          }
        ],
        spouseEducation: {required: true},
        spouseGender: {required: true},
        spousejob: {required: true},
        spouseworkUnit: {required: true},
      },

      labelStyle: {
        color: '#383838',
        fontSize: '30rpx'
      },
      sexList: [
        {
          label: '男',
          value: '男'
        },{
          label: '女',
          value: '女'
        }
      ],
      radioList: [
        {
          label: '有',
          value: '有'
        },{
          label: '无',
          value: '无'
        }
      ],
      inputStyle: {
        inputAlign: 'right',
        border: 'none',
        confirmType: 'next'
      },
      marriageList: uni.getStorageSync('dictMap').marriage_state_type.subset,
    }
  },
  methods: {
    // 提交
    submit() {
      this.$refs.formData.validate().then(res => {
				this.addProveFun()
			})
    },

   // 通过身份证号码 获取出生年月日
   getBirthByIdCard(idCard) {
      let year = ''
      let month = ''
      let day = ''
      if(idCard !== '') {
        if(idCard.length > 13) {
          year = idCard.substring(6, 10)
          month = idCard.substring(10, 12)
          day = idCard.substring(12, 14)
          const birthDay = `${year}-${month}-${day}`
          return birthDay
        }
      }
    },
    // 组合上传的图片
    getPicture() {
      const { imgArr } = this
      let pictures = []
      let imgIds = []

      for (let index = 0; index < imgArr.length; index++) {
        const img = imgArr[index];
        if(this.$refs.pictureRefs[index].fileList.length === 0) {
          break
        }
        let imgObj = this.$refs.pictureRefs[index].fileList[0]
        const imgItem = {
          id: imgObj.id,
          height: 200,
          width: 300,
          pictureCode: imgObj.pictureCode,
          left: 0,
          top: 0,
        }
        imgIds.push(imgObj.id)
        pictures.push(imgItem)
      }
      this.imgIds = imgIds
      return pictures
    },

    // =============== API ===============
    // 提交申请
    addProveFun() {
      if(this.getPicture().length === 0) {
        uni.showToast({
          icon: 'none',
          title: '请上传图片'
        })
        return
      }
      this.loading = true

      const { formData } = this

      const params = {
        content: params_,
        pictures: this.getPicture(),
        templateCode: 'ability_adopte_proof'
      }
      console.log(params);

      addProveApi(params).then((res) => {
        this.linkFileFun(res.id)
      }).catch(err => {
        this.loading = false
        console.log(err);
      })
    },

    // 将上传的附件绑定业务id
    linkFileFun(businessId) {
      const params = {
        businessId: businessId,
        ids: this.imgIds
      }
      linkFileApi(params).then((res) => {
        uni.showToast({
          type: 'success',
          title: '提交成功'
        })
        this.loading = false
        setTimeout(() => {
          uni.navigateBack({ delta: 1 })
        }, 1500)
      }).catch(err => {
        console.log(err);
      })
    },
  }
}
</script>


<style>
  page{
    background: #f6f6f6;
  }
  .placeholderClass{
    color: #808080;
    font-size: 26rpx;
  }
</style>
<style lang="scss" scoped>
  .marry-container{
    padding: 34rpx;
    .content{
      padding: 34rpx;
      background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(235, 244, 255, 1) 100%);
      border-radius: 20rpx;
      margin-bottom: 40rpx;
      .title{
        margin-bottom: 20rpx;
      }
    }
    .tool{
      margin-top: 90rpx;
    }
  }
</style>