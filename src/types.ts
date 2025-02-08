import { UUID } from 'crypto'
import * as url from './urls'

// #region Basic
export type UserId = UUID
export type GroupId = UUID
export type SuperGroupId = UUID
export type PostId = UUID
export type Scope = 'openid' | 'profile' | 'email'

export interface User {
    id: UserId
    cid: string
    nick: string
    firstName: string
    lastName: string
    acceptanceYear: number
}

export interface Group {
    id: GroupId
    name: string
    prettyName: string
    superGroup: SuperGroup
}

export interface SuperGroup {
    id: SuperGroupId
    name: string
    prettyName: string
    type: string
    svDescription: string
    enDescription: string
}

export interface Post extends Versioned {
    id: PostId
    svName: string
    enName: string
}

export interface PostInfo extends Post {
    emailPrefix: string
    order: number
}

export interface Versioned {
    version: number
}

export interface VersionedGroup extends Group, Versioned {
    superGroup: VersionedSuperGroup
}

export interface VersionedSuperGroup extends SuperGroup, Versioned {}

// #endregion Basic

// #region URLs

// #region Images
export type UserAvatarUrl = `${typeof url.IMAGES_USER_AVATAR}/${UserId}`
export type GroupAvatarUrl = `${typeof url.IMAGES_GROUP_AVATAR}/${GroupId}`
export type GroupBannerUrl = `${typeof url.IMAGES_GROUP_BANNER}/${GroupId}`
export type SuperGroupAvatarUrl = `${typeof url.IMAGES_SUPER_GROUP_AVATAR}/${SuperGroupId}`
export type SuperGroupBannerUrl = `${typeof url.IMAGES_SUPER_GROUP_BANNER}/${SuperGroupId}`
// #endregion Images

// #region Client API
export type ClientApiUserUrl = `${typeof url.CLIENT_API_USERS}/${UserId}`
export type ClientApiGroupsForUrl = `${typeof url.CLIENT_API_GROUPS_FOR}/${UserId}`
export type ClientApiAuthoritiesForUrl = `${typeof url.CLIENT_API_AUTHORITIES_FOR}/${UserId}`
// #endregion Client API

// #region Info API
export type InfoApiUserUrl = `${typeof url.INFO_API_USERS}/${UserId}`
// #endregion Info API

// #endregion URLs

// #region API responses
export interface UserInfo {
    sub: UserId
    cid: string

    name: string
    given_name: string
    family_name: string
    nickname: string
    picture: UserAvatarUrl

    scope: Scope[]
    iss: typeof url.GAMMA_ROOT

    aud: string[]
    nbf: number
    exp: number
    iat: number
    jti: UUID
}

export interface UserWithGroup {
    user: User
    groups: {
        group: VersionedGroup
        post: PostInfo
    }[]
}

export interface GroupWithPost extends Group {
    post: Post
}

export type ClientAuthority = string
// #endregion API responses
