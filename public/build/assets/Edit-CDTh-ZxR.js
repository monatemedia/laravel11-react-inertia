import{W as p,j as e,a as j,d as v}from"./app-DyCF4hii.js";import{T as m}from"./TextInput-CTSfM5Co.js";import{A as _}from"./AuthenticatedLayout-6xyXxY95.js";import{I as l}from"./InputLabel-Cq_aJarn.js";import{I as r}from"./InputError-BmfdEc8a.js";import{T as c}from"./TextAreaInput-D2Es_1I5.js";import{S as n}from"./SelectInput-CBVIzTjR.js";import"./ApplicationLogo-Ce3HBs5f.js";import"./transition-iVOprNv7.js";function I({auth:o,task:a,projects:u,users:x}){const{data:d,setData:t,post:h,errors:i,reset:N}=p({image:"",name:a.name||"",status:a.status||"",description:a.description||"",due_date:a.due_date||"",project_id:a.project_id||"",priority:a.priority||"",assigned_user_id:a.assigned_user_id||"",notes:a.notes||"",_method:"PUT"}),g=s=>{s.preventDefault(),h(route("task.update",a.id))};return e.jsxs(_,{user:o.user,header:e.jsx("div",{className:"flex justify-between items-center",children:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:['Edit task "',a.name,'"']})}),children:[e.jsx(j,{title:"Tasks"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("form",{onSubmit:g,className:"p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg",children:[a.image_path&&e.jsx("div",{className:"mb-4",children:e.jsx("img",{src:a.image_path,className:"w-64"})}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"task_project_id",value:"Project"}),e.jsxs(n,{id:"task_project_id",name:"project_id",value:d.project_id,className:"mt-1 block w-full",onChange:s=>t("project_id",s.target.value),children:[e.jsx("option",{value:"",children:"Select Project"}),u.data.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]}),e.jsx(r,{message:i.project_id,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"task_image_path",value:"Task Image"}),e.jsx(m,{id:"task_image_path",type:"file",name:"image",className:"mt-1 block w-full",onChange:s=>t("image",s.target.files[0])}),e.jsx(r,{message:i.image,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"task_name",value:"Task Name"}),e.jsx(m,{id:"task_name",type:"text",name:"name",value:d.name,className:"mt-1 block w-full",isFocused:!0,onChange:s=>t("name",s.target.value)}),e.jsx(r,{message:i.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"task_description",value:"Task Description"}),e.jsx(c,{id:"task_description",name:"description",value:d.description,className:"mt-1 block w-full",onChange:s=>t("description",s.target.value)}),e.jsx(r,{message:i.description,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"task_due_date",value:"Task Deadline"}),e.jsx(m,{id:"task_due_date",type:"date",name:"due_date",value:d.due_date,className:"mt-1 block w-full",onChange:s=>t("due_date",s.target.value)}),e.jsx(r,{message:i.due_date,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"task_status",value:"Task Status"}),e.jsxs(n,{id:"task_status",name:"status",value:d.status,className:"mt-1 block w-full",onChange:s=>t("status",s.target.value),children:[e.jsx("option",{value:"",children:"Select Status"}),e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"in_progress",children:"In Progress"}),e.jsx("option",{value:"completed",children:"Completed"})]}),e.jsx(r,{message:i.task_status,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"task_priority",value:"Task Priority"}),e.jsxs(n,{id:"task_priority",name:"priority",value:d.priority,className:"mt-1 block w-full",onChange:s=>t("priority",s.target.value),children:[e.jsx("option",{value:"",children:"Select Priority"}),e.jsx("option",{value:"low",children:"Low"}),e.jsx("option",{value:"medium",children:"Medium"}),e.jsx("option",{value:"high",children:"High"})]}),e.jsx(r,{message:i.priority,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"task_assigned_user",value:"Assigned User"}),e.jsxs(n,{id:"task_assigned_user",name:"assigned_user_id",value:d.assigned_user_id,className:"mt-1 block w-full",onChange:s=>t("assigned_user_id",s.target.value),children:[e.jsx("option",{value:"",children:"Select User"}),x.data.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]}),e.jsx(r,{message:i.assigned_user_id,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"task_notes",value:"Add New Note"}),e.jsxs("div",{children:[e.jsx(c,{id:"task_notes",name:"notes",className:"mt-1 block h-64 w-full",onChange:s=>t("notes",`On ${new Date().toLocaleDateString("en-US",{weekday:"long",day:"2-digit",month:"long",year:"numeric"})} at ${new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})} ${o.user.name} wrote:
${s.target.value}

${a.notes}`),placeholder:"Make a New Note"}),e.jsx(r,{message:i.notes,className:"mt-2"})]})]}),e.jsxs("div",{className:"mt-4 text-right",children:[e.jsx(v,{href:route("task.index"),className:"bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2",children:"Cancel"}),e.jsx("button",{className:"bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600",children:"Submit"})]})]})})})})]})}export{I as default};
