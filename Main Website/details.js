/*
// Get form elements
const detailsForm = document.getElementById('detailsForm');
const continueButton = document.getElementById('continueButton');
const summaryTable = document.getElementById('summaryTable');

// Event listener for form submission
detailsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  storeFormData();
});

// Event listeners for form fields (to enable/disable Continue button)
detailsForm.addEventListener('input', () => {
  validateForm();
});

// Initialize the country code dropdown
const countryCodeDropdown = document.getElementById('countryCodeDropdown');

// Function to store form data in Local Storage
function storeFormData() {
  const formData = {
    fullName: document.getElementById('fullName').value,
    countryCode: iti.getSelectedCountryData().dialCode,
    mobileNumber: iti.getNumber(),
    email: document.getElementById('email').value,
    confirmEmail: document.getElementById('confirmEmail').value,
    gender: document.getElementById('gender').value,
  };
  localStorage.setItem('formData', JSON.stringify(formData));
  updateSummaryTable();
  continueButton.disabled = false;
}

// Function to update the summary table
function updateSummaryTable() {
  const formData = JSON.parse(localStorage.getItem('formData')) || {};

  // Build the summary table dynamically
  const tableRows = `
    <tr><td>Full Name</td><td>${formData.fullName}</td></tr>
    <tr><td>Mobile Number</td><td>${formData.countryCode} ${formData.mobileNumber}</td></tr>
    <tr><td>Email</td><td>${formData.email}</td></tr>
    <tr><td>Confirm Email</td><td>${formData.confirmEmail}</td></tr>
    <tr><td>Gender</td><td>${formData.gender}</td></tr>
  `;

  summaryTable.innerHTML = tableRows;

  // Calculate and update total payable
  const totalPayable = calculateTotalPayable();
  const totalPayableElement = document.getElementById('totalPayable');
  totalPayableElement.textContent = `Total Payable: $${totalPayable}`;
}

// Function to calculate total payable (replace with your logic)
function calculateTotalPayable() {
  const pricing = {
    'Foreigner Adult': { normal: 10, peak: 13 },
    'Foreigner Child': { normal: 5, peak: 8 },
    'SL Adult': { normal: 4, peak: 6 },
    'SL Child': { normal: 2, peak: 3 },
    'Infant': { normal: 0, peak: 0 }
  };

  // Sample logic to calculate total payable (replace with your logic)
  const selectedDuration = '08.00 am - 09.00 am'; // Replace with selected value
  const selectedTickets = { 'Foreigner Adult': 2, 'SL Child': 1 }; // Replace with selected values
  let totalPayable = 0;

  for (const ticket in selectedTickets) {
    const category = ticket;
    const count = selectedTickets[ticket];

    const selectedPricing = pricing[category];
    const isPeak = selectedDuration.includes('Peak');
    const price = isPeak ? selectedPricing.peak : selectedPricing.normal;

    totalPayable += count * price;
  }

  return totalPayable;
}

// Function to validate the form fields and enable/disable the Continue button
function validateForm() {
  const fullName = document.getElementById('fullName').value;
  const mobileNumber = document.getElementById('mobileNumber').value;
  const email = document.getElementById('email').value;
  const confirmEmail = document.getElementById('confirmEmail').value;

  const isFormValid = fullName !== '' && mobileNumber !== '' && email !== '' && email === confirmEmail;
  continueButton.disabled = !isFormValid;
}

// Load form data if available
window.addEventListener('load', () => {
  const formData = JSON.parse(localStorage.getItem('formData')) || {};
  document.getElementById('fullName').value = formData.fullName || '';
  document.getElementById('countryCode').value = formData.countryCode || '';
  document.getElementById('mobileNumber').value = formData.mobileNumber || '';
  document.getElementById('email').value = formData.email || '';
  document.getElementById('confirmEmail').value = formData.confirmEmail || '';
  document.getElementById('gender').value = formData.gender || '';

 
  // Initialize the country code dropdown
  const countryCodeDropdown = document.getElementById('countryCodeDropdown');

  const countryCodes = iti.getCountryList();
  countryCodes.forEach(country => {
    const option = document.createElement('option');
    option.value = country.dialCode;
    option.text = `${country.name} (+${country.dialCode})`;
    
    // Add flag icon class to the option
    option.classList.add('flag-icon', `flag-icon-${country.iso2.toLowerCase()}`);

    countryCodeDropdown.appendChild(option);
  });
   // Initialize intl-tel-input with the stored country code
   const input = document.querySelector("#mobileNumber");
   const iti = window.intlTelInput(input, {
     separateDialCode: true,
     preferredCountries: ["us", "gb", "ca", "au"] // Preferred country codes
   });
 

  updateSummaryTable();
  validateForm();
});

// Update summary table and total payable on form change
detailsForm.addEventListener('change', () => {
  updateSummaryTable();
  validateForm();
});

*/

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("details-form");
    const continueBtn = document.getElementById("continueBtn");
  
    // Load previously stored user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        form.fullName.value = userData.fullName;
        form.countryCode.value = userData.countryCode;
        form.mobileNumber.value = userData.mobileNumber;
        form.email.value = userData.email;
        form.confirmEmail.value = userData.confirmEmail;
        form.gender.value = userData.gender;
    }
  
    // Load summary table values from Ticket page localStorage
    const summaryDate = localStorage.getItem("sDate");
    const summaryTime = localStorage.getItem("sTime");
    const summaryDuration = localStorage.getItem("sDuration");
    const summaryTickets = localStorage.getItem("sTickets");
    const summaryTotal = localStorage.getItem("sTotal");
  
    // Populate the summary table with Ticket page data
    document.getElementById("sDate").textContent = summaryDate || "-";
    document.getElementById("sTime").textContent = summaryTime || "-";
    document.getElementById("sDuration").textContent = summaryDuration || "-";
    document.getElementById("sTickets").innerHTML = summaryTickets || "-";
    document.getElementById("sTotal").textContent = summaryTotal || "-";
  
    form.addEventListener("input", () => {
        const isFormValid = form.checkValidity();
        continueBtn.disabled = !isFormValid;
    });
  
    form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        // Store user inputs in localStorage
        const formData = {
            fullName: form.fullName.value,
            countryCode: form.countryCode.value,
            mobileNumber: form.mobileNumber.value,
            email: form.email.value,
            confirmEmail: form.confirmEmail.value,
            gender: form.gender.value,
        };
        localStorage.setItem("userData", JSON.stringify(formData));
        localStorage.setItem("fullName", form.fullName.value); // Store full name
        localStorage.setItem("mobileNumber", form.mobileNumber.value); // Store mobile number
        localStorage.setItem("email", form.email.value); // Store email
        localStorage.setItem("gender", form.gender.value); // Store gender
  
        // Redirect to Payment page
        window.location.href = "payment.html";
    });
  });
  
  