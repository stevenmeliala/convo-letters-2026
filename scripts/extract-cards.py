"""Extract the graduation cards from the original Excel responses."""

import json
from pathlib import Path
import posixpath
import re
import sys
from urllib.parse import parse_qs, urlsplit
import xml.etree.ElementTree as ET
from zipfile import ZipFile


GRADUATES = {
    "andrew": "Andrew",
    "gideon": "Gideon",
    "gerry": "Gerry",
    "erin": "Erin",
    "ling-hui": "Ling Hui",
    "tian-kuan": "Tian Kuan",
    "joseph-ng": "Joseph Ng",
}
SENDER_HEADER = "Your name or some random alias if you want to stay anonymous🗿"
MEMORY_HEADER = "Leave any of your favourite memories or pictures with our graduating seniors here!"


def text(element):
    return "".join(node.text or "" for node in element.findall("./{*}t") + element.findall("./{*}r/{*}t"))


def read_rows(workbook):
    with ZipFile(workbook) as archive:
        sheets = ET.fromstring(archive.read("xl/workbook.xml"))
        sheet = sheets.find(".//{*}sheet[@name='Form responses 1']")
        if sheet is None:
            raise ValueError("Missing sheet: Form responses 1")
        relationship_id = next(value for key, value in sheet.attrib.items() if key.endswith("}id"))
        relationships = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
        target = relationships.find(f"./{{*}}Relationship[@Id='{relationship_id}']").attrib["Target"]
        sheet_path = target.lstrip("/") if target.startswith("/") else posixpath.normpath(f"xl/{target}")
        sheet_xml = ET.fromstring(archive.read(sheet_path))
        shared_strings = []
        if "xl/sharedStrings.xml" in archive.namelist():
            strings_xml = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            shared_strings = [text(element) for element in strings_xml]

    for row in sheet_xml.findall(".//{*}row"):
        values = {}
        for cell in row.findall("./{*}c"):
            value = cell.findtext("./{*}v", default="")
            if cell.get("t") == "s":
                value = shared_strings[int(value)]
            elif cell.get("t") == "inlineStr":
                value = text(cell.find("./{*}is"))
            values[cell.attrib["r"].rstrip("0123456789")] = value
        yield row.attrib["r"], values


def drive_links(value):
    for candidate in re.findall(r'https://[^\s<>"]+', value):
        url = urlsplit(candidate)
        if url.hostname != "drive.google.com":
            continue
        file_match = re.fullmatch(r"/file/d/([\w-]+)(?:/view)?/?", url.path)
        file_id = file_match[1] if file_match else parse_qs(url.query).get("id", [""])[0]
        if re.fullmatch(r"[\w-]+", file_id):
            yield f"https://drive.google.com/file/d/{file_id}/view"


def extract(workbook):
    rows = read_rows(workbook)
    _, headers = next(rows)
    if headers.get("B") != SENDER_HEADER or headers.get("C") != MEMORY_HEADER:
        raise ValueError("Unexpected sender or memories column")
    columns = {value.strip(): column for column, value in headers.items()}
    message_columns = {slug: columns[f"Message for {name}"] for slug, name in GRADUATES.items()}
    cards = {slug: {"name": name, "messages": []} for slug, name in GRADUATES.items()}
    memories = []

    for row_number, values in rows:
        sender = values.get("B", "")
        for slug, column in message_columns.items():
            message = values.get(column, "")
            if message.strip():
                if not sender.strip():
                    raise ValueError(f"Missing sender on response row {row_number}")
                cards[slug]["messages"].append({"sender": sender, "text": message})
        for url in drive_links(values.get("C", "")):
            memories.append({"sender": sender, "url": url})

    return {"cards": cards, "memories": memories}


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python3 scripts/extract-cards.py /path/to/responses.xlsx")
    dataset = extract(sys.argv[1])
    output = Path(__file__).resolve().parents[1] / "src/data/cards.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(dataset, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for slug, card in dataset["cards"].items():
        print(f"{slug}: {len(card['messages'])} messages")
    print(f"Shared memories: {len(dataset['memories'])} links")
