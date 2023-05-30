
// 查询内容管理(通用方法)
// params: modelCode: 模型code
// params: orgCode: 所属机构code
export function getContent(modelCode, orgCode) {
	if(modelCode === ''){
		return
	}

	const defaultOrgCode = '000000000000'
	const currentOrgAdId = uni.getStorageSync('userInfo').currentOrgAdId
	const baseURL = uni.$u.http.config.baseURL

	let params = {
		current: 1,
		size: 500,
		modelCode: modelCode,
		content: `code:${orgCode || currentOrgAdId}`,
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + '/content/contents/page/biz/ignore',
			data: params,
			header: { 'Authorization': 'Bearer ' + uni.getStorageSync('token') },
			method: 'get',
			success: (res) => {
				console.log(res.data.data.records);
				let list = res.data.data.records
				if(list && list.length > 0) {
					resolve(res.data.data.records)
				}else{
					if(orgCode === defaultOrgCode){
						return
					}
					return new Promise((resolve_, reject_) => {
						getContent(modelCode, defaultOrgCode).then(res => {
							console.log(res)
							resolve(res)
						})
					})
				}
			},
			fail: (err) => {
				// reject(err)
			}
		});
	})
}


// 通过匹配字典项 获取字典项的名字
// params: id: 需要匹配的id值(对应字典项中的key值)
// params: dictName: 字典名称
export function getDictName(id, dictName) {
	if(!uni.getStorageSync('dictMap')[dictName]) {
		uni.$u.toast('无字典项')
		return
	}
  const dictList = uni.getStorageSync('dictMap')[dictName].subset
	let name = '--'
  for (let i = 0; i < dictList.length; i++) {
    const ele = dictList[i];
    if(id == ele.key){
      name = ele.value
    }
  }
	return name
}

// 获取字典项列表
export function getDictList(dictName) {
	if(!uni.getStorageSync('dictMap')[dictName]) {
		uni.$u.toast('无字典项')
		return
	}
  const dictList = uni.getStorageSync('dictMap')[dictName].subset
	return dictList
}

// 获取用户名真实姓名
// 如果 姓名字数 === 2 返回其全部（姓+名）
// 如果 姓名字数 === 3 返回其第2、3个字（名）
// 如果 姓名字数 === 4 返回其第3、4个字（名）（复姓）
// 如果 姓名字数 > 4   返回其第1、2个字（测试数据等）
export function getFirstName(nameStr) {
	if (nameStr && nameStr.length <= 2) {
		return nameStr
	} else if (nameStr && nameStr.length === 3) {
		return nameStr.substring(1, 3)
	} else if (nameStr && nameStr.length === 4) {
		return nameStr.substring(2, 4)
	} else if (nameStr.length > 4) {
		return nameStr.substring(0, 2)
	} else {
		return '--'
	}
}

// 获取用户名的姓
export function getLastName(nameStr) {
	if (nameStr && nameStr.length > 0) {
		return nameStr.substring(0, 1)
	} else {
		return '--'
	}
}

// 判断当前用户是否是老年人
export function isOlder() {
	const idCard = uni.getStorageSync('userInfo').idCard
	if(idCard) {
		const birthYear = idCard.substring(6, 10)
		const nowYear = new Date().getFullYear()
		return nowYear - birthYear >= 60
	}
}

// 使用uView自带的Api格式化时间
// params: dateTimeStr: 时间字符串(如 2023-02-25 15:00:00)
// params: hasTime: 是否需要返回时间,默认不返回时间,只返回日期
export function getDateTime(dateTimeStr, hasTime = false) {
	if(dateTimeStr && dateTimeStr !== '') {
		const timestamp = new Date(dateTimeStr).getTime()
		let format = hasTime ? 'yyyy-mm-dd hh:MM:ss' : 'yyyy-mm-dd'
		return this.$u.timeFormat(timestamp, format)
	}else{
		return '暂无时间'
	}
}

// 返回多久以前
// params: dateTimeStr: 时间字符串(如 2023-02-25 15:00:00)
export function getDateFrom(dateTimeStr, showlongAgo = false) {
	if(dateTimeStr && dateTimeStr !== '') {
		const timestamp = new Date(dateTimeStr).getTime()
		let format = showlongAgo ? 'yyyy-mm-dd' : false
		return this.$u.timeFrom(timestamp, format)
	}else{
		return '暂无时间'
	}
}