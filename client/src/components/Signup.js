import React from 'react';

const Signup = () => {

    const handleChange = (event) => {

    }

    const handleSubmit = () => {

    }

    return (
        <div>
            Sign Up
            <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="email"
                onChange={handleChange}
                name="email"
                // value={}
            />
            <input 
                type="submit"
                value="Sign Up"
            />
        </form>

        </div>
    )
}

export default Signup; 