const http = uni.$u.http

// 查询任务列表(分页)
export const getTaskPageApi=(data)=>http.get(
	'/gdv/environment/integral-task/unexpired-list',{
		data
	}
)

// 领取任务
export const acceptTaskApi=(params)=>http.post(
	'/gdv/environment/hygiene-integral-record/receive-task',
	params
)

// 查询已领取的任务列表
export const getAcceptedTaskApi=(data)=>http.get(
	'/gdv/environment/integral-task/user-page',
	{ data }
)

// 查询接收id
export const getAcceptedIdApi=(data)=>http.get(
	'/gdv/environment/hygiene-integral-record/page',
	{ data }
)

// 修改已接收的任务
export const updateTaskApi=(params, id)=>http.put(
	`/gdv/environment/hygiene-integral-record/${id}`,
	params
)

// 查询积分已兑换的商品
export const getExchangeThingsApi=(data)=>http.get(
	`/gdv/environment/exchange-items/page`,
	{ data }
)