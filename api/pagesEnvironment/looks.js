const http = uni.$u.http

// 查询 村貌
export const getLooksApi=(data, id)=>http.get(
	`gdv/environment/village-appearance/page`,{
		data
	}
)