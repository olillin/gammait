import oauth2 from 'simple-oauth2'
import { ClientAuthority, Group, GroupWithPost, Scope, SuperGroup, User, UserId, UserInfo, UserWithGroups } from './types'
import * as url from './urls'

abstract class Client {
    protected abstract fetch<T extends object>(url: string, method: string): Promise<T>
}

interface ApiClientConfig {
    authorization: string
}

class ApiClient extends Client {
    config: ApiClientConfig

    constructor(config: ApiClientConfig) {
        super()
        this.config = config
    }

    protected fetch<T extends object>(url: string, method: string = 'GET'): Promise<T> {
        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    Authorization: this.config.authorization,
                },
                method: method,
            })
                .then(async res => {
                    if (!res.ok) {
                        reject(`Received code ${res.status} during ${method} to ${url}`)
                        return
                    }

                    if (!res.headers.has('Content-Type') || res.headers.get('Content-Type') !== 'application/json') {
                        reject('Response was not JSON')
                        return
                    }

                    const data: T = await res.json()
                    resolve(data)
                })
                .catch(reason => {
                    reject(reason)
                })
        })
    }
}

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

export class InfoApi extends ApiClient {
    getUser(id: UserId): Promise<UserWithGroups> {
        return this.fetch(url.infoApiUser(id))
    }

    // getBlob(): Promise<unknown> {
    //     return this.fetch(url.INFO_API_BLOB)
    // }
}

export interface AuthorizationCodeConfig {
    clientId: string
    clientSecret: string
    redirectUri: string
    scope: Scope[]
}

export class AuthorizationCode extends Client {
    config: AuthorizationCodeConfig
    oauth2Client: oauth2.AuthorizationCode
    accessToken: oauth2.AccessToken | undefined

    constructor(config: AuthorizationCodeConfig) {
        super()
        this.config = config
        this.oauth2Client = new oauth2.AuthorizationCode({
            auth: {
                tokenHost: url.GAMMA_ROOT,
                tokenPath: url.TOKEN_PATH,
                authorizeHost: url.GAMMA_ROOT,
                authorizePath: url.AUTHORIZE_PATH,
            },
            client: {
                id: this.config.clientId,
                secret: this.config.clientSecret,
            },
            options: {
                scopeSeparator: ' ',
            },
        })
    }

    /**
     * Generate a new access token and store it for later
     * @param code Authorization code
     * @returns The generated access token
     */
    async generateToken(code: string): Promise<oauth2.AccessToken> {
        const token = await this.oauth2Client.getToken({
            code: code,
            scope: this.config.scope,
            redirect_uri: this.config.redirectUri,
        })
        this.accessToken = token
        return token
    }

    authorizeUrl() {
        return this.oauth2Client.authorizeURL({
            scope: this.config.scope,
            redirect_uri: this.config.redirectUri,
        })
    }

    protected fetch<T extends object>(url: string, method: string = 'GET'): Promise<T> {
        if (!this.accessToken) {
            throw new Error('No token has been generated yet, make sure to run `generateToken`')
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${this.accessToken!.token.access_token}`,
                },
                method: method,
            })
                .then(async res => {
                    if (!res.ok) {
                        reject(`Received code ${res.status} during ${method} to ${url}`)
                        return
                    }

                    if (!res.headers.has('Content-Type') || res.headers.get('Content-Type') !== 'application/json') {
                        reject('Response was not JSON')
                        return
                    }

                    const data: T = await res.json()
                    resolve(data)
                })
                .catch(reason => {
                    reject(reason)
                })
        })
    }

    userInfo(): Promise<UserInfo> {
        return this.fetch(url.OAUTH2_USERINFO)
    }
}
