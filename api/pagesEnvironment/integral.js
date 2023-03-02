const http = uni.$u.http

// 查询 我的积分情况
export const getTotalIntegralApi=(data, id)=>http.get(
	`/gdv/environment/hygiene-integral-record/total-integral/${id}`,{
		data
	}
)

// 查询 我获得的积分
export const getIntegralApi=(data, id)=>http.get(
	`/gdv/environment/hygiene-integral-record/page-user/${id}`,{
		data
	}
)

// 查询 兑换记录
export const getExchangedApi=(data, memberId)=>http.get(
	`/gdv/environment/hygiene-integral-use/pageL-user/${memberId}`,{
		data
	}
)

// 兑换礼品
export const exchangeThingApi=(params)=>http.post(
	`/gdv/environment/hygiene-integral-use/exchange`,
	params
)