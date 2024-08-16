import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import Loading from "../components/loading"
import Popup from "../components/PopUp"

function SignUp() {
    const { login } = useAuthContext()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    })
    const [loading, setLoading] = useState(false)
    const [otpScreen, setOtpScreen] = useState(false)
    const [otp, setOtp] = useState(["", "", "", ""])
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const triggerPopup = (message) => {
        setPopupMessage(message)
        setShowPopup(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const formatPhoneNumber = (phoneNumber) => {
        const lastFourDigits = phoneNumber.slice(-4)
        return `xxxxxxx${lastFourDigits}`
    }

    const handleOTPinput = (e, index) => {
        const { value } = e.target
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)
            if (value && index < 3) {
                document.getElementById(`otp-input-${index + 1}`).focus()
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:8080/api/authenticatedata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setOtpScreen(true)
                console.log('Authentication successful:', response)
            } else {
                triggerPopup("Failed to Signup. Please try again!")
                console.error('Authentication failed:', response.message)
            }
        } catch (error) {
            triggerPopup("Failed to Signup. Please try again!")
            console.error('Error during authentication:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleOtpSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        const otpValue = otp.join("")
        try {
            const response = await fetch('http://127.0.0.1:8080/api/authenticateotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ otp: otpValue })
            })

            if (response.ok) {
                Response = await response.json()
                console.log('Authentication successful:', Response)
                login(Response.token)
                setLoading(false)
                navigate('/Welcome')
            } else {
                triggerPopup('Authentication failed:', Response.message)
                console.error(Response.message)
            }
        } catch (error) {
            console.error('Error during authentication:', error)
        }
    }

    const RequestOTP = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('http://127.0.0.1:8080/api/requestotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setOtpScreen(true)
                const result = await response.json()
                console.log('Authentication successful:', result)
            } else {
                triggerPopup('Failed to resend OTP,', response.message)
            }
        } catch (error) {
            console.error('Failed during requesting, ', error)
        }
    }

    const Login = () => {
        navigate('/Login')
    }

    return (
        <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2 bg-custom-white">
            <Popup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
            <div className="relative h-screen w-full flex justify-center items-center bg-custom-black">
                <h1 className="text-white font-poppins text-3xl font-bold">Create blogs like never before.</h1>
                <h1 className="absolute bottom-8 right-10 text-white font-poppins text-2xl font-bold">Scribbs.ai</h1>
            </div>
            {loading ? (
                <div className="w-full h-auto flex flex-col justify-center overflow-hidden">
                    <Loading />
                </div>
            ) : (
                <>
                    {otpScreen ? (
                        <div className="relative h-full w-full py-16 px-5 md:px-10 lg:px-32 flex justify-center items-center">
                            <form onSubmit={handleOtpSubmit} className="flex flex-col justify-center items-center h-full w-full space-y-4">
                                <h2 className="text-custom-black font-poppins font-semibold text-lg">
                                    Enter the Verification code sent to the number +91{formatPhoneNumber(formData.phone)}
                                </h2>
                                <div className="flex justify-center space-x-2">
                                    {otp.map((_, index) => (
                                        <input
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type="text"
                                            maxLength="1"
                                            value={otp[index]}
                                            onChange={(e) => handleOTPinput(e, index)}
                                            className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                                        />
                                    ))}
                                </div>
                                <p>Did'nt receive OTP? <button onClick={RequestOTP} className="underline underline-offset-2">Resend code</button></p>
                                <div className="h-auto w-full flex justify-center">
                                    <button type="submit" className="px-4 py-4 w-3/4 rounded-xl bg-custom-gray border-2 border-black font-poppins font-semibold tracking-wide text-white hover:scale-105 transition-transform">
                                        Verify my OTP
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="relative h-full w-full py-16 px-5 md:px-10 lg:px-32 flex justify-center items-center">
                            <form onSubmit={handleSubmit} className="flex flex-col justify-center h-full w-full space-y-2">
                                <label htmlFor="name" className="pl-2 text-custom-black font-poppins font-semibold tracking-wide text-md focus-within:outline-none focus-within:ring-2 focus-within:ring-custom-blue">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="px-3 py-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="phone" className="pl-2 pt-2 text-custom-black font-poppins font-semibold tracking-wide text-md focus-within:outline-none focus-within:ring-2 focus-within:ring-custom-blue">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="10 digits Phone number"
                                    className="px-3 py-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    pattern="^\d{10}$"
                                    title="Enter 10 digits number"
                                />
                                <label htmlFor="email" className="pl-2 pt-2 text-custom-black font-poppins font-semibold tracking-wide text-md focus-within:outline-none focus-within:ring-2 focus-within:ring-custom-blue">
                                    You are continuing with this email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="scribbs.ai@email.com"
                                    className="px-3 py-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <p className="px-4 py-2 text-gray-500 font-poppins text-sm text-center">
                                    Your email address is how we manage and link you with your teammates, make sure you have the right email address before continuing.
                                </p>
                                <div className="h-auto w-full flex justify-center">
                                    <button type="submit" className="px-4 py-4 w-3/4 rounded-xl bg-custom-gray border-2 border-black font-poppins font-semibold tracking-wide text-white hover:scale-105 transition-transform">
                                        NEXT
                                    </button>
                                </div>
                                <button onClick={Login} className=" text-custom-gray font-poppins text-[12px] text-center"> Already Have an Account? Try <p className=" underline underline-offset-4 hover:scale-110"> Loging In</p></button>
                            </form>
                            <p className=" absolute bottom-6 w-1/2 text-custom-gray font-poppins text-[12px] text-center"> By signing up you agree to the <a className="underline underline-offset-2 hover:decoration-sky-500 transition-colors" href="">Terms of Service</a> and <a className="underline underline-offset-2 hover:decoration-sky-500 transition-colors" href="">Privacy Policy</a> , including <a className="underline underline-offset-2 hover:decoration-sky-500 transition-colors" href="">Cookie use.</a></p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default SignUp