import React, { useState } from 'react';
import { LayoutDashboard, ReceiptText, PiggyBank, GraduationCap, BriefcaseBusiness, Sparkles, Calculator, BarChart3, Settings, Bell, Search, Plus, ArrowUpRight, ChevronDown, WalletCards, Utensils, Bus, BookOpen, MoreHorizontal, Menu, X, Send, Target, Clock3 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const nav = [
  ['Overview', LayoutDashboard], ['Transactions', ReceiptText], ['Savings Goals', PiggyBank],
  ['Scholarships', GraduationCap], ['Opportunities', BriefcaseBusiness], ['AI Assistant', Sparkles],
  ['What-if Simulator', Calculator], ['Reports', BarChart3]
];
const trend = [{n:'Mon',v:620},{n:'Tue',v:480},{n:'Wed',v:710},{n:'Thu',v:520},{n:'Fri',v:780},{n:'Sat',v:590},{n:'Sun',v:430}];
const categories=[{name:'Food',value:42,color:'#8b5cf6',amount:'₹1,680'},{name:'Transport',value:24,color:'#b9f66a',amount:'₹960'},{name:'Shopping',value:18,color:'#38bdf8',amount:'₹720'},{name:'Books',value:16,color:'#fb7185',amount:'₹640'}];
const transactions=[
 {icon:Utensils,name:'Campus Cafe',meta:'Food • Today, 12:40 PM',amount:'- ₹180',tone:'purple'},
 {icon:Bus,name:'Metro Recharge',meta:'Transport • Yesterday',amount:'- ₹500',tone:'lime'},
 {icon:WalletCards,name:'Pocket Money',meta:'Income • 18 Nov',amount:'+ ₹8,000',tone:'green'},
 {icon:BookOpen,name:'Library Fine',meta:'Education • 17 Nov',amount:'- ₹120',tone:'pink'}
];

function App(){
 const [active,setActive]=useState('Overview'); const [collapsed,setCollapsed]=useState(false); const [modal,setModal]=useState(false); const [toast,setToast]=useState('');
 const [amount,setAmount]=useState('');
 function addExpense(){ if(!amount)return; setModal(false); setToast('Expense added successfully'); setAmount(''); setTimeout(()=>setToast(''),2600); }
 return <div className={`app ${collapsed?'collapsed':''}`}>
  <aside>
   <div className="brand"><div className="brandmark">C</div>{!collapsed&&<div><b>CampusCash</b><span>STUDENT FINANCE</span></div>}</div>
   <nav>{nav.map(([label,Icon])=><button key={label} className={active===label?'active':''} onClick={()=>setActive(label)} title={collapsed?label:''}><Icon size={19}/>{!collapsed&&<span>{label}</span>}</button>)}</nav>
   <div className="sidebottom"><button onClick={()=>setToast('Settings are up to date')}><Settings size={19}/>{!collapsed&&<span>Settings</span>}</button><div className="profile"><div className="avatar">AK</div>{!collapsed&&<div><b>Arjun Kumar</b><small>Delhi University</small></div>}<ChevronDown size={15}/></div></div>
  </aside>
  <main>
   <header><button className="mobilemenu" onClick={()=>setCollapsed(!collapsed)}><Menu size={20}/></button><div className="search"><Search size={18}/><input placeholder="Search transactions, goals..."/><kbd>⌘ K</kbd></div><button className="iconbtn"><Bell size={19}/><i/></button><button className="add" onClick={()=>setModal(true)}><Plus size={18}/>Add transaction</button></header>
   <div className="content">
    {active==='Overview'?<>
    <div className="welcome"><div><p>Tuesday, November 22</p><h1>Good morning, Arjun <span>👋</span></h1></div><div className="month"><span>November 2026</span><ChevronDown size={16}/></div></div>
    <section className="stats">
     <Stat title="Total balance" value="₹5,800" change="+12.5%" color="purple"><WalletCards size={20}/></Stat>
     <Stat title="Monthly income" value="₹8,000" change="This month" color="lime"><ArrowUpRight size={20}/></Stat>
     <Stat title="Monthly expenses" value="₹5,200" change="65% of budget" color="blue"><ReceiptText size={20}/></Stat>
     <Stat title="Total savings" value="₹4,000" change="+₹600 this month" color="pink"><PiggyBank size={20}/></Stat>
    </section>
    <section className="grid">
     <div className="card spending"><div className="cardhead"><div><h3>Spending overview</h3><p>Daily expenses this week</p></div><button>Week <ChevronDown size={14}/></button></div><div className="chartwrap"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend}><defs><linearGradient id="line" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity=".18"/><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/></linearGradient></defs><Tooltip/><Line type="monotone" dataKey="v" stroke="#8b5cf6" strokeWidth={3} dot={{r:4,fill:'#fff',strokeWidth:2}} activeDot={{r:6}}/></LineChart></ResponsiveContainer></div></div>
     <div className="card breakdown"><div className="cardhead"><div><h3>Expense breakdown</h3><p>November 2026</p></div><button className="dots"><MoreHorizontal size={18}/></button></div><div className="piebox"><div className="pie"><ResponsiveContainer><PieChart><Pie data={categories} innerRadius={58} outerRadius={78} paddingAngle={3} dataKey="value">{categories.map((c,i)=><Cell key={i} fill={c.color}/>)}</Pie></PieChart></ResponsiveContainer><div className="pietotal"><b>₹4,000</b><span>total</span></div></div><div className="legend">{categories.map(c=><div key={c.name}><i style={{background:c.color}}/><span>{c.name}</span><b>{c.amount}</b></div>)}</div></div></div>
     <div className="card transactions"><div className="cardhead"><div><h3>Recent transactions</h3><p>Your latest activity</p></div><button onClick={()=>setActive('Transactions')}>View all <ArrowUpRight size={14}/></button></div>{transactions.map((t,i)=><div className="tx" key={i}><div className={`txicon ${t.tone}`}><t.icon size={18}/></div><div><b>{t.name}</b><span>{t.meta}</span></div><strong className={t.amount[0]==='+'?'income':''}>{t.amount}</strong></div>)}</div>
     <div className="card wellness"><div className="cardhead"><div><h3>Financial wellness</h3><p>Healthy habits, better future</p></div><span className="scorebadge">Good</span></div><div className="score"><div className="ring"><b>72</b><span>/100</span></div><div className="scoretext"><b>You're doing well!</b><p>Your score improved by 8 points this month.</p><div className="good"><ArrowUpRight size={14}/> 8 pts this month</div></div></div></div>
    </section>
    <section className="bottomgrid"><div className="goal card"><div className="cardhead"><div><h3>Savings goal</h3><p>Buy a new laptop</p></div><button onClick={()=>setActive('Savings Goals')}>Manage <ArrowUpRight size={14}/></button></div><div className="goalbody"><div className="goalicon"><Target size={22}/></div><div className="goalprogress"><div><b>₹4,000 <span>of ₹15,000</span></b><b>27%</b></div><div className="bar"><i/></div><p><Clock3 size={14}/> 4 months left • ₹2,750/month recommended</p></div></div></div><div className="insight card"><div className="aiicon"><Sparkles size={21}/></div><div><span>CAMPUSCASH AI</span><h3>You could save ₹640 more this month</h3><p>Food spending is 18% above your usual range. Try 2 campus café meals at home.</p><button onClick={()=>setActive('AI Assistant')}>View insights <ArrowUpRight size={15}/></button></div></div></section>
    </>:<Page active={active} setActive={setActive} setModal={setModal}/>}
   </div>
  </main>
  {modal&&<div className="overlay" onMouseDown={()=>setModal(false)}><div className="modal" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={()=>setModal(false)}><X size={18}/></button><h2>Add transaction</h2><p>Record a quick expense or income</p><div className="tabs"><b className="selected">Expense</b><b>Income</b></div><label>Amount<input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="₹ 0" type="number"/></label><label>Description<input placeholder="e.g. Lunch at campus café"/></label><div className="modalgrid"><label>Category<select><option>Food & Dining</option><option>Transport</option><option>Education</option></select></label><label>Date<input type="date" defaultValue="2026-11-22"/></label></div><button className="save" onClick={addExpense}>Save transaction</button></div></div>}
  {toast&&<div className="toast">✓ {toast}</div>}
 </div>
}
function Stat({title,value,change,color,children}){return <div className="stat card"><div className={`staticon ${color}`}>{children}</div><div><p>{title}</p><h2>{value}</h2><span>{change}</span></div></div>}

