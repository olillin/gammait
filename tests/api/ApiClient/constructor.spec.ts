import { expect, test } from "vitest"
import { ApiClientConfig, ClientApi } from "../../../src"

test('it converts API authorization to preferred format', () => {
    const config: ApiClientConfig = {
        authorization: 'abc:123'
    }
    const client = new ClientApi(config)

    expect(client.config.authorization).toBe('pre-shared abc:123')
})