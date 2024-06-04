
let vault = require("node-vault")({ apiVersion: 'v1', endpoint: process.env.VAULT_URL, token: 'vault-geppetto-2021' });

export class VaultConfig {
    vaultConfig(callback) {
        vault.read('kv/database/mongodb').then((result) => {
            callback(result.data);
        })
    }
}