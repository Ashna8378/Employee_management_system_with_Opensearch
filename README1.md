# CRUD and Bulk Data Insert in OpenSearch

This project demonstrates an Express server that interfaces with OpenSearch for storing and managing data. It also includes a bulk data insertion process using Python, containerized with Docker. The application allows users to insert bulk data into OpenSearch and provides an Express server to insert and display single data entries.


## Prerequisites

Before running the project, make sure to install the following dependencies on your machine:

- **Docker**: To run containers for OpenSearch and other services.
- **Docker Compose**: To manage multi-container Docker applications.

You can install Docker and Docker Compose by following these steps:

### 1. Install Docker

Follow the official installation guide for Docker:  
[Install Docker](https://docs.docker.com/get-docker/)

### 2. Install Docker Compose

Follow the official installation guide for Docker Compose:  
[Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone git@github.com:abhirock74/opensearch_crud.git
docker-compose up -d
cd bulk_data
python3 employee.py
cd ..
cd app
npm start

# Podman setup commands 
# image pull
# container create
# container status 
# container stop
# container restart


# Project Setup 
# Container setup 
# Database index creating 
# making script to put data 
# crud operation 
# frontend 
# login page 


# 1. created a repository on github 
# 2. cloned that repository
# 3. setting up express 
# 4. used npm init -y command 
# 5. npm i express 
# 6. touch .gitignore 
# 7. cat > .gitignore
# 8. npm i nodemon
# 9. npm start
# 10. npm i dotenv
# 11. touch .env 
# 12. cat .env











































