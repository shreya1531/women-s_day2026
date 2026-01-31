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
