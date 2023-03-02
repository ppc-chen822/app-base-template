// 通过匹配字典项 获取字典项的名字
// params: id: 需要匹配的id值(对应字典项中的key值)
// params: dictName: 字典名称
export function getDictName(id, dictName) {
  const dictList = uni.getStorageSync('dictMap')[dictName].subset
  for (let i = 0; i < dictList.length; i++) {
    const ele = dictList[i];
    if(id == ele.key){
      return ele.value
    }
  }
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

// 判断是否是老年人
export function isOlder() {
	const idCard = uni.getStorageSync('userInfo').idCard
	if(idCard) {
		const birthYear = idCard.substring(6, 10)
		const nowYear = new Date().getFullYear()
		return nowYear - birthYear >= 60
	}
}