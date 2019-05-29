let Email = (email) => {

    let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegex.test(String(email).toLowerCase());
    
  }
  
    /* Minimum 8 characters which contain only characters,numeric digits, underscore and first character must be a letter */
  let Password = (password) => {
    let passwordRegex = /^[A-Za-z0-9]\w{7,}$/
    return passwordRegex.test(String(password))
  }
  
  module.exports = {
    Email: Email,
    Password: Password
  }
  