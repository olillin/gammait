import { GAMMA_ROOT } from './urls'

/**
 * Represents a Gamma client implementing some authorization flow to simplify
 * using the Gamma API.
 */
export abstract class Client {
    /**
     * Utility method to make a request to Gamma from this client and expect a
     * certain type of JSON data back.
     * @param url The absolute URL to the Gamma endpoint.
     * @param method The HTTP method to use for this request.
     * @returns The parsed JSON response data cast to the provided type.
     */
    protected abstract fetch<T extends object>(
        url: string,
        method: string
    ): Promise<T>
}

/**
 * Configuration for API clients.
 * @see {@link ApiClient}
 */
export interface ApiClientConfig {
    /**
     * The API key in one of the supported formats:
     *
     * - `&lt;api-key-id>:&lt;api-key>`
     * - `pre-shared &lt;api-key-id>:&lt;api-key>`
     * - `Authorization: &lt;api-key-id>:&lt;api-key>`.
     *
     */
    authorization: string

    /**
     * Base URL to the Gamma instance. Defaults to "https://auth.chalmers.it".
     */
    gammaRoot?: string
}

/**
 * Get the API authorization that can be used as the value for `Authorization`
 * from the API key.
 *
 * These formats are allowed:
 *
 * - `&lt;api-key-id>:&lt;api-key>`
 * - `pre-shared &lt;api-key-id>:&lt;api-key>`
 * - `Authorization: &lt;api-key-id>:&lt;api-key>`.
 * @param apiKey The API key in one of the allowed formats.
 * @returns The Authorization header value in the format `pre-shared &lt;api-key-id>:&lt;api-key>`.
 */
export function getApiAuthorization(apiKey: string) {
    return (
        'pre-shared ' +
        apiKey.replace(/^(Authorization: *)?pre-shared +/i, '').trim()
    )
}

/**
 * Escape a string to be matched exactly in a regular expression.
 * @param text The string to escape.
 * @returns The string with special characters escaped with a backslash.
 */
export function regexEscape(text: string): string {
    return text.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Abstraction for clients that authorize with Gamma using an API key.
 */
export class ApiClient extends Client {
    config: ApiClientConfig

    constructor(config: ApiClientConfig) {
        super()

        const gammaRoot =
            config.gammaRoot === undefined
                ? undefined
                : new URL(config.gammaRoot).href.replace(/\/$/, '')

        if (gammaRoot !== undefined && /[?&#]/.test(gammaRoot)) {
            throw new Error(
                'Gamma root URL may not contain search parameters or URL fragment'
            )
        }

        this.config = {
            ...config,
            gammaRoot,
            authorization: getApiAuthorization(config.authorization),
        }
    }

    protected fetch<T extends object>(
        url: string,
        method: string = 'GET',
        body?: null | BodyInit
    ): Promise<T> {
        if (this.config.gammaRoot !== undefined) {
            url = url.replace(
                new RegExp('^' + regexEscape(GAMMA_ROOT)),
                this.config.gammaRoot
            )
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    Authorization: this.config.authorization,
                },
                method: method,
                body: body,
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
}
