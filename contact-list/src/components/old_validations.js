if (fieldname === "email") {
    if (value.length) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && value.length <= 100) {
            emailError = "Invalid email address";
            objRule[fieldname].error = "Invalid email address";
            setValue(field.fieldname, value);
        }
        else if (value.length > 100) {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                emailError = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid Email address" : "";
                objRule[fieldname].error = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid Email address" : "";
                setCurrentError(false);
                setFormError((nameError + emailError + phoneError + aboutError + companyError + addressError).length > 0);
            }, 1500);
            emailError = "You can enter max 100 chars";
            objRule[fieldname].error = "You can enter max 100 chars";
            setCurrentError(true);
        }
        else {
            emailError = "";
            objRule[fieldname].error = "";
            setValue(field.fieldname, value);
        }
    }
    else {
        emailError = "email is required";
        objRule[fieldname].error = "email is required";
        setValue(field.fieldname, value);
    }
}
if (fieldname === "phone") {
    setValue(field.fieldname, value);
    if (value.length) {
        if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)) {
            phoneError = "Invalid phone number";
        }
        else {
            phoneError = "";
        }
    }
    else {
        phoneError = "phone is required";
    }
}
if (fieldname === "company") {
    if (value.length) {
        if (value.length < 2) {
            companyError = "Enter ateleast 2 chars";
            setValue(field.fieldname, value);
        }
        else if (value.length > 32) {

            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                companyError = "";
                setCurrentError(false);
                setFormError((nameError + emailError + phoneError + aboutError + companyError + addressError).length > 0);
            }, 1500);
            companyError = "You can enter max 32 chars";
            setCurrentError(true);

        }
        else {
            companyError = "";
            setValue(field.fieldname, value);
        }
        // companyError = value.length < 2 ? "atleast 2 chars" : value.length > 32 ? "max 32 chars" : "";
    }
    else {
        companyError = "";
        setValue(field.fieldname, value);
    }
}
if (fieldname === "address") {

    if (value.length) {
        if (value.length < 4) {
            addressError = "Enter ateleast 4 chars";
            setValue(field.fieldname, value);
        }
        else if (value.length > 50) {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                addressError = "";
                setCurrentError(true);
                setFormError((nameError + emailError + phoneError + aboutError + companyError + addressError).length > 0);
            }, 1500);
            addressError = "You can enter max 50 chars";
            setCurrentError(false);
        }
        else {
            addressError = "";
            setValue(field.fieldname, value);
        }
    }
    else {
        addressError = "";
        setValue(field.fieldname, value);
    }
}
if (fieldname === "about") {
    if (value.length) {
        if (value.length < 2) {
            aboutError = "Enter ateleast 2 chars";
            setValue(field.fieldname, value);
        }
        else if (value.length > 100) {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                aboutError = "";
                setCurrentError(true);
                setFormError((nameError + emailError + phoneError + aboutError + companyError + addressError).length > 0);
            }, 1500);
            aboutError = "You can enter max 100 chars";
            setCurrentError(false);
        }
        else {
            aboutError = "";
            setValue(field.fieldname, value);
        }
        // aboutError = value.length < 1 ? "atleast 1 chars" : value.length > 100 ? "max 100 chars" : "";
    }
    else {
        aboutError = "";
        setValue(field.fieldname, value);
    }
}