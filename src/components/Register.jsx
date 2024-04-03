import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "./firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const Register = () => {

    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)


    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const accepted = e.target.terms.checked
        // console.log(name);

        // reset error and success
        setRegisterError('')
        setSuccess('')

        if (password.length < 6) {
            setRegisterError('password must be 6 character or longer')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('please give must be minimum one upper case')
            return
        }
        else if (!accepted) {
            setRegisterError('Please accept terms and conditions.')
            return
        }



        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setSuccess('User created successfully')

                // update profile
                updateProfile(result.user,
                    {
                        displayName: name,
                        photoURL: "https://example.com/jane-q-user/profile.jpg"
                    })
                    .then(()=>{
                        console.log('profile updated');
                    })
                    .catch()


                // send verification email:
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('check email and verified account')
                    })
            })
            .catch((error) => {
                console.error(error);
                setRegisterError(error.message)
            });
    }

    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="font-bold text-3xl my-4">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="mb-4 py-2 px-4 w-full border" type="text" name="name" placeholder="Your name " required />
                    <br />
                    <input className="mb-4 py-2 px-4 w-full border" type="email" name="email" placeholder="Your email address" required />
                    <br />
                    <div className="relative mb-4">
                        <input
                            className="py-2 px-4 w-full border" type={showPassword ? 'text' : "password"}
                            name="password"
                            placeholder="Your password" required />
                        <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <br />
                    <div className="mb-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept Our <a href="">terms and conditions</a></label>
                    </div>
                    <br />
                    <input className="w-full btn btn-secondary" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-900">{registerError}</p>
                }
                {
                    success && <p className="text-green-800">{success}</p>
                }
                <p>Already have an account? please <Link className="font-bold" to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;