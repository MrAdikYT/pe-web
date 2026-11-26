(function(){
  const G=window.PEGen;
  const {r,rs,pick,f,tbl}=G;
  const N=(label,ans,o)=>Object.assign({label,type:'num',ans,show:f(ans)},o||{});

  /* ---------- Finanční analýza ---------- */
  function faLikvidita(){
    const zas=rs(400,2000,50),poh=rs(300,1500,50),pen=rs(50,600,10),kz=rs(500,2200,50);
    const oa=zas+poh+pen;
    return {q:`Z rozvahy (tis. Kč): zásoby ${f(zas)}, krátkodobé pohledávky ${f(poh)}, peněžní prostředky ${f(pen)}, krátkodobé závazky ${f(kz)}. Spočítej čistý pracovní kapitál a tři ukazatele likvidity (na 2 desetinná místa).`,
      fields:[N('ČPK (tis. Kč):',oa-kz,{tol:0.5}),N('běžná likvidita:',oa/kz,{tol:0.01}),N('pohotová likvidita:',(oa-zas)/kz,{tol:0.01}),N('okamžitá likvidita:',pen/kz,{tol:0.01})],
      sol:`OA = ${f(zas)} + ${f(poh)} + ${f(pen)} = ${f(oa)}. ČPK = OA − KZ = ${f(oa-kz)}. Běžná = ${f(oa)} / ${f(kz)} = ${f(oa/kz)} (doporučeno 1,5–2,5). Pohotová = (${f(oa)} − ${f(zas)}) / ${f(kz)} = ${f((oa-zas)/kz)} (1–1,5). Okamžitá = ${f(pen)} / ${f(kz)} = ${f(pen/kz)} (0,2–0,5).`};
  }
  function faRentabilita(){
    const A=rs(8000,30000,500),vk=rs(Math.round(A*0.3/100)*100,Math.round(A*0.7/100)*100,100),ck=A-vk;
    const T=rs(A,A*2,500),ebit=rs(Math.round(T*0.05/10)*10,Math.round(T*0.15/10)*10,10),u=rs(Math.max(10,Math.round(ck*0.02/10)*10),Math.max(20,Math.round(ck*0.06/10)*10),10);
    const dan=pick([0.19,0.21]),ebt=ebit-u,cz=ebt*(1-dan);
    return {q:`Aktiva celkem ${f(A)} tis. Kč, z toho vlastní kapitál ${f(vk)} a cizí kapitál ${f(ck)} tis. Kč. Tržby ${f(T)} tis. Kč, EBIT ${f(ebit)} tis. Kč, nákladové úroky ${f(u)} tis. Kč, daň ${f(dan*100)} %. Ukazatele zapiš v %.`,
      fields:[N('čistý zisk (tis. Kč):',cz,{tol:0.5}),N('ROA = EBIT / A (%):',ebit/A*100,{tol:0.05}),N('ROE = ČZ / VK (%):',cz/vk*100,{tol:0.05}),N('ROS = ČZ / T (%):',cz/T*100,{tol:0.05}),N('celková zadluženost (%):',ck/A*100,{tol:0.05}),N('úrokové krytí (%):',ebit/u*100,{tol:0.5})],
      sol:`Zisk před zdaněním = ${f(ebit)} − ${f(u)} = ${f(ebt)}, čistý zisk = ${f(ebt)}·${f(1-dan)} = ${f(cz)}. ROA = ${f(ebit)}/${f(A)} = ${f(ebit/A*100)} %. ROE = ${f(cz)}/${f(vk)} = ${f(cz/vk*100)} %. ROS = ${f(cz)}/${f(T)} = ${f(cz/T*100)} %. Zadluženost = CK/A = ${f(ck/A*100)} %. Úrokové krytí = EBIT/úroky = ${f(ebit/u*100)} % (doporučeno 200–300 %).`};
  }

  /* ---------- Odpisy ---------- */
  const SK={1:{n:3,r1:20,r2:40,k1:3,k2:4,ex:'počítač'},2:{n:5,r1:11,r2:22.25,k1:5,k2:6,ex:'osobní automobil'},3:{n:10,r1:5.5,r2:10.5,k1:10,k2:11,ex:'výrobní stroj'}};
  function odpisy(){
    const s=pick([1,2,2,3]),k=SK[s],vc=rs(100000,1500000,10000),zr=Math.random()<0.5;
    if(!zr){const o1=vc*k.r1/100,o2=vc*k.r2/100;
      return {q:`Firma pořídila ${k.ex} (odpisová skupina ${s}, ${k.n} let) za ${f(vc)} Kč a odepisuje ho <b>rovnoměrně</b>. Sazby: 1. rok ${f(k.r1)} %, další roky ${f(k.r2)} %. Urči odpis v 1. a 2. roce a zůstatkovou cenu po 2. roce.`,
        fields:[N('odpis 1. rok (Kč):',o1,{tol:1}),N('odpis 2. rok (Kč):',o2,{tol:1}),N('zůstatková cena (Kč):',vc-o1-o2,{tol:2})],
        sol:`1. rok: ${f(vc)}·${f(k.r1)} % = ${f(o1)} Kč. 2. rok: ${f(vc)}·${f(k.r2)} % = ${f(o2)} Kč. ZC = ${f(vc)} − ${f(o1)} − ${f(o2)} = ${f(vc-o1-o2)} Kč.`};}
    const o1=vc/k.k1,zc1=vc-o1,o2=2*zc1/(k.k2-1),zc2=zc1-o2;
    return {q:`Firma pořídila ${k.ex} (odpisová skupina ${s}) za ${f(vc)} Kč a odepisuje ho <b>zrychleně</b>. Koeficienty: 1. rok ${k.k1}, další roky ${k.k2}. Urči odpis v 1. a 2. roce a zůstatkovou cenu po 2. roce.`,
      fields:[N('odpis 1. rok (Kč):',o1,{tol:1}),N('odpis 2. rok (Kč):',o2,{tol:1}),N('zůstatková cena (Kč):',zc2,{tol:2})],
      sol:`1. rok: VC / k<sub>1</sub> = ${f(vc)} / ${k.k1} = ${f(o1)} Kč, ZC = ${f(zc1)}. 2. rok: 2·ZC / (k<sub>2</sub> − počet let již odepsaných) = 2·${f(zc1)} / (${k.k2} − 1) = ${f(o2)} Kč. ZC = ${f(zc2)} Kč.`};
  }

  /* ---------- Provozní páka ---------- */
  function provozniPaka(){
    const p=rs(80,400,5),vn=rs(Math.round(p*0.4),Math.round(p*0.75),1),q=rs(5000,40000,500);
    let FN=rs(Math.round((p-vn)*q*0.3/1000)*1000,Math.round((p-vn)*q*0.75/1000)*1000,1000);
    const PU=(p-vn)*q,E=PU-FN,spp=PU/E,ch=pick([2,5,10]);
    return {q:`Cena ${f(p)} Kč/ks, variabilní náklady ${f(vn)} Kč/ks, fixní náklady ${f(FN)} Kč, prodej ${f(q)} ks. Spočítej příspěvek na úhradu, EBIT a stupeň provozní páky. O kolik % se změní EBIT, vzrostou-li tržby o ${ch} %?`,
      fields:[N('příspěvek na úhradu (Kč):',PU,{tol:1}),N('EBIT (Kč):',E,{tol:1}),N('stupeň provozní páky:',spp,{tol:0.01}),N('změna EBIT (%):',spp*ch,{tol:0.05})],
      sol:`PÚ = (p − vn)·q = ${f(p-vn)}·${f(q)} = ${f(PU)} Kč. EBIT = PÚ − FN = ${f(E)} Kč. SPP = PÚ / EBIT = ${f(spp)}. Tržby +${ch} % ⇒ EBIT +${f(spp)}·${ch} = ${f(spp*ch)} %.`};
  }

  /* ---------- Výroba ---------- */
  function vyrobniDavka(){
    const Q=rs(2000,60000,500),Nd=rs(500,8000,100),Ns=rs(2,40,1),opt=Math.sqrt(2*Q*Nd/Ns);
    const min=pick([420,450,480]),ks=rs(40,400,5);
    return {q:`a) Plánovaná roční výroba ${f(Q)} ks, náklady na přípravu a seřízení jedné dávky ${f(Nd)} Kč, náklady na skladování ${f(Ns)} Kč na kus. Jaká je optimální výrobní dávka? b) Linka běží ${min} minut za směnu a vyrobí ${ks} výrobků. Jaký je výrobní takt?`,
      fields:[N('VD<sub>opt</sub> (ks):',opt,{tol:Math.max(1,opt*0.005)}),N('výrobní takt (min):',min/ks,{tol:0.01})],
      sol:`VD<sub>opt</sub> = √(2·Q·N<sub>d</sub> / N<sub>s</sub>) = √(2·${f(Q)}·${f(Nd)} / ${f(Ns)}) = ${f(opt)} ks. Takt = čas chodu / počet výrobků = ${min} / ${ks} = ${f(min/ks)} min.`};
  }

  /* ---------- Nákup ---------- */
  function planNakupu(){
    const M=rs(2000,50000,100),Zp=rs(Math.round(M*0.05/10)*10,Math.round(M*0.2/10)*10,10),Zo=rs(Math.round(M*0.05/10)*10,Math.round(M*0.3/10)*10,10),j=pick(['t','ks','m²']);
    return {q:`Plánovaná spotřeba materiálu na čtvrtletí ${f(M)} ${j}, pojistná zásoba ${f(Zp)} ${j}, očekávaná zásoba na skladě (skladová dispozice) ${f(Zo)} ${j}. Kolik je třeba objednat?`,
      fields:[N(`potřeba dodávek (${j}):`,M+Zp-Zo,{tol:0.5})],
      sol:`Bilanční rovnice: D<sub>o</sub> + Z<sub>o</sub> = M + Z<sub>p</sub> ⇒ D<sub>o</sub> = ${f(M)} + ${f(Zp)} − ${f(Zo)} = ${f(M+Zp-Zo)} ${j}.`};
  }

  Object.assign(G,{faLikvidita,faRentabilita,odpisy,provozniPaka,vyrobniDavka,planNakupu});
})();
