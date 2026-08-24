// TODO: Documentation

import { ApiClient } from '../client'
import { UserId, UserWithGroups } from '../types'
import * as url from '../urls'

/**
 * Get detailed information about users and groups. Used by, for example, chalmers.it to get user and group information to display on corresponding pages.
 * @see {@link https://gamma-docs.olillin.com/api/info-api Info API - Gamma Docs}
 */
export class InfoApi extends ApiClient {
    /**
     * Get information about a specific user.
     * @see {@link https://gamma-docs.olillin.com/api/info-api#get-usersid Info API#GET /users/{id} - Gamma Docs}
     */
    getUser(id: UserId): Promise<UserWithGroups> {
        return this.fetch(url.infoApiUser(id))
    }

    /**
     * Get the full detailed information about all super groups.
     * @see {@link https://gamma-docs.olillin.com/api/info-api#get-blob Info API#GET /blob - Gamma Docs}
     */
    getBlob(): Promise<unknown> {
        return this.fetch(url.INFO_API_BLOB)
    }
}
