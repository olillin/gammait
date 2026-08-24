// TODO: Documentation

import { ApiClient } from '../client'
import { UserId, UserWithGroups } from '../types'
import * as url from '../urls'

/**
 * @see {@link https://gamma-docs.olillin.com/api/info-api Info API - Gamma Docs}
 */
export class InfoApi extends ApiClient {
    /**
     * @see {@link https://gamma-docs.olillin.com/api/info-api/#get-usersid GET /users/{id} - Gamma Docs}
     */
    getUser(id: UserId): Promise<UserWithGroups> {
        return this.fetch(url.infoApiUser(id))
    }

    /**
     * @see {@link https://gamma-docs.olillin.com/api/info-api/#get-blob GET /blob - Gamma Docs}
     */
    getBlob(): Promise<unknown> {
        return this.fetch(url.INFO_API_BLOB)
    }
}
