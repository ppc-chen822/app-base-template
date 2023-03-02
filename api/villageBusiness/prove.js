const http = uni.$u.http

// 新增证明申请
export const addProveApi = (params, config = {}) => http.post(
  '/gdv/village/proof-applications',
  params,
  config
)


// 查询证明模板
export const getFilterListApi=(data)=>http.get(
  `/gdv/village/proof-templates/list/biz`,{
  data
}
)


// 查询行政区划列表
export const getLocationApi=(data)=>http.get(
  `/system/administrative-divisions/tree/biz`,{
  data
}
)