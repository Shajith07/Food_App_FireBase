import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './SiginUp.css'
import myimage from "./Assest/User.png"
import myimage1 from "./Assest/email.png"
import myimage2 from "./Assest/password.png"
import myimage3 from "./Assest/close.png"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

function SiginUp() {
    const [fitH, setfitH] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };
      
    const onSubmit = async (data) => {
        console.log('Form submitted successfully:', data);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user

            await updateProfile(user, { displayName: data.name });
            console.log(userCredential)
            console.log(user)

            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/")

        }
        catch (error) {
            console.log(error)
        }
        reset();
    };


    useEffect(() => {
        if (errors.name || errors.email || errors.password) {
            setfitH(true)
        }
        if (!errors.name && !errors.email && !errors.password) {
            setfitH(false)
        }



    }, [errors.name, errors.password, errors.email, navigate])
    return (
        <div className='container' >
            <div className='startingd' style={{ height: fitH ? "480px" : "325px" }}>
                <div className='formname'>SignUp</div>
                <div className='formstart'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='inner-form' >
                            <input {...register('name', { required: 'name is required' })} placeholder="Enter Your Name" />
                            <img src={myimage} alt='UserImage' className='innerinput-img' />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>

                        <div className='inner-form'>
                            <input {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })} placeholder="Enter Your Email" />
                            <img src={myimage1} alt='EmailImage' className='innerinput-img' />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>

                        <div className='inner-form'>
                            <input {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })} type={showPassword ? 'text' : 'password'} placeholder="Enter Your Password" />
                            <img src={showPassword ? myimage2 : myimage3 }
                                alt='PasswordImage'
                                className='innerinput-img'
                                onClick={handleTogglePassword} />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        <input type="submit" value={"SignUp"} style={{ backgroundColor: "white", color: "black", width: "220px", marginTop: "35px" }} />
                        <div style={
                            { color: "white", marginTop: '20px', fontSize: '15px', marginLeft: '15px' }
                        }>Do You Have Accout?<span style={{ cursor: 'pointer' }}><Link to={'/'} style={{ color: 'red', textDecoration: 'none' }}>Login</Link></span> </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default SiginUp
