import React,{useState, useContext} from 'react'
import { ModalContext } from '../context/ModalContext';

const Verification = ({setVerified}) => {
    const OpenModalContext = useContext(ModalContext);
    const [aadhaar, setAadhaar] = useState("");
    const [verifyLoading, setVerifyLoading] = useState(false);
    
    const [error, setError] = useState({
        error: false,
        message: ""
    });
    const handleInput = (e) => {
        if(!isNaN(e.target.value)) setAadhaar(e.target.value);
    }
    const verifyAadhar = (e) => {
        e.preventDefault();
        setVerifyLoading(true);

        if(aadhaar.length !== 12) {
            setError({
                error: true,
                message: "Please enter a 12-digit Aadhaar number"
            })
            setVerifyLoading(false);
            return;
        }
        
        setError({
            error: false,
            message: ""
        })
        const encodedParams = new URLSearchParams();
        encodedParams.append("txn_id", "17c6fa41-778f-49c1-a80a-cfaf7fae2fb8");
        encodedParams.append("consent", "Y");
        encodedParams.append("uidnumber", aadhaar);
        encodedParams.append("clientid", "222");
        encodedParams.append("method", "uidvalidatev2");
        
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '1f99600ee5msh780cd3ab35a61afp10c36bjsn568b8d66fb1b',
                'X-RapidAPI-Host': 'verifyaadhaarnumber.p.rapidapi.com'
            },
            body: encodedParams
        };
        fetch('https://verifyaadhaarnumber.p.rapidapi.com/Uidverifywebsvcv1/VerifyAadhaarNumber', options)
	.then(response => response.json())
	.then(response =>  typeof response.Succeeded !== "undefined" ? 
    <>
    {setVerified(true)} 
    {setVerifyLoading(false)} 
    {OpenModalContext.setMessage('Thank you for verifying your Aadhaar.')}
    {OpenModalContext.setModalOpen(true)}
    </>
     :
     <>
    { setError({
        error: true,
        message: response.Failed.ErrorMessage
    }) }
    {setVerifyLoading(false)}
    </>
    )
	.catch(err => <>
        { setError({
            error: true,
            message: "Something went wrong. Please try again later."
        }) }
        {setVerifyLoading(false)}
        </>);
    
    }
  return (
    <div className='col-span-3 flex flex-col justify-center items-start'>
    <span className='col-span-2'>
    <h1 className='font-roboto text-white  text-4xl'>Verify  <em className='text-link font-roboto'> Your Aadhaar</em></h1>
    <p className='text-[#878787] text-xl font-normal text-left font-roboto w-4/5'>
    We require your Aadhaar number for verification purposes to ensure that you are eligible for the services and benefits that you are entitled to.
    Please enter your 12-digit Aadhaar number carefully to ensure accurate verification. 
    Your Aadhaar information will be kept secure and confidential and will not be shared with any third-party. 
    For more information about Aadhaar or to verify your Aadhaar details, please visit the official UIDAI website <a href='https://uidai.gov.in/'>(https://uidai.gov.in/).</a> </p>
    </span>
    <div className='w-full mt-20 mb-20'>
    <span   className='w-1/2 mb-10 flex flex-col mt-5 gap-y-1'>
        <label htmlFor="aadhar" className='text-white font-roboto  text-xl'>Your 12-digit Aadhaar number</label>
        <input 
        type="text" 
        placeholder="Your 12-digit Aadhaar number" 
        id="aadhar" 
        className='h-10 pl-2 text-[#878787] bg-[#1E1E1E] rounded-lg outline-none' 
        value={aadhaar} onChange={(e) => handleInput(e)} />
        {error.error && <p className='text-red-500 font-roboto text-sm'>{error.message}</p>}
    </span>
    
     
    <button 
    onClick={verifyLoading ? null :(e) => verifyAadhar(e)} 
    className={` bg-link text-zinc-50 col-span-2  ${verifyLoading? "cursor-wait":"cursor-pointer" } 
    font-roboto place-self-center rounded-lg text-xl py-3 h-12 w-1/2 `}>
    {verifyLoading?"Verifying":"Verify"}
    </button>
    
    </div>
    </div>
  )
}

export default Verification