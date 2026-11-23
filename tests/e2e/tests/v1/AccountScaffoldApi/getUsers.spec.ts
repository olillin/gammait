import { toIncludeSameMembers } from 'jest-extended'
import { beforeEach, expect, test } from 'vitest'
import { AccountScaffoldApi } from '../../../../../src'

let client: AccountScaffoldApi
beforeEach(() => {
    client = new AccountScaffoldApi({
        gammaRoot: 'http://localhost:9090',
        authorization:
            'pre-shared 99110d1b-e1f1-49fe-acef-bd25cbece550:XKFvoizyAcWDCyjqq6MrNmvErup7J8oT',
    })
})

test('it returns the correct mocked users', async () => {
    const expectedUsers = toIncludeSameMembers([
        {
            email: 'mscott@example.org',
            cid: 'mscott',
            nick: 'Boss',
            firstName: 'Michael',
            lastName: 'Scott',
        },
    ])

    const users = await client.getUsers()
    expect({ users }).toEqual({ users: expectedUsers })
})
