import { ApiClient } from '../client'
import { UserId, UserWithGroups } from '../types'
import * as url from '../urls'

export class InfoApi extends ApiClient {
    getUser(id: UserId): Promise<UserWithGroups> {
        return this.fetch(url.infoApiUser(id))
    }

    getBlob(): Promise<unknown> {
        return this.fetch(url.INFO_API_BLOB)
    }
}
