// TODO: Documentation

import { UUID } from 'crypto'
import * as url from './urls'

// #region Basic
/**
 * @see {@link https://gamma-docs.olillin.com/api/#types Introduction#Types - Gamma Docs}
 */
export type UserId = UUID
/**
 * @see {@link https://gamma-docs.olillin.com/api/#types Introduction#Types - Gamma Docs}
 */
export type GroupId = UUID
/**
 * @see {@link https://gamma-docs.olillin.com/api/#types Introduction#Types - Gamma Docs}
 */
export type SuperGroupId = UUID
/**
 * @see {@link https://gamma-docs.olillin.com/api/#types Introduction#Types - Gamma Docs}
 */
export type PostId = UUID

/**
 * Describes a user of the client.
 * @see {@link https://gamma-docs.olillin.com/api/client-api#user Client API#User - Gamma Docs}
 */
export interface User {
    id: UserId
    cid: string
    nick: string
    firstName: string
    lastName: string
    acceptanceYear: number
}

/**
 * Describes a Gamma group.
 * @see {@link https://gamma-docs.olillin.com/api/client-api#group Client API#Group - Gamma Docs}
 */
export interface Group {
    id: GroupId
    name: string
    prettyName: string
    superGroup: SuperGroup
}

/**
 * Describes a Gamma super group.
 * @see {@link https://gamma-docs.olillin.com/api/client-api#super-group Client API#Super Group - Gamma Docs}
 */
export interface SuperGroup {
    id: SuperGroupId
    name: string
    prettyName: string
    type: string
    svDescription: string
    enDescription: string
}

/**
 * Describes a Gamma post in a group.
 * @see {@link https://gamma-docs.olillin.com/api/client-api#post Client API#Post - Gamma Docs}
 */
export interface Post extends Versioned {
    id: PostId
    svName: string
    enName: string
}

/**
 * Describes a Gamma group and the post a member of it has.
 * @see {@link https://gamma-docs.olillin.com/api/info-api#group-with-post Info API#Group with Post - Gamma Docs}
 */
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

/**
 * Describes a Gamma super group.
 * @see {@link https://gamma-docs.olillin.com/api/info-api#super-group Info API#Super Group - Gamma Docs}
 */
export interface VersionedSuperGroup extends SuperGroup, Versioned {}

// #endregion Basic

// #region Authentication
/**
 * Scopes specify which information a client is allowed to access.
 * @see {@link https://gamma-docs.olillin.com/api/authorization#scopes Authorization#Scopes - Gamma Docs}
 */
export type Scope = 'openid' | 'profile' | 'email'

export interface ClientConfig {
    clientId: string
    clientSecret: string
    scope: Scope
}
// #endregion Authentication

// #region URLs

// #region Images
export type UserAvatarUrl = `${typeof url.IMAGES_USER_AVATAR}/${UserId}`
export type GroupAvatarUrl = `${typeof url.IMAGES_GROUP_AVATAR}/${GroupId}`
export type GroupBannerUrl = `${typeof url.IMAGES_GROUP_BANNER}/${GroupId}`
export type SuperGroupAvatarUrl =
    `${typeof url.IMAGES_SUPER_GROUP_AVATAR}/${SuperGroupId}`
export type SuperGroupBannerUrl =
    `${typeof url.IMAGES_SUPER_GROUP_BANNER}/${SuperGroupId}`
// #endregion Images

// #region Client API
export type ClientApiUserUrl = `${typeof url.CLIENT_API_USERS}/${UserId}`
export type ClientApiGroupsForUrl =
    `${typeof url.CLIENT_API_GROUPS_FOR}/${UserId}`
export type ClientApiAuthoritiesForUrl =
    `${typeof url.CLIENT_API_AUTHORITIES_FOR}/${UserId}`
// #endregion Client API

// #region Info API
export type InfoApiUserUrl = `${typeof url.INFO_API_USERS}/${UserId}`
// #endregion Info API

// #endregion URLs

// #region API responses
type IfScope<S extends Scope, R extends Scope, T> = R extends S
    ? T
    : Record<string, never>

/**
 * Represents information about an authenticated user and the token used.
 * @see {@link https://gamma-docs.olillin.com/api/openid#user-info OpenID API#User Info - Gamma Docs}
 */
export type UserInfo<S extends Scope = Scope> = IfScope<
    'openid',
    S,
    {
        /** Gamma user ID. */
        sub: UserId
        /** Token issuer identifier (Gamma URL). */
        iss: typeof url.GAMMA_ROOT
        /** Audience the token is intended for (your client ID). */
        aud: string[]
        /** Token scopes. */
        scope: S[]
        /** Not before. JWT cannot be used before this time. */
        nbf: number
        /** Expiration time for the JWT. */
        exp: number
        /** Time at which the JWT was issued. */
        iat: number
        /** JWT ID. */
        jti: UUID
    }
> &
    IfScope<
        'profile',
        S,
        {
            /** Chalmers ID. */
            cid: string
            nickname: string
            family_name: string
            given_name: string
            /** Full name as "given_name 'nickname' family_name". */
            name: string
            /** Preferred language of the user. */
            locale: 'sv' | 'en'
            /** URL to the user avatar. */
            picture: UserAvatarUrl
        }
    > &
    IfScope<
        'email',
        S,
        {
            email: string
        }
    >

/**
 * Describes a user and the groups they are in.
 * @see {@link https://gamma-docs.olillin.com/api/info-api#user-with-groups Info API#User with Groups - Gamma Docs}
 */
export interface UserWithGroups {
    user: User
    groups: {
        group: VersionedGroup
        post: PostInfo
    }[]
}

/**
 * Describes a Gamma group and the post a member of it has.
 * @see {@link https://gamma-docs.olillin.com/api/info-api#group-with-post Info API#Group with Post - Gamma Docs}
 */
export interface GroupWithPost extends Group {
    post: Post
}

/**
 * Client authorities are a way to designate certain super groups or users special "authorities" in the client without hardcoding ids or names. Client authorities are, for example, used by BookIT to give the "admin" authority to users who should be able to manage bookings and rules.
 * @see {@link https://gamma-docs.olillin.com/api/client-api#client-authorities Client API#Client Authorities - Gamma Docs}
 */
export type ClientAuthority = string
// #endregion API responses
