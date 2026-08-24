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
 * Get information about users who have authorized the client, hereafter referred to as a "user of the client".
 * @see {@link https://gamma-docs.olillin.com/api/client-api Client API - Gamma Docs}
 */
export class ClientApi extends ApiClient {
    /**
     * Get all users of the client.
     * @see {@link https://gamma-docs.olillin.com/api/client-api#get-users Client API#GET /users - Gamma Docs}
     */
    getUsers(): Promise<User[]> {
        return this.fetch(url.CLIENT_API_USERS)
    }

    /**
     * Get a user of the client.
     * @see {@link https://gamma-docs.olillin.com/api/client-api#get-usersid Client API#GET /users/{id} - Gamma Docs}
     */
    getUser(id: UserId): Promise<User> {
        return this.fetch(url.clientApiUser(id))
    }

    /**
     * Get all Gamma groups.
     * @see {@link https://gamma-docs.olillin.com/api/client-api#get-groups Client API#GET /groups - Gamma Docs}
     */
    getGroups(): Promise<Group[]> {
        return this.fetch(url.CLIENT_API_GROUPS)
    }

    /**
     * Get all groups which a user of the client is in.
     * @see {@link https://gamma-docs.olillin.com/api/client-api#get-groupsforid Client API#GET /groups/for/{id} - Gamma Docs}
     */
    getGroupsFor(id: UserId): Promise<GroupWithPost[]> {
        return this.fetch(url.clientApiGroupsFor(id))
    }

    /**
     * Get all Gamma super groups.
     * @see {@link https://gamma-docs.olillin.com/api/client-api#get-supergroups Client API#GET /superGroups - Gamma Docs}
     */
    getSuperGroups(): Promise<SuperGroup[]> {
        return this.fetch(url.CLIENT_API_SUPER_GROUPS)
    }

    /**
     * Get the names of all client authorities on the client.
     * @see {@link https://gamma-docs.olillin.com/api/client-api#get-authorities Client API#GET /authorities - Gamma Docs}
     */
    getAuthorities(): Promise<ClientAuthority[]> {
        return this.fetch(url.CLIENT_API_AUTHORITIES)
    }

    /**
     * Get the names of the client authorities which the user belongs to.
     * @see {@link https://gamma-docs.olillin.com/api/client-api#get-authoritiesforid Client API#GET /authorities/for/{id} - Gamma Docs}
     */
    getAuthoritiesFor(id: UserId): Promise<ClientAuthority[]> {
        return this.fetch(url.clientApiAuthoritiesFor(id))
    }
}
