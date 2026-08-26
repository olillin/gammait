import { afterAll, afterEach, expect, test, vi } from 'vitest'
import { ApiClient } from '../../../src/client'
import {
    ALLOW_LIST_API_ROOT,
    CLIENT_API_GROUPS,
    INFO_API_USERS,
} from '../../../src/urls'

const fetchMock = vi.fn(() => {
    return Promise.resolve(
        new Response('{}', {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    )
})

vi.stubGlobal('fetch', fetchMock)

afterEach(() => {
    vi.clearAllMocks()
})

afterAll(() => {
    vi.unstubAllGlobals()
})

test('calls fetch with the correct arguments', async () => {
    const client = new ApiClient({
        authorization: 'pre-shared abc:123',
    })

    const url = CLIENT_API_GROUPS

    /* @ts-expect-error */
    await client.fetch(url)

    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(url, {
        headers: {
            Authorization: 'pre-shared abc:123',
        },
        method: 'GET',
    })
})

test('replaces the Gamma root URL if set', async () => {
    const client = new ApiClient({
        gammaRoot: 'https://localhost:8080/',
        authorization: 'pre-shared abc:123',
    })

    const url = INFO_API_USERS

    /* @ts-expect-error */
    await client.fetch(url)

    const expectedUrl = 'https://localhost:8080/api/info/v1/users'
    expect(fetchMock.mock.calls.length).toBe(1)
    const requestUrl = (
        fetchMock.mock.calls[0] as unknown as Parameters<typeof global.fetch>
    )[0]
    expect(requestUrl).toBe(expectedUrl)
})

test('uses the correct method', async () => {
    const client = new ApiClient({
        authorization: 'pre-shared abc:123',
    })

    const url = ALLOW_LIST_API_ROOT
    const method = 'POST'

    /* @ts-expect-error */
    await client.fetch(url, method)

    expect(fetchMock.mock.calls.length).toBe(1)
    const requestInit = (
        fetchMock.mock.calls[0] as unknown as Parameters<typeof global.fetch>
    )[1]
    expect(requestInit?.method).toBe(method)
})

test('includes body if provided', async () => {
    const client = new ApiClient({
        authorization: 'pre-shared abc:123',
    })

    const url = ALLOW_LIST_API_ROOT
    const method = 'POST'
    const body = JSON.stringify({ 'my-body': 'foo' })

    /* @ts-expect-error */
    await client.fetch(url, method, body)

    expect(fetchMock.mock.calls.length).toBe(1)
    const requestInit = (
        fetchMock.mock.calls[0] as unknown as Parameters<typeof global.fetch>
    )[1]
    expect(requestInit?.method).toBe(method)
    expect(requestInit?.body).toStrictEqual(body)
})
