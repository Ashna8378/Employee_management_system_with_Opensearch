import { Client } from '@opensearch-project/opensearch';

const client = new Client({
    node: 'https://localhost:9200', 
    auth: {
        username: 'admin', 
        password: 'Ashna@123' 
    },
    ssl: {
        rejectUnauthorized: false  
    }
});

export default client








