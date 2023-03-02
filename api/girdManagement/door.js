const http = uni.$u.http

// 获取 门禁列表
export const getDoorListApi = () => http.get(
  '/gdv/equipment/access-control/ignore/list',
)

// 查询开门记录
export const gerDoorOpenRecApi = (EQId, data) => http.get(
  `/hk/HkManagement/Eventinfo/${EQId}`,
  { data }
)

// 开门
export const openDoorApi = (EQId) => http.get(
  `/hk/HkManagement/onceOpenDoor/${EQId}`,
)

// 门禁信息采集
export const registDoorUserApi = (EQId, params) => http.post(
  `/hk/HkManagement/saveUser/${EQId}`,
  params
)