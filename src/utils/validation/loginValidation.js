const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginValidation = (data)=> {
 
 const {email, password} = data;

// Password validation: Minimum 8 characters, at least one letter and one number
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/;

let errors = {status: "success"};

  // Validate email
  if (!email) {
    errors.status = "failed";
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
    errors.status = "failed";
  }

    // Validate password
if (!password) {
    errors.password = "Password is required."
    errors.status = "failed";;
   } 
//    else if (!passwordRegex.test(password)) {
//     errors.password = "Password must be at least 8 characters long and contain at least one letter and one number.";
//     errors.status = "failed";
//    }
 
   return errors;

}


// Profile update Validation

export const validateProfileData = (data) => {
const checkNameRegex =  /^[A-Za-z0-9\s_]+$/;
let errors = {status: "success"};

for (const element in data) {
  if(data[element] == ""){
    errors.status = "failed";
    errors[element] = `Please enter ${element}`;
  }
  if(data[element] === "first_name" || element === "last_name"){
   if(!checkNameRegex.test(element)){
    errors.status = "failed";
    errors[element] = `Please enter valid ${element}`;
  }
}
else if(data[element] === "email"){
  if(!emailRegex.test(data[element])){
    errors.status = "failed";
    errors[element] = `Please enter valid ${element}`;
  }
}
}

return errors;

// if(first_name == ""){
//   errors.status = "failed";
//   errors.first_name = "Please enter first name";
// }
// else if(!checkNameRegex.test(first_name)){
//   errors.status = "failed";
//   errors.first_name = "Please enter valid name";
// }

// if(last_name == ""){
//   errors.status = "failed";
//   errors.last_name = "Please enter last name";
// }
// else if(!checkNameRegex.test(last_name)){
//   errors.status = "failed";
//   errors.last_name = "Please enter valid last name";
// }

// if(email == ""){
//   errors.status = "failed";
//   errors.last_name = "Please enter last name";
// }
// else if(!checkNameRegex.test(last_name)){
//   errors.status = "failed";
//   errors.last_name = "Please enter valid last name";
// }



}