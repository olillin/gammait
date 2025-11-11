export abstract class Client {
    protected abstract fetch<T extends object>(
        url: string,
        method: string
    ): Promise<T>
}

export interface ApiClientConfig {
    authorization: string
}

/**
 * Get the API authorization that can be used as the value for `Authorization`
 * from the API key.
 *
 * These formats are allowed:
 *
 * - `<api-key-id>:<api-key>`
 * - `pre-shared <api-key-id>:<api-key>`
 * - `Authorization: <api-key-id>:<api-key>`
 *
 * @param apiKey The API key in one of the allowed formats.
 * @returns The Authorization header value in the format `pre-shared <api-key-id>:<api-key>`
 */
export function getApiAuthorization(apiKey: string) {
    return (
        'pre-shared ' +
        apiKey.replace(/^(Authorization: *)?pre-shared +/i, '').trim()
    )
}

export class ApiClient extends Client {
    config: ApiClientConfig

    constructor(config: ApiClientConfig) {
        super()
        this.config = {
            ...config,
            authorization: getApiAuthorization(config.authorization),
        }
    }

    protected fetch<T extends object>(
        url: string,
        method: string = 'GET'
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            const authorization = this.config.authorization
            fetch(url, {
                headers: {
                    Authorization: this.config.authorization,
                },
                method: method,
            })
                .then(async res => {
                    if (!res.ok) {
                        reject(
                            `Received code ${res.status} during ${method} to ${url}`
                        )
                        return
                    }

                    if (
                        !res.headers.has('Content-Type') ||
                        res.headers.get('Content-Type') !== 'application/json'
                    ) {
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
