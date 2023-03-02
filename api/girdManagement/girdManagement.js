const http = uni.$u.http

// 获取 信息填报列表
export const getDataFillApi = (data) => http.get(
  '/form/template-users/self-page',
  {data},
)


// 获取 信息填报 详细表单
export const getDataFillFormApi = (id) => http.get(
  `/form/form/template-fillings/${id}`,
)

// 填报信息
export const addDataFillFormApi = (params) => http.post(
  `/form/templates/table/data`,
  params
)

//查询 信息填报的表头
export const geTableHeaderApi=(data)=>http.get(
	'/form/templates/list',{
		data
	}
)

//查询 已填报列表
export const geFilledListApi=(id, data)=>http.get(
	`/form/templates/dynamic/self/${id}`,
  { data }
)