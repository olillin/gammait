import { expect, test } from 'vitest'
import { getApiAuthorization } from '../../src'

test('converts from <api-key-id>:<api-key>', () => {
    const authorization = 'abc:123'
    const expected = 'pre-shared abc:123'

    expect(getApiAuthorization(authorization)).toBe(expected)
})

test('converts from pre-shared <api-key-id>:<api-key>', () => {
    const authorization = 'pre-shared abc:123'
    const expected = 'pre-shared abc:123'

    expect(getApiAuthorization(authorization)).toBe(expected)
})

test('converts from pre-shared  <api-key-id>:<api-key>', () => {
    const authorization = 'pre-shared  abc:123'
    const expected = 'pre-shared abc:123'

    expect(getApiAuthorization(authorization)).toBe(expected)
})

test('converts from Authorization: <api-key-id>:<api-key>', () => {
    const authorization = 'Authorization: pre-shared abc:123'
    const expected = 'pre-shared abc:123'

    expect(getApiAuthorization(authorization)).toBe(expected)
})

test('converts from authorization: <api-key-id>:<api-key>', () => {
    const authorization = 'authorization: pre-shared abc:123'
    const expected = 'pre-shared abc:123'

    expect(getApiAuthorization(authorization)).toBe(expected)
})

test('converts from Authorization:<api-key-id>:<api-key>', () => {
    const authorization = 'Authorization:pre-shared abc:123'
    const expected = 'pre-shared abc:123'

    expect(getApiAuthorization(authorization)).toBe(expected)
})
