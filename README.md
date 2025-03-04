# **TEST CASES - OpenSearch CRUD System**  

## **Submitted By**  
**Ashna Dubey**  

## **Submitted To**  
**Vipin Sir**  



## **Reviewer Name**  
**Manmeet Ma'am**  

---

## **Goal**  
This project sets up **OpenSearch** using **Podman** (a container system), adds **1 lakh records** using a **Python script**, and provides a **web-based CRUD interface** built with **Express.js**. Users must **log in** before using CRUD features.  

---

## **Table of Contents**  
- **TC 1**: Setgup OpenSearch in Podman  
- **TC 2**: Verify OpenSearch Cluster Health  
- **TC 3**: Insert Bulk Data into OpenSearch  
- **TC 4**: Validate Data Insertion in OpenSearch  
- **TC 5**: Implement User Authentication (Login Page)  
- **TC 6**: Verify Authentication Flow  
- **TC 7**: Test CRUD Operations via Web Interface  
  - **TC 7.1**: Create Operation  
  - **TC 7.2**: Read Operation  
  - **TC 7.3**: Update Operation  
  - **TC 7.4**: Delete Operation  
- **TC 8**: API Security & Authentication Check  
- **TC 9**: OpenSearch Query Performance Testing  

---

## **Test Environment**  
- **Platform**: Podman (to run OpenSearch in a container)  
- **Backend**: Express.js (handles API requests)  
- **Database**: OpenSearch  
- **Frontend**: A web interface for CRUD operations  

---

## **Test Cases**  

### **TC 1: Setup OpenSearch in Podman**  
**Scenario**  
Check if OpenSearch is running in a Podman container.  

**Given**  
- Podman is installed on the system.  

**When**  
- The command to download and run OpenSearch in Podman is executed.  

**Then**  
- OpenSearch container should start successfully.  
- Running `podman ps` should show OpenSearch as active.  

**Testing Outputs**  
(Screenshot showing running container)  

---

### **TC 2: Verify OpenSearch Cluster Health**  
**Scenario**  
Check if OpenSearch is working properly.  

**Given**  
- OpenSearch container is running.  

**When**  
- The `GET /_cluster/health` API is called.  

**Then**  
- The API should return `"green"` or `"yellow"` status, meaning OpenSearch is healthy.  

**Testing Outputs**  
(JSON response from OpenSearch cluster health check)  

---

### **TC 3: Insert Bulk Data into OpenSearch**  
**Scenario**  
Make sure 1 lakh records can be inserted using a Python script.  

**Given**  
- OpenSearch is running.  
- The Python script has the correct OpenSearch connection details.  

**When**  
- The script is executed to insert data.  

**Then**  
- OpenSearch should successfully store all the records.  
- No errors should occur during the process.  

**Testing Outputs**  
(Log of inserted records and API response)  

---

### **TC 4: Validate Data Insertion in OpenSearch**  
**Scenario**  
Check if OpenSearch correctly stored all 1 lakh records.  

**Given**  
- Bulk data insertion was successful.  

**When**  
- The `GET /index_name/_count` API is called.  

**Then**  
- The API should return **100,000** records.  

**Testing Outputs**  
(JSON response showing total records)  

---

### **TC 5: Implement User Authentication (Login Page)**  
**Scenario**  
Ensure users must log in before using CRUD operations.  

**Given**  
- A user opens the web interface.  

**When**  
- The user tries to access CRUD operations **without logging in**.  

**Then**  
- The system should **redirect the user to the login page**.  

**Testing Outputs**  
(Screenshot showing redirection to login page)  

---

### **TC 6: Verify Authentication Flow**  
**Scenario**  
Check if only logged-in users can access CRUD features.  

**Given**  
- A user exists with valid credentials.  

**When**  
- The user enters their credentials and logs in.  

**Then**  
- The system should allow access to CRUD operations.  
- API should return a session token.  

**Testing Outputs**  
(JSON response with authentication token)  

---

### **TC 7: Test CRUD Operations via Web Interface**  

#### **TC 7.1: Create Operation**  
**Scenario**  
Ensure users can add new records via the web interface.  

**Given**  
- The user is logged in.  

**When**  
- The user submits a new entry using the web interface.  

**Then**  
- The data should be stored in OpenSearch.  
- The API should return a **success response (201 Created)**.  

**Testing Outputs**  
(Screenshot of API response & UI confirmation)  

---

#### **TC 7.2: Read Operation**  
**Scenario**  
Ensure users can view stored records.  

**Given**  
- OpenSearch contains records.  

**When**  
- The user searches for a specific record.  

**Then**  
- The system should fetch and display the correct record.  

**Testing Outputs**  
(JSON response with search results)  

---

### **TC 8: API Security & Authentication Check**  
**Scenario**  
Ensure that unauthenticated users cannot access the API.  

**Given**  
- The user is **not logged in**.  

**When**  
- The user tries to access an API endpoint directly.  

**Then**  
- The API should return **401 Unauthorized**.  

**Testing Outputs**  
(JSON error response from API)  

---

### **TC NFR 9: System Performance Under Load**  
**Scenario**  
Ensure OpenSearch can handle bulk data insertions and searches efficiently.  

**Given**  
- OpenSearch is running.  
- 1 lakh records are stored in the database.  

**When**  
- The system performs bulk read/write operations.  

**Then**  
- OpenSearch should respond within acceptable latency limits (e.g., query response time < 500ms).  
- No crashes or performance degradation should occur.  

**Testing Outputs**  
(Response times from load tests)  

---

### **TC NFR 2: API Response Time Validation**  
**Scenario**  
Check if API responses are within an acceptable range.  

**Given**  
- The backend server is running.  
- OpenSearch is accessible.  

**When**  
- API requests for CRUD operations are triggered.  

**Then**  
- API should respond within 200-500ms under normal load.  
- Response should not exceed 1s even under peak load.  

**Testing Outputs**  
(API response times recorded from testing tools)  

---

### **TC NFR 3: Security & Access Control**  
**Scenario**  
Ensure unauthorized users cannot access API endpoints.  

**Given**  
- A user is not authenticated.  

**When**  
- The user tries to access CRUD API endpoints without logging in.  

**Then**  
- The API should return 401 Unauthorized.  
- Sensitive data should not be exposed in error responses.  

**Testing Outputs**  
(API logs showing failed access attempts)  

---

### **TC NFR 4: Scalability Testing**  
**Scenario**  
Ensure the system can scale as data volume grows.  

**Given**  
- The system contains 1 lakh records.  
- Load balancer is configured.  

**When**  
- The number of records increases to 10 lakh or more.  

**Then**  
- OpenSearch should continue functioning without errors.  
- Performance degradation should be minimal.  

**Testing Outputs**  
(Logs showing system performance under heavy load)  

---

### **TC NFR 5: Fault Tolerance & Recovery**  
**Scenario**  
Ensure the system can recover from failures.  

**Given**  
- The OpenSearch container crashes unexpectedly.  

**When**  
- The container is restarted.  

**Then**  
- OpenSearch should recover without data loss.  
- CRUD operations should resume normally.  

**Testing Outputs**  
(Logs showing successful recovery from failure)  

## **Conclusion**  
This test plan ensures that **OpenSearch is deployed correctly, data is stored and retrieved properly, authentication works, and the system performs well under load**.  



