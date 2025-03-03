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

## **Conclusion**  
This test plan ensures that **OpenSearch is deployed correctly, data is stored and retrieved properly, authentication works, and the system performs well under load**.  



