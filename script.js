const STORAGE_KEY = "campusconnect_issues_v1";
let currentRole = "Guest";
const $ = (id) => document.getElementById(id);
const demoIssues = [
  {id:"CC-104",title:"Projector not working",category:"Classroom equipment",location:"Block A · Room 204",description:"The projector does not turn on during lectures.",role:"Faculty",status:"In progress",createdAt:Date.now()-3600000},
  {id:"CC-103",title:"Water dispenser needs attention",category:"Facilities",location:"Main corridor",description:"The dispenser is not providing drinking water.",role:"Student",status:"Submitted",createdAt:Date.now()-7200000},
  {id:"CC-102",title:"Library Wi-Fi connection",category:"Internet / IT",location:"Central Library",description:"The Wi-Fi connection drops frequently in the reading area.",role:"Student",status:"Resolved",createdAt:Date.now()-86400000}
];
function loadIssues(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));return Array.isArray(saved)?saved:demoIssues;}catch{return demoIssues;}}
let issues = loadIssues();
function saveIssues(){localStorage.setItem(STORAGE_KEY,JSON.stringify(issues));}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function statusClass(status){return status.toLowerCase().replace(/\s+/g,"-");}
function render(){
  const filter=$("statusFilter").value;
  const filtered=issues.filter(i=>filter==="All statuses"||i.status===filter).sort((a,b)=>b.createdAt-a.createdAt);
  $("issueList").innerHTML=filtered.map(issue=>{
    const canAdmin=currentRole==="Admin";
    return `<article class="issue-item"><div class="issue-top"><div><h4>${escapeHTML(issue.title)}</h4><div class="issue-meta">${escapeHTML(issue.id)} · ${escapeHTML(issue.category)}<br>⌖ ${escapeHTML(issue.location)} · Reported by ${escapeHTML(issue.role)}</div></div><span class="status ${statusClass(issue.status)}">${escapeHTML(issue.status)}</span></div><p class="issue-description">${escapeHTML(issue.description)}</p>${canAdmin?`<div class="admin-controls"><select aria-label="Update status for ${escapeHTML(issue.id)}" id="status-${escapeHTML(issue.id)}"><option ${issue.status==="Submitted"?"selected":""}>Submitted</option><option ${issue.status==="In progress"?"selected":""}>In progress</option><option ${issue.status==="Resolved"?"selected":""}>Resolved</option></select><button onclick="updateStatus('${escapeHTML(issue.id)}')">Save update</button></div>`:""}</article>`;
  }).join("");
  $("emptyState").style.display=filtered.length?"none":"block";
  $("totalStat").textContent=issues.length;
  $("resolvedStat").textContent=issues.filter(i=>i.status==="Resolved").length;
}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600);}
function openLogin(){if(!$("loginDialog").open)$("loginDialog").showModal();}
function updateStatus(id){if(currentRole!=="Admin"){toast("Choose Admin from role sign in to update statuses.");return;}const issue=issues.find(i=>i.id===id);const select=$("status-"+id);if(!issue||!select)return;issue.status=select.value;saveIssues();render();toast(`${id} updated to ${issue.status}.`);}
window.updateStatus=updateStatus;
$("reportForm").addEventListener("submit",e=>{
  e.preventDefault();
  const title=$("issueTitle").value.trim(),category=$("category").value,location=$("location").value.trim(),description=$("description").value.trim(),role=$("reporterRole").value;
  if(!title||!category||!location||!description){$("formNotice").textContent="Please complete all fields.";return;}
  const number=Math.max(100,...issues.map(i=>Number((i.id.match(/\d+/)||[100])[0])))+1;
  issues.unshift({id:`CC-${number}`,title,category,location,description,role,status:"Submitted",createdAt:Date.now()});
  saveIssues();render();e.target.reset();$("formNotice").textContent="Your issue has been added to the board.";toast("Report submitted successfully.");$("issueList").scrollIntoView({behavior:"smooth",block:"start"});
});
$("statusFilter").addEventListener("change",render);
$("loginNav").addEventListener("click",openLogin);$("openLogin").addEventListener("click",openLogin);
$("heroReport").addEventListener("click",()=>$("report").scrollIntoView({behavior:"smooth"}));
$("adminDemo").addEventListener("click",()=>{currentRole="Admin";render();toast("Admin demo enabled. You can now update issue statuses.");$("report").scrollIntoView({behavior:"smooth"});});
document.querySelectorAll(".role-option").forEach(btn=>btn.addEventListener("click",()=>{
  currentRole=btn.dataset.role;$("loginDialog").close();render();
  toast(currentRole==="Admin"?"Admin demo enabled — status controls are available.":`${currentRole} demo selected. You can submit and track reports.`);
}));
render();
