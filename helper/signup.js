const validateForm = (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Simulate asynchronous validation

            console.log('formData', formData);
            const errors = {};

            if (!formData.Username) {
                errors.Username = "Name is required";
            }

            if (!formData.FirstName) {
                errors.name = "FirstName is required";
            }

            if (!formData.EmailID) {
                errors.EmailID = "Email is required";
            } else if (!/^\S+@\S+\.\S+$/.test(formData.EmailID)) {
                errors.EmailID = "Invalid email format";
            }

            if (!formData.Password) {
                errors.Password = 'Password field cannot be empty';
            }

            if (!formData.ContactNumber) {
                errors.ContactNumber = 'ContactNumber field cannot be empty';
            }

            if (!formData.DOB) {
                errors.DOB = 'DOB field cannot be empty';
            }

            //if (Object.keys(errors).length === 0) {
                // No errors, the form is valid
                resolve("Validation Successful");
            //} 
        } catch (error) {
            // Handle any synchronous errors that occur during validation
            reject(error);
        }
    });
};

module.exports = validateForm;
