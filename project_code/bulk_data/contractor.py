import subprocess
import json
import time

def generate_bulk_data(num_records):
    bulk_data = ""
    for _ in range(1, num_records + 1):
        unique_id = str(int(time.time() * 1000)) + str(_)
        
        meta_data = {
            "index": {
                "_index": "contractor",
                "_id": unique_id
            }
        }

        contractor_data = {
            "name": f"Contractor {unique_id}",
            "email": f"contractor{unique_id}@dubey.com",
            "age"  : 10
        }

        bulk_data += json.dumps(meta_data) + "\n"
        bulk_data += json.dumps(contractor_data) + "\n"
    
    return bulk_data

def insert_data_into_opensearch(bulk_data):
    try:
        # Use curl to insert bulk data into OpenSearch
        curl_command = [
            "curl", "-X", "POST", "https://localhost:9200/_bulk", 
            "-H", "Content-Type: application/x-ndjson", 
            "--data-binary", "@-",
            "--insecure",
            "-u", f"admin:Ashna@123"
        ]
        
        
        # Run the curl command and pipe the bulk data into it
        process = subprocess.Popen(curl_command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate(input=bulk_data.encode('utf-8'))
        
        if process.returncode != 0:
            print(f"Error: {stderr.decode()}")
        else:
            print("Data inserted successfully.")
            print(stdout.decode())
    except Exception as e:
        print(f"Error occurred: {e}")

def main():
    bulk_data = generate_bulk_data(100020)
    insert_data_into_opensearch(bulk_data)

if __name__ == "__main__":
    main()


