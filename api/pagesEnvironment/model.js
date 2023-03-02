const http = uni.$u.http

// 查询模范列表(分页)
export const getListApi=(data)=>http.get(
	'/gdv/culture/model/pageModelTitle',{
		data
	}
)