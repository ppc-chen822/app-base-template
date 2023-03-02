<template>
  <u-upload
    :fileList="fileList"
    name="uploadmi"
    multiple
    :maxCount="maxCount"
    width="176rpx"
    height="176rpx"
    @delete="deletePic"
    @afterRead="afterRead"
  >
    <view class="upload-btn">
      <u-icon v-if="!loading" name="camera" color="#e5e5e5" size="46"></u-icon>
      <u-loading-icon v-if="loading" text="上传中" textSize="12" :vertical="true" />
    </view>

    <view class="desc">
      {{ desc }}
    </view>
  </u-upload>
</template>

<script>
// 引入第三方微信端处理formData的js库
const FormData = require('./wx-formdata-master/formData.js')
export default {
  props: {
    desc: {
      type: String,
      default: ''
    },
    maxCount: {
      type: Number,
      default: 10
    },
    pictureCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      baseURL: uni.$u.http.config.baseURL,
      fileList: [
        // {
        //   url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
        // },
      ]
    }
  },
  methods: {
    // 读取选择的图片
    afterRead(event, hasFile = false) {
      const { baseURL } = this

      let fileData = {}
      if(hasFile) {
        fileData = event
      }else{
        fileData = event.file[0]
      }
      console.log(fileData);
      // const imgUrl = event.file[0].url
      this.loading = true


      // #ifdef APP-PLUS
      const formData = {
        fileName: fileData.name || new Date().getTime() + 'Img.jpeg',
        remark: fileData.url,
        size: fileData.size,
        type: 0,
      }
      // #endif

      // #ifndef APP-PLUS
      const formData = {
        fileName: fileData.name || new Date().getTime() + 'Img.png',
        remark: fileData.url,
        size: fileData.size,
        type: 0,
      }
      // #endif

      console.log(formData);
      uni.uploadFile({
        url: `${baseURL}/system/relate-files`,
        filePath: fileData.url,
        name: new Date().getTime() + 'Img.png',
        header: {
          'Authorization': 'Bearer '+uni.getStorageSync('token'),
        },
        formData: formData,
        success: (res) => {
          const data = JSON.parse(res.data).data
          console.log(res);
          this.updateFile(data, fileData)
        },
        fail: err => {
          console.log(err);
          this.loading = false
        }
      });
    },
    updateFile(data, fileData) {
      // #ifdef H5
      this.h5Upload(data, fileData)
      // #endif
      // #ifdef MP-WEIXIN
      this.wxUpload(data, fileData)
      // #endif
      // #ifdef APP-PLUS
      // this.appUpload(data, fileData)
      uni.$u.toast('上传失败')
      // #endif
    },

    // 删除图片
    deletePic(event) {
      console.log(event);
      this.fileList.splice(event.index, 1)
    },

    // =============== API ===============
    // 微信上传(使用formData)
    wxUpload(data, fileData) {
      const _formData = new FormData();
      _formData.append('Content-Type', data.presignedPostFormData['Content-Type']);
      _formData.append('key', data.presignedPostFormData.key);
      _formData.append('policy', data.presignedPostFormData.policy);
      _formData.append('x-amz-algorithm', data.presignedPostFormData['x-amz-algorithm']);
      _formData.append('x-amz-credential', data.presignedPostFormData['x-amz-credential']);
      _formData.append('x-amz-date', data.presignedPostFormData['x-amz-date']);
      _formData.append('x-amz-signature', data.presignedPostFormData['x-amz-signature']);
      _formData.appendFile('file', fileData.url);
      const final_formData = _formData.getData();
      // http://60.220.177.142:9000/system.relate-files
      uni.request({
        url: data.presignedPostUrl,
        // url: 'https://storage.geominds.cn/system.relate-files',
        // url: 'https://xydv.geominds.cn:9000/system.relate-files',
        method: 'POST',
        data: final_formData.buffer,
        header: {
          'content-type': final_formData.contentType
        },
        success: (res) => {
          console.log(res, 'resresresresresresresresresresresresres');
          if(res.statusCode === 204) {
            this.initFileList(data)
            this.$emit('uploadSuccess', data)
          }
          this.loading = false
        },
        fail: (err) => {
          this.loading = false
          console.log(err);
        }
      });
    },

    // H5端上传(使用formData)
    h5Upload(data, fileData) {
      const formData = data.presignedPostFormData
      const params = {
        'Content-Type': formData['Content-Type'],
        'key': formData.key,
        'policy': formData.policy,
        'x-amz-algorithm': formData['x-amz-algorithm'],
        'x-amz-credential': formData['x-amz-credential'],
        'x-amz-date': formData['x-amz-date'],
        'x-amz-signature': formData['x-amz-signature'],
        'file': fileData.url,
      }
      uni.uploadFile({
        url: data.presignedPostUrl,
        filePath: fileData.url,
        formData: params,
        success: (res) => {
          if(res.statusCode === 204) {
            this.initFileList(data)
            console.log(data);
            this.$emit('uploadSuccess', data)
            // uni.$u.toast('上传成功')
          }else{
            console.log(data);
            uni.$u.toast('上传失败')
          }
          this.loading = false
        },
        fail: err => {
          console.log(err);
          this.loading = false
        }
      });
    },

    // app端上传(使用formData)
    appUpload(data, fileData) {
      console.log(fileData.url);
      uni.saveFile({
        tempFilePath: fileData.url,
        success: (res) => {
          var savedFilePath = res.savedFilePath;
          console.log(savedFilePath);

          const formData = data.presignedPostFormData
          const params = {
            'Content-Type': formData['Content-Type'],
            'key': formData.key,
            'policy': formData.policy,
            'x-amz-algorithm': formData['x-amz-algorithm'],
            'x-amz-credential': formData['x-amz-credential'],
            'x-amz-date': formData['x-amz-date'],
            'x-amz-signature': formData['x-amz-signature'],
            'file': savedFilePath
          }
          console.log(params);

          uni.request({
            url: data.presignedPostUrl,
            data: params,   // 这里传入你的参数(json格式)
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: (response) => {
              console.log('请求登录后返回的数据：', response);
            },
            fail: (err) => {
              console.log('登录失败：', err);
            },
            complete: (com) => {
              console.log('请求登录结束：', com);
            }
          })
        }
      })

      
    },

    // 组合已上传的图片
    initFileList(data) {
      let obj = {}
      uni.getImageInfo({
        src: data.address,
        success: (image) => {
          console.log(image.width);
          console.log(image.height);
          obj = {
            id: data.id,
            url: data.address,
            width: image.width,
            height: image.height,
            pictureCode: this.pictureCode
          }
          this.fileList.push(obj)
        }
      });
    }
  }
}
</script>

<style>
  ::v-deep .u-upload__wrap{
    display: flex;
    /* justify-content: right; */
    align-items: center;
  }
</style>
<style lang="scss" scoped>
  .upload-btn{
    width: 176rpx;
    height: 176rpx;
    border: 2rpx solid rgba(229, 229, 229, 1);
    border-radius: 8rpx;
    margin: 0 15rpx 15rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .desc{
    font-size: 24rpx;
    color: #ddd;
  }
</style>