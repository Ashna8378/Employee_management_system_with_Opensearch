document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("employeeForm");
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get("id");

    // If there's an employee ID in URL, fetch and populate the form
    if (employeeId) {
        try {
            const response = await fetch(`http://localhost:5000/emp/get/${employeeId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch employee data");
            }



            const employee = await response.json();
            form.elements["name"].value = employee.name;
            form.elements["age"].value = employee.age;
            form.elements["email"].value = employee.email;
        } catch (error) {
            console.error("Error loading employee data:", error);
        }
    }

    


    // Submit handler for both add and edit
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            age: formData.get("age"),
            email: formData.get("email")
        };

        const url = employeeId
            ? `http://localhost:5000/emp/update/${employeeId}`
            : "http://localhost:5000/emp/post";
        const method = employeeId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            const successMessage = employeeId
                ? "Employee updated successfully"
                : "Employee added successfully";

            if (result.message === successMessage) {
                window.location.href = "employeeList.html";
            }
        } catch (error) {
            console.error("Error saving employee:", error);
        }
    });
});










