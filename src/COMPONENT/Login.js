import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './Login.css'
import myimage1 from "./Assest/email.png"
import myimage2 from "./Assest/password.png"
import myimage3 from "./Assest/close.png"
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

function Login() {
    const [fitH, setfitH] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [ress, setress] = useState('');
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        console.log('Form submitted successfully:', data);



        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user
            console.log(userCredential)


            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/food', { state: user.displayName })

        }
        catch (error) {
            setress(error.message)
        }
        reset();

    };
    useEffect(() => {
        if (errors.email || errors.password) {
            setfitH(true)
        }
        if (!errors.email && !errors.password) {
            setfitH(false)
        }


    }, [errors.email, errors.password, ress, navigate])
    return (
        <div className='container' >
            <div className='startingd' style={{ height: fitH ? "470px" : "300px" }}>
                <div className='formname'>Login</div>
                <div className='formstart'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='inner-form'>
                            <input {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })} placeholder="Enter Your Email" />
                            <img src={myimage1} alt='EmailImage' className='innerinput-img' />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>

                        <div className='inner-form'>
                            <input {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })} type={showPassword ? 'text' : 'password'} placeholder="Enter Your Password" />
                            <img src={showPassword ? myimage2 : myimage3 /* replace myimage2 with your open and close eye icons */}
                                alt='PasswordImage'
                                className='innerinput-img'
                                onClick={handleTogglePassword} /> {errors.password && <p>{errors.password.message}</p>}
                            {ress && <span className='invalid'>Invalid Email or Password </span>}
                        </div>

                        <input type="submit" value={"Login"} style={{ backgroundColor: "white", color: "black", width: "220px", marginTop: "35px" }} />
                        <div style={
                            { color: "white", marginTop: '20px', fontSize: '15px', marginLeft: '15px' }
                        }>You Don't Have Accout?<span style={{ color: 'violet', cursor: 'pointer' }}><Link to='/signup' style={{ color: 'red', textDecoration: 'none' }}>SignUp</Link></span> </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default Login
