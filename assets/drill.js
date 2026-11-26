(function(){
  const css = `
  .drill{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:16px 18px;margin:20px 0}
  .drill .dq{font-size:1.15rem;font-weight:600;line-height:1.55;margin-bottom:12px}
  .drill .df{display:grid;gap:10px}
  .drill label{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:1.05rem}
  .drill label span{min-width:9em}
  .drill input{font:inherit;font-family:var(--mono);font-size:1.1rem;padding:8px 10px;border-radius:6px;border:1px solid var(--line);background:var(--bg);color:var(--ink);width:min(100%,16em)}
  .drill input.ok{border-color:var(--ok);background:var(--ok-soft)}
  .drill input.bad{border-color:var(--bad);background:var(--bad-soft)}
  .drill .db{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
  .drill button{font:inherit;font-size:1rem;padding:8px 14px;border-radius:6px;border:1px solid var(--line);background:var(--bg);color:var(--ink);cursor:pointer}
  .drill button.p{background:var(--accent);border-color:var(--accent);color:#fff}
  .drill button:focus-visible,.drill input:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
  .drill .ds{margin-top:12px;font-size:.98rem;line-height:1.6}
  .drill .ds .f{font-size:1.05em}
  .drill .dc{margin-top:10px;font-size:.92rem;color:var(--muted)}`;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  function num(s){
    s=String(s).trim().replace(/[\s ]+/g,'').replace(/(Kč|ks|%|dní|dnů|dny|dne|h|hod)$/i,'').replace(',','.');
    if(/^[-+]?\d+\/\d+$/.test(s)){const [a,b]=s.split('/');return Number(a)/Number(b);}
    if(s===''||isNaN(Number(s)))return NaN;
    return Number(s);
  }
  function bits(s){return String(s).replace(/[\s.,_]/g,'').toLowerCase();}
  function same(type,given,ans,tol){
    if(type==='num'){const g=num(given);const t=tol!==undefined?tol:Math.max(1e-9,Math.abs(ans)*0.005);return !isNaN(g)&&Math.abs(g-ans)<=t;}
    if(type==='bin')return bits(given)===bits(ans);
    return String(given).trim().toLowerCase().replace(/\s+/g,'')===String(ans).toLowerCase().replace(/\s+/g,'');
  }

  function mount(id,gen,opt){
    const root=document.getElementById(id);if(!root)return;
    root.classList.add('drill');
    let tries=0,good=0,task=null,checked=false;
    function next(){
      task=gen();checked=false;
      root.innerHTML='';
      const q=document.createElement('div');q.className='dq';q.innerHTML=task.q;root.appendChild(q);
      const fs=document.createElement('div');fs.className='df';
      task.fields.forEach((f,i)=>{
        const l=document.createElement('label');
        const sp=document.createElement('span');sp.innerHTML=f.label;
        const inp=document.createElement('input');inp.id=`${id}-in-${i}`;inp.autocomplete='off';inp.spellcheck=false;
        inp.inputMode=f.type==='text'?'text':'decimal';
        inp.addEventListener('keydown',e=>{if(e.key==='Enter')check();});
        l.append(sp,inp);fs.appendChild(l);
      });
      root.appendChild(fs);
      const b=document.createElement('div');b.className='db';
      const bc=document.createElement('button');bc.type='button';bc.className='p';bc.textContent='Zkontrolovat';bc.id=`${id}-check`;bc.onclick=check;
      const bs=document.createElement('button');bs.type='button';bs.textContent='Ukázat postup';bs.id=`${id}-sol`;bs.onclick=()=>show(true);
      const bn=document.createElement('button');bn.type='button';bn.textContent='Další příklad';bn.id=`${id}-next`;bn.onclick=next;
      b.append(bc,bs,bn);root.appendChild(b);
      const s=document.createElement('div');s.className='ds';s.hidden=true;root.appendChild(s);
      const c=document.createElement('div');c.className='dc';c.textContent=count();root.appendChild(c);
    }
    function count(){return `Správně ${good} z ${tries} příkladů. Hodnoty se pokaždé mění.`;}
    function check(){
      const ins=root.querySelectorAll('input');let all=true;
      task.fields.forEach((f,i)=>{const ok=same(f.type,ins[i].value,f.ans,f.tol);ins[i].classList.toggle('ok',ok);ins[i].classList.toggle('bad',!ok);if(!ok)all=false;});
      if(!checked){tries++;if(all)good++;checked=true;}
      root.querySelector('.dc').textContent=count();
      if(all)show(true,true);
      else{const s=root.querySelector('.ds');s.hidden=false;s.innerHTML='<b>Červené pole nesedí.</b> Oprav ho, nebo klikni na „Ukázat postup“.';}
    }
    function show(open,win){
      const s=root.querySelector('.ds');s.hidden=false;
      const ans=task.fields.map(f=>`${f.label} <b class="f">${f.show!==undefined?f.show:f.ans}</b>`).join('<br>');
      s.innerHTML=(win?'<b>Správně.</b><br>':'')+`${ans}<div style="margin-top:6px">${task.sol}</div>`;
    }
    next();
  }
  window.Drill={mount};
})();
