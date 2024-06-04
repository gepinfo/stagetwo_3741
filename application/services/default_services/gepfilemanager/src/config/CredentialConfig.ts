
let vault = require("node-vault")({ apiVersion: 'v1', endpoint: process.env.VAULT_URL, token: 'vault-geppetto-2021' });

export class CredentialConfig {
    credentialsConfig(callback) {
        vault.read('private/privateGit/credentials/githubactions').then((result) => {
            callback(result.data);
        })
    }
}