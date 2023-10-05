window.onload = function(){

	var email = document.getElementById("email");
    var span1 = document.createElement("span");
	span1.style.display = "none";
    email.parentNode.appendChild(span1);

    var password = document.getElementById("pwd");
    var span2 = document.createElement("span");
	span2.style.display = "none";
    password.parentNode.appendChild(span2);

    var confirm = document.getElementById("confirm");
    var span3 = document.createElement("span");
	span3.style.display = "none";
    confirm.parentNode.appendChild(span3);
    
    email.onfocus = function(){
        document.getElementById("email").className = "form-control"
        span1.style.display="inline"
        span1.style.fontStyle="italic"
        span1.style.color = "#a9a9a9"
        span1.innerHTML = "Example: abc123@def.xyz"	
    }
    email.onblur = function(){
        span1.style.display = "none";
    }

    password.onfocus = function(){
        document.getElementById("pwd").className = "form-control"
        span2.style.display="inline"
        span2.style.fontStyle="italic"
        span2.style.color = "#a9a9a9"
        span2.innerHTML = " Password should contain atleast: <br>"	+
        " - 6 characters. <br>" +
        " - One uppercase <br>" +
        " - One number <br>" +
        " - One special character from the list: [!,@,#,$,%,^,&,*,+] <br>";
    }

    password.onblur = function(){
        span2.style.display = "none";
    }

    confirm.onfocus = function(){
        span3.style.display = "none";
    }

    var form = document.getElementById("myForm");
    form.onsubmit = function(e){
        var emailValue = document.getElementById("email").value
        var passwordValue = document.getElementById("pwd").value
        var confirmPasswordValue = document.getElementById("confirm").value

        var emailValidationResult = validateEmail(emailValue)
        var passwordValidationResult = validatePassword(passwordValue)
        var comparePasswordResult = isPasswordsNotEqual(passwordValue,confirmPasswordValue)

        if(!emailValidationResult) {
            document.getElementById("email").className = "error";
            document.getElementById("email").classList.add("form-control")
            span1.style.display="block"
            span1.style.fontStyle="italic"
            span1.style.color = "#D10000"
            span1.innerHTML = "Enter a valid email-id"
            e.preventDefault();
        }

        if(emailValidationResult && !passwordValidationResult) {
            document.getElementById("pwd").className = "error";
            document.getElementById("pwd").classList.add("form-control")
            span2.style.display="block"
            span2.style.fontStyle="italic"
            span2.style.color = "#D10000"
            span2.innerHTML = "Please follow the password constraints."
            e.preventDefault();
        }

        if(emailValidationResult && passwordValidationResult && comparePasswordResult) {
            document.getElementById("confirm").className = "error";
            document.getElementById("confirm").classList.add("form-control")
            span3.style.display="block"
            span3.style.fontStyle="italic"
            span3.style.color = "#D10000"
            span3.innerHTML = "Passwords do not match. Please Check"
            e.preventDefault();
        }
    }

    

    /** 
     * This function validates an email id. It performs a simple pattern matching of finding non-space character(s) before `@` character and 
     * non-space character(s) and the same for `.` character.
     * 
     * @param {email} email
     * 
     * @returns true if email matches the pattern else false.
     * 
     */

    function validateEmail(email) {
        let regularExpression = /\S+@\S+\.\S+/;
        return regularExpression.test(email);   
    }

    /** 
     * This function validates a password based on the given conditions
     * 
     * @param {password} password
     * 
     * @returns true if password matches the pattern else false.
     * 
     */
    function validatePassword(password) {
        var pattern = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*+]).+$");
        if (!password || password.length < 6) {
            return false
        }
        return pattern.test(password)
    }

    /** 
     * This function vaidates a password based on the given conditions
     * 
     * @param {password1} password1
     * @param {password2} password2
     * 
     * @returns true if password1 matches password2.
     * 
     */
     function isPasswordsNotEqual(password1,password2) {
        if(password1 == password2) {
            return false
        }
        return true
    }
}
