const form=document.getElementById("form");
const name=document.getElementById("name");
const age=document.getElementById("age");
const phone=document.getElementById("phone");
const email=document.getElementById("email");
const health=document.getElementById("health");
const altPhone=document.getElementById("altPhone");

const msg=document.getElementById("msg");
const otpInput=document.getElementById("otpInput");
const verifyBtn=document.getElementById("verifyBtn");
const submitBtn=document.getElementById("submitBtn");
const sendBtn=document.getElementById("sendBtn");

let otpVerified=false;

/* fade animation */

document.querySelectorAll(".fade").forEach(f=>{
 if(f.getBoundingClientRect().top<window.innerHeight)
  f.classList.add("show");
});

window.addEventListener("scroll",()=>{
 document.querySelectorAll(".fade").forEach(f=>{
  if(f.getBoundingClientRect().top<window.innerHeight/1.3)
   f.classList.add("show");
 });
});

/* field check */

function allFilled(){
 return name.value && age.value && phone.value && email.value;
}

/* SEND OTP */

sendBtn.onclick=async()=>{

if(!allFilled()){
 msg.innerText="Please fill all fields first";
 return;
}

msg.innerText="Sending OTP...";

await fetch("TICKET99_SEND_OTP_URL",{   // replace
 method:"POST",
 headers:{ "Content-Type":"application/json"},
 body:JSON.stringify({email:email.value,phone:phone.value})
});

msg.innerText="OTP sent. Please check.";

otpInput.classList.remove("hidden");
verifyBtn.classList.remove("hidden");
sendBtn.disabled=true;
};

/* VERIFY OTP */

verifyBtn.onclick=async()=>{

if(!otpInput.value){
 msg.innerText="Please enter OTP";
 return;
}

msg.innerText="Verifying OTP...";

const res=await fetch("TICKET99_VERIFY_OTP_URL",{   // replace
 method:"POST",
 headers:{ "Content-Type":"application/json"},
 body:JSON.stringify({email:email.value,otp:otpInput.value})
});

const r=await res.json();

if(r.success){
 otpVerified=true;
 msg.innerText="OTP verified successfully";
 submitBtn.disabled=false;
 verifyBtn.disabled=true;
}else{
 msg.innerText="Invalid OTP";
}
};

/* SUBMIT */

form.onsubmit=async(e)=>{

e.preventDefault();

if(!otpVerified){
 msg.innerText="Please verify OTP before submitting";
 return;
}

const data={
 eventId:"walkathon",
 name:name.value,
 age:age.value,
 phone:phone.value,
 email:email.value,
 health:health.value,
 altPhone:altPhone.value
};

const res=await fetch("https://YOUR_BACKEND.onrender.com/register",{ // replace
 method:"POST",
 headers:{ "Content-Type":"application/json"},
 body:JSON.stringify(data)
});

const r=await res.json();

msg.innerText=r.message;

form.reset();
submitBtn.disabled=true;
verifyBtn.classList.add("hidden");
otpInput.classList.add("hidden");
sendBtn.disabled=false;
otpVerified=false;
};


