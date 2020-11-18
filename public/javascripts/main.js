function userSignUp() {
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let repeatPassword = document.getElementById('repeatPassword').value;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

        if (password && repeatPassword) {

            if (password.length < 5) {
                errorMessage('Password length must be 5 characters')
            } else {

                if (password === repeatPassword) {
                    if (username && username.length > 4) {
                        $.ajax({
                            type: "POST",
                            url: "signup/userSignup",
                            data: { email, username, password },
                            success: function (res) {
                                if (res.error) {
                                    errorMessage(res.error)
                                } else {
                                    window.location.href = '/'
                                }
                            }
                        });
                    } else {
                        errorMessage('username required or must be 5 characters.')
                    }

                } else {
                    errorMessage('Password not match.')
                }
            }

        } else {
            errorMessage('Password fields mandatory.')
        }
        console.log('password length ok.')
    } else {
        errorMessage('Please enter valid email.');
    }
}
function userSignIn() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (email && password) {

        $.ajax({
            type: "POST",
            url: "/login",
            data: { email, password },
            success: function (res) {
                if (res.error) {
                    errorMessage(res.error)
                } else {
                    window.location.href = '/dashboard'
                }
            }
        });
    } else {
        errorMessage('Fields are mandatory.', 10000);
    }
}

function errorMessage(message, seconds) {
    let sec
    var error = document.getElementById('error');
    error.style.color = 'red'
    error.innerHTML = message
    if (seconds) {
        sec = seconds
    } else {
        sec = 5000
    }
    setTimeout(function () {
        document.getElementById("error").innerHTML = '';
    }, sec)
}

function changeUserProfilePic() {

    let fileObj = document.getElementById("image-file").files[0];
    if (fileObj) {
        var formData = new FormData();
        formData.append('file', fileObj);

        $.ajax({
            type: "POST",
            url: "/profile/uploadProfileImage",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    window.location.href = '/profile';
                } else {
                    errorMessage(response.error)
                }
            }
        });
    } else {
        errorMessage('first select image')
    }
}

function updateProfile() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    if (username && email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            $.ajax({
                type: "POST",
                url: "/profile/updateProfile",
                data: { username, email },
                success: function (res) {
                    if (res.error) {
                        errorMessage(res.error)
                    } else if (res.success) {
                        window.location.href = '/profile';
                    }
                }
            });
        } else {
            errorMessage('invalid email.')
        }
    } else {
        errorMessage('username, email must not be empty.')
    }
}

function updatePassword() {
    let password = document.getElementById('password').value;
    let repeatPassword = document.getElementById('repeatPassword').value;
    let oldPassword = document.getElementById('oldPassword').value;


    if (password && repeatPassword) {

        if (password.length < 5) {
            errorMessage('Password length must be 5 characters')
        } else {

            if (password === repeatPassword) {

                $.ajax({
                    type: "POST",
                    url: "reset-password/resetPassword",
                    data: { oldPassword, password },
                    success: function (res) {
                        if (res.error) {
                            errorMessage(res.error)
                        } else {
                            errorMessage('Password updated successfully.')
                        }
                    }
                });
            } else {
                errorMessage('Password not match.')
            }
        }
    } else {
        errorMessage('Password fields mandatory.')
    }
}
function userSignIn() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (email && password) {

        $.ajax({
            type: "POST",
            url: "/login",
            data: { email, password },
            success: function (res) {
                if (res.error) {
                    errorMessage(res.error)
                } else {
                    window.location.href = '/dashboard'
                }
            }
        });
    } else {
        errorMessage('Fields are mandatory.', 10000);
    }
}