import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null)
    const { setUser, setToken } = useStateContext()

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        console.log(import.meta.env.VITE_API_BASE_URL);

        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })

    }


    return (
        <form onSubmit={onSubmit}>
            <h1 className='title'>
                Signup for free
            </h1>
            {errors && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
            <input ref={nameRef} placeholder='Fullname' />
            <input ref={emailRef} type="email" placeholder='Email' />
            <input ref={passwordRef} type="password" placeholder='Password' />
            <input ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation' />
            <button className='btn btn-block'>Signup</button>
            <p className='message'>
                Already Registered? <Link to="/login">Sign In</Link>
            </p>
        </form>
    )
}

