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

test('it returns the correct mocked super groups', async () => {
    const expectedSuperGroups = toIncludeSameMembers([
        {
            name: 'styrit',
            prettyName: 'styrIT',
            type: 'board',
            useManagedAccount: false,
            groups: [
                {
                    name: expect.stringMatching(/^styrit\d{4}$/),
                    prettyName: expect.stringMatching(/^styrIT\d{4}$/),
                    members: toIncludeSameMembers([
                        {
                            user: {
                                email: 'jhalpert@example.org',
                                cid: 'jhalpert',
                                nick: 'Big Tuna',
                                firstName: 'Jim',
                                lastName: 'Halpert',
                            },
                            post: {
                                postId: '7bb1db15-730d-4864-bfc3-99abe7c0ccf8',
                                svText: 'Ordförande',
                                enText: 'Chairman',
                                emailPrefix: '',
                            },
                        },
                        {
                            user: {
                                email: 'mscott@example.org',
                                cid: 'mscott',
                                nick: 'Boss',
                                firstName: 'Michael',
                                lastName: 'Scott',
                            },
                            post: {
                                postId: '08efcf3a-1805-4b5f-a60e-da6ce0d33f58',
                                svText: 'Ledamot',
                                enText: 'Member',
                                emailPrefix: '',
                            },
                        },
                    ]),
                },
            ],
        },
        {
            name: 'digit',
            prettyName: 'digIT',
            type: 'committee',
            useManagedAccount: false,
            groups: [
                {
                    name: expect.stringMatching(/^digit\d{4}$/),
                    prettyName: expect.stringMatching(/^digIT\d{4}$/s),
                    members: toIncludeSameMembers([
                        {
                            user: {
                                email: 'mscott@example.org',
                                cid: 'mscott',
                                nick: 'Boss',
                                firstName: 'Michael',
                                lastName: 'Scott',
                            },
                            post: {
                                postId: '7bb1db15-730d-4864-bfc3-99abe7c0ccf8',
                                svText: 'Ordförande',
                                enText: 'Chairman',
                                emailPrefix: '',
                            },
                        },
                        {
                            user: {
                                email: 'jhalpert@example.org',
                                cid: 'jhalpert',
                                nick: 'Big Tuna',
                                firstName: 'Jim',
                                lastName: 'Halpert',
                            },
                            post: {
                                postId: '08efcf3a-1805-4b5f-a60e-da6ce0d33f58',
                                svText: 'Ledamot',
                                enText: 'Member',
                                emailPrefix: '',
                            },
                        },
                    ]),
                },
            ],
        },
    ])

    const superGroups = await client.getSuperGroups()
    expect({ superGroups }).toStrictEqual({ superGroups: expectedSuperGroups })
})
