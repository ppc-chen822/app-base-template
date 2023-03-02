<template>
  <view></view>
</template>

<script>
// 引入第三方微信端处理formData的js库
const FormData = require('./wx-formdata-master/formData.js')
export default {
  data() {
    return {
      baseURL: uni.$u.http.config.baseURL,
    }
  },
  methods: {
    // 读取选择的图片
    afterRead(fileData) {
      console.log(111);
      const { baseURL } = this

      const formData = {
        fileName: fileData.name || new Date().getTime() + 'Img.png',
        remark: fileData.url,
        size: fileData.size,
        type: 0,
      }
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
          this.updateFile(data, fileData)
        },
        fail: err => {
          console.log(err);
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
      uni.request({
        url: data.presignedPostUrl,
        method: 'POST',
        data: final_formData.buffer,
        header: {
          'content-type': final_formData.contentType
        },
        success: (res) => {
          console.log(res, 'resresresresresresresresresresresresres');
          if(res.statusCode === 204) {
            this.$emit('uploadSuccess', data)
          }
        },
        fail: (err) => {
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
            console.log(data);
            this.$emit('uploadSuccess', data)
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    },
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
</style>