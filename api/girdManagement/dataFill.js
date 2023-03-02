const http = uni.$u.http

// 获取 信息填报列表
export const getDataFillApi = (data) => http.get(
  '/gdv/governance/filling-user/self-page',
  {data},
)

// 获取 信息填报 表单
export const getDataFillFormApi = (id) => http.get(
  `/form/templates/${id}`,
)

// 新增填报数据
export const addDataFillFormApi = (params) => http.post(
  `/gdv/governance/governance/filling/table/data`,
  params
)