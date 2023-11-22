const SYSTEM_NAME = "topdraw-manage-system"

/** 缓存数据时用到的 Key */
class CacheKey {
  static TOKEN = `${SYSTEM_NAME}-token-key`
  static SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`
  static ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`
  static ADMIN_USER_NAME = `${SYSTEM_NAME}-user-name`
}

export default CacheKey