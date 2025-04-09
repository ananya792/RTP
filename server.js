// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.action-card').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;

            switch (action) {
                case 'scheduleHealthCheck':
                    openHealthCheckModal();
                    break;
                case 'initiateEmergency':
                    confirmEmergency();
                    break;
                // Add other cases as needed
            }
        });
    });
});

function confirmEmergency() {
    Swal.fire({
        title: 'Emergency Alert',
        html: `
            <select class="swal2-input" id="emergencyType">
                <option value="medical">Medical Emergency</option>
                <option value="fall">Fall Detection</option>
                <option value="other">Other Emergency</option>
            </select>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e53e3e',
        confirmButtonText: 'Trigger Alert'
    }).then((result) => {
        if (result.isConfirmed) {
            const emergencyType = document.getElementById('emergencyType').value;
            triggerEmergencyAlert(emergencyType);
        }
    });
}

function triggerEmergencyAlert(emergencyType) {
    console.log(`Triggering emergency alert of type: ${emergencyType}`);
    // Use fetch() or AJAX to send data to the server if needed
}