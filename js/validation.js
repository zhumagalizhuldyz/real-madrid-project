
$(document).ready(function () {
    "use strict";

    
    $("#contactForm").on("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        const name = $("#contact-name").val().trim();
        const email = $("#contact-email").val().trim();
        const message = $("#contact-message").val().trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        $("#contactForm .form-control")
            .removeClass("is-invalid is-valid");

        $("#contact-success").addClass("d-none");

       
        if (name.length < 2) {
            $("#contact-name").addClass("is-invalid");
            isValid = false;
        } else {
            $("#contact-name").addClass("is-valid");
        }

        
        if (!emailPattern.test(email)) {
            $("#contact-email").addClass("is-invalid");
            isValid = false;
        } else {
            $("#contact-email").addClass("is-valid");
        }

        
        if (message.length < 10 || message.length > 500) {
            $("#contact-message").addClass("is-invalid");
            isValid = false;
        } else {
            $("#contact-message").addClass("is-valid");
        }

        if (!isValid) {
            return;
        }

        $("#contact-success")
            .removeClass("d-none")
            .hide()
            .fadeIn(400);

        $("#contactForm")[0].reset();

        $("#contactForm .form-control")
            .removeClass("is-valid is-invalid");
    });


    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    function checkPasswordsMatch() {
        const password = $("#reg-password").val();
        const confirmPassword = $("#reg-confirm-password").val();

        if (confirmPassword === "") {
            $("#reg-confirm-password").get(0).setCustomValidity("");

            $("#confirm-password-feedback").text(
                "Please confirm your password."
            );

            return;
        }

        if (password !== confirmPassword) {
            $("#reg-confirm-password").get(0).setCustomValidity(
                "Passwords do not match."
            );

            $("#confirm-password-feedback").text(
                "Passwords do not match. Please check and try again."
            );
        } else {
            $("#reg-confirm-password").get(0).setCustomValidity("");

            $("#confirm-password-feedback").text(
                "Passwords match!"
            );
        }
    }

    
    $("#reg-password, #reg-confirm-password").on("input", function () {
        checkPasswordsMatch();
    });


  
    $("#registerForm").on("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        const firstName = $("#reg-first-name").val().trim();
        const lastName = $("#reg-last-name").val().trim();
        const email = $("#reg-email").val().trim();
        const password = $("#reg-password").val();
        const confirmPassword = $("#reg-confirm-password").val();
        const country = $("#reg-country").val();

        
        $("#registerForm .form-control, #registerForm .form-select")
            .removeClass("is-invalid is-valid");

        $("#register-success").addClass("d-none");

      
        if (firstName.length < 2) {
            $("#reg-first-name").addClass("is-invalid");
            isValid = false;
        } else {
            $("#reg-first-name").addClass("is-valid");
        }

       
        if (lastName.length < 2) {
            $("#reg-last-name").addClass("is-invalid");
            isValid = false;
        } else {
            $("#reg-last-name").addClass("is-valid");
        }

       
        if (!emailPattern.test(email)) {
            $("#reg-email").addClass("is-invalid");
            isValid = false;
        } else {
            $("#reg-email").addClass("is-valid");
        }

        
        if (password.length < 8) {
            $("#reg-password").addClass("is-invalid");
            isValid = false;
        } else {
            $("#reg-password").addClass("is-valid");
        }

        
        checkPasswordsMatch();

        if (
            confirmPassword === "" ||
            password !== confirmPassword
        ) {
            $("#reg-confirm-password").addClass("is-invalid");
            isValid = false;
        } else {
            $("#reg-confirm-password").addClass("is-valid");
        }

        
        if (!country) {
            $("#reg-country").addClass("is-invalid");
            isValid = false;
        } else {
            $("#reg-country").addClass("is-valid");
        }

       
        if (!isValid) {
            return;
        }

        
        $("#register-success")
            .removeClass("d-none")
            .hide()
            .fadeIn(400);
    });


    
    $("#registerForm").on("reset", function () {
        setTimeout(function () {

            $("#registerForm .form-control, #registerForm .form-select")
                .removeClass("is-invalid is-valid");

            $("#reg-confirm-password").get(0).setCustomValidity("");

            $("#confirm-password-feedback").text(
                "Please confirm your password."
            );

            $("#register-success").addClass("d-none");

        }, 0);
    });

});
