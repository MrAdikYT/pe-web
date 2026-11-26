(function(){
  const r=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const rs=(a,b,s)=>s*r(Math.ceil(a/s),Math.floor(b/s));
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const round=(x,d=2)=>{const k=Math.pow(10,d);return Math.round(x*k)/k;};
  const f=(x,d=2)=>{if(!isFinite(x))return String(x);return round(x,d).toLocaleString('cs-CZ',{maximumFractionDigits:d});};
  const kc=(x,d=2)=>f(x,d)+'&nbsp;Kč';
  const pct=(x,d=2)=>f(x*100,d)+'&nbsp;%';
  const tbl=(rows,head)=>'<table class="mini">'+(head?'<tr>'+head.map(h=>`<th>${h}</th>`).join('')+'</tr>':'')+rows.map(rw=>'<tr>'+rw.map(c=>`<td>${c}</td>`).join('')+'</tr>').join('')+'</table>';
  const N=(label,ans,o)=>Object.assign({label,type:'num',ans,show:f(ans)},o||{});
  const T=(label,ans)=>({label,type:'text',ans});

  /* ---------- 1. Rozvaha ---------- */
  const ITEMS=[
    ['Budova výrobní haly','SA'],['Pracovní stroje','SA'],['Pozemek','SA'],['Osobní automobil','SA'],['Zakoupená licence','SA'],
    ['Software za 100 000 Kč','SA'],['Obligace s dvouletou splatností','SA'],['Majetkové podíly v jiné firmě','SA'],['Obchodní značka','SA'],
    ['Zásoby materiálu','OA'],['Nedokončená výroba','OA'],['Hotové výrobky na skladě','OA'],['Zboží na skladě','OA'],['Pohledávky za odběrateli','OA'],
    ['Peníze v pokladně','OA'],['Peníze na běžném účtu','OA'],['Polotovary vlastní výroby','OA'],['Ceniny (stravenky, kolky)','OA'],
    ['Základní kapitál','VK'],['Emisní ážio','VK'],['Fondy ze zisku','VK'],['Nerozdělený zisk minulých let','VK'],['Výsledek hospodaření běžného období','VK'],
    ['Bankovní úvěr','CK'],['Závazky vůči dodavatelům','CK'],['Nevyplacené mzdy zaměstnanců','CK'],['Rezervy','CK'],['Dlužné daně','CK'],['Vydané dluhopisy','CK'],['Přijaté zálohy od odběratelů','CK']
  ];
  const WHY={SA:'stálé aktivum: slouží déle než 1 rok',OA:'oběžné aktivum: krátkodobý majetek, mění formu (peníze, zásoby, pohledávky)',VK:'vlastní kapitál: patří vlastníkům',CK:'cizí kapitál: dluh, který se musí vrátit'};
  function rozvahaTrideni(){
    const it=pick(ITEMS);
    return {q:`Kam v rozvaze patří položka <b>${it[0]}</b>? Napiš <b>SA</b>, <b>OA</b>, <b>VK</b>, nebo <b>CK</b>.`,
      fields:[T('skupina:',it[1])],sol:`${it[1]}: ${WHY[it[1]]}.`};
  }
  function rozvahaDoplneni(){
    const zas=rs(20,90,5),poh=rs(10,60,5),pen=rs(5,40,5),sa=rs(60,200,5);
    const oa=zas+poh+pen,A=sa+oa;
    const vhml=rs(5,40,5);const kz=rs(30,Math.max(35,Math.floor(A*0.4)),5);
    let dz=rs(10,Math.max(15,Math.floor(A*0.25)),5);
    let zk=A-vhml-kz-dz; if(zk<20){dz=10;zk=A-vhml-kz-dz;}
    const vk=zk+vhml,ck=dz+kz;
    return {q:`Doplň rozvahu (v tis. Kč).`+tbl([
        ['Stálá aktiva',sa,'Vlastní kapitál','?'],['Oběžná aktiva','?','&nbsp;&nbsp;Základní kapitál',zk],['&nbsp;&nbsp;Zásoby',zas,'&nbsp;&nbsp;VH minulých let',vhml],
        ['&nbsp;&nbsp;Pohledávky',poh,'Cizí kapitál','?'],['&nbsp;&nbsp;Peněžní prostředky',pen,'&nbsp;&nbsp;Dlouhodobé závazky','?'],['','','&nbsp;&nbsp;Krátkodobé závazky',kz]],['Aktiva','','Pasiva','']),
      fields:[N('Aktiva celkem:',A,{tol:0.5}),N('Vlastní kapitál:',vk,{tol:0.5}),N('Cizí kapitál:',ck,{tol:0.5}),N('Dlouhodobé závazky:',dz,{tol:0.5})],
      sol:`OA = ${zas} + ${poh} + ${pen} = ${oa}. Aktiva = ${sa} + ${oa} = ${A} = Pasiva. VK = ${zk} + ${vhml} = ${vk}. CK = ${A} − ${vk} = ${ck}. Dlouhodobé závazky = ${ck} − ${kz} = ${dz}.`};
  }
  const OPS=[
    {t:x=>`Dodavatelům uhrazeny závazky z běžného účtu ${f(x)}.`,e:{bu:-1,zd:-1},lim:['bu','zd']},
    {t:x=>`Na sklad převzat materiál od dodavatele na fakturu ${f(x)}.`,e:{mat:1,zd:1},lim:[]},
    {t:x=>`Z běžného účtu vybráno do pokladny ${f(x)}.`,e:{bu:-1,pok:1},lim:['bu']},
    {t:x=>`Z pokladny vyplaceny dlužné mzdy ${f(x)}.`,e:{pok:-1,zm:-1},lim:['pok','zm']},
    {t:x=>`Odběratel uhradil fakturu na běžný účet ${f(x)}.`,e:{bu:1,poh:-1},lim:['poh']},
    {t:x=>`Splátka bankovního úvěru z běžného účtu ${f(x)}.`,e:{bu:-1,uv:-1},lim:['bu','uv']},
    {t:x=>`Nákup stroje z běžného účtu ${f(x)}.`,e:{bu:-1,dhm:1},lim:['bu']},
    {t:x=>`Dodavatelům uhrazeny závazky z bankovního úvěru ${f(x)}.`,e:{uv:1,zd:-1},lim:['zd']},
    {t:x=>`Prodej výrobků na fakturu ${f(x)} (v ocenění zásob).`,e:{vyr:-1,poh:1},lim:['vyr']}
  ];
  const NAMES={dhm:'DHM',mat:'Materiál',vyr:'Výrobky',poh:'Pohledávky',bu:'Běžný účet',pok:'Pokladna',zk:'Základní kapitál',fz:'Fondy ze zisku',uv:'Bankovní úvěr',zd:'Závazky k dodavatelům',zm:'Závazky k zaměstnancům'};
  function rozvahaOperace(){
    const s={dhm:rs(800,3000,50),mat:rs(100,400,10),vyr:rs(30,200,10),poh:rs(50,250,10),bu:rs(80,300,10),pok:rs(5,30,1),uv:rs(100,400,10),zd:rs(40,150,5),zm:rs(10,40,5),fz:rs(50,250,10)};
    const A=s.dhm+s.mat+s.vyr+s.poh+s.bu+s.pok;s.zk=A-s.uv-s.zd-s.zm-s.fz;
    if(s.zk<100){s.dhm+=400;s.zk+=400;}
    const st=Object.assign({},s);const ops=[];const used=new Set();
    let guard=0;while(ops.length<5&&guard++<60){const o=pick(OPS);if(used.has(o))continue;
      const cap=Math.min(...o.lim.map(k=>st[k]),150);if(cap<4)continue;const x=Math.max(1,Math.round(r(2,Math.max(3,Math.floor(cap*0.6)))));
      for(const k in o.e)st[k]+=o.e[k]*x;used.add(o);ops.push(o.t(x));}
    const sum=o=>o.dhm+o.mat+o.vyr+o.poh+o.bu+o.pok;
    const ask=pick([['bu','zd'],['bu','pok'],['zd','uv'],['poh','bu'],['mat','zd']]);
    const keysA=['dhm','mat','vyr','poh','bu','pok'],keysP=['zk','fz','uv','zd','zm'];
    const rows=[];for(let i=0;i<6;i++)rows.push([NAMES[keysA[i]],s[keysA[i]],keysP[i]?NAMES[keysP[i]]:'',keysP[i]?s[keysP[i]]:'']);
    return {q:`Počáteční rozvaha (v tis. Kč), bilanční suma ${f(sum(s))}:`+tbl(rows,['Aktiva','PS','Pasiva','PS'])+'<ol>'+ops.map(o=>`<li>${o}</li>`).join('')+'</ol>Urči konečné stavy po všech operacích.',
      fields:[N(NAMES[ask[0]]+' (KS):',st[ask[0]],{tol:0.5}),N(NAMES[ask[1]]+' (KS):',st[ask[1]],{tol:0.5}),N('Bilanční suma (KS):',sum(st),{tol:0.5})],
      sol:`Každá operace mění dvě položky. Konečné stavy: `+Object.keys(NAMES).map(k=>`${NAMES[k]} ${st[k]}`).join(', ')+`. Aktiva = Pasiva = ${f(sum(st))}.`};
  }
  function rozvahaSestaveni(){
    const it={bud:rs(400,1500,10)*1000,str:rs(100,500,5)*1000,mat:rs(20,120,1)*1000,poh:rs(20,150,1)*1000,pok:rs(2,15,1)*1000,bu:rs(10,90,1)*1000,
      zd:rs(20,120,1)*1000,zm:rs(20,100,1)*1000,uv:rs(50,200,1)*1000,vhml:rs(5,60,1)*1000};
    const SA=it.bud+it.str,OA=it.mat+it.poh+it.pok+it.bu,A=SA+OA,CK=it.zd+it.zm+it.uv,ZK=A-CK-it.vhml;
    const L=[['budova dílny',it.bud],['stroje a zařízení',it.str],['zásoby materiálu',it.mat],['vydané faktury odběratelům (neuhrazené)',it.poh],['peníze v pokladně',it.pok],['zůstatek na běžném účtu',it.bu],
      ['přijaté faktury od dodavatelů (neuhrazené)',it.zd],['zúčtované a nevyplacené mzdy',it.zm],['zůstatek úvěrového účtu',it.uv],['výsledek hospodaření minulých let',it.vhml]];
    return {q:`Soupis majetku a zdrojů firmy (Kč): `+shuffle(L).map(x=>`${x[0]} ${f(x[1])}`).join('; ')+`. Základní kapitál není uveden.`,
      fields:[N('Stálá aktiva:',SA,{tol:0.5}),N('Oběžná aktiva:',OA,{tol:0.5}),N('Cizí kapitál:',CK,{tol:0.5}),N('Základní kapitál:',ZK,{tol:0.5})],
      sol:`SA = budova + stroje = ${f(SA)}. OA = materiál + pohledávky + pokladna + účet = ${f(OA)}. Aktiva = ${f(A)}. CK = dodavatelé + mzdy + úvěr = ${f(CK)}. ZK = Aktiva − CK − VH min. let = ${f(ZK)}.`};
  }
  function rozvahaNetto(){
    const dhm=rs(2000,15000,100),opr=rs(Math.floor(dhm*0.1),Math.floor(dhm*0.6),50),zas=rs(200,3000,10),poh=rs(100,900,10),bu=rs(100,900,10);
    const net=dhm-opr,A=net+zas+poh+bu;
    return {q:`DHM v pořizovací ceně ${f(dhm)} Kč, oprávky ${f(opr)} Kč, zásoby ${f(zas)} Kč, pohledávky ${f(poh)} Kč, běžný účet ${f(bu)} Kč.`,
      fields:[N('DHM netto:',net,{tol:0.5}),N('Aktiva celkem:',A,{tol:0.5})],
      sol:`Netto = brutto − korekce (oprávky) = ${f(dhm)} − ${f(opr)} = ${f(net)}. Oprávky nejsou pasivum, snižují aktiva. Aktiva = ${f(net)} + ${f(zas)} + ${f(poh)} + ${f(bu)} = ${f(A)}.`};
  }

  /* ---------- 2. VZZ ---------- */
  function vzzSestaveni(){
    const tr=rs(800,4000,10)*1000,ovyn=pick([0,rs(5,40,1)*1000]),prod=pick([0,rs(50,300,5)*1000]);
    const mzdy=rs(Math.floor(tr*0.12/1000),Math.floor(tr*0.25/1000),1)*1000,poj=Math.round(mzdy*0.338/1000)*1000;
    const mat=rs(Math.floor(tr*0.08/1000),Math.floor(tr*0.25/1000),1)*1000,odp=rs(5,150,1)*1000,opr=rs(2,40,1)*1000;
    const uv=pick([0,rs(1,20,1)*50000]),us=pick([0.04,0.05,0.06,0.08,0.1]),urN=Math.round(uv*us);
    const vkl=pick([0,rs(1,10,1)*50000]),vs=pick([0.02,0.03,0.035]),urV=Math.round(vkl*vs),popl=rs(1,30,1)*100;
    const dan=pick([0.19,0.21]);
    const pv=tr+ovyn+prod,pn=mzdy+poj+mat+odp+opr,PVH=pv-pn,FVH=urV-urN-popl,VHp=PVH+FVH,D=VHp>0?Math.round(VHp*dan):0,VH=VHp-D;
    const L=[['Tržby za výrobky a služby',tr],['Mzdové náklady',mzdy],['Zákonné pojištění (SP, ZP)',poj],['Spotřeba materiálu',mat],['Odpisy',odp],['Opravy a udržování',opr],['Bankovní poplatky',popl]];
    if(ovyn)L.push(['Ostatní provozní výnosy',ovyn]);if(prod)L.push(['Tržby z prodeje majetku',prod]);
    let extra='';if(uv)extra+=` Bankovní úvěr ${f(uv)} Kč, úroková sazba ${f(us*100)} % ročně (jednoduché úročení).`;if(vkl)extra+=` Termínovaný vklad ${f(vkl)} Kč, úrok ${f(vs*100)} % ročně.`;
    return {q:`Sestav výkaz zisku a ztráty (Kč): `+shuffle(L).map(x=>`${x[0]} ${f(x[1])}`).join('; ')+'.'+extra+` Sazba daně z příjmů ${f(dan*100)} %.`,
      fields:[N('Provozní VH:',PVH,{tol:1}),N('Finanční VH:',FVH,{tol:1}),N('VH před zdaněním:',VHp,{tol:1}),N('VH po zdanění:',VH,{tol:Math.max(2,Math.abs(VH)*0.001)})],
      sol:`Provozní výnosy ${f(pv)} − provozní náklady ${f(pn)} = <b>${f(PVH)}</b>. Finanční: úroky z vkladu ${f(urV)} − nákladové úroky ${f(urN)} − poplatky ${f(popl)} = <b>${f(FVH)}</b>. Před zdaněním ${f(VHp)}, daň ${f(D)}, po zdanění <b>${f(VH)}</b>. Úrok = jistina × sazba (za rok). Ztráta se nedaní.`};
  }
  function vzzPlan(){
    const p=rs(100,300,5),q=rs(40,150,5)*1000,mz=rs(20,60,5),mat=rs(20,70,5),ost=rs(5,30,5),zar=rs(15,40,1)*100000,os=pick([0.1,0.12,0.15,0.2]);
    const vk=rs(Math.floor(zar/200000),Math.floor(zar/100000),1)*100000,om=rs(3,12,1)*100000,us=pick([0.08,0.1,0.12,0.16]),naj=rs(2,8,1)*100000,poj=0.35,dan=0.19;
    const uv=Math.max(0,zar+om-vk);
    const T_=p*q,M=mat*q,MZ=mz*q,P=MZ*poj,O=ost*q,OD=zar*os,U=uv*us,ZP=T_-M-MZ-P-O-naj-OD-U,D=ZP>0?ZP*dan:0,ZC=ZP-D;
    return {q:`Nový podnik vyrábí jeden výrobek. Cena ${p} Kč/ks, mzdy ${mz} Kč/ks, materiál ${mat} Kč/ks, ostatní přímé náklady ${ost} Kč/ks, roční prodej ${f(q)} ks. Výrobní zařízení ${f(zar)} Kč, odpisová sazba ${f(os*100)} %. Oběžný majetek ${f(om)} Kč. Vlastní kapitál ${f(vk)} Kč, zbytek se kryje úvěrem s úrokem ${f(us*100)} %. Roční nájemné ${f(naj)} Kč. Sociální a zdravotní pojištění 35 % mezd, daň z příjmů 19 %.`,
      fields:[N('Potřebný úvěr:',uv,{tol:1}),N('Zisk před zdaněním:',ZP,{tol:Math.max(2,Math.abs(ZP)*0.002)}),N('Čistý zisk:',ZC,{tol:Math.max(2,Math.abs(ZC)*0.002)})],
      sol:`Úvěr = zařízení + OM − VK = ${f(zar)} + ${f(om)} − ${f(vk)} = ${f(uv)}. Tržby ${f(T_)} − materiál ${f(M)} − mzdy ${f(MZ)} − pojištění ${f(P)} − ostatní ${f(O)} − nájem ${f(naj)} − odpisy ${f(OD)} − úroky ${f(U)} = <b>${f(ZP)}</b>. Daň 19 % = ${f(D)}, čistý zisk <b>${f(ZC)}</b>.`};
  }
  const RV=[['Stroje a zařízení','R'],['Úroky z úvěru','V'],['Nedokončená výroba','R'],['Ostatní provozní náklady','V'],['Bankovní účty','R'],['Závazky z obchodních vztahů','R'],['Tržby za výrobky','V'],
    ['Základní kapitál','R'],['Emisní ážio','R'],['Nakoupené akcie','R'],['Spotřeba surovin','V'],['Pohledávky z obchodních vztahů','R'],['Rezervní fond','R'],['Osobní náklady','V'],['Odpisy','V'],
    ['Hotové výrobky','R'],['Oprávky k hmotným aktivům','R'],['Přijaté dividendy','V'],['Mzdové náklady','V'],['Bankovní úvěr','R']];
  function rozvahaNeboVzz(){const it=pick(RV);return {q:`Je položka <b>${it[0]}</b> v rozvaze (<b>R</b>), nebo ve výkazu zisku a ztráty (<b>V</b>)?`,fields:[T('R / V:',it[1])],
    sol:it[1]==='R'?'Rozvaha: stav majetku nebo zdroje k určitému datu.':'VZZ: náklad nebo výnos za období.'};}

  /* ---------- 3. Náklady ---------- */
  const FIX=[['Nájemné výrobní haly',30,90],['Odpisy strojů',20,80],['Mzdy administrativních pracovníků',30,90],['Údržba strojů (paušál)',10,40],['Marketing',5,30],['Zabezpečení budov',5,20],['Kancelářské potřeby',2,10],['Právní a účetní služby',5,15],['Pojištění',5,20]];
  const VAR=[['Mzdy výrobních dělníků',100,300],['Suroviny',80,250],['Doprava výrobků',20,80],['Energie pro výrobu',20,60],['Balicí materiál',10,40],['Provize z prodeje',20,90]];
  function naklKlas(){
    const q=rs(500,3000,100);const fx=shuffle(FIX).slice(0,r(4,6)),vr=shuffle(VAR).slice(0,r(3,5));
    const F=fx.map(x=>[x[0],rs(x[1],x[2],1)*1000]);const V=vr.map(x=>[x[0],rs(x[1],x[2],5)*q]);
    const FN=F.reduce((a,b)=>a+b[1],0),VN=V.reduce((a,b)=>a+b[1],0),vn=VN/q;
    const vnr=Math.round(vn),p=vnr+rs(40,300,10);const BZ=FN/(p-vn);
    return {q:`Firma vyrábí měsíčně ${f(q)} ks. Náklady za měsíc (Kč): `+shuffle(F.concat(V)).map(x=>`${x[0]} ${f(x[1])}`).join('; ')+`. Cena výrobku ${f(p)} Kč.`,
      fields:[N('FN (Kč):',FN,{tol:1}),N('vn (Kč/ks):',vn,{tol:0.01}),N('Bod zvratu (ks):',Math.ceil(BZ),{tol:1,show:f(Math.ceil(BZ),0)+' (přesně '+f(BZ)+')'})],
      sol:`Fixní: ${F.map(x=>x[0]).join(', ')} → FN = ${f(FN)}. Variabilní: ${V.map(x=>x[0]).join(', ')} → VN = ${f(VN)}, vn = ${f(VN)} / ${f(q)} = ${f(vn)}. CN = ${f(FN)} + ${f(vn)}·q. BZ = FN / (p − vn) = ${f(BZ)} ks, zaokrouhli nahoru.`};
  }
  function dvouObdobi(){
    const FN=rs(50,600,10)*1000,vn=pick([0.5,1,1.5,2,2.5,3,4,5,6,8]);const n=6;const qs=shuffle([...Array(n)].map((_,i)=>rs(10,90,1)*1000));
    const uniq=[...new Set(qs)];while(uniq.length<n)uniq.push(rs(10,90,1)*1000+500);
    const rows=uniq.slice(0,n).map(q=>[q,FN+vn*q+(Math.random()<.5?0:rs(-20,20,1)*100)]);
    const mn=rows.reduce((a,b)=>b[0]<a[0]?b:a),mx=rows.reduce((a,b)=>b[0]>a[0]?b:a);
    const VN=(mx[1]-mn[1])/(mx[0]-mn[0]),F=mx[1]-VN*mx[0];const qx=rs(60,120,5)*1000;const CNx=F+VN*qx;
    return {q:`Objem výroby a celkové náklady za 6 měsíců. Metodou dvou období (nejmenší a největší objem) sestav nákladovou funkci a odhadni CN pro ${f(qx)} ks.`+tbl(rows.map((x,i)=>[i+1,f(x[0]),f(x[1])]),['měsíc','objem (ks)','CN (Kč)']),
      fields:[N('vn (Kč/ks):',VN,{tol:0.005}),N('FN (Kč):',F,{tol:Math.max(1,Math.abs(F)*0.002)}),N(`CN pro ${f(qx)} ks:`,CNx,{tol:Math.max(1,CNx*0.002)})],
      sol:`Vezmi jen měsíce s nejmenším (${f(mn[0])} ks; ${f(mn[1])} Kč) a největším objemem (${f(mx[0])} ks; ${f(mx[1])} Kč). vn = ΔCN / Δq = ${f(mx[1]-mn[1])} / ${f(mx[0]-mn[0])} = ${f(VN,4)}. FN = CN − vn·q = ${f(mx[1])} − ${f(VN,4)}·${f(mx[0])} = ${f(F)}. CN = ${f(F)} + ${f(VN,4)}·${f(qx)} = ${f(CNx)}.`};
  }
  function dvaRoky(){
    const q0=rs(10,300,10)*10000,dq=rs(5,60,5)*10000,vn=pick([0.2,0.25,0.3,0.4,0.5,0.6,0.75]),FN=rs(10,90,1)*10000;const C0=FN+vn*q0,dC=vn*dq;
    return {q:`V základním roce podnik vyrobil ${f(q0)} ks s celkovými náklady ${f(C0)} Kč. V běžném roce objem vzrostl o ${f(dq)} ks a náklady vzrostly o ${f(dC)} Kč. Sestav nákladovou rovnici.`,
      fields:[N('vn (Kč/ks):',vn,{tol:0.001}),N('FN (Kč):',FN,{tol:1})],sol:`vn = ΔN / Δq = ${f(dC)} / ${f(dq)} = ${f(vn,4)}. FN = ${f(C0)} − ${f(vn,4)}·${f(q0)} = ${f(FN)}. CN = ${f(FN)} + ${f(vn,4)}·q.`};
  }
  function nejmensiCtverce(){
    const FN=rs(20,80,1)*10,vn=rs(2,9,1)/10;const qs=shuffle([...Array(8)].map((_,i)=>rs(80,120,1)*10)).slice(0,5);
    const rows=qs.map(q=>[q,Math.round(FN+vn*q+rs(-15,15,1))]);const n=rows.length;
    const Sq=rows.reduce((a,b)=>a+b[0],0),Sc=rows.reduce((a,b)=>a+b[1],0),Sqc=rows.reduce((a,b)=>a+b[0]*b[1],0),Sqq=rows.reduce((a,b)=>a+b[0]*b[0],0);
    const b=(n*Sqc-Sq*Sc)/(n*Sqq-Sq*Sq),a=(Sc-b*Sq)/n;
    return {q:`Metodou nejmenších čtverců odhadni nákladovou funkci CN = FN + vn·q (tis. Kč, tis. ks).`+tbl(rows.map((x,i)=>[i+1,x[0],x[1]]),['období','q','CN']),
      fields:[N('vn:',b,{tol:Math.max(0.006,Math.abs(b)*0.01),show:f(b,4)}),N('FN:',a,{tol:Math.max(8,Math.abs(a)*0.02)})],
      sol:`n = ${n}, Σq = ${f(Sq)}, ΣCN = ${f(Sc)}, Σq·CN = ${f(Sqc)}, Σq² = ${f(Sqq)}. vn = (n·Σq·CN − Σq·ΣCN) / (n·Σq² − (Σq)²) = ${f(b,4)}. FN = (ΣCN − vn·Σq) / n = ${f(a)}.`};
  }

  /* ---------- 4. Bod zvratu ---------- */
  function bzZaklad(){
    const vn=rs(5,400,1),p=vn+rs(3,200,1),FN=rs(20,2000,1)*1000;const BZ=FN/(p-vn);const kap=Math.ceil(BZ*(1.1+Math.random()*1.2)/100)*100;
    return {q:`Cena výrobku ${f(p)} Kč, variabilní náklady ${f(vn)} Kč/ks, fixní náklady ${f(FN)} Kč, výrobní kapacita ${f(kap)} ks.`,
      fields:[N('Bod zvratu (ks):',BZ,{tol:Math.max(1,BZ*0.002),show:f(BZ)}),N('Bod zvratu v tržbách (Kč):',BZ*p,{tol:Math.max(p,BZ*p*0.002)}),N('Kritické využití kapacity (%):',BZ/kap*100,{tol:0.1})],
      sol:`BZ = FN / (p − vn) = ${f(FN)} / ${f(p-vn)} = ${f(BZ)} ks (v praxi nahoru: ${f(Math.ceil(BZ),0)} ks). V tržbách BZ·p = ${f(BZ*p)} Kč. V<sub>krit</sub> = BZ / kapacita = ${pct(BZ/kap)}.`};
  }
  function bzZisk(){
    const vn=rs(2,400,1),p=vn+rs(2,150,1),FN=rs(10,1500,1)*1000,Z=rs(5,800,1)*1000,q=(FN+Z)/(p-vn);const qs=rs(Math.floor(q*0.6/100)+1,Math.floor(q*1.4/100)+2,1)*100,Zs=(p-vn)*qs-FN;
    return {q:`Cena ${f(p)} Kč/ks, vn ${f(vn)} Kč/ks, FN ${f(FN)} Kč. a) Kolik kusů je třeba prodat pro zisk ${f(Z)} Kč? b) Jaký je výsledek hospodaření při prodeji ${f(qs)} ks?`,
      fields:[N('a) objem (ks):',q,{tol:Math.max(1,q*0.002)}),N('b) VH (Kč):',Zs,{tol:Math.max(1,Math.abs(Zs)*0.002)})],
      sol:`q = (FN + Z) / (p − vn) = ${f(FN+Z)} / ${f(p-vn)} = ${f(q)} ks. VH = (p − vn)·q − FN = ${f(p-vn)}·${f(qs)} − ${f(FN)} = ${f(Zs)} Kč${Zs<0?' (ztráta)':''}.`};
  }
  function bzLimity(){
    const typ=pick(['fn','vn','p']);const vn=rs(5,300,1),p=vn+rs(5,120,1),q=rs(5,200,1)*1000,Z=rs(0,300,1)*1000;
    const FN=Math.max(1000,Math.round(((p-vn)*q-Z)*(0.5+Math.random()*0.4)/1000)*1000);
    if(typ==='fn'){const lim=(p-vn)*q-Z;return {q:`Cena ${f(p)} Kč, vn ${f(vn)} Kč/ks, objem ${f(q)} ks. Jak vysoké mohou být nejvýše fixní náklady, má-li zisk být aspoň ${f(Z)} Kč?`,fields:[N('limit FN (Kč):',lim,{tol:1})],sol:`FN<sub>max</sub> = (p − vn)·q − Z = ${f(p-vn)}·${f(q)} − ${f(Z)} = ${f(lim)} Kč.`};}
    if(typ==='vn'){const lim=p-(FN+Z)/q;return {q:`FN ${f(FN)} Kč, cena ${f(p)} Kč, objem ${f(q)} ks, požadovaný zisk ${f(Z)} Kč. Jaké mohou být nejvýše variabilní náklady na kus?`,fields:[N('limit vn (Kč/ks):',lim,{tol:0.01})],sol:`vn<sub>max</sub> = p − (FN + Z) / q = ${f(p)} − ${f(FN+Z)} / ${f(q)} = ${f(lim)} Kč/ks.`};}
    const lim=vn+(FN+Z)/q;return {q:`FN ${f(FN)} Kč, vn ${f(vn)} Kč/ks, objem ${f(q)} ks. Jaká je minimální cena, aby zisk byl aspoň ${f(Z)} Kč?`,fields:[N('minimální cena (Kč):',lim,{tol:0.01})],sol:`p<sub>min</sub> = vn + (FN + Z) / q = ${f(vn)} + ${f(FN+Z)} / ${f(q)} = ${f(lim)} Kč.`};
  }
  function bzCenaZKrit(){
    const kap=rs(10,60,1)*100,vk=pick([0.6,0.7,0.75,0.8,0.875,0.9]),vn=rs(5,80,1),m=rs(5,60,1);const BZ=kap*vk,FN=BZ*m,p=vn+m,Z=(p-vn)*kap-FN;
    return {q:`Kritické využití kapacity je ${f(vk*100)} %, kapacita ${f(kap)} ks/rok, FN ${f(FN)} Kč, vn ${f(vn)} Kč/ks. a) Jaká je cena výrobku? b) Jaký je zisk při 100% využití kapacity?`,
      fields:[N('a) cena (Kč):',p,{tol:0.01}),N('b) zisk (Kč):',Z,{tol:1})],sol:`BZ = V<sub>krit</sub>·kapacita = ${f(BZ)} ks. Z BZ = FN / (p − vn): p = vn + FN / BZ = ${f(vn)} + ${f(FN)} / ${f(BZ)} = ${f(p)} Kč. Zisk = (p − vn)·kapacita − FN = ${f(Z)} Kč.`};
  }
  function bzRentabilita(){
    if(Math.random()<.5){const q=rs(10,500,1)*1000,vn=rs(1,40,1)/2,p=vn+rs(1,20,1)/2,FN=rs(1,Math.max(2,Math.floor((p-vn)*q/2000)),1)*1000;const CN=FN+vn*q,T_=p*q,rr=(T_-CN)/CN;
      return {q:`Podnik vyrábí ${f(q)} ks za rok, cena ${f(p)} Kč, vn ${f(vn)} Kč/ks, FN ${f(FN)} Kč. Jaká je rentabilita nákladů?`,fields:[N('zisk (Kč):',T_-CN,{tol:1}),N('rentabilita nákladů (%):',rr*100,{tol:0.05})],
        sol:`T = ${f(T_)}, CN = FN + vn·q = ${f(CN)}, Z = ${f(T_-CN)}. r = Z / CN = ${pct(rr)}.`};}
    const q=rs(5,100,1)*1000,vn=rs(10,60,1)/10,rr=pick([0.1,0.15,0.2,0.25]),p=Math.ceil(vn*(1+rr)*10)/10+rs(3,20,1)/10;const FN=p*q/(1+rr)-vn*q,Z=p*q-FN-vn*q;
    return {q:`Podnik chce rentabilitu nákladů ${f(rr*100)} % při objemu ${f(q)} ks. vn ${f(vn)} Kč/ks, cena ${f(p)} Kč. Jak velké mohou být fixní náklady? Jaký bude zisk?`,
      fields:[N('FN (Kč):',FN,{tol:Math.max(1,FN*0.002)}),N('zisk (Kč):',Z,{tol:Math.max(1,Z*0.002)})],sol:`Z / CN = r ⇒ T = CN·(1 + r) ⇒ CN = T / (1 + r) = ${f(p*q)} / ${f(1+rr)} = ${f(p*q/(1+rr))}. FN = CN − vn·q = ${f(FN)}. Z = T − CN = ${f(Z)}.`};
  }
  function nevyuziteFN(){
    if(Math.random()<.5){const FN=rs(50,900,1)*1000,qp=rs(10,60,1)*10000,qs=Math.round(qp*(0.6+Math.random()*0.35)/1000)*1000,k=qs/qp,FNN=FN*(1-k);
      return {q:`Fixní náklady ${f(FN)} Kč. Plánovaný objem ${f(qp)} ks, skutečně vyrobeno ${f(qs)} ks. Kolik činí nevyužité fixní náklady?`,fields:[N('FN nevyužité (Kč):',FNN,{tol:1})],sol:`k = q<sub>s</sub> / q<sub>p</sub> = ${f(k,4)}. FN<sub>N</sub> = FN·(1 − k) = ${f(FN)}·${f(1-k,4)} = ${f(FNN)} Kč.`};}
    const FN=rs(5,50,1)*500,vn=rs(40,80,1)/100,n=pick([0.85,0.8625,0.875,0.9,0.92]);const Q=FN/(n-vn);
    return {q:`FN ${f(FN)} Kč, variabilní náklady ${f(vn)} Kč na 1 Kč produkce. Jak velký musí být objem výroby v Kč, aby nákladovost byla ${f(n*100)} %?`,fields:[N('objem (Kč):',Q,{tol:Math.max(1,Q*0.002)})],sol:`n = CN / Q = (FN + vn·Q) / Q ⇒ Q = FN / (n − vn) = ${f(FN)} / ${f(n-vn,4)} = ${f(Q)} Kč.`};
  }
  function bzRuznorodaMS(){
    const FN=rs(20,400,1)*1000,podil=rs(40,80,1)/100,T_=Math.round(FN/(1-podil)*(1.2+Math.random()*0.8)/1000)*1000;const BZ=FN/(1-podil),MS=(T_-BZ)/T_;
    return {q:`Podnik vyrábí více druhů výrobků. FN ${f(FN)} Kč, variabilní náklady tvoří ${f(podil*100)} % tržeb, plánované tržby ${f(T_)} Kč. Urči bod zvratu v Kč a koeficient bezpečnosti (bezpečnostní marži).`,
      fields:[N('BZ (Kč):',BZ,{tol:Math.max(1,BZ*0.002)}),N('MS (%):',MS*100,{tol:0.1})],sol:`BZ = FN / (1 − VN/T) = ${f(FN)} / ${f(1-podil)} = ${f(BZ)} Kč. MS = (T − BZ) / T = ${pct(MS)}: o tolik mohou tržby klesnout, než přijde ztráta.`};
  }

  /* ---------- 5. Kapacity ---------- */
  function casoveFondy(){
    const dni=pick([30,31]),vik=pick([8,9,10]),sv=r(0,2),sm=pick([1,2,3]),h=pick([7.5,8,8.5]),tz=pick([2,3,4,5,8,10]);
    const Tk=dni*24,dny=dni-vik-sv,Tn=dny*sm*h,Tp=Tn*(1-tz/100);
    return {q:`Měsíc má ${dni} dní, z toho ${vik} víkendových a ${sv} svátky. Pracuje se na ${sm} směn${sm===1?'u':'y'} po ${f(h)} h. Plánované prostoje ${tz} % nominálního fondu. Urči časové fondy v hodinách.`,
      fields:[N('T<sub>k</sub> (h):',Tk,{tol:0.5}),N('T<sub>n</sub> (h):',Tn,{tol:0.5}),N('T<sub>p</sub> (h):',Tp,{tol:0.5})],
      sol:`T<sub>k</sub> = ${dni}·24 = ${f(Tk)} h. Pracovních dnů ${dni} − ${vik} − ${sv} = ${dny}, T<sub>n</sub> = ${dny}·${sm}·${f(h)} = ${f(Tn)} h. T<sub>p</sub> = T<sub>n</sub>·(1 − ${tz}/100) = ${f(Tp)} h.`};
  }
  function qpVykon(){
    const n=r(1,5),Vp=rs(5,60,1),Tp=rs(150,450,1)*10,Qp=n*Vp*Tp,kc=rs(60,98,1)/100,Qs=Math.round(Qp*kc);
    return {q:`Podnik má ${n} stej${n===1?'ný stroj':'né stroje'}, kapacitní výkon ${Vp} ks/h na stroj, využitelný časový fond ${f(Tp)} h ročně na stroj. Skutečně vyrobil ${f(Qs)} ks.`,
      fields:[N('Q<sub>p</sub> (ks):',Qp,{tol:0.5}),N('k<sub>c</sub> (%):',Qs/Qp*100,{tol:0.1}),N('kapacitní rezerva (ks):',Qp-Qs,{tol:0.5})],
      sol:`Q<sub>p</sub> = T<sub>p</sub>·V<sub>p</sub> = ${n}·${f(Tp)}·${Vp} = ${f(Qp)} ks. k<sub>c</sub> = Q<sub>s</sub> / Q<sub>p</sub> = ${pct(Qs/Qp)}. Rezerva = Q<sub>p</sub> − Q<sub>s</sub> = ${f(Qp-Qs)} ks.`};
  }
  function qpPracnost(){
    const t=rs(10,90,1)/100,k1=pick([1,1.05,1.1,1.15,1.2]),k2=pick([1,1.02,1.05,1.1]),Tp=rs(15,60,1)*100;const tk=t/(k1*k2),Qp=Tp/tk;
    return {q:`Norma pracnosti výrobku ${f(t)} Nh, normy se plní na ${f(k1*100)} %, koeficient progrese ${f(k2)}. Využitelný časový fond stroje ${f(Tp)} h. Urči výrobní kapacitu.`,
      fields:[N('t<sub>k</sub> (h):',tk,{tol:0.0051,show:f(tk,4)}),N('Q<sub>p</sub> (ks):',Qp,{tol:Math.max(1,Qp*0.03)})],
      sol:`t<sub>k</sub> = t / (k<sub>1</sub>·k<sub>2</sub>) = ${f(t)} / (${f(k1)}·${f(k2)}) = ${f(tk,4)} h. Q<sub>p</sub> = T<sub>p</sub> / t<sub>k</sub> = ${f(Tp)} / ${f(tk,4)} = ${f(Qp)} ks.`};
  }
  function qpPlocha(){
    const m=rs(4,45,1),pr=rs(2,6,1),M=m*rs(4,30,1),t=rs(5,80,1),sm=pick([5,10,15]),h=pick([7.5,8,8.5]);const Tp=sm*h,Qp=M/m*Tp/t;
    return {q:`Montovna má plochu ${f(M)} m², na 1 výrobek je potřeba ${m} m², průběžná doba montáže 1 výrobku je ${t} h. Týdně ${sm} směn po ${f(h)} h. Jaká je týdenní kapacita?`,
      fields:[N('T<sub>p</sub> (h/týden):',Tp,{tol:0.01}),N('Q<sub>p</sub> (ks):',Qp,{tol:Math.max(0.05,Qp*0.005)})],
      sol:`T<sub>p</sub> = ${sm}·${f(h)} = ${f(Tp)} h. Q<sub>p</sub> = (M / m)·(T<sub>p</sub> / t) = (${f(M)} / ${m})·(${f(Tp)} / ${t}) = ${f(M/m)}·${f(Tp/t,4)} = ${f(Qp)} ks.`};
  }
  function vyuziti(){
    if(Math.random()<.5){const Tp=rs(100,800,1)*10,Vp=rs(2,90,1)/1,Ts=Math.round(Tp*(0.8+Math.random()*0.18)),ki=rs(75,99,1)/100,Qs=Math.round(Ts*Vp*ki);const ke=Ts/Tp,kii=Qs/Ts/Vp,kc=Qs/(Tp*Vp);
      return {q:`Využitelný fond ${f(Tp)} h, kapacitní výkon ${f(Vp)} ks/h. Stroj skutečně pracoval ${f(Ts)} h a vyrobil ${f(Qs)} ks. Urči extenzivní, intenzivní a celkové využití.`,
        fields:[N('k<sub>e</sub> (%):',ke*100,{tol:0.1}),N('k<sub>i</sub> (%):',kii*100,{tol:0.1}),N('k<sub>c</sub> (%):',kc*100,{tol:0.1})],
        sol:`k<sub>e</sub> = T<sub>s</sub>/T<sub>p</sub> = ${pct(ke)}. V<sub>s</sub> = Q<sub>s</sub>/T<sub>s</sub> = ${f(Qs/Ts)} ks/h, k<sub>i</sub> = V<sub>s</sub>/V<sub>p</sub> = ${pct(kii)}. k<sub>c</sub> = k<sub>e</sub>·k<sub>i</sub> = Q<sub>s</sub>/Q<sub>p</sub> = ${pct(kc)}.`};}
    const Tp=rs(10,40,1)*100,Vp=rs(5,40,1),kc=rs(70,90,1)/100,ke=rs(Math.ceil(kc*100)+1,99,1)/100;const Ts=Tp*ke,ki=kc/ke,Vs=Vp*ki,Qs=Tp*Vp*kc;
    return {q:`Využitelný fond stroje ${f(Tp)} h, kapacitní výkon ${Vp} ks/h. Celkové využití kapacity ${f(kc*100)} %, extenzivní využití ${f(ke*100)} %. Zjisti skutečně odpracované hodiny, intenzivní využití, skutečný hodinový výkon a počet výrobků.`,
      fields:[N('T<sub>s</sub> (h):',Ts,{tol:0.5}),N('k<sub>i</sub> (%):',ki*100,{tol:0.1}),N('V<sub>s</sub> (ks/h):',Vs,{tol:0.02}),N('Q<sub>s</sub> (ks):',Qs,{tol:1})],
      sol:`T<sub>s</sub> = k<sub>e</sub>·T<sub>p</sub> = ${f(Ts)} h. k<sub>i</sub> = k<sub>c</sub>/k<sub>e</sub> = ${pct(ki)}. V<sub>s</sub> = k<sub>i</sub>·V<sub>p</sub> = ${f(Vs)} ks/h. Q<sub>s</sub> = k<sub>c</sub>·T<sub>p</sub>·V<sub>p</sub> = ${f(Qs)} ks.`};
  }
  function uzkeMisto(){
    const dny=pick([20,21,22]),h=8;const pr=[
      {n:'Sušárna',v:rs(40,90,5),u:'pytlů/h',ob:rs(10,20,5)},{n:'Míchárna',v:rs(30,60,1),u:'kg/min (pytel = 50 kg)',ob:0},{n:'Plnírna',v:pick([1,1.5,2]),u:'pytle/min',ob:0}];
    const cap=[];const s=pr[0];const Ts=h*dny*(1-s.ob/100);cap.push(Ts*s.v);const m=pr[1];cap.push(60*h*dny*m.v/50);const p_=pr[2];cap.push(60*h*dny*p_.v);
    const sklad=rs(40,120,1)*100;cap.unshift(sklad);const names=['Sklad','Sušárna','Míchárna','Plnírna'];const mn=Math.min(...cap),idx=cap.indexOf(mn);
    return {q:`Výroba krmiva prochází 4 pracovišti, ${dny} pracovních dní v měsíci, 8 h denně. Sklad pojme ${f(sklad)} pytlů za měsíc. Sušárna suší ${s.v} pytlů/h, ${s.ob} % doby připadá na přestávky. Míchárna zpracuje ${m.v} kg/min (pytel = 50 kg). Plnírna naplní ${f(p_.v)} pytle/min. Jaká je měsíční kapacita celé linky a kde je úzké místo?`,
      fields:[N('kapacita linky (pytlů):',mn,{tol:Math.max(1,mn*0.002)}),T('úzké místo:',names[idx].toLowerCase())],
      sol:names.map((n,i)=>`${n} ${f(cap[i])}`).join(', ')+`. Linka zvládne jen tolik, kolik nejslabší článek: <b>${names[idx]}</b> (${f(mn)} pytlů).`};
  }

  /* ---------- 6. Oběžný majetek ---------- */
  function obratZasob(){
    const base=rs(20,200,1)*1000;const st=[...Array(5)].map(()=>base+rs(-8,8,1)*Math.round(base/100));const spot=Math.round(base*(2+Math.random()*8)/10)*10;
    const avg=(st[0]/2+st[1]+st[2]+st[3]+st[4]/2)/4,PO=spot/avg,DO=360/PO,KV=avg/spot;
    return {q:`Roční spotřeba materiálu ${f(spot)} Kč. Stav zásob materiálu: 1. 1. ${f(st[0])}, 1. 4. ${f(st[1])}, 1. 7. ${f(st[2])}, 1. 10. ${f(st[3])}, 31. 12. ${f(st[4])} Kč. Rok = 360 dní.`,
      fields:[N('průměrný stav (Kč):',avg,{tol:Math.max(1,avg*0.001)}),N('počet obrátek:',PO,{tol:0.02,show:f(PO,3)}),N('doba obratu (dny):',DO,{tol:Math.max(0.2,DO*0.005)}),N('koef. vázanosti:',KV,{tol:0.0051,show:f(KV,4)})],
      sol:`Chronologický průměr: (½·${f(st[0])} + ${f(st[1])} + ${f(st[2])} + ${f(st[3])} + ½·${f(st[4])}) / 4 = ${f(avg)}. PO = spotřeba / průměr = ${f(PO,3)}. DO = 360 / PO = ${f(DO)} dne. KV = průměr / spotřeba = ${f(KV,4)} Kč na 1 Kč spotřeby.`};
  }
  function uvolneni(){
    const S=rs(2,40,1)*1000000,DO=rs(10,60,1),Z=S*DO/360,d=r(1,6);const Z2=S*(DO-d)/360;
    return {q:`Roční spotřeba materiálu ${f(S)} Kč, průměrná zásoba ${f(Z)} Kč. Kolik oběžného majetku se uvolní, zrychlí-li se obrat o ${d} dn${d===1?'en':(d<5?'y':'í')}? (rok = 360 dní)`,
      fields:[N('původní DO (dny):',DO,{tol:0.05}),N('uvolněno (Kč):',Z-Z2,{tol:Math.max(1,(Z-Z2)*0.003)})],
      sol:`DO = Z·360 / S = ${f(DO)} dne. Nová DO = ${DO-d}, nová zásoba = S·${DO-d}/360 = ${f(Z2)}. Uvolní se ${f(Z)} − ${f(Z2)} = ${f(Z-Z2)} Kč (= S/360·${d}).`};
  }
  function zasobovaci(){
    if(Math.random()<.5){const pz=rs(20,100,1)*1000,n=rs(100,300,1)*1000,auta=rs(30,70,1)*1000,ks=pick([4,5]);const kz=pz+n-auta*ks;
      return {q:`Stav plášťů na konci čtvrtletí ${f(pz)} ks, smluvené dodávky ${f(n)} ks. Plán je vyrobit ${f(auta)} aut po ${ks} pláštích. Jaká bude konečná zásoba (záporná = nedostatek)?`,
        fields:[N('KZ (ks):',kz,{tol:0.5}),T('splnitelné (ano/ne):',kz>=0?'ano':'ne')],sol:`KZ = PZ + N − S = ${f(pz)} + ${f(n)} − ${ks}·${f(auta)} = ${f(kz)} ks → ${kz>=0?'požadavek je splnitelný':'chybí '+f(-kz)+' ks, nesplnitelné'}.`};}
    const pz=rs(1,50,1)*100,n=rs(50,300,1)*100,kz=rs(1,40,1)*100;const S=pz+n-kz;
    return {q:`Počáteční zásoba ${f(pz)} tis. Kč, nakoupeno ${f(n)} tis. Kč, požadovaný konečný stav ${f(kz)} tis. Kč. Kolik je možné spotřebovat?`,fields:[N('spotřeba (tis. Kč):',S,{tol:0.5})],sol:`PZ + N = KZ + S ⇒ S = ${f(pz)} + ${f(n)} − ${f(kz)} = ${f(S)} tis. Kč.`};
  }
  function normaZasob(){
    const c=rs(4,30,2),p=r(1,6),t=r(0,20),den=rs(1,60,1),cena=rs(10,2000,10);const CN=c/2+p+t,NZ=CN*den,NT=NZ*cena;
    return {q:`Dodávkový cyklus ${c} dní, pojistná zásoba na ${p} dn${p===1?'en':(p<5?'y':'í')}, technická zásoba na ${t} dní. Průměrná denní spotřeba ${den} jednotek, cena ${f(cena)} Kč/jednotku.`,
      fields:[N('časová norma (dny):',CN,{tol:0.01}),N('norma zásob (jedn.):',NZ,{tol:0.5}),N('normativ (Kč):',NT,{tol:1})],
      sol:`ČN = ½·c + p + t = ${f(c/2)} + ${p} + ${t} = ${f(CN)} dní. NZ = ČN·denní spotřeba = ${f(NZ)}. Normativ = NZ·cena = ${f(NT)} Kč.`};
  }
  function ocp(){
    const T_=rs(5,60,1)*1000000,DOZ=rs(20,90,5),DOP=rs(10,45,5),DZ=rs(10,40,5),cena=rs(5,50,5)*100,kus=rs(5,60,5);
    const Z=T_*DOZ/360,P=T_*DOP/360,OCP=DOZ+DOP-DZ,den=cena*kus;
    return {q:`Roční tržby ${f(T_)} Kč, průměrné zásoby ${f(Z)} Kč, průměrné pohledávky ${f(P)} Kč. Dodavatelům podnik platí v průměru za ${DZ} dní. Denně vyrábí ${kus} ks, každý stojí ${f(cena)} Kč (materiál + práce). Rok = 360 dní.`,
      fields:[N('DO zásob (dny):',DOZ,{tol:0.05}),N('DO pohledávek (dny):',DOP,{tol:0.05}),N('OCP (dny):',OCP,{tol:0.05}),N('kapitálová potřeba (Kč):',OCP*den,{tol:Math.max(1,OCP*den*0.002)})],
      sol:`DO<sub>zás</sub> = Z·360/T = ${DOZ}, DO<sub>pohl</sub> = P·360/T = ${DOP}. OCP = ${DOZ} + ${DOP} − ${DZ} = ${OCP} dní. Denní potřeba ${kus}·${f(cena)} = ${f(den)} Kč, celkem ${OCP}·${f(den)} = ${f(OCP*den)} Kč.`};
  }
  function fifo(){
    const q0=rs(5,20,1)*10,p0=rs(80,120,1)*10,q1=rs(3,10,1)*10,p1=p0+rs(-15,15,1)*10,q2=rs(3,10,1)*10,p2=p1+rs(-15,15,1)*10;const out=rs(Math.ceil((q0+10)/10),Math.floor((q0+q1)/10),1)*10;
    const fifoC=Math.min(out,q0)*p0+Math.max(0,out-q0)*p1;const avg=(q0*p0+q1*p1+q2*p2)/(q0+q1+q2);
    return {q:`Na skladě ${q0} t po ${f(p0)} Kč/t. Přišly dodávky ${q1} t po ${f(p1)} Kč/t a ${q2} t po ${f(p2)} Kč/t. Poté se vydalo ${out} t.`,
      fields:[N('výdej metodou FIFO (Kč):',fifoC,{tol:1}),N('vážená průměrná cena (Kč/t):',avg,{tol:0.01}),N('výdej v průměrné ceně (Kč):',avg*out,{tol:Math.max(1,avg*out*0.001)})],
      sol:`FIFO bere nejdřív nejstarší: ${Math.min(out,q0)}·${f(p0)}${out>q0?` + ${out-q0}·${f(p1)}`:''} = ${f(fifoC)} Kč. Průměr = (${q0}·${f(p0)} + ${q1}·${f(p1)} + ${q2}·${f(p2)}) / ${q0+q1+q2} = ${f(avg)} Kč/t, výdej ${f(avg*out)} Kč. LIFO u nás zákon nepovoluje.`};
  }

  window.PEGen={r,rs,pick,shuffle,round,f,kc,pct,tbl,
    rozvahaTrideni,rozvahaDoplneni,rozvahaOperace,rozvahaSestaveni,rozvahaNetto,
    vzzSestaveni,vzzPlan,rozvahaNeboVzz,
    naklKlas,dvouObdobi,dvaRoky,nejmensiCtverce,
    bzZaklad,bzZisk,bzLimity,bzCenaZKrit,bzRentabilita,nevyuziteFN,bzRuznorodaMS,
    casoveFondy,qpVykon,qpPracnost,qpPlocha,vyuziti,uzkeMisto,
    obratZasob,uvolneni,zasobovaci,normaZasob,ocp,fifo};
})();
