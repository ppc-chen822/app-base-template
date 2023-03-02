const http = uni.$u.http

// 查询 意见征询
export const getOpinionListApi = (data) => http.get(
  '/gdv/village/opinion-collect/page/state',
  { data }
)

// 查询 一条 意见征询
export const getOneOpinionApi = (id) => http.get(
  `/gdv/village/opinion-collect/one/${id}`,
)

// 提交 意见征询
export const addResultApi = (params) => http.post(
  '/gdv/village/opinion-collect-result',
  params
)

// 查询一条结果  意见征询 根据用户id
export const getOneResultApi = (data) => http.get(
  '/gdv/village/opinion-collect-result/one',
  { data }
)