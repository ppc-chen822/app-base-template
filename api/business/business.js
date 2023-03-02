const http = uni.$u.http

// 查询正在办理中的事项(分页)
export const getOngoingApi = (data) => http.get(
  '/gdv/village/proof-applications/page/applicant',
  {data}
)


// 查看证明申请
export const reviewApi = (id) => http.get(
  `/gdv/village/proof-applications/${id}/reviews`,
)