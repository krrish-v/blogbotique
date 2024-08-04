import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import Loading from "../components/loading"

function LogIn() {
    const { login, isAuthenticated } = useAuthContext()
    const [formData, setFormData] = useState({ ID: '' })
    const [Phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [otpScreen, setOtpScreen] = useState(false)
    const [otp, setOtp] = useState(["", "", "", ""])
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/MyProjects')
        }
    }, [isAuthenticated, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const formatPhoneNumber = (phoneNumber) => {
        if (phoneNumber && phoneNumber.toString().length >= 10) {
            const lastFourDigits = phoneNumber.slice(-4)
            return `xxxxxxx${lastFourDigits}`
        }
        return phoneNumber
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
                Response = await response.json()
                setOtpScreen(true)
                setPhone(Response.phone.toString())
                console.log(Response.Phone)
            } else {
                alert("Failed to Login. Please try again!")
                console.error('Authentication failed:', response.message)
            }
        } catch (error) {
            alert("Failed to Login. Please try again!")
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
                login(Response.token)
                setLoading(false)
                navigate('/MyProjects')
            } else {
                console.error('Authentication failed:', Response.message)
                alert(Response.message)
            }
        } catch (error) {
            console.error('Error during authentication:', error)
        } finally {
            setLoading(false)
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
                const Response = await response.json()
                console.log('Authentication successful:', Response)
            } else {
                console.error('Authentication failed:', Response.message)
            }
        } catch (error) {
            console.error('Error during authentication:', error)
        } finally {
            setLoading(false)
        }
    }

    if (isAuthenticated) {
        navigate('/MyProjects')
    }

    return (
        <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2 bg-custom-white">
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
                                    Enter the Verification code sent to the number +91{formatPhoneNumber(Phone)}
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
                            <h1 className="absolute top-8 pl-2 py-10 text-custom-black font-poppins font-extrabold tracking-wide text-2xl text-center">Login to Continue</h1>
                            <form onSubmit={handleSubmit} className="flex flex-col justify-center h-full w-full space-y-2">
                                <label htmlFor="ID" className="pl-2 pt-2 text-custom-black font-poppins font-semibold tracking-wide text-md focus-within:outline-none focus-within:ring-2 focus-within:ring-custom-blue">
                                    Enter the Phone number / Email Address.
                                </label>
                                <input
                                    type="text"
                                    name="ID"
                                    placeholder="10 digits Phone number or Email address"
                                    className="px-3 py-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                                    value={formData.ID}
                                    onChange={handleChange}
                                    required
                                />

                                <p className="mt-5 px-4 py-2 text-gray-500 font-poppins text-sm text-center">
                                    Your email address / Phone number is how we Authenticate you, make sure you have the right email address / Phone number before continuing.
                                </p>
                                <div className="h-auto w-full flex justify-center">
                                    <button type="submit" className="mt-10 px-4 py-4 w-3/4 rounded-xl bg-custom-gray border-2 border-black font-poppins font-semibold tracking-wide text-white hover:scale-105 transition-transform">
                                        NEXT
                                    </button>
                                </div>
                            </form>
                            <p className=" absolute bottom-6 w-1/2 text-custom-gray font-poppins text-[12px] text-center"> By signing up you agree to the <a className="underline underline-offset-2 hover:decoration-sky-500 transition-colors" href="">Terms of Service</a> and <a className="underline underline-offset-2 hover:decoration-sky-500 transition-colors" href="">Privacy Policy</a> , including <a className="underline underline-offset-2 hover:decoration-sky-500 transition-colors" href="">Cookie use.</a></p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default LogIn