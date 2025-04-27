import { Client } from '@opensearch-project/opensearch';

const client = new Client({
    node: 'https://localhost:9200', // Change to your OpenSearch URL
    auth: {
        username: 'admin', 
        password: 'Ashna@123' 
    },
    ssl: {
        rejectUnauthorized: false  // Use only if you're testing with self-signed certificates
    }
});

export default client








