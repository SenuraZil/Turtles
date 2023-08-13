document.addEventListener("DOMContentLoaded", function () {
    // Function to calculate the total payable based on user inputs
    function calculateTotalPayable() {
      // Retrieve the number of tickets selected for each category
      const slAdultTickets = parseInt(document.getElementById("slAd").value) || 0;
      const slChildTickets = parseInt(document.getElementById("slCh").value) || 0;
      const foreignerAdultTickets = parseInt(document.getElementById("fad").value) || 0;
      const foreignerChildTickets = parseInt(document.getElementById("fch").value) || 0;
      const infantTickets = parseInt(document.getElementById("infant").value) || 0;
  
      // Retrieve the selected time slot
      const selectedTimeSlot = document.getElementById("based time ").value;
      const isPeakHour = selectedTimeSlot >= "10-11" && selectedTimeSlot <= "17-18" || selectedTimeSlot === "05-06";
  
      // Retrieve the pricing details for each ticket type
      const slAdultNormalCharge = 4;
      const slAdultPeakCharge = 6;
      const slChildNormalCharge = 2;
      const slChildPeakCharge = 3;
      const foreignerAdultNormalCharge = 10;
      const foreignerAdultPeakCharge = 13;
      const foreignerChildNormalCharge = 5;
      const foreignerChildPeakCharge = 8;
  
      // Calculate the total payable amount
      const totalPayable =
        slAdultTickets * (isPeakHour ? slAdultPeakCharge : slAdultNormalCharge) +
        slChildTickets * (isPeakHour ? slChildPeakCharge : slChildNormalCharge) +
        foreignerAdultTickets * (isPeakHour ? foreignerAdultPeakCharge : foreignerAdultNormalCharge) +
        foreignerChildTickets * (isPeakHour ? foreignerChildPeakCharge : foreignerChildNormalCharge);
  
      return totalPayable;
    }
  
    // Function to update the summary table based on user inputs
    function updateSummary() {
      const visitDate = document.getElementById("visitDate").value;
      const selectedTimeSlot = document.getElementById("based time ").value;
      const isPeakHour = selectedTimeSlot >= "10-11" && selectedTimeSlot <= "17-18" || selectedTimeSlot === "05-06";
  
      const summaryDateCell = document.getElementById("sDate");
      const summaryTimeCell = document.getElementById("sTime");
      const summaryDurationCell = document.getElementById("sDuration");
      const summaryTicketsCell = document.getElementById("sTickets");
      const summaryTotalCell = document.getElementById("sTotal");
  
      summaryDateCell.textContent = visitDate;
      summaryTimeCell.textContent = selectedTimeSlot;
      summaryDurationCell.textContent = `1 hrs (${isPeakHour ? "0 Peak" : "01 Normal"})`;
  
      const slAdultTickets = parseInt(document.getElementById("slAd").value) || 0;
      const slChildTickets = parseInt(document.getElementById("slCh").value) || 0;
      const foreignerAdultTickets = parseInt(document.getElementById("fad").value) || 0;
      const foreignerChildTickets = parseInt(document.getElementById("fch").value) || 0;
      const infantTickets = parseInt(document.getElementById("infant").value) || 0;
  
      summaryTicketsCell.innerHTML = `
        ${slAdultTickets} SL Adult $${slAdultTickets * (isPeakHour ? 6 : 4)}<br>
        ${slChildTickets} SL Child $${slChildTickets * (isPeakHour ? 3 : 2)}<br>
        ${foreignerAdultTickets} Foreigner Adult $${foreignerAdultTickets * (isPeakHour ? 13 : 10)}<br>
        ${foreignerChildTickets} Foreigner Child $${foreignerChildTickets * (isPeakHour ? 8 : 5)}<br>
        ${infantTickets} Infant Free
      `;
  
      const totalPayable = calculateTotalPayable();
      summaryTotalCell.textContent = `$${totalPayable}`;
  
      // Store the summary table values in the browser's local storage
      localStorage.setItem("sDate", visitDate);
      localStorage.setItem("sTime", selectedTimeSlot);
      localStorage.setItem("sDuration", `1 hrs (${isPeakHour ? "0 Peak" : "01 Normal"})`);
      localStorage.setItem("sTickets", summaryTicketsCell.innerHTML);
      localStorage.setItem("sTotal", `$${totalPayable}`);
  
      // Enable or disable the "Continue with purchase" button based on user inputs
      const continueButton = document.getElementById("continueButton");
      continueButton.disabled = totalPayable <= 0;
    }
  
    // Retrieve data from local storage and update the summary table
    const storedSummaryDate = localStorage.getItem("sDate");
    const storedSummaryTime = localStorage.getItem("sTime");
    const storedSummaryDuration = localStorage.getItem("sDuration");
    const storedSummaryTickets = localStorage.getItem("sTickets");
    const storedSummaryTotal = localStorage.getItem("sTotal");
  
    if (storedSummaryDate && storedSummaryTime && storedSummaryDuration && storedSummaryTickets && storedSummaryTotal) {
      document.getElementById("sDate").textContent = storedSummaryDate;
      document.getElementById("sTime").textContent = storedSummaryTime;
      document.getElementById("sDuration").textContent = storedSummaryDuration;
      document.getElementById("sTickets").innerHTML = storedSummaryTickets;
      document.getElementById("sTotal").textContent = storedSummaryTotal;
    }
  
    // Add event listeners to the input elements
    document.getElementById("visitDate").addEventListener("change", updateSummary);
    document.getElementById("based time ").addEventListener("change", updateSummary);
    document.getElementById("slAd").addEventListener("input", updateSummary);
    document.getElementById("slCh").addEventListener("input", updateSummary);
    document.getElementById("fad").addEventListener("input", updateSummary);
    document.getElementById("fch").addEventListener("input", updateSummary);
    document.getElementById("infant").addEventListener("input", updateSummary);
  
    // Add event listeners to increment and decrement buttons
    const incrementButtons = document.querySelectorAll(".increment");
    const decrementButtons = document.querySelectorAll(".decrement");
  
    function handleIncrement(event) {
      const inputElement = event.target.parentElement.querySelector("input");
      inputElement.value = parseInt(inputElement.value) + 1;
      updateSummary();
    }
  
    function handleDecrement(event) {
      const inputElement = event.target.parentElement.querySelector("input");
      const currentValue = parseInt(inputElement.value);
      inputElement.value = currentValue > 0 ? currentValue - 1 : 0;
      updateSummary();
    }
  
    incrementButtons.forEach((button) => {
      button.addEventListener("click", handleIncrement);
    });
  
    decrementButtons.forEach((button) => {
      button.addEventListener("click", handleDecrement);
    });
  
    // Initial update of the summary table on page load
    updateSummary();
  });

