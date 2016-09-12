import { deepFreeze, clone } from './utils';

const DATA = deepFreeze([
	{
		id: 1,
		title: 'Marťan',
		url: 'martan',
		rating: 86,
		category: 3,
		images: [
			{
				src: '//img.csfd.cz/files/images/film/photos/159/929/159929128_cd9861.jpg',
				width: 2192,
				height: 1156
			},
			{
				src: '//img.csfd.cz/files/images/film/photos/159/929/159929129_382597.jpg',
				width: 2192,
				height: 1156
			}
		],
		video: [
			{
				src: '//video.csfd.cz/files/videos/video/159/927/159927890_cc5e48.mp4',
				width: 1702,
				height: 720
			}
		],
		date: '2015-10-01',
		actors: ['Matt Damon', 'Kate Mara', 'Jessica Chastain'],
		perex: 'Astronaut Mark Watney (Matt Damon) během mise na Mars málem zahynul v prašné bouři. Zbytek jeho posádky planetu opustil v domnění, že je mrtvý. Ale Watney přežil a ocitne se tak omylem sám na nepřátelské planetě.',
		description: 'Astronaut Mark Watney (Matt Damon) během mise na Mars málem zahynul v prašné bouři. Zbytek jeho posádky planetu opustil v domnění, že je mrtvý. Ale Watney přežil a ocitne se tak omylem sám na nepřátelské planetě. Má k dispozici jen hubené zásoby a tak musí využít veškerý důvtip, invenci a technické znalosti, aby nejen přežil, ale také nalezl způsob, jak vyslat signál na Zemi, že je naživu. V okamžiku, kdy se mu to podaří, začne miliony kilometrů daleko od něj NASA a mezinárodní tým vědců neúnavně pracovat, aby dostali tohoto „Marťana" domů. Zatímco členové jeho posádky souběžně prokazují svou odvahu na téměř nemožné záchranné misi.'
	},
	{
		id: 2,
		title: 'Everest',
		url: 'everest',
		rating: 80,
		category: 3,
		images: [
			{
				src: '//img.csfd.cz/files/images/film/photos/159/917/159917350_f93d29.jpg',
				width: 2192,
				height: 1156
			}, {
				src: '//img.csfd.cz/files/images/film/photos/159/870/159870461_177b4e.jpg',
				width: 2192,
				height: 1156
			}
		],
		video: [
			{
				src: '//video.csfd.cz/files/videos/video/160/084/160084167_3143e7.mp4',
				width: 1694,
				height: 720
			}
		],
		date: '2015-09-24',
		actors: ['Jason Clarke',  'Thomas M. Wright', 'Martin Henderson'],
		perex: 'Everest v režii Baltasara Kormákura rekapituluje jednu z nejtragičtějších expedic, při které majestátní masív poslal svým vyzyvatelům mrazivé varování. Píše se polovina devadesátých let a Himaláje se stávají oblíbenou turistickou destinací. Na osmitisícovky už nešplhají jen zkušení horolezci, ale táhnou se tam celá procesí dobrodruhů z celého světa.',
		description: 'Everest v režii Baltasara Kormákura rekapituluje jednu z nejtragičtějších expedic, při které majestátní masív poslal svým vyzyvatelům mrazivé varování. Píše se polovina devadesátých let a Himaláje se stávají oblíbenou turistickou destinací. Na osmitisícovky už nešplhají jen zkušení horolezci, ale táhnou se tam celá procesí dobrodruhů z celého světa. Horští vůdci Rob Hall (Jason Clarke) a Scott Fischer (Jake Gyllenhaal) přesto nic nepodceňují a do své expedice na nejvyšší bod naší Země berou jen lidi, kteří mají něco za sebou. Všichni jsou skvěle připravení a vybavení, splnění snů jejich klientů by nic nemělo stát v cestě. Stačí však drobná odchylka od plánu, náhlá změna počasí a klíčovou otázku „Podaří se nám horu zdolat?" vystřídá otázka mnohem zásadnější. „Dokážeme přežít?"'
	}, {
		id: 3,
		title: 'Jurský svět',
		url: 'jursky-svet',
		rating: 75,
		category: 1,
		images: [
			{
				src: '//img.csfd.cz/files/images/film/photos/159/887/159887238_e50a85.jpg',
				width: 2192,
				height: 1156
			}
		],
		video: [
			{
				src: '//video.csfd.cz/files/videos/video/159/808/159808246_6bf364.mp4',
				width: 1431,
				height: 720
			}
		],
		date: '2015-06-11',
		actors: ['Chris Pratt'],
		perex: 'Před dvaadvaceti lety tragicky skončil sen excentrického milionáře Johna Hammonda, který chtěl na odlehlém ostrově z dinosauří DNA vypěstovat Jurský park s živými exponáty. Od té doby se ale mnohé změnilo, park jede na plné obrátky, ročně jím projdou milióny nadšených návštěvníků, kteří s očima navrch hlavy sledují v akci desítky „vyhynulých" živočichů.',
		description: 'Před dvaadvaceti lety tragicky skončil sen excentrického milionáře Johna Hammonda, který chtěl na odlehlém ostrově z dinosauří DNA vypěstovat Jurský park s živými exponáty. Od té doby se ale mnohé změnilo, park jede na plné obrátky, ročně jím projdou milióny nadšených návštěvníků, kteří s očima navrch hlavy sledují v akci desítky „vyhynulých" živočichů. Jenže vedení parku stále hledá nové způsoby, jak tuto jedinečnou atrakci ještě víc zatraktivnit. A v tu chvíli přijdou komplikace.Vědecké experimenty s novými druhy mohutně podporuje strohá manažerka parku Claire Dearing (Bryce Dallas Howard), která ve zvířatech vidí především čísla. Na rozdíl od ní v nich biolog Owen Grady (Chris Pratt ze Strážců galaxie) vidí hlavně nebezpečí, zvlášť ve tvorech, které nestvořila příroda, ale laboratoř. Události mu dají za pravdu, když se jeden z takových mazlíčků doslova urve ze řetězu a začne si vylepšovat jídelníček zaměstnanci parku a posléze také návštěvníky, mezi nimiž jsou také dva synovci Claire, kteří za tetou přijeli na prázdniny. Teď už nejde o vyšší tržby ani o udržení prestiže. Cílem všech začalo být holé přežití.'
	}, {
		id: 4,
		title: 'Hotel Transylvánie 2',
		url: 'hotel-transylvanie-2',
		rating: 80,
		category: 2,
		images: [
			{
				src: '//img.csfd.cz/files/images/film/photos/159/337/159337057_b95707.jpg',
				width: 2192,
				height: 1156
			}
		],
		video: [
			{
				src: '//video.csfd.cz/files/videos/video/159/956/159956158_134e56.mp4',
				width: 654,
				height: 360
			}
		],
		date: '2015-09-24',
		actors: ['Adam Sandler', 'Selena Gomez'],
		perex: 'Zdá se, že Hotelu Transylvánie se začíná dařit... Dracula konečně ustoupil ze svých striktních zásad ubytovávat v hotelu pouze příšery, a ten se proto otevírá i lidským návštěvníkům. Za zavřenými dveřmi krypty ale Draculu sžírají pochybnosti o tom, zda se jeho napůl lidský a napůl upíří vnuk Dennis vůbec někdy stane upírem. ',
		description: 'Zdá se, že Hotelu Transylvánie se začíná dařit... Dracula konečně ustoupil ze svých striktních zásad ubytovávat v hotelu pouze příšery, a ten se proto otevírá i lidským návštěvníkům. Za zavřenými dveřmi krypty ale Draculu sžírají pochybnosti o tom, zda se jeho napůl lidský a napůl upíří vnuk Dennis vůbec někdy stane upírem. Když tedy Mavis ve společnosti Johnnyho vyrazí na návštěvu lidské části příbuzenstva - na které ji ostatně také čeká nejedno překvapení - požádá "Děda" Drac o pomoc své přátele Franka, Murrayho, Waynea a Griffina a společně Dennisovi nachystají "kurz pro strašidla". Nemají ale nejmenší tušení, že se k návštěvě své rodiny v hotelu chystá také Dracův rozmrzelý a velmi, velmi, velmi staromódní otec Vlad. Když se tedy Vlad dozví, že jeho pravnuk není čistokrevný upír - a ještě k tomu teď do Hotelu Transylvánie mohou jezdit i lidé - nastane mela, ze které by dost možná i upírovi ztuhla krev v žilách.'
	}, {
		id: 5,
		title: 'Osm hrozných',
		url: 'osm-hroznych',
		rating: 83,
		category: 3,
		images: [
			{
				src: '//img.csfd.cz/files/images/film/photos/159/980/159980433_480525.jpg',
				width: 2192,
				height: 1156
			}
		],
		video: [
			{
				src: '//video.csfd.cz/files/videos/video/160/275/160275767_443d6d.mp4',
				width: 640,
				height: 360
			}
		],
		date: '2016-01-07',
		actors: ['Samuel L. Jackson', 'Kurt Russell', 'Jennifer Jason Leigh', 'Walton Goggins', 'Demian Bichir', 'Tim Roth'],
		perex: 'Několik let po občanské válce se zasněženými kopci Wyomingu řítí dostavník. Veze se v něm John Ruth (Kurt Russell), lovec lidí, známý také jako „Kat", a Daisy Domergueová (Jennifer Jason Leigh). Jeho čeká odměna, vypsaná na její hlavu, ji soud a oprátka. Po cestě potkají dva muže – majora Marquise Warrena (Samuel L. Jackson), bývalého vojáka, ze kterého se také stal obávaný lovec lidí a Chrise Mannixe (Walton Goggins), jižanského odpadlíka, který o sobě tvrdí, že je novým šerifem ve městě, kam mají všichni namířeno. Když jim silná vichřice zabrání pokračo',
		description: 'Několik let po občanské válce se zasněženými kopci Wyomingu řítí dostavník. Veze se v něm John Ruth (Kurt Russell), lovec lidí, známý také jako „Kat", a Daisy Domergueová (Jennifer Jason Leigh). Jeho čeká odměna, vypsaná na její hlavu, ji soud a oprátka. Po cestě potkají dva muže – majora Marquise Warrena (Samuel L. Jackson), bývalého vojáka, ze kterého se také stal obávaný lovec lidí a Chrise Mannixe (Walton Goggins), jižanského odpadlíka, který o sobě tvrdí, že je novým šerifem ve městě, kam mají všichni namířeno. Když jim silná vichřice zabrání pokračovat v cestě, rozhodnou se hledat útočiště v dřevěnici u Minnie, která je oblíbenou zastávkou dostavníků. Ve dveřích je však nevítá majitelka, ale několik cizinců, kteří se rozhodně netváří přívětivě. Nad horským průsmykem zuří sněhová bouře a osm pocestných začíná tušit, že se do města asi nedostanou...'
	}, {
		id: 6,
		title: 'Creed',
		url: 'creed',
		rating: 76,
		category: 3,
		images: [
			{
				src: '//img.csfd.cz/files/images/film/photos/160/102/160102531_5f7dae.jpg',
				width: 2192,
				height: 1156
			}
		],
		video: [
			{
				src: '//video.csfd.cz/files/videos/video/160/150/160150758_1cba26.mp4',
				width: 1732,
				height: 720
			}
		],
		date: '2015-12-31',
		actors: ['Michael B. Jordan', 'Sylvester Stallone', 'Tessa Thompson', 'Mauricio Ovalle', 'Ritchie Coster'],
		perex: 'Adonis Johnson nikdy nepoznal svého slavného otce, světového šampióna v těžké váze Apolla Creeda, který zemřel ještě před jeho narozením. Přesto však svůj původ nezapře a box má v krvi, takže ho to stále tahá do Philadelphie, města, kde se odehrál legendární souboj Apollo Creed vs. Rocky Balboa. Adonis Rockyho vyhledá a požádá ho, aby se stal jeho trenérem. Rocky zpočátku odmítá, protože ring je pro něho už jen minulost, ale postupně v Adonisovi objevuje sílu a odhodlání jeho otce Apolla, bývalého rivala a blízkého přítele. A tak nakonec souhlasí, že se m…',
		description: 'Adonis Johnson nikdy nepoznal svého slavného otce, světového šampióna v těžké váze Apolla Creeda, který zemřel ještě před jeho narozením. Přesto však svůj původ nezapře a box má v krvi, takže ho to stále tahá do Philadelphie, města, kde se odehrál legendární souboj Apollo Creed vs. Rocky Balboa. Adonis Rockyho vyhledá a požádá ho, aby se stal jeho trenérem. Rocky zpočátku odmítá, protože ring je pro něho už jen minulost, ale postupně v Adonisovi objevuje sílu a odhodlání jeho otce Apolla, bývalého rivala a blízkého přítele. A tak nakonec souhlasí, že se mladého boxera ujme, i když sám bojuje s o mnoho nebezpečnějším soupeřem. Adonis je pod Rockyho vedením na nejlepší cestě získat svůj vlastní titul, ale má kromě talentu i srdce pravého bojovníka?'
	}
]);

export default class Movie {
	getMovies(query = null) {
		let movies = clone(DATA);

		if (query) {
			query = query.toLowerCase();
			movies = movies.filter((movie) => {
				return (movie.title.toLowerCase().indexOf(query) > -1) ||
						(movie.perex.toLowerCase().indexOf(query) > -1) ||
						(movie.description.toLowerCase().indexOf(query) > -1)
			});
		}

		return Promise.resolve(deepFreeze(movies));
	}

	getMovie(url) {
		let movie = DATA.filter(movie => movie.url === url)[0] || null;
		return Promise.resolve(deepFreeze(clone(movie)));
	}
}
