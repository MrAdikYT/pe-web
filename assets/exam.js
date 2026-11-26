(function(){
  const css=`
  .exam .task{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:16px 18px;margin:18px 0}
  .exam .th{display:flex;justify-content:space-between;gap:10px;font-size:.9rem;color:var(--muted);margin-bottom:6px}
  .exam .tq{font-size:1.08rem;line-height:1.6;margin-bottom:12px}
  .exam label{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:8px 0}
  .exam label span{min-width:12em}
  .exam input{font:inherit;font-family:var(--mono);font-size:1.05rem;padding:7px 10px;border-radius:6px;border:1px solid var(--line);background:var(--bg);color:var(--ink);width:min(100%,15em)}
  .exam input.ok{border-color:var(--ok);background:var(--ok-soft)}
  .exam input.bad{border-color:var(--bad);background:var(--bad-soft)}
  .exam .ts{margin-top:10px;font-size:.96rem;line-height:1.6;border-top:1px dashed var(--line);padding-top:10px}
  .exam .bar{position:sticky;bottom:12px;background:var(--ink);color:var(--bg);border-radius:8px;padding:10px 14px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between}
  .exam .bar button{font:inherit;padding:8px 14px;border-radius:6px;border:0;cursor:pointer;background:var(--bg);color:var(--ink)}
  .exam .bar button.p{background:var(--accent);color:#fff}
  .exam .res{font-size:1.15rem;font-weight:600}`;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  function num(s){s=String(s).trim().replace(/[\s ]+/g,'').replace(/(Kč|ks|%|dní|dnů|dny|dne|h|hod)$/i,'').replace(',','.');if(/^[-+]?\d+\/\d+$/.test(s)){const [a,b]=s.split('/');return a/b;}return s===''?NaN:Number(s);}
  function same(f,v){if(f.type==='num'){const g=num(v);const t=f.tol!==undefined?f.tol:Math.max(1e-9,Math.abs(f.ans)*0.005);return !isNaN(g)&&Math.abs(g-f.ans)<=t;}
    return String(v).trim().toLowerCase().replace(/\s+/g,'')===String(f.ans).toLowerCase().replace(/\s+/g,'');}
  function mount(id,slots,opt){
    opt=opt||{};const per=opt.per||5,pass=opt.pass||16;const root=document.getElementById(id);root.classList.add('exam');let tasks=[],done=false;
    function build(){
      done=false;tasks=slots.map(s=>{const g=s[Math.floor(Math.random()*s.length)];return g();});root.innerHTML='';
      tasks.forEach((t,i)=>{const d=document.createElement('div');d.className='task';
        d.innerHTML=`<div class="th"><span>Příklad ${i+1}</span><span>${per} b</span></div><div class="tq">${t.q}</div>`;
        t.fields.forEach((f,j)=>{const l=document.createElement('label');l.innerHTML=`<span>${f.label}</span>`;const inp=document.createElement('input');inp.autocomplete='off';inp.inputMode=f.type==='text'?'text':'decimal';inp.id=`${id}-${i}-${j}`;l.appendChild(inp);d.appendChild(l);});
        const s=document.createElement('div');s.className='ts';s.hidden=true;d.appendChild(s);root.appendChild(d);});
      const bar=document.createElement('div');bar.className='bar';
      bar.innerHTML=`<span class="res">Vyplň a dej Vyhodnotit.</span><span><button type="button" class="p" id="${id}-eval">Vyhodnotit</button> <button type="button" id="${id}-new">Nová písemka</button></span>`;
      root.appendChild(bar);bar.querySelector('.p').onclick=evaluate;bar.querySelector(`#${id}-new`).onclick=()=>{build();root.scrollIntoView({behavior:'smooth'});};
    }
    function evaluate(){
      let total=0;const boxes=root.querySelectorAll('.task');
      tasks.forEach((t,i)=>{let ok=0;t.fields.forEach((f,j)=>{const inp=document.getElementById(`${id}-${i}-${j}`);const g=same(f,inp.value);inp.classList.toggle('ok',g);inp.classList.toggle('bad',!g);if(g)ok++;});
        const pts=Math.round(per*ok/t.fields.length*2)/2;total+=pts;const s=boxes[i].querySelector('.ts');s.hidden=false;
        s.innerHTML=`<b>${pts} z ${per} b.</b> `+t.fields.map(f=>`${f.label} <b>${f.show!==undefined?f.show:f.ans}</b>`).join(' · ')+`<div style="margin-top:6px">${t.sol}</div>`;
        boxes[i].querySelector('.th span:last-child').textContent=`${pts} / ${per} b`;});
      const max=per*tasks.length;root.querySelector('.res').textContent=`${total} z ${max} b · ${total>=pass?'zápočet by byl ✔':'pod hranicí '+pass+' b'}`;
      if(opt.onScore)opt.onScore(total,max);
    }
    build();
  }
  window.Exam={mount};
})();
