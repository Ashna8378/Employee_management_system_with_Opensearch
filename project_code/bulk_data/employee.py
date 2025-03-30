import subprocess
import json

def generate_bulk_data(num_records):
    bulk_data = ""
    for i in range(1, num_records + 1):  # Numeric ID from 1 to num_records
        
        meta_data = {
            "index": {
                "_index": "employee",
                "_id": i  # Simple numeric ID
            }
        }

        employee_data = {
            "name": f"Employee {i}",
            "email": f"employee{i}@ashna.com",
            "age": 10
        }

        bulk_data += json.dumps(meta_data) + "\n"
        bulk_data += json.dumps(employee_data) + "\n"
    
    return bulk_data

def insert_data_into_opensearch(bulk_data):
    try:
        curl_command = [
            "curl", "-X", "POST", "https://localhost:9200/_bulk", 
            "-H", "Content-Type: application/x-ndjson", 
            "--data-binary", "@-",
            "--insecure",
            "-u", f"admin:Ashna@123"
        ]
        
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
    bulk_data = generate_bulk_data(100020)  # Generates 100,020 records with numeric IDs
    insert_data_into_opensearch(bulk_data)

if __name__ == "__main__":
    main()
