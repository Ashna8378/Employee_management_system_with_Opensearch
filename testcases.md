# TEST CASES - OpenSearch CRUD System

## Submitted By - Ashna Dubey

## Submitted To
**Mr. Vipin Tripathi**  
## Test Case Version
**1.0**  
## Reviewer Name
**Mr. Vipin Tripathi**  

---

## Goal  
The project involves deploying **OpenSearch** using **Podman**, inserting **1 lakh records** using a **Python script**, and developing a **CRUD web interface** with **Express.js** for user interactions. Authentication will be required before accessing CRUD operations.

---

## Table of Contents  

- **TC 1**: Setup OpenSearch in Podman  
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
- **Platform**: Podman (Containerized OpenSearch Setup)  
- **Backend**: Express.js for API handling  
- **Database**: OpenSearch  
- **Frontend**: Web interface for CRUD operations  

---

## **Test Cases**  

### **TC 1: Setup OpenSearch in Podman**
**Scenario**  
Ensure that OpenSearch is successfully deployed in a Podman container.  

**Given**  
- Podman is installed on the system.  

**When**  
- The command to pull and run OpenSearch in Podman is executed.  

**Then**  
- OpenSearch container starts successfully.  
- The `podman ps` command lists OpenSearch as running.  

**Testing Outputs**  
(Screenshots of running container)  

---

### **TC 2: Verify OpenSearch Cluster Health**
**Scenario**  
Check if OpenSearch is running and healthy.  

**Given**  
- OpenSearch container is running.  

**When**  
- The health check API (`GET /_cluster/health`) is called.  

**Then**  
- API should return a status of `"green"` or `"yellow"`, indicating a functional cluster.  

**Testing Outputs**  
(JSON response from OpenSearch cluster health check)  

---

### **TC 3: Insert Bulk Data into OpenSearch**
**Scenario**  
Ensure that a Python script can insert 1 lakh records into OpenSearch.  

**Given**  
- OpenSearch is running.  
- Python script is configured with proper OpenSearch credentials.  

**When**  
- The script is executed to insert bulk data.  

**Then**  
- OpenSearch successfully indexes the data.  
- No errors occur during insertion.  

**Testing Outputs**  
(Log of inserted records & response from OpenSearch)  

---

### **TC 4: Validate Data Insertion in OpenSearch**
**Scenario**  
Verify that data is correctly stored in OpenSearch.  

**Given**  
- Bulk data insertion was successful.  

**When**  
- The `GET /index_name/_count` API is called.  

**Then**  
- API should return a count of **1,00,000** records.  

**Testing Outputs**  
(JSON response showing total records in OpenSearch)  

---

### **TC 5: Implement User Authentication (Login Page)**
**Scenario**  
Ensure a login page exists and requires authentication before accessing CRUD operations.  

**Given**  
- User visits the CRUD web interface.  

**When**  
- User tries to access CRUD operations **without logging in**.  

**Then**  
- The system should **redirect to the login page**.  

**Testing Outputs**  
(Screenshot of redirection to login page)  

---

### **TC 6: Verify Authentication Flow**
**Scenario**  
Validate that only authenticated users can access CRUD features.  

**Given**  
- A valid user with credentials exists.  

**When**  
- The user enters correct credentials and logs in.  

**Then**  
- The system should grant access to CRUD operations.  
- API should return a session token.  

**Testing Outputs**  
(JSON response with authentication token)  

---

### **TC 7: Test CRUD Operations via Web Interface**

#### **TC 7.1: Create Operation**
**Scenario**  
Ensure users can insert new records into OpenSearch via the web interface.  

**Given**  
- User is logged in.  

**When**  
- User submits a new entry using the UI.  

**Then**  
- Data is successfully inserted into OpenSearch.  
- API returns a **success response (201 Created)**.  

**Testing Outputs**  
(Screenshot of API response & UI entry confirmation)  

---

#### **TC 7.2: Read Operation**
**Scenario**  
Ensure users can retrieve stored records.  

**Given**  
- OpenSearch contains records.  

**When**  
- User searches for a specific record.  

**Then**  
- The system fetches and displays the record correctly.  

**Testing Outputs**  
(JSON response with search results)  

---

#### **TC 7.3: Update Operation**
**Scenario**  
Ensure users can update existing records in OpenSearch.  

**Given**  
- A record exists in OpenSearch.  

**When**  
- User edits the record and submits the update.  

**Then**  
- The system updates the record in OpenSearch.  
- API returns **success response (200 OK)**.  

**Testing Outputs**  
(JSON response showing updated record)  

---

#### **TC 7.4: Delete Operation**
**Scenario**  
Ensure users can delete records from OpenSearch.  

**Given**  
- A record exists in OpenSearch.  

**When**  
- User clicks the delete button.  

**Then**  
- The record is removed from OpenSearch.  
- API returns **success response (200 OK)**.  

**Testing Outputs**  
(Screenshot of API response confirming deletion)  

---

### **TC 8: API Security & Authentication Check**
**Scenario**  
Verify that unauthenticated users cannot access OpenSearch API.  

**Given**  
- User is **not logged in**.  

**When**  
- User tries to access an API endpoint directly.  

**Then**  
- API should return **401 Unauthorized**.  

**Testing Outputs**  
(JSON error response from API)  

---

### **TC 9: OpenSearch Query Performance Testing**
**Scenario**  
Ensure OpenSearch handles large datasets efficiently.  

**Given**  
- 1 lakh records exist in OpenSearch.  

**When**  
- A complex search query is executed.  

**Then**  
- Response time should be under **2 seconds**.  

**Testing Outputs**  
(Query execution time logs)  

---

## **Conclusion**  
This test plan ensures the complete validation of **OpenSearch deployment, authentication, CRUD operations, and performance checks** for the project.  

