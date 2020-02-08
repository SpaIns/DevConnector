import React, { Fragment, useState } from 'react'
import axios from 'axios'

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    // Deconstruct form data
    const { name, email, password, password2} = formData

    // Generic onChange handler for our form
    //uses the 'name' field of the input to determine which field to update in our state
    const changeHandler = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    // Remember, needs to be async b/c we need to do DB stuff
    const submitHandler = async (event) => {
        event.preventDefault()
        if (password !== password2) {
            // Don't submit, set alert
            console.log('No pwd match')
        }
        else {
            const newUser = {
                name, email, password
            }
            try {
                // NOTE: default axios headers are this, not required
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
                //May not need to do this; seems like passing raw user works as well
                const body = JSON.stringify(newUser)

                // We can post this directly to our route b/c of our proxy
                const res = await axios.post('/api/users', body, config)

                console.log(res.data)
            } catch (error) {
                console.error(error.response.data)
            }
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-group">
                <input type="text" placeholder="Name" name="name" 
                onChange={changeHandler}
                required />
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" onChange={changeHandler}/>
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    onChange={changeHandler}
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    onChange={changeHandler}
                    minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </Fragment>
    )
}

export default Register