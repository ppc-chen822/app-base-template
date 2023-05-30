<template>
  <view class="upload-content">
    <u-upload
      :fileList="fileList"
      name="uploadmi"
      multiple
      :maxCount="maxCount"
      width="180rpx"
      height="180rpx"
      @delete="deletePic"
      @afterRead="afterRead"
    >
      <view class="upload-btn">
        <u-icon name="camera" color="#e5e5e5" size="46" />
      </view>
    </u-upload>

    <view class="desc">
      {{ desc }}
    </view>
  </view>
</template>

<script>
import { delLinkFileApi, uploadCommonApi } from '@/api/common.js'
// 引入第三方微信端处理formData的js库
const FormData = require('./wx-formdata-master/formData.js')
export default {
  props: {
    desc: {
      type: String,
      default: ''
    },
    fileType:{
			type: String | Number,
			default: 0
		},
    maxCount: {
      type: Number,
      default: 10
    },
    pictureCode: {
      type: String,
      default: ''
    },
    isComment: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fileList: [
        // {
        //   url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
        // },
      ]
    }
  },
  methods: {
    // 读取选择的图片
    async afterRead(event) {
      const { pictureCode } = this
      // 设置上传状态并显示到页面上
      let imgList = [].concat(event.file);
      let fileListLen = this.fileList.length;
      imgList.map((item) => {
        this.fileList.push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });

      // 循环上传已选择的图片
      for (let i = 0; i < imgList.length; i++) {
        const result = await this.addFileFun(imgList[i]);
        console.log(result);
        let item = this.fileList[fileListLen];
        this.fileList.splice(fileListLen, 1,
          Object.assign(item, {
            status: "success",
            message: "",
            pictureCode,
            ...result,
          })
        );
        fileListLen++;
      }
    },

    // 新增关联文件 [方法]
    addFileFun(fileData) {
      const { isComment, fileType } = this;

      let obj = {};
      if (!isComment) {
        obj = {
          type: fileType,
        }
      }

      const formData = {
        fileName: fileData.name || new Date().getTime() + "Img.png",
        remark: fileData.url,
        size: fileData.size,
        ...obj,
      };

      if (isComment) {
        // 在评论中上传图片
        // 第一步上传
        // return new Promise((resolve, reject) => {
        //   uploadExperiencesApi(formData).then((res) => {
        //     this.updateFile(res, fileData);
        //     resolve({
        //       id: res.id,
        //       url: res.address,
        //     });
        //   }).catch((err) => {
        //     resolve({
        //       status: "failed",
        //       message: "上传失败",
        //     });
        //     uni.$u.toast("上传失败，请联系管理员");
        //   })
        // })
      } else {
        // 普通上传图片
        // 第一步上传
        return new Promise((resolve, reject) => {
          uploadCommonApi(formData).then((res) => {
            this.updateFile(res, fileData);
            resolve({
              id: res.id,
              url: res.address,
            });
          }).catch((err) => {
            resolve({
              status: "failed",
              message: "上传失败",
            });
            uni.$u.toast("上传失败，请联系管理员");
          })
        })
      }
    },

    
    updateFile(data, fileData) {
      // #ifdef H5
      this.h5Upload(data, fileData)
      // #endif
      // #ifdef MP-WEIXIN
      this.wxUpload(data, fileData)
      // #endif
    },

    // 删除图片 [按钮]
    deletePic(event) {
      // 页面上删除图片
      this.fileList.splice(event.index, 1)
      // 判断是否是已经绑定过业务的照片
      // 如果是第一次上传,会有width属性
      // 否则就是已绑定过业务, 需要走解除业务接口 进行删除
      if(!event.file.width && event.file.id) {
        this.delLinkFileFun(event.file.id)
      }
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
        method: 'POST',
        data: final_formData.buffer,
        header: {
          'content-type': final_formData.contentType
        },
        success: (res) => {
          if(res.statusCode === 204) {
            this.$emit('uploadSuccess', data)
          }else{
            console.log(data);
            uni.$u.toast('上传失败')
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
            this.$emit('uploadSuccess', data)
          }else{
            console.log(data);
            uni.$u.toast('上传失败')
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    },


    // 解除附件绑定
    delLinkFileFun(id) {
      const params = { ids: [ id ] }
      delLinkFileApi(params)
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
    width: 180rpx;
    height: 180rpx;
    border: 2rpx solid rgba(229, 229, 229, 1);
    border-radius: 8rpx;
    margin: 0 15rpx 15rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .desc{
    font-size: 24rpx;
    color: #a7a5a5;
  }
</style>