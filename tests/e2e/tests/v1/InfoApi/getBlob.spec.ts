import { toIncludeSameMembers } from 'jest-extended'
import { beforeEach, expect, test } from 'vitest'
import { InfoApi } from '../../../../../src'

let client: InfoApi
beforeEach(() => {
    client = new InfoApi({
        gammaRoot: 'http://localhost:9090',
        authorization:
            'pre-shared a403fccc-9026-41d9-ad6e-16836ca32d84:oXiuVhnjifRbRGJ4MxclVDoURaayLMgj',
    })
})

test('it returns the correct mocked blob', async () => {
    const expectedBlob = toIncludeSameMembers([
        {
            type: 'committee',
            superGroups: [
                {
                    superGroup: {
                        id: 'aed27030-ad90-4526-855c-1e909b1dcecb',
                        name: 'digit',
                        prettyName: 'digIT',
                        type: 'committee',
                        svDescription: '',
                        enDescription: '',
                    },
                    hasBanner: false,
                    hasAvatar: false,
                    members: toIncludeSameMembers([
                        {
                            user: {
                                id: '88eec5c2-5ebb-4e13-9a76-fcc4dac9e74f',
                                firstName: 'Michael',
                                lastName: 'Scott',
                                cid: 'mscott',
                                nick: 'Boss',
                                acceptanceYear: 2005,
                            },
                            post: {
                                id: '7bb1db15-730d-4864-bfc3-99abe7c0ccf8',
                                svName: 'Ordförande',
                                enName: 'Chairman',
                                emailPrefix: '',
                            },
                            unofficialPostName: 'root',
                        },
                        {
                            user: {
                                id: 'bc605869-9a4d-46ec-8a29-d00819d4c195',
                                firstName: 'Jim',
                                lastName: 'Halpert',
                                cid: 'jhalpert',
                                nick: 'Big Tuna',
                                acceptanceYear: 2002,
                            },
                            post: {
                                id: '08efcf3a-1805-4b5f-a60e-da6ce0d33f58',
                                svName: 'Ledamot',
                                enName: 'Member',
                                emailPrefix: '',
                            },
                            unofficialPostName: null,
                        },
                    ]),
                },
            ],
        },
        {
            type: 'board',
            superGroups: [
                {
                    superGroup: {
                        id: '2157ee72-04cd-4029-8d57-77142d3ef5fa',
                        name: 'styrit',
                        prettyName: 'styrIT',
                        type: 'board',
                        svDescription: '',
                        enDescription: '',
                    },
                    hasAvatar: false,
                    hasBanner: false,
                    members: toIncludeSameMembers([
                        {
                            user: {
                                id: 'bc605869-9a4d-46ec-8a29-d00819d4c195',
                                firstName: 'Jim',
                                lastName: 'Halpert',
                                cid: 'jhalpert',
                                nick: 'Big Tuna',
                                acceptanceYear: 2002,
                            },
                            post: {
                                id: '7bb1db15-730d-4864-bfc3-99abe7c0ccf8',
                                svName: 'Ordförande',
                                enName: 'Chairman',
                                emailPrefix: '',
                            },
                            unofficialPostName: null,
                        },
                        {
                            user: {
                                id: '88eec5c2-5ebb-4e13-9a76-fcc4dac9e74f',
                                firstName: 'Michael',
                                lastName: 'Scott',
                                cid: 'mscott',
                                nick: 'Boss',
                                acceptanceYear: 2005,
                            },
                            post: {
                                id: '08efcf3a-1805-4b5f-a60e-da6ce0d33f58',
                                svName: 'Ledamot',
                                enName: 'Member',
                                emailPrefix: '',
                            },
                            unofficialPostName: 'PR',
                        },
                    ]),
                },
            ],
        },
    ])

    const blob = await client.getBlob()
    expect(blob).toStrictEqual(expectedBlob)
})
