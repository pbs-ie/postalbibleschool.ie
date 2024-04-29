import{r as i,a as e,j as s,F as S}from"./app-8ad4302f.js";import{L as E}from"./logo-icon-e7f81caf.js";import{P as I,a as A}from"./PaymentSuccessComponent-2b7ed606.js";import{S as D}from"./SecondaryButton-acbdc118.js";import{P as R}from"./PrimaryButton-b23a8877.js";import{S as T}from"./StepWrapper-cd8e6eb9.js";import{M as L,P as M}from"./PlusSolid-02b1615d.js";import"./WrapperLayout-9c24c2d1.js";import"./Paragraph-89c3cd24.js";import"./Loader-f2cca895.js";import"./CheckBadge-df0dd088.js";import"./BasicButton-7e07839f.js";import"./helper-5cdff9d5.js";const O=[{title:"General",quantity:0,price:65},{title:"Student",quantity:0,price:50}],F=(t,r)=>{let n=[];switch(r.type){case"increase":return[...t].map((a,u)=>u===r.index?{title:a.title,quantity:a.quantity+1,price:a.price}:a);case"decrease":return[...t].map((a,u)=>u===r.index&&a.quantity>1?{title:a.title,quantity:a.quantity-1,price:a.price}:a);case"selected":return n=[...t],n[r.index].quantity=1,n;default:return t}},y=[{id:0,quantity:1,value:0}],V=(t,r)=>{switch(r.type){case"setItem":return[{id:r.id,quantity:r.quantity,value:r.value}];case"changeValue":return[...t].map(n=>n.id===r.id&&r.quantity&&r.value?{id:r.id,quantity:r.quantity,value:r.value}:n);case"addItem":return r.quantity&&r.value?[...t,{id:t.length,quantity:r.quantity,value:r.value}]:t;case"removeItem":return t.length===1?y:t.filter(n=>n.id!==r.id);case"resetCart":return y;default:return t}};function ee(){const[t,r]=i.useState(null),[n,a]=i.useState(""),[u,p]=i.useState(!0),[x,d]=i.useState(""),[b,q]=i.useState(!1),[g,o]=i.useReducer(V,y),[m,h]=i.useReducer(F,O),v=l=>{l!==t&&(a(""),l===4?o({type:"resetCart",id:0,quantity:0,value:0}):h({type:"selected",index:l}),r(l))},P=l=>{l.target&&a(l.target.value.replace(/^0+/,""))},C=()=>{if(d(""),t===null){p(!0),d("Please select or enter an amount to send");return}o(n!==""?{type:"setItem",id:0,quantity:1,value:Number(n)}:{type:"setItem",id:0,quantity:m[t].quantity,value:m[t].price}),p(!1)},k=(l,c)=>u?(console.error("Values not set"),d("Please select or enter an amount to send"),c.reject()):c.resolve(),j=()=>{if(t===0||t===1)return e("div",{className:"w-full h-10 mb-4",children:s("div",{className:"flex items-center justify-end text-lg",children:[e("p",{children:"Select quantity: "}),s("div",{className:"flex items-center ml-2 rounded-full bg-slate-100",children:[e("button",{onClick:()=>h({type:"decrease",index:t}),className:"rounded-full",children:e(L,{className:"w-10 h-10"})}),e("p",{className:"px-2",children:m[t].quantity}),e("button",{onClick:()=>h({type:"increase",index:t}),className:"rounded-full",children:e(M,{className:"w-10 h-10"})})]})]})});if(t===4)return e("div",{className:"w-full h-10 mb-4",children:s("p",{className:"flex items-center w-full transition ease-in-out border border-gray-400 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:shadow-md focus-within:shadow-indigo-500",children:[e("span",{className:"ml-4 font-normal pointer-events-none",children:"€"}),e("input",{className:"w-full border-0 rounded-md focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",type:"number",name:"price",id:"price",value:n,onChange:P,placeholder:"Please enter an amount"})]})})},B=()=>g.reduce((l,c)=>l+c.value*c.quantity,0),N=()=>{o({type:"resetCart",id:0,quantity:0,value:0}),d(""),r(null),p(!0)};return i.useEffect(()=>{N()},[]),e(T,{heading:"STEP Payment",title:"Payment",children:e("div",{className:"flex justify-center w-3/4 mx-auto",children:s("div",{className:"flex flex-col items-center w-full gap-2 p-8 mb-5 border border-gray-300 rounded-md lg:w-2/3",children:[e("div",{className:"inline-flex justify-center w-full px-6",children:e("img",{src:E,alt:"Postal Bible School Logo",className:"my-4 h-14"})}),e("h2",{className:"text-3xl",children:"Postal Bible School"}),!b&&s(S,{children:[s("p",{className:"px-10 mb-5 text-xl",children:["You can make payments for STEP to the",e("br",{})," Postal Bible School Trust here"]}),u&&s("div",{children:[s("div",{className:"grid grid-cols-3 gap-2 mb-4",children:[m.map(({title:l,quantity:c,price:w},f)=>e("button",{onClick:()=>v(f),className:"flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md"+(t===f?" bg-blue-800 text-white":""),children:w&&s(S,{children:[e("p",{className:"text-lg font-bold before:content-['€']",children:w}),e("p",{className:"capitalize",children:l})]})},f+"product")),e("button",{onClick:()=>v(4),className:"flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md"+(t===4?" bg-blue-800 text-white":""),children:e("p",{className:"text-lg font-bold",children:"Custom"})})]}),j(),e("div",{className:"flex justify-end w-full",children:e(R,{onClick:()=>C(),children:"Continue"})})]}),!u&&s("div",{className:"w-full lg:max-w-2xl",children:[s("div",{children:[e("p",{className:"mb-2",children:"You have selected to pay"}),s("p",{className:"mb-4 text-xl md:text-4xl",children:["€",B()]}),e(D,{onClick:()=>N(),children:"Change Amount"})]}),e("hr",{className:"w-1/2 h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700"}),e("div",{className:"py-4 lg:px-8",children:e(I,{setSuccess:q,setErrorMessage:d,onClick:k,cart:g,cartDescription:"Payment for PBS STEP"})})]}),e("div",{className:"w-full lg:max-w-2xl",children:x&&e("p",{className:"text-red-500",children:x})})]}),b&&e(A,{})]})})})}export{ee as default};