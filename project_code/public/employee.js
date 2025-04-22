document.addEventListener("DOMContentLoaded", function () {
    const employeeList = document.getElementById("employeeList");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");
    const loader = document.getElementById("loader");
    const searchInput = document.getElementById("searchInput");
  
    let from = 0;
    const size = 1000;
    let employeesData = [];
    let currentQuery = "";  // track search query
  
    function renderEmployees(data) {
      employeeList.innerHTML = "";
  
      if (data.length === 0) {
        employeeList.innerHTML = "<tr><td colspan='4'>No employees found</td></tr>";
        return;
      }

      
  
      data.forEach(empData => {
        const emp = empData._source;
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${emp.name}</td>
         <td>${emp.age}</td>
          <td>${emp.email}</td>
          <td>
            <button class="edit-btn" onclick="editEmployee('${empData._id}')">Edit</button>
            <button class="delete-btn" onclick="deleteEmployee('${empData._id}')">Delete</button>
          </td>
        `;
        employeeList.appendChild(row);
      });
    }
  
    function loadEmployees() {
      loader.style.display = "block";
      employeeList.innerHTML = "";
  
      const url = `http://localhost:5000/emp/get?from=${from}&size=${size}`;
  
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(data => {
          employeesData = data;
          loader.style.display = "none";
          
          const filtered = currentQuery
            ? employeesData.filter(empData => {
                const emp = empData._source;
                return (
                  emp.name.toLowerCase().includes(currentQuery) ||
                  emp.email.toLowerCase().includes(currentQuery)
                );
              })
            : employeesData;
  
          renderEmployees(filtered);
          updatePagination(filtered.length);
        })
        .catch(error => {
          console.error("Error fetching employees:", error);
          loader.style.display = "none";
        });
    }
  
    function updatePagination(dataLength) {
      pageInfo.textContent = `Showing ${from + 1} - ${from + dataLength}`;
      prevPageBtn.disabled = from === 0;
      nextPageBtn.disabled = dataLength < size;
    }
  
    searchInput.addEventListener("input", function () {
      currentQuery = this.value.toLowerCase();
      const filtered = employeesData.filter(empData => {
        const emp = empData._source;
        return (
          emp.name.toLowerCase().includes(currentQuery) ||
          emp.email.toLowerCase().includes(currentQuery)
        );
      });
      renderEmployees(filtered);
    });
  
    window.editEmployee = function (id) {
      window.location.href = `employeeForm.html?id=${id}`;
    };
  
    window.deleteEmployee = function (id) {
      fetch(`http://localhost:5000/emp/delete/${id}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) throw new Error("Failed to delete employee");
          loadEmployees();
        })
        .catch(error => console.error("Error deleting employee:", error));
    };
  
    prevPageBtn.addEventListener("click", function () {
      if (from > 0) {
        from -= size;
        loadEmployees();
      }
    });
  
    nextPageBtn.addEventListener("click", function () {
      from += size;
      loadEmployees();
    });
  
    loadEmployees();
  });
  



