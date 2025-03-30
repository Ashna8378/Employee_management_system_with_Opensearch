document.addEventListener("DOMContentLoaded", function () {
    const employeeList = document.getElementById("employeeList");

    // Load employees from the server (API call)
    function loadEmployees() {
        fetch("http://localhost:5000/emp/get")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Employees:", data);
                // Clear any existing data in the table body
                employeeList.innerHTML = "";

                // Loop through the employee data using a for loop
                for (let i = 0; i < data.length; i++) {
                    const emp = data[i]._source;

                    // Create a table row for each employee
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${emp.name}</td>
                        <td>${emp.age}</td>
                        <td>${emp.email}</td>
                        <td>
                            <button class="edit-btn" onclick="editEmployee(${emp.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
                        </td>
                    `;

                    // Append the row to the table body
                    employeeList.appendChild(row);
                }
            })
            .catch(error => {
                console.error("Error fetching employees:", error);
            });
    }

    // Edit employee function (you can modify this function to handle edit logic)
    window.editEmployee = function (id) {
        console.log("Edit employee with ID:", id);
        // Implement your edit logic here (e.g., show a modal, etc.)
    };

    // Delete employee function
    window.deleteEmployee = function (id) {
        console.log("Delete employee with ID:", id);
        // Implement your delete logic here (e.g., call API to delete, remove from DOM, etc.)
        fetch(`http://localhost:5000/emp/delete/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete employee");
                }
                // On success, remove the employee row from the table
                loadEmployees();
            })
            .catch(error => {
                console.error("Error deleting employee:", error);
            });
    };

    // Load the employee list on page load
    loadEmployees();
});
