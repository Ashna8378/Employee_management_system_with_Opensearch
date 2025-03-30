document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("employeeForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission
       
        // Gather form data
        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            age: formData.get("age"),
            email: formData.get("email")
        };
        console.log(FormData)
        try {
            const response = await fetch("http://localhost:5000/emp/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Employee added successfully:", result);
            // Optionally, redirect to the employee list page
            // window.location.href = "employeeList.html";
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    });
});
