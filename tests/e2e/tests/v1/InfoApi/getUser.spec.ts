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

test('it returns the correct mocked user', async () => {
    const expectedUser = {
        user: {
            cid: 'mscott',
            nick: 'Boss',
            firstName: 'Michael',
            lastName: 'Scott',
            id: '88eec5c2-5ebb-4e13-9a76-fcc4dac9e74f',
            acceptanceYear: 2005,
        },
        groups: expect.arrayContaining([
            {
                group: {
                    id: '2abe2264-fd61-4899-ba46-851279d85229',
                    name: 'digit2026',
                    prettyName: 'digIT2026',
                    superGroup: {
                        id: 'aed27030-ad90-4526-855c-1e909b1dcecb',
                        version: 1,
                        name: 'digit',
                        prettyName: 'digIT',
                        type: 'committee',
                        svDescription: '',
                        enDescription: '',
                    },
                    version: 1,
                },
                post: {
                    id: '7bb1db15-730d-4864-bfc3-99abe7c0ccf8',
                    version: 1,
                    svName: 'Ordförande',
                    enName: 'Chairman',
                    emailPrefix: '',
                    order: 0,
                },
            },
            {
                group: {
                    id: '834651d1-34c1-4bac-b148-6546368a8454',
                    name: 'styrit2026',
                    prettyName: 'styrIT2026',
                    superGroup: {
                        id: '2157ee72-04cd-4029-8d57-77142d3ef5fa',
                        version: 1,
                        name: 'styrit',
                        prettyName: 'styrIT',
                        type: 'board',
                        svDescription: '',
                        enDescription: '',
                    },
                    version: 1,
                },
                post: {
                    id: '08efcf3a-1805-4b5f-a60e-da6ce0d33f58',
                    version: 1,
                    svName: 'Ledamot',
                    enName: 'Member',
                    emailPrefix: '',
                    order: 1,
                },
            },
        ]),
    }
    const user = await client.getUser('88eec5c2-5ebb-4e13-9a76-fcc4dac9e74f')
    expect(user).toStrictEqual(expectedUser)
})