function Page({active,setActive,setModal}){
 const [question,setQuestion]=useState('');
 const [answer,setAnswer]=useState('');
 const [purchase,setPurchase]=useState('5000');
 const [futureIncome,setFutureIncome]=useState('8000');
 const [upcoming,setUpcoming]=useState('5200');
 const remaining=5800-Number(purchase||0)+Number(futureIncome||0)-Number(upcoming||0);
 const title=active;
 let body;
 if(active==='Transactions'){
  body=<div className="card pagecard"><div className="cardhead"><div><h3>All transactions</h3><p>November 2026 activity</p></div><button onClick={()=>setModal(true)}><Plus size={14}/> Add new</button></div><div className="table">{transactions.map((t,i)=><div className="table-row" key={i}><div className={`txicon ${t.tone}`}><t.icon size={18}/></div><div><b>{t.name}</b><span>{t.meta}</span></div><strong className={t.amount[0]==='+'?'income':''}>{t.amount}</strong></div>)}</div></div>;
 } else if(active==='Savings Goals'){
  body=<div className="card pagecard"><div className="cardhead"><div><h3>Buy a new laptop</h3><p>Target date: March 2027</p></div><span className="scorebadge">27% complete</span></div><div className="goalbody largegoal"><div className="goalicon"><Target size={25}/></div><div className="goalprogress"><div><b>₹4,000 <span>of ₹15,000</span></b><b>₹11,000 remaining</b></div><div className="bar"><i/></div><p><Clock3 size={14}/> Recommended contribution: ₹2,750 per month</p></div></div><button className="primary-page-btn" onClick={()=>setModal(true)}>Add savings contribution</button></div>;
 } else if(active==='Scholarships'){
  body=<div className="card pagecard"><div className="cardhead"><div><h3>Recommended scholarships</h3><p>Based on your student profile</p></div><span className="scorebadge">92% match</span></div><div className="item-list"><div className="list-item"><div className="listicon"><GraduationCap size={20}/></div><div><b>National Scholarship Portal</b><span>Government of India • Deadline: 28 Feb 2027</span></div><strong>₹5,000</strong><button onClick={()=>window.open('https://scholarships.gov.in/','_blank','noopener')}>View</button></div></div></div>;
 } else if(active==='Opportunities'){
  body=<div className="card pagecard"><div className="cardhead"><div><h3>Student opportunities</h3><p>Flexible options for students</p></div></div><div className="item-list"><div className="list-item"><div className="listicon blue"><BriefcaseBusiness size={20}/></div><div><b>Campus Ambassador</b><span>Remote • Flexible hours • Verified demo listing</span></div><strong>Student role</strong><button onClick={()=>window.open('#')}>Details</button></div></div></div>;
 } else if(active==='AI Assistant'){
  body=<div className="card pagecard ai-page"><div className="cardhead"><div><h3>CampusCash AI</h3><p>Personal finance guidance</p></div><span className="scorebadge">Demo</span></div><div className="ai-answer">{answer||'Ask about your savings, budget, or an upcoming purchase.'}</div><div className="prompt-suggestions"><button onClick={()=>setAnswer('To reach your ₹15,000 laptop goal from ₹4,000, save ₹2,750 per month for 4 months.')}>How can I reach my savings goal?</button><button onClick={()=>setAnswer('Your ₹5,800 balance covers ₹5,200 of monthly expenses, so keep at least ₹1,000 as a safety buffer.')}>Is ₹5,800 enough this month?</button></div><div className="ai-input"><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask CampusCash AI..."/><button onClick={()=>setAnswer(question ? 'Based on your current finances: ₹8,000 income, ₹5,200 expenses, ₹4,000 savings, and ₹5,800 balance. ' + question : 'Please enter a question.')}><Send size={18}/></button></div></div>;
 } else if(active==='What-if Simulator'){
  body=<div className="grid simulator-grid"><div className="card pagecard"><div className="cardhead"><div><h3>What-if Simulator</h3><p>Estimate your balance after a purchase</p></div></div><label>Current balance<input type="number" value="5800" readOnly/></label><label>Purchase amount<input type="number" value={purchase} onChange={e=>setPurchase(e.target.value)}/></label><label>Future income<input type="number" value={futureIncome} onChange={e=>setFutureIncome(e.target.value)}/></label><label>Upcoming expenses<input type="number" value={upcoming} onChange={e=>setUpcoming(e.target.value)}/></label></div><div className="card result-card"><span>ESTIMATED REMAINING</span><h2>₹{remaining.toLocaleString('en-IN')}</h2><p className={remaining<1000?'risk-high':remaining<3000?'risk-medium':'risk-low'}>{remaining<1000?'High risk':remaining<3000?'Moderate risk':'Low risk'} financial impact</p><div className="bar"><i style={{width:`${Math.max(5,Math.min(100,remaining/58))}%`}}/></div></div></div>;
 } else if(active==='Reports'){
  body=<div className="grid reports-grid"><div className="card pagecard"><div className="cardhead"><div><h3>Monthly report</h3><p>November 2026</p></div></div><div className="report-values"><div><span>Income</span><b>₹8,000</b></div><div><span>Expenses</span><b>₹5,200</b></div><div><span>Savings</span><b>₹4,000</b></div><div><span>Balance</span><b>₹5,800</b></div></div></div><div className="card pagecard"><div className="cardhead"><div><h3>Category spend</h3><p>Where your money went</p></div></div><div className="category-report">{categories.map(c=><div key={c.name}><span>{c.name}</span><div className="bar"><i style={{width:c.value+'%',background:c.color}}/></div><b>{c.amount}</b></div>)}</div></div></div>;
 }
 return <><div className="welcome"><div><p>CampusCash</p><h1>{title}</h1></div><button className="month" onClick={()=>setActive('Overview')}>Back to overview</button></div>{body}</>;
}

export default App;
