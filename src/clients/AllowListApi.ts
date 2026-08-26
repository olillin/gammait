import { ApiClient } from '../client'
import { AllowListAddedResponse } from '../types'
import * as url from '../urls'

/**
 * Manage the Gamma allow list.
 * @see {@link https://gamma-docs.olillin.com/api/allow-list-api Allow List API - Gamma Docs}
 */
export class AllowListApi extends ApiClient {
    /**
     * Get the list of CIDs in the allow list.
     * @returns The CIDs as strings.
     * @see {@link https://gamma-docs.olillin.com/api/allow-list-api#get Allow List API#GET / - Gamma Docs}
     */
    getAllowList(): Promise<string[]> {
        return this.fetch(url.ALLOW_LIST_API_ROOT)
    }

    /**
     * Add users to the allow list.
     * @param cids The CIDs of the users to add to the allow list.
     * @returns An added response if all CIDs were added successfully, or the list of CIDs which could not be added.
     * @see {@link https://gamma-docs.olillin.com/api/allow-list-api#post Allow List API#POST / - Gamma Docs}
     */
    addCids(cids: string[]): Promise<AllowListAddedResponse | string[]> {
        return this.fetch(url.ALLOW_LIST_API_ROOT, 'POST', JSON.stringify(cids))
    }
}
