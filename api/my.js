const http = uni.$u.http

//查询当前用户所需信息详情
export const getUserdetailApi = () => http.get(
	'/system/users/detail',
)

//下载关联文件
export const downloadHeadApi = (id) => http.get(
	`/system/relate-files/file/${id}`, {
		responseType: 'arraybuffer',
		custom: {
			type: 'img'
		}
	},
)

//查询一个户籍成员信息
export const getMemberinfoApi = (data) => http.get(
	'/gdv/base/member/one', {
		data
	}
)

// 使用账号密码登录
export const loginApi = (data) => http.get(
	'/oauth/token', {
		data
	}
)

// 查询某个用户的个人信息
export const getOneUserApi = (id) => http.get(
	`/system/users/${id}`
)


// 修改某个用户的头像
export const updateAvatarApi = (params) => http.put(
	`/system/users`,
	params
)

// 退出登录
export const logOutApi = () => http.delete(
	`/auth/expansions/logout`
)

// 刷新token
export const refresTokenApi = (data) => http.get(
	`/oauth/token`,
	{ data }
)