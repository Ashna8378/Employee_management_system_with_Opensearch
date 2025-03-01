from opensearchpy import OpenSearch
import random


# Connect to OpenSearch
client = OpenSearch(
    hosts=[{"host": "localhost", "port": 9200}],
    http_auth=("admin", "Dubey@123"),
    use_ssl=True,            # Using HTTPS because our server uses it
    verify_certs=False       # Turn off cert verification if using self-signed certs
)

# Define the index name (like a database table)
index_name = "products"

# If the index doesn't exist, create it
if not client.indices.exists(index=index_name):
    client.indices.create(index=index_name)

# Insert 1000 records into the "products" index
for i in range(1, 1001):
    document = {
        "product_id": i,
        "name": f"Product {i}",
        "price": round(random.uniform(10, 500), 2),
        "category": random.choice(["Electronics", "Clothing", "Home", "Toys"])
    }
    client.index(index=index_name, id=i, body=document)

print("✅ Successfully inserted 1000 records!")

