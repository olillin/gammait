import { ApiClient } from '../client'
import { SuperGroupScaffold, UserScaffold } from '../types'
import * as url from '../urls'

/**
 * Used by, for example, cthit/SyncIT to sync external accounts like GSuite and Bitwarden with Gamma.
 * @see {@link https://gamma-docs.olillin.com/api/account-scaffold-api Account Scaffold API - Gamma Docs}
 */
export class AccountScaffoldApi extends ApiClient {
    /**
     * Get all active users, i.e. users in a "managed" group and who have completed GDPR training.
     * @returns The list of users.
     * @see {@link https://gamma-docs.olillin.com/api/account-scaffold-api#get-users Account Scaffold API#GET /users - Gamma Docs}
     */
    getUsers(): Promise<UserScaffold[]> {
        return this.fetch(url.ACCOUNT_SCAFFOLD_USERS)
    }

    /**
     * Get all active super groups, i.e. super groups belonging to any of the active super group types configured in Gamma's settings. Only users who have completed GDPR training will be included in the result. In addition, super groups with no valid groups in them will be omitted.
     * @returns The list of super groups.
     * @see {@link https://gamma-docs.olillin.com/api/account-scaffold-api#get-supergroups Account Scaffold API#GET /supergroups - Gamma Docs}
     */
    getSuperGroups(): Promise<SuperGroupScaffold[]> {
        return this.fetch(url.ACCOUNT_SCAFFOLD_SUPER_GROUPS)
    }
}
