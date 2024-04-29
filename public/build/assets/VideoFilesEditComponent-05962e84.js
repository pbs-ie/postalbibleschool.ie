import{a as t,r as x,j as s,F as v}from"./app-8ad4302f.js";import{S as g}from"./SecondaryButton-acbdc118.js";import{T as h}from"./TextInput-91b918b0.js";import{S as C}from"./SelectInput-871f02e3.js";import{F as V}from"./FileInput-fade086c.js";import{I}from"./InputLabel2-0f1d1759.js";import{F as k}from"./FileIcon-09f2b2b3.js";function T({value:u,required:o=!1,className:f,children:p}){return t("legend",{"aria-required":o,className:`inline-block capitalize p-2 text-base rounded bg-sky-100 font-medium md:text-base mb-px text-slate-700 ${o&&"after:content-['*'] after:ml-1 after:text-red-500"} ${f}`,children:u||p})}function j({videoContent:u,setContent:o,mode:f="edit"}){const p=u,b=[{title:"",externalUrl:"",duration:"",id:0}],N=(a,e)=>{if(e.type==="changeValue"&&"name"in e){let l=[...a];return e.name==="id"?l[e.idx][e.name]=+e.value:l[e.idx][e.name]=e.value+"",l}else if(e.type==="addValue"){let l=b;return l[0].id=a.length,[...a,...l]}else if(e.type==="removeValue"&&"idx"in e){if(a.length===1)return b;let l=[...a];return l.splice(e.idx,1),l}else return a},[c,d]=x.useReducer(N,p),i=(a,e)=>{if(e.target instanceof HTMLInputElement)switch(e.target.name){case"title":case"externalUrl":case"duration":case"id":d({type:"changeValue",name:e.target.name,value:e.target.value,idx:a});break}};return x.useEffect(()=>{o([...c])},[c]),s(v,{children:[t("h2",{className:"p-0 mb-2 text-xl font-bold text-black",children:"Video Information"}),f==="edit"&&t("p",{className:"text-gray-600",children:"Change the ID number to change order of video. Be careful of the maximum number of videos"}),s("table",{children:[t("thead",{children:s("tr",{children:[t("th",{children:"ID"}),t("th",{children:"External URL"}),t("th",{children:"Title"}),t("th",{children:"Duration"}),t("th",{children:t(g,{onClick:()=>d({type:"addValue"}),className:"before:content-['+'] before:pr-1 before:text-lg bg-green-200",children:"Add Row"})})]})}),t("tbody",{children:c.map(({title:a,externalUrl:e,duration:l,id:y},n)=>s("tr",{children:[t("td",{children:f==="edit"?t(h,{type:"text",name:"id",id:`id${n}`,value:y,className:"",handleChange:r=>i(n,r),required:!0}):t("div",{className:"px-4",children:n})}),t("td",{children:t(h,{type:"text",name:"externalUrl",id:`externalUrl${n}`,value:e,className:"",handleChange:r=>i(n,r)})}),t("td",{children:t(h,{type:"text",name:"title",id:`title${n}`,value:a,className:"",handleChange:r=>i(n,r)})}),t("td",{children:t(h,{type:"text",name:"duration",id:`duration${n}`,value:l,className:"",handleChange:r=>i(n,r)})}),t("td",{children:t(g,{onClick:()=>d({type:"removeValue",idx:n}),className:"bg-red-200 before:content-['-'] before:pr-1 before:text-lg",children:"Remove Row"})})]},"contenttable"+n))})]})]})}function L({fileContent:u,setContent:o,mode:f="edit"}){const p=u,b=[{id:0,name:"",title:"",type:"",fileData:null}],N=(a,e)=>{if(e.type==="changeValue"&&"name"in e){let l=[...a];return e.name==="id"?l[e.idx][e.name]=+e.value:e.name==="type"?(e.value==="document"||e.value==="slide")&&(l[e.idx][e.name]=e.value):e.name==="fileData"?l[e.idx][e.name]=e.value:l[e.idx][e.name]=e.value+"",l}else if(e.type==="addValue"){let l=b;return l[0].id=a.length,[...a,...l]}else if(e.type==="removeValue"&&"idx"in e){if(a.length===1)return[];let l=[...a];return l.splice(e.idx,1),l}else return a},[c,d]=x.useReducer(N,p),i=(a,e)=>{if(e.target instanceof HTMLInputElement)switch(e.target.name){case"title":case"name":case"id":d({type:"changeValue",name:e.target.name,value:e.target.value,idx:a});break;case"fileData":e.target.files&&d({type:"changeValue",name:e.target.name,value:e.target.files[0],idx:a})}else if(e.target instanceof HTMLSelectElement)switch(e.target.name){case"type":d({type:"changeValue",name:e.target.name,value:e.target.value,idx:a});break}};return x.useEffect(()=>{o([...c])},[c]),s(v,{children:[t("h2",{className:"p-0 text-xl font-bold text-black",children:"File Information"}),t("p",{className:"p-0 mb-2 text-base text-gray-600",children:"Only supporting .pdf files at the moment."}),c&&c.length===0?t(g,{onClick:()=>d({type:"addValue"}),className:"before:content-['+'] before:pr-1 before:text-lg bg-green-200",children:"Add Row"}):s("table",{children:[t("thead",{children:s("tr",{children:[t("th",{children:"ID"}),t("th",{children:"Name"}),t("th",{children:"Title"}),t("th",{children:"Type"}),t("th",{children:"File"}),t("th",{children:t(g,{onClick:()=>d({type:"addValue"}),className:"before:content-['+'] before:pr-1 before:text-lg bg-green-200",children:"Add Row"})})]})}),t("tbody",{children:c.map(({title:a,name:e,type:l,fileData:y,id:n},r)=>s("tr",{children:[t("td",{children:f==="edit"?t(h,{type:"text",name:"id",id:`fileid${r}`,value:n,className:"",handleChange:m=>i(r,m),required:!0}):t("div",{className:"px-4",children:r})}),t("td",{children:t(h,{type:"text",name:"name",id:`filename${r}`,value:e,className:"",handleChange:m=>i(r,m)})}),t("td",{children:t(h,{type:"text",name:"title",id:`filetitle${r}`,value:a,className:"",handleChange:m=>i(r,m)})}),t("td",{children:s(C,{defaultValue:l,name:"type",id:`filetype${r}`,className:"self-center",handleChange:m=>i(r,m),required:!0,children:[t("option",{value:"",disabled:!0,children:"Select…"}),t("option",{value:"document",children:"Document"}),t("option",{value:"slide",children:"Slide"})]})}),t("td",{children:s(I,{forInput:`fileData${r}`,className:"flex items-center gap-1 pr-2 border rounded cursor-pointer border-slate-400",children:[t(V,{name:"fileData",id:`fileData${r}`,className:"overflow-hidden w-0",handleChange:m=>i(r,m)}),t(k,{className:"w-4"}),y?y.name:"Choose File"]})}),t("td",{children:t(g,{onClick:()=>d({type:"removeValue",idx:r}),className:"bg-red-200 before:content-['-'] before:pr-1 before:text-lg",children:"Remove Row"})})]},"filetable"+r))})]})]})}export{T as L,j as V,L as a};