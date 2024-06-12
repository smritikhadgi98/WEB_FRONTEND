import React, { useState } from 'react'
import { registerUserApi } from '../../apis/Api'
import { toast} from 'react-toastify'

const Register = () => {
  //Logic Section

  // Make a useState for 5 Fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')



  // Use state for error message
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  //Make a each function for changing the value

  const handleFirstname = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastname = (e) => {
    setLastName(e.target.value);
  }


  const handleemail = (e) => {
    setEmail(e.target.value);
  }

  const handlepassword = (e) => {
    setPassword(e.target.value);
  }

  const handleconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  // Validation
  var validate = () => {
    var isValid = true;

    //Validate the first name
    if (firstName.trim() === '') {
      setFirstNameError('First name is required')
      isValid = false
    }


    if (lastName.trim() === '') {
      setLastNameError('Last name is required')
      isValid = false
    }

    if (email.trim() === '') {
      setEmailError('Email is required')
      isValid = false
    }

    if (password.trim() === '') {
      setPasswordError('Password is required')
      isValid = false
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm password is required')
      isValid = false
    }

    if(confirmPassword.trim() !== password.trim()){
      setConfirmPasswordError('Passwords doesnt match')
      isValid= false
    }
    return isValid;



  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //validate
    var isValidated = validate();
    if(!isValidated){
      return
    }
    // Sending request to the api

    // Making json object
    const data ={
      "firstName" : firstName,
      "lastName" : lastName,
      "email" : email,
      "password" : password
    
    }
   registerUserApi(data).then((res) =>{
      // Receive data : sucess, message
      if(res.data.sucess === false){
        toast.error(res.data.message)
      }else{
        toast.success(res.data.message)
      }
    }) 
  }





  return (
    <>
      <div className='container '>
        <h1>Create an Account</h1>
        <form className='w-50'>
          <label>FirstName : {firstName}</label>
          <input onChange={handleFirstname} type='text' className='form-control' placeholder='Enter your first name' />
          {
            firstNameError && <p className='text-danger'>{firstNameError}</p>
          }


          <label className='mt-2'>LastName :{lastName}</label>
          <input onChange={handleLastname} type='text' className='form-control' placeholder='Enter your last name' />
          {
            lastNameError && <p className='text-danger'>{lastNameError}</p>
          }

          <label className='mt-2'>Email :{email}</label>
          <input onChange={handleemail} type='text' className='form-control' placeholder='Enter your email' />
          {
            emailError && <p className='text-danger'>{emailError}</p>
          }

          <label className='mt-2'>Password :{password}</label>
          <input onChange={handlepassword} type='text' className='form-control' placeholder='Enter your password' />
          {
            passwordError && <p className='text-danger'>{passwordError}</p>
          }

          <label className='mt-2'>ConfirmPassword :{confirmPassword}</label>
          <input onChange={handleconfirmPassword} type='text' className='form-control' placeholder='Enter your first name' />
          {
            confirmPasswordError && <p className='text-danger'>{confirmPasswordError}</p>
          }

          <button onClick={handleSubmit} className='btn btn-dark mt-2 w-100'>Create an Account</button>


        </form>
      </div>
    </>
  )
}

export default Register

// Step 1 : Make Complete UI of Register Page (Fields, Button, etc)
// Step 2 : Input (Type) - Make a state
// Step 3 : onChange - Set the vzlue to the state 