import { ClientApiAuthoritiesForUrl, ClientApiGroupsForUrl, ClientApiUserUrl, GroupAvatarUrl, GroupBannerUrl, GroupId, InfoApiUserUrl, SuperGroupAvatarUrl, SuperGroupBannerUrl, SuperGroupId, UserAvatarUrl, UserId } from './types'

export const GAMMA_ROOT = 'https://auth.chalmers.it' as const

// #region Authorization
export const OAUTH2_ROOT = `${GAMMA_ROOT}/oauth2` as const
export const AUTHORIZE_PATH = '/oauth2/authorize' as const
export const AUTHORIZE = `${GAMMA_ROOT}${AUTHORIZE_PATH}` as const
export const TOKEN_PATH = '/oauth2/token' as const
export const TOKEN = `${GAMMA_ROOT}${TOKEN_PATH}` as const
// #endregion Authorization

// #region OAuth2 Endpoints
export const OAUTH2_USERINFO = `${OAUTH2_ROOT}/userinfo` as const
// #endregion

// #region Client API endpoints
export const CLIENT_API_ROOT = `${GAMMA_ROOT}/api/client/v1` as const
export const CLIENT_API_GROUPS = `${CLIENT_API_ROOT}/groups` as const
export const CLIENT_API_GROUPS_FOR = `${CLIENT_API_GROUPS}/for` as const
export function clientApiGroupsFor(id: UserId): ClientApiGroupsForUrl {
    return `${CLIENT_API_GROUPS_FOR}/${id}`
}
export const CLIENT_API_SUPER_GROUPS = `${CLIENT_API_ROOT}/superGroups` as const
export const CLIENT_API_USERS = `${CLIENT_API_ROOT}/users` as const
export function clientApiUser(id: UserId): ClientApiUserUrl {
    return `${CLIENT_API_USERS}/${id}`
}
export const CLIENT_API_AUTHORITIES = `${CLIENT_API_ROOT}/authorities` as const
export const CLIENT_API_AUTHORITIES_FOR = `${CLIENT_API_AUTHORITIES}/for` as const
export function clientApiAuthoritiesFor(id: UserId): ClientApiAuthoritiesForUrl {
    return `${CLIENT_API_AUTHORITIES_FOR}/${id}`
}
// #endregion Client API endpoints

// #region Info API endpoints
export const INFO_API_ROOT = `${GAMMA_ROOT}/api/info/v1` as const
export const INFO_API_USERS = `${INFO_API_ROOT}/users` as const
export function infoApiUser(id: UserId): InfoApiUserUrl {
    return `${INFO_API_USERS}/${id}`
}
export const INFO_API_BLOB = `${INFO_API_ROOT}/blob` as const
// #endregion Info API endpoints

// #region Images
export const IMAGES = `${GAMMA_ROOT}/images` as const
export const IMAGES_USER_AVATAR = `${IMAGES}/user/avatar` as const
export function userAvatarUrl(id: UserId): UserAvatarUrl {
    return `${IMAGES_USER_AVATAR}/${id}`
}
export const IMAGES_GROUP_AVATAR = `${IMAGES}/group/avatar` as const
export function groupAvatarUrl(id: GroupId): GroupAvatarUrl {
    return `${IMAGES_GROUP_AVATAR}/${id}`
}
export const IMAGES_GROUP_BANNER = `${IMAGES}/group/banner` as const
export function groupBannerUrl(id: GroupId): GroupBannerUrl {
    return `${IMAGES_GROUP_BANNER}/${id}`
}
export const IMAGES_SUPER_GROUP_AVATAR = `${IMAGES}/super-group/avatar` as const
export function superGroupAvatarUrl(id: SuperGroupId): SuperGroupAvatarUrl {
    return `${IMAGES_SUPER_GROUP_AVATAR}/${id}`
}
export const IMAGES_SUPER_GROUP_BANNER = `${IMAGES}/super-group/banner` as const
export function superGroupBannerUrl(id: SuperGroupId): SuperGroupBannerUrl {
    return `${IMAGES_SUPER_GROUP_BANNER}/${id}`
}
// #endregion Images
