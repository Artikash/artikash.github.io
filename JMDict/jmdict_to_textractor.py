import xml.etree.ElementTree
import sys
import itertools

outfile = open(sys.argv[2], "w", encoding="utf-8")
for entry in xml.etree.ElementTree.parse(sys.argv[1]).getroot().iter("entry"):
	exclude = { r_ele.find("reb").text for r_ele in entry.iter("r_ele")
		if not r_ele.find("re_nokanji") is None }
	definitions = {}
	for sense in entry.iter("sense"):
		definitions.setdefault(
			tuple(stag.text for stag in itertools.chain(sense.iter("stagk"), sense.iter("stagr")))
			or tuple(eb.text for eb in itertools.chain(entry.iter("keb"), entry.iter("reb"))),
			set(),
		).update(gloss.text for gloss in sense.iter("gloss")
			if gloss.attrib.get("{http://www.w3.org/XML/1998/namespace}lang", "eng") == sys.argv[3]
		)
	for terms, glosses in definitions.items():
		if not glosses:
			continue
		for term in terms:
			outfile.write("|TERM|" + term)
		outfile.write("|DEFINITION|<small>({})</small>\n".format(" ".join(set(terms) - exclude)))
		for gloss in glosses:
			outfile.write("<p>{!s}</p>\n".format(gloss))
		