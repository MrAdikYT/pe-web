(function(){
  /* Okruhy podle přednášek; každá otázka: q, a (správná je první), why */
  const T={
    zaklady:'Vstup do podnikové ekonomiky',majetek:'Majetek, kapitál, odpisy',naklady:'Náklady, výnosy, kalkulace',
    typologie:'Typologie, okolí, životní cyklus',strategie:'Strategické řízení',finance:'Finanční řízení',
    kvalita:'Kvalita a zákazník',vyroba:'Výroba',marketing:'Marketing',nakup:'Nákup',organizace:'Organizační struktury',lidske:'Lidské zdroje'
  };
  const B={
  zaklady:[
    ['Ekonomie je:',['věda o tom, jak hospodářství funguje','skutečné hospodářství určitého státu','hospodaření jednoho konkrétního podniku'],'Ekonomie je teorie, ekonomika je praxe (samotné hospodářství).'],
    ['Tři roviny pojmu ekonomika jsou:',['hospodářství, hospodaření, hospodárnost','výroba, obchod a poskytování služeb','mikroekonomie, makroekonomie, mezo'],'Hospodářství = soubor VF, hospodaření = činnosti, hospodárnost = maximální efekt.'],
    ['Německý proud podnikové ekonomiky se ptá hlavně:',['Jak ekonomicky funguje podnik?','Jak podnik efektivně řídit?','Jak prodat co nejvíc výrobků?'],'Německý proud je teoreticko-systémový, angloamerický prakticko-manažerský.'],
    ['Existenci fixních a variabilních nákladů zdůvodnil:',['Eugen Schmalenbach','Frederick W. Taylor','Peter F. Drucker'],'Schmalenbach, německá škola, 1. polovina 20. století.'],
    ['Zakladatelem vědeckého řízení je:',['Frederick W. Taylor','Elton Mayo','Erich Gutenberg'],'Taylor: racionalizace práce a zvyšování efektivity.'],
    ['Řízení podle cílů (MBO) je myšlenka:',['Petera F. Druckera','Henryho Forda','Michaela Portera'],'Drucker je nejvýznamnější teoretik moderního managementu.'],
    ['Školu lidských vztahů (human relations) založil:',['Elton Mayo','Henry Ford','Günther Wöhe'],'Mayo zdůraznil sociální aspekty práce.'],
    ['Mezi systémově indiferentní (obecné) znaky podniku patří:',['princip hospodárnosti','princip soukromého vlastnictví','princip autonomie'],'Obecné: kombinace VF, hospodárnost, finanční rovnováha. Specifické: ziskovost, soukromé vlastnictví, autonomie.'],
    ['Princip ziskovosti je znak podniku:',['systémově podmíněný (specifický)','systémově indiferentní (obecný)','platný jen u státních podniků'],'Ziskovost, soukromé vlastnictví a autonomie jsou systémově podmíněné.'],
    ['Podle § 502 občanského zákoníku je podnik:',['organizovaný soubor jmění podnikatele','skupina lidí se společným cílem','chráněný název zapsaný v rejstříku'],'Podnik je věc hromadná: majetek i dluhy sloužící k podnikání.'],
    ['Firma je z právního pohledu:',['chráněný název zapsaný v obchodním rejstříku','soubor jmění sloužící k podnikání','skupina lidí se společnými cíli'],'Ekonomicky je firma podnikatelský subjekt, právně jeho název.'],
    ['Snižování mzdových nákladů a nábor nových lidí jsou cíle:',['protikladné (diskrepantní)','komplementární (harmonické)','indiferentní (neutrální)'],'Jeden cíl jde proti druhému.'],
    ['Snížení celkových nákladů a zvýšení zisku jsou cíle:',['komplementární (harmonické)','protikladné (diskrepantní)','indiferentní (neutrální)'],'Splnění jednoho pomáhá druhému.'],
    ['Dobře stanovený cíl musí být:',['SMART','SWOT','PEST'],'Specifický, měřitelný, dosažitelný, relevantní, časově vymezený.'],
    ['Zkratka ESG znamená:',['životní prostředí, sociální oblast, řízení','ekonomika, strategie a hospodářský růst','efektivnost, spokojenost, globalizace'],'Environmental, Social, Governance.'],
    ['Podnikatel – fyzická osoba za závazky z podnikání:',['odpovídá celým svým majetkem','ručí do výše nesplaceného vkladu','neručí, ručí jen jeho podnik'],'„Odpovídá“ je tvrdší než „ručí“.'],
    ['Řídící práce je podle Wöheho výrobní faktor:',['dispozitivní','elementární','národohospodářský'],'Elementární: výkonná práce, dlouhodobý majetek, materiál.'],
    ['Odolnost podniku znamená schopnost:',['předvídat rizika a rychle se zotavit','vždy dosáhnout maximálního zisku','nikdy nemuset měnit strategii'],'Předvídat, připravit se, zvládnout krizi, pokračovat, zotavit se.']
  ],
  majetek:[
    ['Rozvaha podává přehled o:',['finanční pozici podniku k určitému dni','výkonnosti podniku za celé období','pohybu peněz během účetního období'],'Výkonnost ukazuje výsledovka, pohyb peněz cash flow.'],
    ['Rozvaha sestavená k 1. dni účetního období je:',['počáteční','zahajovací','mimořádná'],'Zahajovací se sestavuje při vzniku podniku.'],
    ['Rozvaha sestavená při likvidaci nebo přeměně podniku je:',['mimořádná','konečná','zahajovací'],'Mimořádná rozvaha je k jinému než běžnému okamžiku.'],
    ['Hmotný majetek je dlouhodobý při ceně nad 80 000 Kč a použitelnosti:',['delší než 1 rok','delší než 3 roky','delší než 5 let'],'Nad 80 000 Kč a provozně-technické funkce déle než rok.'],
    ['Stroj funguje, ale technologicky zastaral. Jde o opotřebení:',['morální','fyzické','ekonomické'],'Fyzické = skutečné zhoršení, ekonomické = pokles užitečnosti vlivem okolí.'],
    ['Osobní automobil patří do odpisové skupiny:',['2 (5 let)','1 (3 roky)','3 (10 let)'],'Skupina 1 počítače, 2 auta a nábytek, 3 stroje a výtahy.'],
    ['Při zrychleném odpisování se ve 2. a dalších letech vychází ze:',['zůstatkové ceny','vstupní ceny','reprodukční ceny'],'Odpis = 2·ZC / (k₂ − počet let odepisování).'],
    ['Neodepisuje se:',['pozemek','software','nákladní auto'],'Neodepisují se pozemky, umělecká díla, sbírky, povolenky na emise.'],
    ['Nehmotný majetek pořízený od 1. 1. 2021 se pro daň odepisuje:',['účetními odpisy','daňovými odpisy podle skupin','vůbec, celý jde hned do nákladů'],'Daňovým odpisem se stává přímo účetní odpis.'],
    ['Čistý pracovní kapitál je:',['oběžná aktiva − krátkodobé závazky','zásoby + krátkodobé pohledávky','vlastní kapitál − stálá aktiva'],'Volný oběžný majetek pro rozvoj podniku.'],
    ['Nefinanční pracovní kapitál je:',['zásoby + pohledávky','oběžná aktiva − závazky','peníze + ceniny'],'Pracovní kapitál bez peněz.'],
    ['Emisní ážio je:',['rozdíl emisního kurzu a nominální hodnoty akcie','zisk vyplacený akcionářům jako dividenda','úrok z vydaných dluhopisů'],'Akcie za 1 000 Kč prodaná za 1 200 Kč: ážio 200 Kč.'],
    ['Zlaté bilanční pravidlo říká, že:',['dlouhodobý majetek se kryje dlouhodobými zdroji','vlastní kapitál se rovná cizímu kapitálu','oběžná aktiva jsou dvojnásobkem závazků'],'Časové sladění aktiv a pasiv.'],
    ['Pravidlo vyrovnání rizika (1 : 1) říká, že:',['vlastního kapitálu má být tolik jako cizího','VK má krýt jen dlouhodobý majetek','investice nemají růst rychleji než tržby'],'Pari pravidlo: VK jen na dlouhodobý majetek. Růstové pravidlo: investice a tržby.'],
    ['Pravidlo dva ku jedné říká, že:',['OA jsou aspoň 2× větší než krátkodobé závazky','VK je dvakrát větší než cizí kapitál','tržby rostou 2× rychleji než investice'],'Oběžný majetek ≥ 2 × krátkodobé cizí zdroje.'],
    ['Překapitalizovaný podnik má:',['málo cizích zdrojů a nižší výnosnost VK','málo vlastních zdrojů a riziko insolvence','stejně vlastních i cizích zdrojů'],'Je stabilní, ale vlastní kapitál vydělává méně.'],
    ['Investiční cash flow zachycuje hlavně:',['nákup a prodej dlouhodobého majetku','splácení úvěrů a vydávání dluhopisů','příjmy z prodeje výrobků a služeb'],'Splácení úvěrů je finanční, prodej výrobků provozní cash flow.'],
    ['Solventnost znamená, že podnik:',['dlouhodobě dostojí svým závazkům','včas zaplatí krátkodobé závazky','vytváří zisk'],'Včasné placení krátkodobých závazků je likvidita.'],
    ['Termínovaný vklad na 2 roky je:',['dlouhodobý finanční majetek','krátkodobý finanční majetek','pohledávka za odběratelem'],'Dlouhodobý finanční majetek: vše delší než 1 rok.'],
    ['Přehled o změnách vlastního kapitálu:',['vysvětluje, proč se VK změnil','ukazuje, kolik VK podnik má','zachycuje příjmy a výdaje'],'Kolik VK podnik má, ukazuje rozvaha.']
  ],
  naklady:[
    ['Náklad je:',['peněžně vyjádřená spotřeba výrobních faktorů','každý úbytek peněz z bankovního účtu','peníze přijaté za prodané výrobky'],'Úbytek peněz bez ohledu na účel je výdaj.'],
    ['Odpis stroje je:',['náklad, ale ne výdaj','výdaj, ale ne náklad','výdaj i náklad zároveň'],'Peníze odešly už při nákupu stroje.'],
    ['Prodej výrobků na fakturu je:',['výnos bez okamžitého příjmu','příjem bez výnosu','výnos i příjem zároveň'],'Vznikne pohledávka, peníze přijdou později.'],
    ['Implicitní náklady jsou:',['náklady obětované příležitosti','platby za materiál a mzdy','náklady na opravy strojů'],'Například ušlá mzda podnikatele nebo úroky z vlastního kapitálu.'],
    ['Zisk jako kritérium pro rozhodování o investicích plní funkci:',['rozhodovací','rozdělovací','stimulační'],'Funkce zisku: kriteriální, rozdělovací, rozhodovací, stimulační.'],
    ['Odvod části zisku státu jako daně souvisí s funkcí zisku:',['rozdělovací','kriteriální','rozhodovací'],'Zisk je základem rozdělování mezi podnik a stát.'],
    ['Druhové členění nákladů odpovídá na otázku:',['co bylo spotřebováno','na co se náklad vynaložil','kde náklad vznikl'],'Spotřeba materiálu, energie, služby, osobní náklady, odpisy…'],
    ['Náklady, které lze přímo přiřadit jednomu výrobku, jsou:',['přímé (jednicové)','nepřímé (režijní)','fixní'],'Režijní jsou společné pro více výkonů.'],
    ['Pojištění auta při volbě „auto, nebo vlak“ je náklad:',['irelevantní','relevantní','variabilní'],'Platí se v obou variantách, rozhodnutí neovlivní.'],
    ['Mzdy za přesčasy při zvýšení výroby jsou příklad nákladů:',['nadproporcionálních','podproporcionálních','fixních'],'Rostou rychleji než objem výroby.'],
    ['Množstevní slevy u dodavatelů způsobí, že variabilní náklady jsou:',['podproporcionální','nadproporcionální','fixní'],'Na jednotku produkce klesají.'],
    ['V dlouhém období jsou:',['všechny náklady variabilní','všechny náklady fixní','fixní jen odpisy budov'],'Firma může změnit všechny výrobní faktory.'],
    ['Mezi předpoklady analýzy bodu zvratu patří:',['stejnorodá produkce a stálé FN','různorodá produkce a proměnlivé FN','nadproporcionální variabilní náklady'],'Dále proporcionální VN a kontinuální výroba.'],
    ['Stupeň provozní páky je 2, tržby vzrostou o 5 %. EBIT vzroste o:',['10 %','5 %','2,5 %'],'SPP = % změna EBIT / % změna tržeb.'],
    ['Stupeň provozní páky se počítá jako:',['příspěvek na úhradu / EBIT','EBIT / příspěvek na úhradu','tržby / variabilní náklady'],'SPP = (T − VN) / EBIT.'],
    ['Vysoký podíl fixních nákladů (automatizace) znamená:',['vyšší bod zvratu a vyšší riziko','nižší bod zvratu a nižší riziko','žádný vliv na citlivost zisku'],'Malá změna tržeb vyvolá velkou změnu zisku.'],
    ['Vlastní náklady výroby jsou přímé náklady plus:',['výrobní režie','správní režie','odbytové náklady'],'Pak + správní režie = vlastní náklady výkonu, + odbytové = úplné vlastní náklady.'],
    ['V kalkulačním vzorci se výrobní cena získá jako:',['úplné vlastní náklady + zisk','vlastní náklady výroby + odbyt','přímý materiál + přímé mzdy'],'Po přirážkách a srážkách obchodu vznikne prodejní cena.'],
    ['Kalkulace sestavená po provedení výkonu kvůli kontrole je:',['výsledná','předběžná','cenová'],'Předběžná se dělá před zahájením výroby.'],
    ['Rozpočet je:',['věcný plán vyjádřený v číslech','seznam nákladů na kalkulační jednici','norma spotřeby materiálu na kus'],'Nástroj plánování, kontroly a motivace.'],
    ['Kalkulační jednice je:',['výkon vymezený druhem a množstvím','středisko, kde náklad vznikl','sazba režijní přirážky'],'Například 1 ks, 100 m látky, 1 hodina opravy, 1 tkm.'],
    ['Manažerské účetnictví je zaměřeno na:',['přítomnost a budoucnost','jen na minulost','daňové povinnosti'],'Slouží vedení k rozhodování a plánování.'],
    ['Technicko-hospodářské normy jsou:',['kvantitativní požadavky na využití zdrojů','zákonné normy kvality výrobků','pravidla pro sestavení rozvahy'],'Normy spotřeby materiálu, energie, práce, využití strojů…']
  ],
  typologie:[
    ['Mezi státní podniky patří například:',['Česká pošta','Škoda Auto','McDonald’s'],'Česká pošta je státní podnik (s. p.).'],
    ['Podle EU má střední podnik:',['50–249 zaměstnanců','10–49 zaměstnanců','250 a více zaměstnanců'],'Mikro < 10, malý 10–49, střední 50–249, velký 250+.'],
    ['Mikropodnik má podle EU:',['méně než 10 zaměstnanců','méně než 50 zaměstnanců','méně než 100 zaměstnanců'],'A obrat i bilanční sumu do 2 mil. €.'],
    ['Podnik je podle EU nezávislý, nemá-li v jiném podniku podíl:',['25 % a více','10 % a více','50 % a více'],'A sám není z 25 % a více vlastněn jiným podnikem.'],
    ['Minimální vklad do s. r. o. je:',['1 Kč','200 000 Kč','2 000 000 Kč'],'Společníci ručí do výše nesplacených vkladů.'],
    ['Základní kapitál akciové společnosti je nejméně:',['2 000 000 Kč nebo 80 000 €','1 Kč','120 000 €'],'120 000 € je minimum evropské společnosti (SE).'],
    ['Komanditista ručí:',['do výše nesplaceného vkladu','celým svým majetkem','vůbec neručí'],'Komplementář ručí neomezeně.'],
    ['Společníci veřejné obchodní společnosti ručí:',['neomezeně, i osobním majetkem','do výše nesplacených vkladů','vůbec neručí'],'V. o. s. zakládají aspoň 2 osoby.'],
    ['Družstvo musí mít aspoň:',['3 členy','1 člena','2 členy'],'Družstvo ručí neomezeně, členové neručí.'],
    ['Evropská společnost (SE) má základní kapitál nejméně:',['120 000 €','80 000 €','25 000 €'],'Řídí se zákonem č. 627/2004 Sb.'],
    ['Vliv okolí na podnik je obecně:',['silný, vliv podniku na okolí slabý','slabý, vliv podniku na okolí silný','stejně silný oběma směry'],'Okolí je zdroj příležitostí, omezení a hrozeb.'],
    ['PEST analýza zkoumá:',['makrookolí podniku','vnitřní zdroje podniku','konkurenci v odvětví'],'Politické, ekonomické, sociální a technologické faktory.'],
    ['Porterův model 5 sil analyzuje:',['mikrookolí (odvětví)','makrookolí (PEST)','vnitřní procesy podniku'],'Konkurence, noví konkurenti, substituty, dodavatelé, odběratelé.'],
    ['SWOT analýza posuzuje:',['vnitřní i vnější okolí podniku','jen vnější okolí podniku','jen vnitřní zdroje podniku'],'Silné a slabé stránky uvnitř, příležitosti a hrozby venku.'],
    ['Metoda VRIO hodnotí zdroje podle:',['hodnoty, vzácnosti, nenapodobitelnosti, organizace','politiky, ekonomiky, společnosti, technologie','silných a slabých stránek, příležitostí, hrozeb'],'Hledá udržitelnou konkurenční výhodu.'],
    ['Do primárních činností hodnotového řetězce patří:',['výstupní logistika','řízení lidských zdrojů','technologický rozvoj'],'Primární: vstupní logistika, výroba, výstupní logistika, marketing a prodej, servis.'],
    ['Účetnictví a daně jsou z pohledu hodnoty pro zákazníka:',['nutné plýtvání (Muda 1)','čisté plýtvání (Muda 2)','činnost přidávající hodnotu'],'Nepřidávají hodnotu, ale zákon je vyžaduje.'],
    ['Opravy zmetků, čekání a nadvýroba jsou:',['čisté plýtvání (Muda 2)','nutné plýtvání (Muda 1)','podpůrné činnosti'],'Tyto činnosti má firma odstranit.'],
    ['Hladová trasa je typická pro fázi:',['založení','zralosti','krize'],'Zisk zatím není, náklady na zavedení jsou vysoké.'],
    ['Klíčovým měřítkem růstu podniku je:',['tempo růstu tržeb','počet zaměstnanců','výše základního kapitálu'],'Klíčovým problémem je vhodné tempo růstu.'],
    ['Sanace podniku je:',['soubor opatření k ozdravení podniku','výmaz podniku z obchodního rejstříku','prodej majetku ve prospěch věřitelů'],'Hledají se zdravé části schopné přežít.'],
    ['Způsob řešení úpadku, kdy podnik dál funguje, je:',['reorganizace','konkurs','oddlužení'],'Konkurs je likvidační, oddlužení je pro fyzické osoby.'],
    ['Reorganizace je přípustná při obratu aspoň:',['50 mil. Kč nebo 50 zaměstnancích','2 mil. Kč nebo 10 zaměstnancích','1 mld. Kč nebo 250 zaměstnancích'],'Insolvenční zákon č. 182/2006 Sb.'],
    ['Společnost zaniká:',['výmazem z veřejného rejstříku','rozhodnutím o zrušení','prohlášením konkurzu'],'Zrušení je rozhodnutí, zánik nastává výmazem.'],
    ['V podnikatelském záměru má vlastní kapitál krýt aspoň:',['20–25 %','5–10 %','50–60 %'],'Zapojení cizího kapitálu zvyšuje riziko projektu.']
  ],
  strategie:[
    ['Slovo strategie pochází z řeckého strategos, což znamená:',['generál','plán','cíl'],'Strategos (generál) + agein (vést).'],
    ['Analytický (plánovací) přístup ke strategii se hodí pro:',['stabilní, predikovatelné prostředí','rychle se měnící trhy','řešení náhlé jednorázové krize'],'Je top-down a pomalu reaguje na změny.'],
    ['Emergentní přístup znamená, že strategie:',['vzniká postupně z praxe a změn','se určí shora po důkladné analýze','se řeší jen jednorázově'],'Je flexibilní, ale hůř koordinovaná.'],
    ['Mintzbergovo 5P tvoří:',['plan, ploy, pattern, position, perspective','product, price, place, promotion, people','plan, process, people, profit, power'],'Strategie jako plán, manévr, vzor, pozice a perspektiva.'],
    ['Ploy jako strategie znamená:',['manévr, jak přelstít konkurenta','dlouhodobou vizi celé organizace','pozici podniku v jeho prostředí'],'Být o krok napřed.'],
    ['Strategie podnikatelského juda (Drucker) je:',['využití šance, kterou přehlédla dominantní firma','obsazení niky a postavení bariéry vstupu','být první a ovládnout zcela nový trh'],'Je to nejméně riziková Druckerova strategie.'],
    ['Strategie mýtné závory spočívá v tom, že firma:',['obsadí segment a postaví bariéru vstupu','napodobí lepšího konkurenta','prodává pod cenou konkurence'],'Například patentová ochrana.'],
    ['Vize odpovídá na otázku:',['kam chceme organizaci dovést','proč organizace existuje','jakými zásadami se řídíme'],'Proč existuje = poslání, zásady = hodnoty.'],
    ['Poslání (mise) vymezuje:',['účel a smysl existence podniku','kam chce podnik v budoucnu dojít','finanční plán na příští rok'],'Kam dojít = vize.'],
    ['Metoda 4C pomáhá rozhodnout:',['mezi globální a lokální strategií','o výši ceny nového výrobku','o typu organizační struktury'],'Customers, Country, Costs, Competitors.'],
    ['Model 7S slouží k analýze:',['vnitřního prostředí firmy','makrookolí podniku','konkurenčních sil v odvětví'],'Strategie, struktura, systémy, styl, spolupracovníci, schopnosti, sdílené hodnoty.'],
    ['V BCG matici je produkt s velkým podílem na pomalu rostoucím trhu:',['dojná kráva','hvězda','otazník'],'Přináší vysoké zisky, financuje nové aktivity.'],
    ['Otazník v BCG matici je produkt:',['ve fázi zavádění, finančně náročný','s vysokým ziskem a velkým podílem','na konci své komerční dráhy'],'Konec dráhy = bídný pes.'],
    ['Benchmarking je:',['srovnávání s lídry v oboru','analýza makrookolí podniku','plánování výrobních kapacit'],'Poznat sebe, poznat nejlepší, převzít to nejlepší.'],
    ['Porterova strategie odlišení (diferenciace) staví na:',['jedinečnosti výrobku nebo služby','co nejnižších nákladech','úzkém segmentu trhu'],'Další dvě generické strategie: nízké náklady a fokus.'],
    ['Balanced Scorecard je nástroj pro:',['implementaci strategie přes 4 perspektivy','analýzu makrookolí podniku','výběr a hodnocení dodavatelů'],'Kaplan a Norton, systém vyvážených ukazatelů.'],
    ['Strategická mezera je rozdíl mezi:',['požadovanou a skutečnou výkonností','tržbami a celkovými náklady','vizí a posláním podniku'],'Vyhodnocuje se při realizaci strategie.'],
    ['Styl vedení, kdy vedoucí přenechává odpovědnost druhým, je:',['liberální','direktivní','participativní'],'Direktivní do všeho zasahuje, participativní rozvíjí týmovou práci.'],
    ['Nepravé strategické řízení znamená, že podnik:',['získává výhodu lepší funkčností v soutěži','získává výhodu na úkor jiných subjektů','vůbec strategii neplánuje'],'Pravé strategické řízení je typické pro armádu.'],
    ['Nejsložitější fází strategického řízení je:',['implementace strategie','formulace vize','strategická analýza'],'Neexistuje pro ni jednotný postup.'],
    ['Interní audit:',['přezkoumává platnost a spolehlivost činností','sestavuje finanční plán podniku','řídí podnik místo vedení'],'Provádí ho nezávislý kvalifikovaný auditor.']
  ],
  finance:[
    ['Finanční řízení usiluje hlavně o:',['maximalizaci tržní hodnoty podniku','co nejvyšší počet zaměstnanců','co nejnižší základní kapitál'],'Získává peníze, umisťuje je do majetku s cílem růstu hodnoty.'],
    ['Mezi interní zdroje financování patří:',['odpisy','bankovní úvěry','vydané dluhopisy'],'Interní: zisk, fondy ze zisku, odpisy.'],
    ['Finanční leasing znamená, že majetek:',['po splacení odkoupíme za zůstatkovou cenu','po skončení nájmu vrátíme','vlastníme hned od prvního dne'],'Vrácení po skončení nájmu = operativní leasing.'],
    ['Faktoring je odkup pohledávek se splatností:',['30 až 120 dní','delší než 120 dní','delší než 5 let'],'Delší splatnost = forfaiting.'],
    ['Likvidnost je:',['schopnost přeměnit aktivum na peníze','schopnost banky vyplácet vklady','poměr zisku a vloženého kapitálu'],'Likvidita = schopnost platit závazky.'],
    ['Princip čisté současné hodnoty říká:',['investovat jen do činností s kladnou ČSH','investovat jen z vlastního kapitálu','diskontovat jen budoucí příjmy'],'ČSH = diskontované příjmy − výdaje.'],
    ['Diskontování je:',['přepočet budoucích cash flow na současnou hodnotu','sleva z ceny za rychlou platbu','odkup pohledávek před splatností'],'Respektuje faktor času.'],
    ['Za větší riziko se při finančním rozhodování požaduje:',['vyšší výnos','nižší výnos','stejný výnos'],'Preferuje se menší riziko a dřívější peníze.'],
    ['Agresivní strategie financování:',['kryje i trvalá OA krátkodobými zdroji','kryje trvalá OA dlouhodobými zdroji','kryje vše jen vlastním kapitálem'],'Levnější, ale rizikovější. ČPK je menší než trvalá OA.'],
    ['Horizontální analýza sleduje:',['vývoj položek v čase','podíl položek na celku','poměr dvou různých položek'],'Podíl na celku = vertikální analýza.'],
    ['Ve vertikální analýze výsledovky tvoří 100 %:',['tržby','aktiva celkem','vlastní kapitál'],'V rozvaze tvoří 100 % aktiva (pasiva) celkem.'],
    ['Pohotová likvidita se počítá jako:',['(OA − zásoby) / krátkodobé závazky','OA / krátkodobé závazky','finanční majetek / krátkodobé závazky'],'Zásoby jsou nejméně likvidní.'],
    ['Doporučená okamžitá likvidita je:',['0,2 až 0,5','1 až 1,5','1,8 až 2,5'],'Pohotová 1–1,5, běžná 1,5 až 2,5.'],
    ['ROE se počítá jako:',['čistý zisk / vlastní kapitál','EBIT / celková aktiva','čistý zisk / tržby'],'EBIT/A = ROA, ČZ/T = ROS.'],
    ['EBIT je zisk:',['před odečtením úroků a daní','po zdanění','po výplatě dividend'],'Earnings Before Interest and Taxes.'],
    ['Úrokové krytí 100 % znamená, že:',['celý zisk (EBIT) padne na úroky','podnik nemá žádné úroky','úroky jsou poloviční než EBIT'],'Doporučeno 200–300 %.'],
    ['Cizí zdroje by podle koeficientu zadluženosti neměly překročit:',['1,5násobek vlastního kapitálu','polovinu vlastního kapitálu','desetinásobek vlastního kapitálu'],'Koeficient zadluženosti = CK / VK.'],
    ['Finanční páka zvyšuje ROE, když:',['úroková míra je nižší než výnosnost aktiv','úroková míra je vyšší než výnosnost aktiv','podnik nemá žádný cizí kapitál'],'Levný cizí kapitál zvedá výnosnost vlastního.'],
    ['Daňový štít znamená, že úroky z úvěru:',['snižují základ daně','zvyšují daň z příjmů','se platí až ze zisku po zdanění'],'Úroky jsou náklad, snižují zdanitelný zisk.'],
    ['Altmanovo Z-score je model:',['bankrotní','bonitní','tržní hodnoty'],'Bankrotní: Altman, Taffler. Bonitní: Kralickův quicktest, index bonity.'],
    ['Index IN05 manželů Neumaierových je:',['český model s bonitními i bankrotními prvky','americký čistě bankrotní model','ukazatel tržní hodnoty akcie'],'Kombinuje oba přístupy.'],
    ['Bonitní modely hodnotí hlavně:',['důvěryhodnost podniku jako dlužníka','pravděpodobnost brzkého bankrotu','cenu akcie na burze'],'Používají je banky při úvěrech.'],
    ['Controlling je:',['řízení zaměřené na výsledek a budoucnost','jen zpětná kontrola nákladů','externí audit účetní závěrky'],'Jeho základním nástrojem je finanční analýza.'],
    ['Souhrnný dlouhodobý finanční plán obsahuje:',['plánovou výsledovku, cash flow a rozvahu','jen plán investic na příští rok','jen rozpočet režijních nákladů'],'Odpovídá formě účetních výkazů.'],
    ['Peněžní pracovní kapitál je:',['peníze − krátkodobé závazky','OA − krátkodobé závazky','OA − zásoby − krátkodobé závazky'],'Nejkonzervativnější rozdílový ukazatel.'],
    ['Ukazatel P/E (cena akcie / zisk na akcii) vyjadřuje:',['kolik investoři platí za 1 Kč zisku','podíl dividend na čistém zisku','zadluženost připadající na akcii'],'Patří k ukazatelům kapitálového trhu.'],
    ['Doba obratu se v ukazatelích aktivity počítá jako:',['stav položky / denní tržby','tržby / stav položky','zisk / stav položky'],'Tržby / stav = rychlost (počet) obratu.']
  ],
  kvalita:[
    ['Podle ISO 9000 je kvalita:',['stupeň plnění požadavků inherentními charakteristikami','cena výrobku ve srovnání s konkurencí','počet funkcí, které výrobek nabízí'],'Objektem může být výrobek, služba, proces, osoba, organizace.'],
    ['Inherentní charakteristika je:',['sobě vlastní, tvoří podstatu výrobku','přiřazená, například cena nebo obal','vnucená výrobku normou zvenčí'],'Přiřazené znaky podporují hlavně prodej.'],
    ['Užitek pro konkrétního zákazníka je dán:',['mírou splnění jeho potřeb vzhledem k ceně','technickými parametry výrobku','známostí značky výrobce'],'Zákazník nechce obecně nejlepší výrobek, ale ten, který mu stačí.'],
    ['Srovnávat kvalitu lze jen u výrobků:',['se stejným zamýšleným použitím','stejné značky','ve stejné cenové kategorii'],'Pračku a ledničku srovnat nelze.'],
    ['Chuť hodnocená „vyhovuje / nevyhovuje“ je charakteristika typu:',['atribut','proměnná','klasifikovaný atribut'],'Atributy jsou neměřitelné znaky.'],
    ['Chuť hodnocená na stupnici 1–5 bodů je:',['klasifikovaný atribut','proměnná','prostý atribut'],'Bodování přibližuje atribut měřitelné charakteristice.'],
    ['Teplota nebo hmotnost jsou charakteristiky typu:',['proměnné (měřitelné)','atributy','klasifikované atributy'],'Proměnné lze změřit.'],
    ['Znaky povinné ze zákona nebo kvůli bezpečnosti jsou:',['kritické charakteristiky','významné charakteristiky','ostatní charakteristiky'],'Musí být bezpodmínečně splněny.'],
    ['Certifikace systému managementu kvality probíhá podle normy:',['ISO 9001','ISO 14001','ISO 27000'],'ISO 14001 = životní prostředí, ISO 27000 = bezpečnost informací.'],
    ['TQM znamená:',['Total Quality Management','Technical Quality Measurement','Total Quantity Management'],'Hodnotí se sebehodnocením nebo cenami za jakost.'],
    ['Mezi principy moderního managementu kvality patří:',['procesní řízení a zapojení všech','kontrola až na konci výroby','odpovědnost jen oddělení kvality'],'Dále odpovědnost vedení a systémový přístup.'],
    ['Norma IATF 16949 se týká:',['automobilového průmyslu','potravinářství','stavebnictví'],'Nástupce ISO/TS 16949.'],
    ['Kvalita jako dynamická veličina znamená, že:',['se mění s požadavky zákazníků a společnosti','se v čase nikdy nemění','závisí jen na ceně výrobku'],'Jde o sociální pojetí kvality.']
  ],
  vyroba:[
    ['Výroba je v podniku:',['základní (primární) proces','podpůrný (sekundární) proces','řídící proces'],'Primární procesy: nákup, výroba, prodej.'],
    ['Produkční funkce Q = f(VF) vyjadřuje:',['max. produkci z kombinace výrobních faktorů','vztah nákladů a objemu výroby','vztah ceny a poptávky'],'Vztah vstupů a výstupu.'],
    ['Výroba lodí nebo zakázkových oděvů je výroba:',['kusová','sériová','hromadná'],'Malé množství, vysoké jednotkové náklady.'],
    ['Výpočet optimální výrobní dávky se nejvíc hodí u výroby:',['sériové','kusové','proudové'],'Výrobek se opakuje v dávkách.'],
    ['Výroba žárovek nebo papíru na lince je výroba:',['hromadná (proudová)','kusová','sériová'],'Velké množství standardizovaných výrobků.'],
    ['Výrobní takt je:',['doba mezi dokončením dvou výrobků','počet výrobků za jednu směnu','doba přípravy stroje na dávku'],'Takt = čas chodu linky / počet výrobků.'],
    ['Ve vzorci VD<sub>opt</sub> = √(2·Q·N<sub>d</sub>/N<sub>s</sub>) jsou N<sub>d</sub>:',['náklady na přípravu a seřízení dávky','náklady na skladování výrobku','průměrné denní náklady výroby'],'N<sub>s</sub> jsou náklady na skladování.'],
    ['Ganttův diagram zobrazuje:',['posloupnost činností v čase','strukturu nákladů podniku','organizační strukturu podniku'],'Používá se k plánování využití zařízení.'],
    ['Plánování výrobního procesu odpovídá na otázku:',['kdy vyrábět','co a kolik vyrábět','jak vyrábět'],'Co a kolik = výrobní program, jak = technologie.'],
    ['Plán výroby je omezen hlavně:',['možným prodejem a financemi podniku','jen kapacitou strojů','jen počtem zaměstnanců'],'Navazuje na plán prodeje a finanční plán.'],
    ['Hospodárnost (efektivnost) se počítá jako:',['výkon / náklady','zisk / kapitál','množství / použité faktory'],'Zisk/kapitál = rentabilita, množství/faktory = produktivita.'],
    ['Princip minima znamená:',['daný výkon s minimem prostředků','maximum výkonu z daných prostředků','jen minimální zisk pro přežití'],'Princip maxima je opačný.'],
    ['Doplňková výroba:',['využívá odpad z hlavní a vedlejší výroby','vyrábí polotovary a náhradní díly','tvoří hlavní náplň podniku'],'Polotovary a náhradní díly = vedlejší výroba.'],
    ['Chemický výrobní proces:',['mění látkovou podstatu suroviny','zachovává látkovou podstatu suroviny','probíhá bez účasti člověka'],'Mechanicko-fyzikální ji nemění.'],
    ['Unifikace konstrukce sleduje:',['zaměnitelnost součástí a dílů','jedinečnost každého výrobku','snížení počtu zaměstnanců'],'Patří ke konstrukční standardizaci.'],
    ['Stavebnicové řešení znamená, že:',['výrobky vznikají kombinací unifikovaných dílů','každý díl se navrhuje znovu','výrobek se sestaví až u zákazníka'],'Další směry: unifikace a dědičnost.'],
    ['Služby se od výrobků liší tím, že:',['je nelze skladovat','vznikají dlouho před spotřebou','jsou pro zákazníka méně viditelné'],'Služba nemá zpoždění mezi výrobou a spotřebou.'],
    ['Integrovaný management obvykle spojuje ISO 9001, ISO 14001 a:',['OHSAS 18001 (bezpečnost práce)','ISO 27000 (bezpečnost informací)','IATF 16949 (automobilový průmysl)'],'Kvalita, životní prostředí, BOZP.']
  ],
  marketing:[
    ['Podstatou marketingu je:',['rovnováha mezi zájmy zákazníka a firmy','prodat co nejvíc toho, co se vyrobí','nabídnout vždy nejnižší cenu'],'Předvídat, zajistit a uspokojit potřeby zákazníka.'],
    ['Marketing vznikl ve 20. letech 20. století v:',['USA','Německu','Japonsku'],'Reakce na přebytek zboží a problém s odbytem.'],
    ['Marketingová koncepce se od prodejní liší tím, že podnik:',['nejdřív analyzuje přání zákazníka','nejdřív vyrobí, pak hledá kupce','se orientuje hlavně na obrat'],'Prodejní koncepce dává důraz na produkt a obrat.'],
    ['Heslo „čím levnější výrobek, tím lépe se prodá“ patří ke koncepci:',['výrobní','výrobkové','prodejní'],'H. Ford, T. Baťa, 1900–1920.'],
    ['Heslo „kvalitní zboží si zákazníka vždy najde“ patří ke koncepci:',['výrobkové','výrobní','marketingové'],'1920–1940.'],
    ['Sociální marketingová koncepce přidává k zájmům firmy a zákazníka:',['celospolečenské zájmy a ekologii','zájmy akcionářů a bank','zájmy dodavatelů a distributorů'],'Od 70. let.'],
    ['Segmentace podle příjmu a vzdělání je:',['socioekonomická','demografická','psychologická'],'Demografická: věk, pohlaví. Psychologická: postoje, hodnoty.'],
    ['Marketingový mix 4P tvoří:',['produkt, cena, distribuce, komunikace','plán, proces, lidé a zisk','produkt, prodej, propagace, personál'],'Product, Price, Place, Promotion.'],
    ['Záruka a servis patří v koncepci totálního výrobku do:',['rozšířeného (přidaného) výrobku','jádra výrobku','zhmotnělého výrobku'],'Jádro = užitek, zhmotnělý = kvalita, design, značka, obal.'],
    ['Penetrační cena je:',['nízká cena pro rychlý růst podílu na trhu','vysoká cena při zavedení nového výrobku','cena podle nákladů se ziskovou přirážkou'],'Firma dočasně obětuje zisk.'],
    ['Strategie „sbírání smetany“ znamená:',['krátkodobě vysokou cenu nového výrobku','dlouhodobě nízkou cenu výrobku','cenu stejnou jako u konkurence'],'Využívá dočasné výhody novosti.'],
    ['Cena obratového tahouna:',['láká zákazníky k nákupu ziskových výrobků','je vždy vyšší než cena konkurence','se používá jen u služeb'],'Velmi nízká cena jednoho produktu.'],
    ['Přímý distribuční kanál je:',['výrobce → zákazník','výrobce → velkoobchod → zákazník','výrobce → maloobchod → zákazník'],'Nepřímý má distribuční mezičlánky.'],
    ['Public relations je:',['neosobní stimulace poptávky dobrými zprávami','placená neosobní forma reklamy','adresná komunikace přes poštu a telefon'],'Cíl: kladný postoj veřejnosti.'],
    ['Marketingový mix služeb přidává ke 4P:',['procesy a lidi','obal a značku','sortiment a vzhled prodejny'],'Produkt, cena, propagace, místo, procesy, lidé.'],
    ['Ansoffova strategie diverzifikace znamená:',['nový výrobek na novém trhu','současný výrobek na současném trhu','nový výrobek na současném trhu'],'Současný výrobek i trh = penetrace trhu.'],
    ['Tržní vyzyvatel je podle Kotlera firma:',['na 2. až 3. místě trhu','s největším podílem na trhu','zaměřená jen na tržní mezery'],'Dále tržní vůdce, následovatel a obsazovatel mezer.'],
    ['Marketingový mix 4C je pohled:',['zákazníka','výrobce','státu'],'Customer value, Communication, Convenience, Cost.'],
    ['Množstevní sleva se nazývá:',['rabat','skonto','srážka'],'Skonto je sleva za platbu v hotovosti.'],
    ['Koncentrovaný marketing se zaměřuje na:',['jeden segment','celý trh najednou','více segmentů zvlášť'],'Patří sem výklenkový marketing.'],
    ['Kmenová značka znamená, že:',['všechny výrobky výrobce mají stejnou značku','každý výrobek má vlastní značku','značku určuje obchodník'],'Například SONY, PANASONIC.'],
    ['Tržní podíl výrobce A se počítá jako:',['prodej výrobce A / prodej celkem','tržby výrobce A / jeho náklady','zisk výrobce A / tržby celkem'],'Lze i z tržeb nebo odhadem z výzkumu.']
  ],
  nakup:[
    ['Nákupní marketing se zabývá hlavně:',['nákupním trhem a výběrem dodavatelů','hmotnými toky ve skladu','propagací vlastních výrobků'],'Hmotné a informační toky = nákupní logistika.'],
    ['Nákupní logistika se zabývá:',['hmotnými a informačními toky v nákupu','analýzou nákupního trhu','cenovou politikou podniku'],'Objednávání, doprava, skladování, řízení zásob.'],
    ['Opatřování (obstarávání) zahrnuje pořízení:',['všech vstupů: půdy, práce, kapitálu','jen materiálu a surovin','jen cizích služeb'],'Nákup je užší pojem.'],
    ['Nákup má strategický význam, protože ovlivňuje:',['cenu, kvalitu a rychlost na výstupu','jen výši skladových zásob','jen počet zaměstnanců'],'Tedy konkurenční schopnost podniku.'],
    ['Tři základní formy nákupu jsou:',['přímý nákup, finanční leasing, pronájem','nákup, prodej a výměnný obchod','hotově, na fakturu a na úvěr'],'Pronájem = operativní leasing.'],
    ['Koncepce nákupního marketingu (Schulte) se datuje do let:',['1990','1950','1970'],'1950 zásobování za každou cenu, 1970 materiálové hospodářství.'],
    ['Opakovaný nákup prochází fázemi Robinsonova modelu:',['7 a 8','1 až 8','1 a 2'],'První nákup 1–8, modifikovaný mění libovolnou fázi.'],
    ['Robinsonův model nákupního procesu má:',['8 fází','4 fáze','5 fází'],'Od zjištění problému po vyhodnocení nákupu.'],
    ['Při výběru dodavatele se podle systému jakosti vybírá:',['1 základní a 2 rezervní dodavatelé','jen 1 dodavatel na každé zboží','aspoň 5 rovnocenných dodavatelů'],'O dodavatelích se vedou karty dodavatelů.'],
    ['Bilanční rovnice nákupu je:',['D<sub>o</sub> = M + Z<sub>p</sub> − Z<sub>o</sub>','D<sub>o</sub> = M − Z<sub>p</sub> + Z<sub>o</sub>','D<sub>o</sub> = Z<sub>o</sub> + Z<sub>p</sub> − M'],'Zdroje = potřeba: D<sub>o</sub> + Z<sub>o</sub> = M + Z<sub>p</sub>.'],
    ['Bilanční rovnice nákupu je základem metody:',['MRP','ABC','BCG'],'Material Requirements Planning.'],
    ['Objednací bod (reorder point) je:',['stav zásob, kdy se automaticky objedná','den splatnosti dodavatelské faktury','minimální cena, za kterou se nakupuje'],'IS/IT generuje elektronickou objednávku.'],
    ['Scoring model se používá při:',['výběru a hodnocení dodavatelů','plánování výrobního taktu','odměňování zaměstnanců'],'Kritéria s vahami podle důležitosti.'],
    ['Znakem moderního řízení nákupu je:',['snižování počtu dodavatelů','nákup vždy od nejlevnějšího','co největší zásoby na skladě'],'Dále rámcové smlouvy, e-aukce, outsourcing logistiky.'],
    ['Nákup má vůči ostatním útvarům funkci:',['obslužnou','řídící','kontrolní'],'Vystupuje jako služba jiným útvarům.']
  ],
  organizace:[
    ['Organizování jako manažerskou funkci formuloval v roce 1916:',['Henri Fayol','Frederick W. Taylor','Elton Mayo'],'Pět funkcí managementu: plánování, organizování, personalistika, vedení, kontrola.'],
    ['Grafické vyjádření organizační struktury je:',['organigram','Ganttův diagram','BCG matice'],'Také organizační schéma.'],
    ['Rozpětí řízení je:',['počet podřízených jednoho vedoucího','počet úrovní řízení v podniku','počet útvarů podniku'],'Úzké → strmá struktura, široké → plochá.'],
    ['Strmá organizační struktura má:',['mnoho úrovní a úzké rozpětí řízení','málo úrovní a široké rozpětí řízení','jen jednu úroveň řízení'],'Typicky armáda.'],
    ['U ploché struktury s širokým rozpětím:',['vedoucí musí delegovat pravomoci','je velmi těsná kontrola podřízených','je hodně úrovní řízení'],'Vyžaduje kvalitní manažery.'],
    ['Liniová struktura dodržuje:',['princip jednoho vedoucího','dvojí podřízenost pracovníků','poradní funkci štábu'],'Nejstarší, vhodná pro malé podniky.'],
    ['Štáb v organizační struktuře:',['plní poradní funkci, nerozhoduje','má přímou rozkazovací pravomoc','nahrazuje liniového vedoucího'],'Rozhoduje liniový manažer.'],
    ['V maticové struktuře má pracovník:',['dva nadřízené','jednoho nadřízeného','žádného nadřízeného'],'Odborného vedoucího a vedoucího projektu.'],
    ['Divizní struktura se hodí pro:',['velké podniky s více výrobky či regiony','malé podniky s jedním výrobkem','státní správu a úřady'],'Divize výrobkové, geografické nebo zákaznické.'],
    ['SBU se od divize liší tím, že:',['rozvíjí vlastní strategické směřování','je strategicky řízena centrálou','nemá vlastní organizační členění'],'SBU funguje jako nezávislý podnik.'],
    ['Organizační struktura Améba pochází z:',['Japonska','USA','Německa'],'Kazuo Inamori, Kyocera.'],
    ['Améby v rámci firmy:',['mají vlastní rozpočet a soutěží spolu','dostávají od firmy neomezené úvěry','mají pevné a stálé složení'],'Neefektivní amébu lze rozpustit.'],
    ['Organizační kultura je:',['systém sdílených předpokladů a hodnot','organizační řád podniku','seznam všech pracovních míst'],'Posiluje soudržnost lidí.'],
    ['Organizační řád stanoví:',['strukturu, úkoly útvarů a pravomoci','pracovní dobu a dovolenou','oprávnění k podpisům písemností'],'Oprávnění k podpisům = podpisový řád, pracovní doba = pracovní řád.'],
    ['Operační jádro organizace tvoří:',['pracovníci vyrábějící výrobky a služby','vrcholový management a jeho štáb','inženýři, výzkumníci a plánovači'],'Inženýři a plánovači = technostruktura.'],
    ['Nejnižším prvkem organizační struktury je:',['funkční místo','útvar','divize'],'Útvar sdružuje několik funkčních míst.'],
    ['Klastr je:',['místní koncentrace propojených firem v oboru','zvláštní typ maticové struktury','organizační řád holdingu'],'Příklad inovační sítě.'],
    ['Měkké prvky organizační architektury jsou:',['neformální struktura, lidé, kultura','pracovní místa a formální struktura','budovy, stroje a technologie'],'Tvrdé: pracovní místa ve formální struktuře.']
  ],
  lidske:[
    ['Personální procesy patří mezi procesy:',['podpůrné (sekundární)','primární','výrobní'],'Řízení lidských zdrojů má i funkci řídícího procesu.'],
    ['Mezi primární podnikové procesy patří:',['nákup, výroba, prodej','personalistika, finance, marketing','plánování, organizování, kontrola'],'Plánování, organizování, vedení, kontrola = řídící procesy.'],
    ['Nejstarší fází vývoje personální práce je:',['personální administrativa','řízení lidských zdrojů','personální řízení'],'Pak personální řízení (po 2. sv. válce), od 60. let řízení lidských zdrojů.'],
    ['Řízení lidských zdrojů klade důraz na:',['strategický přístup a liniové manažery','jen administrativu přijímání','jen mzdovou agendu'],'Plánuje se 3–5 let dopředu.'],
    ['Behaviorismus zkoumá:',['pozorovatelné a měřitelné chování','nevědomé motivy člověka','organizační strukturu podniku'],'J. B. Watson, navazuje na I. P. Pavlova.'],
    ['Personální činnost, bez které nejdou ostatní, je:',['vytváření a analýza pracovních míst','odměňování pracovníků','další vzdělávání pracovníků'],'Místa musí existovat dřív, než se na ně nabírá.'],
    ['Personální plánování tvoří prognóza potřeby lidí, prognóza zdrojů a:',['sladění nabídky s poptávkou','výběr konkrétních uchazečů','stanovení výše mezd'],'Tři kroky plánování lidských zdrojů.'],
    ['Kvalita a kvantita práce jsou kritéria hodnocení:',['objektivní','subjektivní','neměřitelná'],'Subjektivní kritéria stojí na úsudku hodnotitele.'],
    ['Mzda podle počtu vyrobených kusů je:',['úkolová','časová','podílová'],'Časová podle odpracované doby.'],
    ['Scanlonův systém odměňuje:',['úsporu nákladů práce','počet odpracovaných hodin','počet let ve firmě'],'Motivuje k návrhům na vyšší produktivitu.'],
    ['Podílová (provizní) mzda je typická pro:',['obchodní zástupce','úředníky na úřadě','dělníky u linky'],'Odvíjí se od objemu prodeje.'],
    ['Firemní auto k soukromému použití je:',['zaměstnanecká výhoda (benefit)','součást základní mzdy','příplatek za práci přesčas'],'Hmotné vybavení sloužící i osobní potřebě.'],
    ['Testy osobnosti a znalostí se používají při:',['výběru pracovníků','hodnocení výsledků firmy','personálním plánování'],'Dále dotazník, životopis a pohovor.'],
    ['Doporučení od současného zaměstnance je metoda:',['získávání pracovníků','výběru pracovníků','hodnocení pracovníků'],'Získávání = nalákat uchazeče, výběr = vybrat z nich.'],
    ['Osobní ohodnocení patří mezi:',['dodatkové mzdové formy','základní mzdové formy','zaměstnanecké výhody'],'Dodatkové: prémie, odměny, podíly na výsledku, příplatky.']
  ]};

  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  function item(t,x){const order=shuffle([0,1,2]);return {t,q:x[0],a:order.map(i=>x[1][i]),ok:order.indexOf(0),why:x[2]};}
  function pick(topics,n){
    if(typeof topics==='string')topics=[topics];
    const all=[];topics.forEach(t=>(B[t]||[]).forEach(x=>all.push([t,x])));
    return shuffle(all).slice(0,n||all.length).map(([t,x])=>item(t,x));
  }

  /* ---------- Test z teorie ---------- */
  const css=`
  .tt .cfg{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 18px;margin:16px 0}
  .tt .tops{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:4px 16px;margin:8px 0 12px}
  .tt .tops label{display:flex;gap:8px;align-items:flex-start;font-size:.95rem;cursor:pointer}
  .tt .tops input{margin-top:.3em;accent-color:var(--accent)}
  .tt .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
  .tt select,.tt .btn{font:inherit;font-size:1rem;padding:8px 14px;border-radius:6px;border:1px solid var(--line);background:var(--bg);color:var(--ink)}
  .tt .btn{cursor:pointer}
  .tt .btn.p{background:var(--accent);border-color:var(--accent);color:#fff}
  .tt .btn:focus-visible,.tt select:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
  .tt .qq{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:14px 18px;margin:12px 0}
  .tt .qt{font-weight:600;margin-bottom:10px;font-size:1.08rem}
  .tt .tag{display:block;font-size:.75rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px}
  .tt .opts{display:grid;gap:8px}
  .tt .opts button{font:inherit;font-size:1.05rem;line-height:1.45;text-align:left;padding:10px 14px;border-radius:6px;border:1px solid var(--line);background:var(--bg);color:var(--ink);cursor:pointer}
  .tt .opts button:hover:not(:disabled){border-color:var(--accent)}
  .tt .opts button.sel{border-color:var(--accent);background:var(--accent-soft);font-weight:600}
  .tt .opts button:disabled{cursor:default}
  .tt .opts button.right{background:var(--ok-soft);border-color:var(--ok)}
  .tt .opts button.wrong{background:var(--bad-soft);border-color:var(--bad)}
  .tt .why{margin-top:8px;font-size:.92rem;color:var(--muted)}
  .tt .bar{position:sticky;bottom:12px;background:var(--ink);color:var(--bg);border-radius:8px;padding:8px 14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-top:16px}
  .tt .bar .btn{background:var(--bg);color:var(--ink);border:0;padding:6px 12px}
  .tt .res{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:12px;padding:14px 18px;margin:16px 0}
  .tt .res .big{font-size:1.6rem;font-weight:700}
  .tt .res table{font-size:.92rem}`;
  function mountTest(id,opt){
    opt=opt||{};const root=document.getElementById(id);if(!root)return;
    const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    root.classList.add('tt');
    const keys=Object.keys(T);
    root.innerHTML=`<div class="cfg"><b>Okruhy</b><div class="tops">${keys.map(k=>`<label><input type="checkbox" value="${k}" checked><span>${T[k]} <span class="side">(${B[k].length})</span></span></label>`).join('')}</div>
      <div class="row"><label for="${id}-n">Počet otázek:</label><select id="${id}-n"><option>10</option><option>20</option><option selected>30</option><option>50</option><option value="999">všechny</option></select>
      <button type="button" class="btn p" id="${id}-new">Nový test</button><button type="button" class="btn" id="${id}-all">Vybrat vše</button><button type="button" class="btn" id="${id}-none">Zrušit výběr</button></div></div><div class="body"></div>`;
    const body=root.querySelector('.body');
    root.querySelector(`#${id}-all`).onclick=()=>root.querySelectorAll('.tops input').forEach(c=>c.checked=true);
    root.querySelector(`#${id}-none`).onclick=()=>root.querySelectorAll('.tops input').forEach(c=>c.checked=false);
    root.querySelector(`#${id}-new`).onclick=()=>start(true);
    let items=[],ans=[],done=false;
    function start(scroll){
      const tops=[...root.querySelectorAll('.tops input:checked')].map(c=>c.value);
      if(!tops.length){body.innerHTML='<p class="side">Vyber aspoň jeden okruh.</p>';return;}
      items=pick(tops,+root.querySelector(`#${id}-n`).value);ans=items.map(()=>-1);done=false;
      body.innerHTML='';
      items.forEach((it,i)=>{
        const box=document.createElement('div');box.className='qq';
        box.innerHTML=`<div class="qt"><span class="tag">${T[it.t]}</span>${i+1}. ${it.q}</div>`;
        const o=document.createElement('div');o.className='opts';
        it.a.forEach((txt,j)=>{const b=document.createElement('button');b.type='button';b.innerHTML=txt;b.id=`${id}-${i}-${j}`;
          b.onclick=()=>{if(done)return;ans[i]=j;o.querySelectorAll('button').forEach((x,k)=>x.classList.toggle('sel',k===j));upd();};o.appendChild(b);});
        const w=document.createElement('div');w.className='why';w.hidden=true;
        box.append(o,w);body.appendChild(box);
      });
      const bar=document.createElement('div');bar.className='bar';
      bar.innerHTML=`<span class="s"></span><button type="button" class="btn" id="${id}-eval">Vyhodnotit</button>`;
      body.appendChild(bar);bar.querySelector('button').onclick=evaluate;upd();
      if(scroll===true)body.scrollIntoView({behavior:'smooth',block:'start'});
    }
    function upd(){const s=body.querySelector('.bar .s');if(s)s.textContent=done?'Vyhodnoceno':`Zodpovězeno ${ans.filter(x=>x>=0).length} z ${items.length}`;}
    function evaluate(){
      done=true;let good=0;const per={};
      body.querySelectorAll('.qq').forEach((box,i)=>{
        const it=items[i],bs=box.querySelectorAll('.opts button');
        bs.forEach((b,k)=>{b.disabled=true;b.classList.remove('sel');if(k===it.ok)b.classList.add('right');else if(k===ans[i])b.classList.add('wrong');});
        const ok=ans[i]===it.ok;if(ok)good++;
        per[it.t]=per[it.t]||[0,0];per[it.t][1]++;if(ok)per[it.t][0]++;
        const w=box.querySelector('.why');w.hidden=false;w.innerHTML=(ok?'<b>Správně.</b> ':ans[i]<0?'<b>Bez odpovědi.</b> ':'<b>Vedle.</b> ')+it.why;
      });
      const p=good/items.length*100;
      const res=document.createElement('div');res.className='res';
      res.innerHTML=`<div class="big">${good} z ${items.length} (${Math.round(p)} %)</div><p>${p>=80?'Výborně, teorii máš v malíku.':p>=60?'Dobrý základ. Projdi si okruhy s chybami.':'Ještě to chce opakovat. Začni lekcemi u okruhů s nejvíc chybami.'}</p>
        <div class="tw"><table><tr><th>okruh</th><th>správně</th></tr>${Object.keys(per).map(k=>`<tr><td>${T[k]}</td><td>${per[k][0]} / ${per[k][1]}</td></tr>`).join('')}</table></div>`;
      body.prepend(res);upd();
      const bar=body.querySelector('.bar');bar.querySelector('button').textContent='Nový test';bar.querySelector('button').onclick=()=>start(true);
      res.scrollIntoView({behavior:'smooth',block:'start'});
    }
    if(opt.autostart!==false)start();
  }

  window.PETeorie={topics:T,bank:B,pick,mountTest,
    quiz(id,topic,n){if(window.Quiz)Quiz.mount(id,pick(topic,n||6));}};
})();
