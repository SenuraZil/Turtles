document.addEventListener("DOMContentLoaded", () => {
    const confirmationTable = document.getElementById("confirmationTable");

    // Load summary table values from localStorage
    const summaryDate = localStorage.getItem("sDate");
    const summaryTime = localStorage.getItem("sTime");
    const summaryDuration = localStorage.getItem("sDuration");
    const summaryTickets = localStorage.getItem("sTickets");
    const summaryTotal = localStorage.getItem("sTotal");

    // Populate the confirmation table with summary data
    const tableRows = `
        <tr><td>Name</td><td>${localStorage.getItem("fullName") || "-"}</td></tr>
        <tr><td>Date</td><td>${summaryDate || "-"}</td></tr>
        <tr><td>Time</td><td>${summaryTime || "-"}</td></tr>
        <tr><td>Duration</td><td>${summaryDuration || "-"}</td></tr>
        <tr><td>Mobile</td><td> ${localStorage.getItem("mobileNumber") || "-"}</td></tr>
        <tr><td>Email</td><td>${localStorage.getItem("email") || "-"}</td></tr>
        <tr><td>Gender</td><td>${localStorage.getItem("gender") || "-"}</td></tr>
        <tr><td>Tickets</td><td>${summaryTickets || "-"}</td></tr>
        <tr><td>Total Payable</td><td>${summaryTotal || "-"}</td></tr>
    `;

    confirmationTable.innerHTML = tableRows;
});
