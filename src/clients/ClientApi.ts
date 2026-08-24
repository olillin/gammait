// TODO: Documentation

import { ApiClient } from '../client'
import {
    ClientAuthority,
    Group,
    GroupWithPost,
    SuperGroup,
    User,
    UserId,
} from '../types'
import * as url from '../urls'

/**
 * @see {@link https://gamma-docs.olillin.com/api/client-api Client API - Gamma Docs}
 */
export class ClientApi extends ApiClient {
    /**
     * @see {@link https://gamma-docs.olillin.com/api/client-api/#get-users GET /users - Gamma Docs}
     */
    getUsers(): Promise<User[]> {
        return this.fetch(url.CLIENT_API_USERS)
    }

    /**
     * @see {@link https://gamma-docs.olillin.com/api/client-api/#get-usersid GET /users/{id} - Gamma Docs}
     */
    getUser(id: UserId): Promise<User> {
        return this.fetch(url.clientApiUser(id))
    }

    /**
     * @see {@link https://gamma-docs.olillin.com/api/client-api/#get-groups GET /groups - Gamma Docs}
     */
    getGroups(): Promise<Group[]> {
        return this.fetch(url.CLIENT_API_GROUPS)
    }

    /**
     * @see {@link https://gamma-docs.olillin.com/api/client-api/#get-groupsforid GET /groups/for/{id} - Gamma Docs}
     */
    getGroupsFor(id: UserId): Promise<GroupWithPost[]> {
        return this.fetch(url.clientApiGroupsFor(id))
    }

    /**
     * @see {@link https://gamma-docs.olillin.com/api/client-api/#get-supergroups GET /superGroups - Gamma Docs}
     */
    getSuperGroups(): Promise<SuperGroup[]> {
        return this.fetch(url.CLIENT_API_SUPER_GROUPS)
    }

    /**
     * @see {@link https://gamma-docs.olillin.com/api/client-api/#get-authorities GET /authorities - Gamma Docs}
     */
    getAuthorities(): Promise<ClientAuthority[]> {
        return this.fetch(url.CLIENT_API_AUTHORITIES)
    }

    /**
     * @see {@link https://gamma-docs.olillin.com/api/client-api/#get-authoritiesforid GET /authorities/for/{id} - Gamma Docs}
     */
    getAuthoritiesFor(id: UserId): Promise<ClientAuthority[]> {
        return this.fetch(url.clientApiAuthoritiesFor(id))
    }
}
