// TODO: Documentation

import {
    ClientApiAuthoritiesForUrl,
    ClientApiGroupsForUrl,
    ClientApiUserUrl,
    GroupAvatarUrl,
    GroupBannerUrl,
    GroupId,
    InfoApiUserUrl,
    SuperGroupAvatarUrl,
    SuperGroupBannerUrl,
    SuperGroupId,
    UserAvatarUrl,
    UserId,
} from './types'

export const GAMMA_ROOT = 'https://auth.chalmers.it' as const

// #region OAuth2 endpoints
export const OAUTH2_ROOT = `${GAMMA_ROOT}/oauth2` as const
export const OAUTH2_AUTHORIZE_PATH = '/oauth2/authorize' as const
export const OAUTH2_AUTHORIZE = `${GAMMA_ROOT}${OAUTH2_AUTHORIZE_PATH}` as const
export const OAUTH2_TOKEN_PATH = '/oauth2/token' as const
export const OAUTH2_TOKEN = `${GAMMA_ROOT}${OAUTH2_TOKEN_PATH}` as const
export const OAUTH2_USERINFO_PATH = `/oauth2/userinfo` as const
export const OAUTH2_USERINFO = `${GAMMA_ROOT}${OAUTH2_USERINFO_PATH}` as const
// #endregion OAuth2 endpoints

// #region Client API endpoints
export const CLIENT_API_ROOT = `${GAMMA_ROOT}/api/client/v1` as const
export const CLIENT_API_GROUPS = `${CLIENT_API_ROOT}/groups` as const
export const CLIENT_API_GROUPS_FOR = `${CLIENT_API_GROUPS}/for` as const
export const CLIENT_API_SUPER_GROUPS = `${CLIENT_API_ROOT}/superGroups` as const
export const CLIENT_API_USERS = `${CLIENT_API_ROOT}/users` as const
export const CLIENT_API_AUTHORITIES = `${CLIENT_API_ROOT}/authorities` as const
export const CLIENT_API_AUTHORITIES_FOR =
    `${CLIENT_API_AUTHORITIES}/for` as const

/**
 * Generate a URL for a user on the Client API users route.
 * @param id The ID of the user in Gamma.
 * @returns The full URL to the route.
 */
export function clientApiUser(id: UserId): ClientApiUserUrl {
    return `${CLIENT_API_USERS}/${id}`
}

/**
 * Generate a URL for a group on the Client API groups route.
 * @param id The ID of the group in Gamma.
 * @returns The full URL to the route.
 */
export function clientApiGroupsFor(id: UserId): ClientApiGroupsForUrl {
    return `${CLIENT_API_GROUPS_FOR}/${id}`
}

/**
 * Generate a URL for a user on the Client API authorities for route.
 * @param id The ID of the user in Gamma.
 * @returns The full URL to the route.
 */
export function clientApiAuthoritiesFor(
    id: UserId
): ClientApiAuthoritiesForUrl {
    return `${CLIENT_API_AUTHORITIES_FOR}/${id}`
}
// #endregion Client API endpoints

// #region Info API endpoints
export const INFO_API_ROOT = `${GAMMA_ROOT}/api/info/v1` as const
export const INFO_API_USERS = `${INFO_API_ROOT}/users` as const
export const INFO_API_BLOB = `${INFO_API_ROOT}/blob` as const

/**
 * Generate a URL for a user on the Info API users route.
 * @param id The ID of the user in Gamma.
 * @returns The full URL to the route.
 */
export function infoApiUser(id: UserId): InfoApiUserUrl {
    return `${INFO_API_USERS}/${id}`
}
// #endregion Info API endpoints

// #region Allow List API endpoints
export const ALLOW_LIST_API_ROOT = `${GAMMA_ROOT}/api/allow-list/v1` as const
// #endregion Allow List API endpoints
//
// #region Account Scaffold API endpoints
export const ACCOUNT_SCAFFOLD_API_ROOT =
    `${GAMMA_ROOT}/api/account-scaffold/v1` as const
export const ACCOUNT_SCAFFOLD_USERS =
    `${ACCOUNT_SCAFFOLD_API_ROOT}/users` as const
export const ACCOUNT_SCAFFOLD_SUPER_GROUPS =
    `${ACCOUNT_SCAFFOLD_API_ROOT}/supergroups` as const
// #endregion Account Scaffold API endpoints

// #region Images
export const IMAGES = `${GAMMA_ROOT}/images` as const
export const IMAGES_USER_AVATAR = `${IMAGES}/user/avatar` as const
export const IMAGES_GROUP_AVATAR = `${IMAGES}/group/avatar` as const
export const IMAGES_GROUP_BANNER = `${IMAGES}/group/banner` as const
export const IMAGES_SUPER_GROUP_AVATAR = `${IMAGES}/super-group/avatar` as const
export const IMAGES_SUPER_GROUP_BANNER = `${IMAGES}/super-group/banner` as const

/**
 * Generate a URL for a user avatar.
 * @param id The ID of the user in Gamma.
 * @returns The full URL to the avatar image.
 */
export function userAvatarUrl(id: UserId): UserAvatarUrl {
    return `${IMAGES_USER_AVATAR}/${id}`
}

/**
 * Generate a URL for a group avatar.
 * @param id The ID of the group in Gamma.
 * @returns The full URL to the avatar image.
 */
export function groupAvatarUrl(id: GroupId): GroupAvatarUrl {
    return `${IMAGES_GROUP_AVATAR}/${id}`
}

/**
 * Generate a URL for a group banner.
 * @param id The ID of the group in Gamma.
 * @returns The full URL to the banner image.
 */
export function groupBannerUrl(id: GroupId): GroupBannerUrl {
    return `${IMAGES_GROUP_BANNER}/${id}`
}

/**
 * Generate a URL for a super group avatar.
 * @param id The ID of the group in Gamma.
 * @returns The full URL to the avatar image.
 */
export function superGroupAvatarUrl(id: SuperGroupId): SuperGroupAvatarUrl {
    return `${IMAGES_SUPER_GROUP_AVATAR}/${id}`
}

/**
 * Generate a URL for a super group banner.
 * @param id The ID of the group in Gamma.
 * @returns The full URL to the banner image.
 */
export function superGroupBannerUrl(id: SuperGroupId): SuperGroupBannerUrl {
    return `${IMAGES_SUPER_GROUP_BANNER}/${id}`
}
// #endregion Images
