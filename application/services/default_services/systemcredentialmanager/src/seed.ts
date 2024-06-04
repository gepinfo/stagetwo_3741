import * as fetch from 'node-fetch';
import { credentials } from './credentials/securecredentials'; 

export class SeedService {

    private ServiceFile;
    constructor() { 
        this.ServiceFile = 'ServicesFile';
    }

    public initkvdata(vaultUrl, callback): void {
        fetch(`${vaultUrl}/v1/sys/mounts/kv`, {
            method: 'POST',
            headers: {
                'X-Vault-Token': 'vault-geppetto-2021',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: '{"type": "kv", "options": {"version": "1"}}'
        }).then(data => {
            fetch(`${vaultUrl}/v1/kv/database/mongodb`, {
                method: 'POST',
                headers: {
                    'X-Vault-Token': 'vault-geppetto-2021',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(credentials)
            });
            callback('vaultsave');
        })

    }
   
 }

   
 

