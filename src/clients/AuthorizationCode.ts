import oauth2 from 'simple-oauth2'
import { Client } from '../client'
import { Scope, UserInfo } from '../types'
import * as url from '../urls'

/**
 * Configuration for the authorization code flow.
 * @template S The scopes specified in this configuration. Defaults to all scopes.
 * @see {@link AuthorizationCode}
 */
export interface AuthorizationCodeConfig<S extends Scope = Scope> {
    /** ID for the Gamma Client. */
    clientId: string
    /** Secret for the Gamma Client. */
    clientSecret: string
    /** Redirect URI for the Gamma Client. */
    redirectUri: string
    /** Scopes for the Gamma Client. */
    scope: S[]
}

/**
 * Client for the Authorization Code flow in Gamma.
 * @template S The scopes specified in the configuration. Defaults to all scopes.
 * @see {@link https://gamma-docs.olillin.com/api/authorization/#authorization-code-flow Authorization Code Flow - Gamma Docs}
 */
export class AuthorizationCode<S extends Scope = Scope> extends Client {
    config: AuthorizationCodeConfig<S>
    oauth2Client: oauth2.AuthorizationCode
    accessToken: oauth2.AccessToken | undefined

    constructor(config: AuthorizationCodeConfig<S>) {
        super()
        this.config = config
        this.oauth2Client = new oauth2.AuthorizationCode({
            auth: {
                tokenHost: url.GAMMA_ROOT,
                tokenPath: url.OAUTH2_TOKEN_PATH,
                authorizeHost: url.GAMMA_ROOT,
                authorizePath: url.OAUTH2_AUTHORIZE_PATH,
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
     * Generate an access token from an authorization code. The token will be
     * stored in this client and used in future requests.
     * @param code The authorization code returned to the redirect URI.
     * @returns A promise of a Gamma access token.
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

    /**
     * Create the authorization URL that a user should be redirected to in order
     * to authorize this client.
     * @returns The full URL to the OAuth2 authorization route.
     */
    authorizeUrl(): string {
        return this.oauth2Client.authorizeURL({
            scope: this.config.scope,
            redirect_uri: this.config.redirectUri,
        })
    }

    protected fetch<T extends object>(
        url: string,
        method: string = 'GET'
    ): Promise<T> {
        if (!this.accessToken) {
            throw new Error(
                'No token has been generated yet, make sure to run `generateToken`'
            )
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${this.accessToken!.token.access_token as string}`,
                },
                method: method,
            })
                .then(async res => {
                    if (!res.ok) {
                        reject(
                            new Error(
                                `Received code ${res.status} during ${method} to ${url}`
                            )
                        )
                        return
                    }

                    if (
                        !res.headers.has('Content-Type') ||
                        res.headers.get('Content-Type') !== 'application/json'
                    ) {
                        reject(new Error('Response was not JSON'))
                        return
                    }

                    const data = (await res.json()) as T
                    resolve(data)
                })
                .catch(reason => {
                    reject(
                        reason instanceof Error
                            ? reason
                            : new Error(String(reason))
                    )
                })
        })
    }

    /**
     * Get info about the authorized user and the current access token.
     * @returns The data available based on the configured scopes.
     * @see {@link https://gamma-docs.olillin.com/api/openid/#get-oauth2userinfo GET /oauth2/userinfo - Gamma Docs}
     */
    userInfo(): Promise<UserInfo<S>> {
        return this.fetch<UserInfo<S>>(url.OAUTH2_USERINFO)
    }
}
