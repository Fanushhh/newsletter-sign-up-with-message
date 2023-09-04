import { useState, useEffect, useRef } from "react";
import { validateEmail } from "../utils";

export const Card = () => {
  const [success, setSuccess] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth)
  const emailField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateWindowWidth = () => {
      setCurrentWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);
  
  const handleDismiss = () => {
    setSuccess(false);
    if(emailField.current){
        emailField.current.value = '';
    }
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const emailAddress:string = e.target.email.value;
    
    if (emailAddress === '') {  
      setError("Email cannot be empty.");
      return;
    }
    if (!validateEmail(emailAddress)) {
      setError("Valid email required.");
    }else{
        setEmailAddress(emailAddress);
        setSuccess(true);
        setError('');
    }
        
  };
  
  return (
    <>
      <section
        className={`${
          !success ? "block" : "hidden sm:hidden"
        } transition-all text-dark-slate-grey sm:bg-white sm:max-w-[928px] sm:w-full sm:flex sm:flex-row-reverse sm:py-6 sm:pr-6 sm:pl-16 sm:rounded-xl sm:justify-between sm:items-center`}
      >
        <div className="img">
          <img
            className="block w-full"
            src={`${currentWidth > 640 ? '/images/illustration-sign-up-desktop.svg' : '/images/illustration-sign-up-mobile.svg'}`}
            alt="newsletter ilustration"
          />
        </div>
        
        <div className="text px-6 py-10 sm:max-w-[376px] sm:w-full sm:pr-0">
          <div>
            <h1 className=" text-[40px] font-bold pb-6 sm:text-[56px] sm:leading-[110%]">Stay updated!</h1>
            <p>Join 60,000+ product managers receiving monthly updates on:</p>
          </div>
          <div className=" pt-6 pb-8">
            <div className="flex items-start gap-4 pb-[10px]">
              <img src="/images/icon-list.svg" alt="checked image" />
              <p>Product discovery and building what matters</p>
            </div>
            <div className="flex items-start gap-4 pb-[10px]">
              <img src="/images/icon-list.svg" alt="checked image" />
              <p>Measuring to ensure updates are a success</p>
            </div>
            <div className="flex items-start gap-4 pb-[10px]">
              <img src="/images/icon-list.svg" alt="checked image" />
              <p>And much more!</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} action="submit" className="font-bold">
            <div className="flex relative flex-col gap-2 mb-6">
              <label className="font-bold  text-xs" htmlFor="email">
                Email Address
              </label>
              <input
                ref={emailField}
                placeholder="email@company.com"
                className={`${
                  error.length > 0 ? " border-tomato bg-error" : ""
                } outline-none border rounded-md py-4 px-6`}
                type="text"
                name="email"
                id="email"
              />
              <span
                className={`  ${
                  error
                    ? " block absolute right-0 text-tomato text-xs"
                    : "hidden"
                }`}
              >{error}</span>
            </div>
            <button className=" transition-colors ease-in-out w-full bg-dark-slate-grey text-white py-4 px-10 rounded-lg hover:bg-gradient-to-b from-[#FF6A3A] to-[#FF527B]">
              Subscribe to monthly newsletter
            </button>
          </form>
        </div>
      </section>
      <section
        className={`${
          success ? "block" : "hidden sm:hidden"
        } transition-all h-[100vh] flex flex-col  px-6 py-10 sm:bg-white sm:max-w-[504px] sm:w-full sm:flex sm:py-12 sm:px-16 sm:rounded-xl sm:h-fit`}
      >
        <div className="flex-1 mt-[91px] sm:flex-auto sm:mt-0">
          <div className="mb-10">
            
            <img src="/images/icon-success.svg" alt="success icon" />
          </div>
          
          <div className="sm:mb-10">
            <h1 className="text-[40px] font-bold leading-[110%] pb-6">
              Thanks for subscribing!
            </h1>
            <p>
              A confirmation email has been sent to{" "}
              <span className="font-bold">{emailAddress}</span>. Please open it
              and click the button inside to confirm your subscription
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className=" transition-colors ease-in-out w-full bg-dark-slate-grey text-white py-4 px-10 rounded-lg hover:bg-gradient-to-b from-[#FF6A3A] to-[#FF527B]"
        >
          Dismiss message
        </button>
      </section>
    </>
  );
};
