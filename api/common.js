const http = uni.$u.http

// 获取用户信息
export const getUserInfoApi = (params, config = {}) => http.get(
  '/system/users/detail',
  params,
  config
)

// 将上传的附件绑定业务id
export const linkFileApi = (params, config = {}) => http.put(
  '/system/relate-files/biz',
  params,
  config
)


//查询内容管理(列表)
export const getContentApi=(data)=>http.get(
	'/content/contents/page/biz/ignore',{
		data
	}
)

//查询内容管理(详情)
export const getContentDetailApi=(id)=>http.get(
	`/content/contents/${id}/biz/ignore`,{
	}
)

// 通过业务id查询关联的图片(分页)
export const getImgsByIdApi = (data) => http.get(
	'/system/relate-files/page/biz', {
		data
	}
)

// 查询三务公开
export const getContentThreeApi = (data) => http.get(
	'/content/contents/page/biz/ignore', {
		data
	}
)

// 修改密码
export const updatePasswordApi = (params) => http.put(
	'/system/users/password/new', 
	params
)
// 查询 网格区域(不分页)
export const getAreaApi = (data) => http.get(
  '/gdv/base/areas/list',
  { data }
)

// 查询 机构
export const getOrgApi=(data)=>http.get(
	'/system/organizations/tree/biz',{
		data
	}
)
// 查询 用户
export const getUserApi=(data)=>http.get(
	'/system/users/list/biz',{
		data
	}
)
// 获取登录验证图
export const getLoginImgApi=()=>http.post(
	'/auth/expansions/captcha/ignore'
)
// 验证 登录验证图
export const auditLoginApi=(params)=>http.put(
	'/auth/expansions/captcha/ignore',
	params
)