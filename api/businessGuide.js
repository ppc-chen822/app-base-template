const http = uni.$u.http

//查询办事指南信息
export const getGuideApi = (data) => http.get(
	'/gdv/village/item-guide/page', {
		data
	}
)

//查询办事指南信息--ById
export const getGuideOneApi = (id) => http.get(
	`/gdv/village/item-guide/one/${id}`,
)
