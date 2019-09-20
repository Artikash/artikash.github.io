from xml.etree.ElementTree import parse
from sys import argv
from itertools import chain

outfile = open(argv[2], "w", encoding="utf-8")
for entry in parse(argv[1]).getroot().iter("entry"):
	exclude = { r_ele.find("reb").text for r_ele in entry.iter("r_ele") if not r_ele.find("re_nokanji") is None }
	definitions = {}
	for sense in entry.iter("sense"):
		definitions.setdefault(
			tuple(stag.text for stag in chain(sense.iter("stagk"), sense.iter("stagr")))
				or tuple(eb.text for eb in chain(entry.iter("keb"), entry.iter("reb"))),
			set(),
		).update(gloss.text for gloss in sense.iter("gloss")
			if gloss.attrib.get("{http://www.w3.org/XML/1998/namespace}lang", "eng") == argv[3]
		)
	outfile.writelines(chain.from_iterable(chain.from_iterable((
		(f"|TERM|{term}" for term in terms),
		"|DEFINITION|<small>({})</small>".format(", ".join(filter(lambda term: term not in exclude, terms))),
		(f"\n<p>{gloss}</p>" for gloss in glosses),
		"|END|\n") for terms, glosses in definitions.items() if glosses
	)))
