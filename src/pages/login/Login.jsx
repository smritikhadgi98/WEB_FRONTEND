
import React, {useState} from 'react'
import { toast } from 'react-toastify'
import { loginUserApi } from '../../apis/Api'


const Login = () => {


  // making a use  state for each input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // make a error state
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  
  const validation = () => {
    let isValid = true;

    if(email.trim() === '' || !email.includes('@') ){
      setEmailError('Email is empty or invalid ')
      isValid = false;
    }

    if(password.trim() === ''){
      setPasswordError('Password is empty ')
      isValid = false;
    }
    return isValid;
  }
  // MAKE a function to handle the form submission

  const handleLogin = (e) => {
    e.preventDefault()

    // Validation
    if(!validation()) {
      return;
    }


    // make a json object
    const data = {
      "email": email,
      "password": password
    }

    loginUserApi(data).then((res)=>{
      if(res.data.sucess===false){
        toast.error(res.data.message)
      }
      else{
        toast.success(res.data.message)

        //  Sucess-bool, message, token-text, user data -json 
        // Setting token and user data in local storage
        localStorage.setItem('token', res.data.token)

        // Setting user data
        const convertedData = JSON.stringify(res.data.userData)

        // local storage set
        localStorage.setItem('user', convertedData)

      }
    })


   
  }







  return (
    <>
    <div className='container'>
      <form>
        <label>Email Adress : {email}</label>
        <input onChange={(e) =>setEmail(e.target.value)}type='text' className='form-control' placeholder='Enter Your Email'></input>


        {
          emailError && <p className='text-danger'>{emailError}</p>
        }

        <label>Password: {password}</label>
        <input onChange={(e)=>setPassword(e.target.value)}type='text' className='form-control' placeholder='Enter Your Password'></input>
        

        {
          passwordError && <p className='text-danger'>{passwordError}</p>
        }


        <button onClick={handleLogin}className='btn btn-danger w-100 mt-2'> Login </button>
      </form>
      
      
      
    </div>
    </>
  )
}

export default Login
