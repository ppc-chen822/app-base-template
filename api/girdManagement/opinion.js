const http = uni.$u.http

// 查询热门问题
export const getHotOpinionApi = () => http.get(
  '/gdv/governance/opinion/top',
)

// 提交意见反馈
export const addOpinionApi = (params) => http.post(
  '/gdv/governance/opinion',
  params
)

// 提交 事件上报
export const addEventUpApi = (params) => http.post(
  '/gdv/governance/event',
  params
)


// 查询事件列表
export const getEventApi = (data) => http.get(
  '/gdv/governance/event/self-page',
  { data }
)
// 查询 一条 事件上报
export const getOneEventApi = (id) => http.get(
  `/gdv/governance/event/${id}`,
)



// 查询 意见列表
export const getOpinionApi = (data) => http.get(
  '/gdv/governance/opinion/page-self',
  { data }
)
// 查询 一条 意见反馈
export const getOneOpinionApi = (id) => http.get(
  `/gdv/governance/opinion/${id}`,
)


