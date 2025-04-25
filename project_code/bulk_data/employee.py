import subprocess
import json
import random
# from datetime import datetime 

# Indian names list (100 each, you can expand if needed)
first_names = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Krishna", "Arjun", "Aryan", "Sai", "Reyansh", "Dhruv",
    "Ayaan", "Kabir", "Rudra", "Rohan", "Yash", "Kartik", "Manav", "Ishaan", "Ansh", "Harsh",
    "Tanmay", "Nikhil", "Siddharth", "Tejas", "Uday", "Om", "Amit", "Ravi", "Rahul", "Varun",
    "Abhay", "Saurabh", "Ashish", "Raj", "Vinay", "Rakesh", "Aakash", "Dev", "Kunal", "Gaurav",
    "Rishi", "Tushar", "Pranav", "Mayank", "Nitin", "Sharad", "Neeraj", "Anuj", "Deepak", "Alok",
    "Akash", "Sumit", "Piyush", "Naveen", "Harshit", "Lalit", "Sagar", "Vipul", "Yuvraj", "Sameer",
    "Ayush", "Bhavesh", "Hemant", "Chetan", "Jay", "Siddhant", "Nilesh", "Rajesh", "Arvind", "Mihir",
    "Ranveer", "Pratik", "Tanish", "Tarun", "Keshav", "Mahesh", "Suraj", "Shivam", "Umesh", "Parth",
    "Ajay", "Mukul", "Darshan", "Aniket", "Hardik", "Chirag", "Rajat", "Vikram", "Satyam", "Abhishek",
    "Santosh", "Praveen", "Jatin", "Himanshu", "Raghav", "Sanket", "Devansh", "Aman", "Karan", "Rohit"
]


middle_names = [
    "Kumar", "Narayan", "Prasad", "Chandra", "Bhushan", "Mohan", "Raj", "Shekhar", "Ranjan", "Lal",
    "Dev", "Krishna", "Singh", "Vishnu", "Shankar", "Ramesh", "Gopal", "Harish", "Suresh", "Manoj",
    "Mahendra", "Dilip", "Vinod", "Naresh", "Bharat", "Anand", "Ravindra", "Jagat", "Naveen", "Umesh",
    "Sunil", "Mukesh", "Ajit", "Sanjay", "Hemant", "Ashok", "Prem", "Sudhir", "Ajay", "Dinesh",
    "Deepak", "Rakesh", "Girish", "Rajiv", "Kishore", "Yogesh", "Brijesh", "Shyam", "Alok", "Parmesh",
    "Virendra", "Siddharth", "Ratan", "Anil", "Lokesh", "Arun", "Ravi", "Nikhil", "Sachin", "Bhagat",
    "Jayant", "Kalyan", "Raghu", "Manish", "Tapan", "Uttam", "Ajeet", "Rupesh", "Madhav", "Sandeep",
    "Sharad", "Rajendra", "Ganesh", "Ravish", "Srinivas", "Puneet", "Harsh", "Avinash", "Mahesh", "Karan",
    "Devendra", "Mukul", "Vivek", "Tejas", "Vijay", "Rohit", "Nitin", "Chirag", "Lalit", "Shubham",
    "Aniket", "Amit", "Mayank", "Tushar", "Kunal", "Ritesh", "Chetan", "Gautam", "Tanmay", "Yash"
]

last_names = [
    "Sharma", "Verma", "Singh", "Yadav", "Gupta", "Agarwal", "Mishra", "Tiwari", "Pandey", "Dubey",
    "Choudhary", "Rathore", "Jain", "Reddy", "Naidu", "Khan", "Ansari", "Shaikh", "Siddiqui", "Pathan",
    "Joshi", "Patel", "Desai", "Bhatt", "Thakur", "Shukla", "Saxena", "Bajaj", "Mehta", "Kapoor",
    "Chopra", "Malhotra", "Grover", "Arora", "Chawla", "Mathur", "Goel", "Seth", "Bhatia", "Talwar",
    "Dwivedi", "Kulkarni", "Iyengar", "Pillai", "Menon", "Rao", "Shenoy", "D'Souza", "Fernandes", "George",
    "Das", "Saha", "Roy", "Chatterjee", "Mukherjee", "Banerjee", "Bose", "Ganguly", "Sen", "Pal",
    "Nair", "Nambiar", "Mali", "Pawar", "Jadhav", "Patil", "Salunke", "Kulkarni", "Thakare", "Gavaskar",
    "Gaikwad", "More", "Bhosale", "Phadke", "Ambedkar", "Savarkar", "Punekar", "Joshipura", "Gokhale", "Kelkar",
    "Modi", "Nath", "Prasad", "Vyas", "Trivedi", "Dwivedi", "Tyagi", "Bhandari", "Rawat", "Negi",
    "Bhatt", "Rana", "Gurung", "Sapkota", "Adhikari", "Subedi", "Poudel", "Shrestha", "Karki", "Basnet"
]

def generate_bulk_data(num_records):
    seen_emails = set()
    bulk_data = ""

    for i in range(1, num_records + 1):
        first = random.choice(first_names)
        middle = random.choice(middle_names)
        last = random.choice(last_names)

        full_name = f"{first} {middle} {last}"
        email_base = f"{first.lower()}.{middle.lower()}.{last.lower()}"
        email = email_base

        counter = 1
        while email in seen_emails:
            email = f"{email_base}{counter}"
            counter += 1

        seen_emails.add(email)
        email += "@gmail.com"

        meta_data = {
            "index": {
                "_index": "employee",
                "_id": i
            }
        }

        employee_data = {
            "name": full_name,
            "email": email,
            "age": random.randint(22, 58),
            # "created_at":  datetime.now().isoformat()
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
    bulk_data = generate_bulk_data(20)
    insert_data_into_opensearch(bulk_data)

if __name__ == "__main__":
    main()
    

    
    
    
