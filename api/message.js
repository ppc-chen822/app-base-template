const http = uni.$u.http

// 查询消息
export const getMessageApi = (data) => http.get(
	`/system/messages/page/receiver`,
  {
    data
  }
)

// 已读消息
export const readMessageApi = (params) => http.put(
	`/system/messages/receiver`,
  params
)

// 删除消息
export const delMessageApi = (params) => http.delete(
	`/system/messages/receiver`,
  params
)

// 通过messageCode判断消息类型
// getMessageType(messageCode) {
//   if(messageCode === 'system:user:message') {
//     return 'message'
//   }else {
//     return 'business'
//   }
// },
// // 点击消息跳转到相关页面
// messageClick(itemData){
//   const { messageCode } = itemData
//   let url = ''
//   if(messageCode === 'system:user:message') {
//     url = '/pages/business/businessProcess/businessProcess'
//     uni.navigateTo({ url })
//   }
// },