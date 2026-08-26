import { expect, test } from 'vitest'
import { regexEscape } from '../../src/client'

test('URLs are escaped correctly', () => {
    const escaped = regexEscape('https://auth.chalmers.it')
    expect(escaped).toBe(String.raw`https://auth\.chalmers\.it`)
})
