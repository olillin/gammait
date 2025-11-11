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
export class ClientApi extends ApiClient {
    getUsers(): Promise<User[]> {
        return this.fetch(url.CLIENT_API_USERS)
    }

    getUser(id: UserId): Promise<User> {
        return this.fetch(url.clientApiUser(id))
    }

    getGroups(): Promise<Group[]> {
        return this.fetch(url.CLIENT_API_GROUPS)
    }

    getGroupsFor(id: UserId): Promise<GroupWithPost[]> {
        return this.fetch(url.clientApiGroupsFor(id))
    }

    getSuperGroups(): Promise<SuperGroup[]> {
        return this.fetch(url.CLIENT_API_SUPER_GROUPS)
    }

    getAuthorities(): Promise<ClientAuthority[]> {
        return this.fetch(url.CLIENT_API_AUTHORITIES)
    }

    getAuthoritiesFor(id: UserId): Promise<ClientAuthority[]> {
        return this.fetch(url.clientApiAuthoritiesFor(id))
    }
}
