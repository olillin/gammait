import { expect, test } from 'vitest'
import { ApiClientConfig, ClientApi } from '../../../src'
import { GAMMA_ROOT } from '../../../src/urls'

test('it converts API authorization to preferred format', () => {
    const config: ApiClientConfig = {
        authorization: 'abc:123',
    }
    const client = new ClientApi(config)

    expect(client.config.authorization).toBe('pre-shared abc:123')
})

test('it allows the default Gamma root URL', () => {
    const config: ApiClientConfig = {
        gammaRoot: GAMMA_ROOT,
        authorization: 'abc:123',
    }
    const client = new ClientApi(config)

    expect(client.config.gammaRoot).toBe(GAMMA_ROOT)
})

test('it allows local Gamma root URL', () => {
    const config: ApiClientConfig = {
        gammaRoot: 'http://localhost:8080',
        authorization: 'abc:123',
    }
    const client = new ClientApi(config)

    expect(client.config.gammaRoot).toBe('http://localhost:8080')
})

test('it trims trailing / from the Gamma root URL', () => {
    const config: ApiClientConfig = {
        gammaRoot: GAMMA_ROOT + '/',
        authorization: 'abc:123',
    }
    const client = new ClientApi(config)

    expect(client.config.gammaRoot).toBe(GAMMA_ROOT)
})

test('it throws if Gamma root URL is invalid', () => {
    const config: ApiClientConfig = {
        gammaRoot: 'foo',
        authorization: 'abc:123',
    }

    expect(() => {
        new ClientApi(config)
    }).toThrow()
})

test('it throws if Gamma root URL contains search parameters', () => {
    const config: ApiClientConfig = {
        gammaRoot: GAMMA_ROOT + '?foo=1',
        authorization: 'abc:123',
    }

    expect(() => {
        new ClientApi(config)
    }).toThrow()
})

test('it throws if Gamma root URL contains misshaped search parameters', () => {
    const config: ApiClientConfig = {
        gammaRoot: GAMMA_ROOT + '&foo=1',
        authorization: 'abc:123',
    }

    expect(() => {
        new ClientApi(config)
    }).toThrow()
})

test('it throws if Gamma root URL contains fragment', () => {
    const config: ApiClientConfig = {
        gammaRoot: GAMMA_ROOT + '#spam',
        authorization: 'abc:123',
    }

    expect(() => {
        new ClientApi(config)
    }).toThrow()
})
