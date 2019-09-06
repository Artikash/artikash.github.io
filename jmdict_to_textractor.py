import xml.etree.ElementTree

outfile = open("SavedDictionary.txt", "w", encoding="utf-8")
for entry in xml.etree.ElementTree.parse("JMDict.xml").getroot():
	for keb in entry.iter("keb"):
		outfile.write("|TERM|")
		outfile.write(keb.text)
	for reb in entry.iter("reb"):
		outfile.write("|TERM|")
		outfile.write(reb.text)
	outfile.write("|DEFINITION|")
	for gloss in entry.iter("gloss"):
		outfile.write("<p>{}</p>".format(gloss.text))
	outfile.write("|END|\n")
