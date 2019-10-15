import urllib.request, urllib.error
from bs4 import BeautifulSoup
import csv

# アクセスするURL
# url="https://wiki.xn--rckteqa2e.com/wiki/%E3%83%9D%E3%82%B1%E3%83%A2%E3%83%B3%E4%B8%80%E8%A6%A7"
url="file:///Users/okapy/Desktop/lab/m1-class/データベース特論/assignment/03/pokemon_all.html"
# URLを開く
html = urllib.request.urlopen(url)
# BeautifulSoupで開く
soup = BeautifulSoup(html, "html.parser")

# HTMLからタグを絞りこんでいく
table = soup.find("table")
# table = soup.find("table", {"class":"jquery-tablesorter"})
poke_rows = table.findAll("tr")
# 配列の作成
csv_list = []
for i, poke in enumerate(poke_rows):
    cols = poke.findAll("td")
    if not cols:
        continue
    poke_num = cols[0].text.strip()
    poke_name = cols[1].find("a").get("title")
    add_list = [poke_num, poke_name]
    if cols[2].find("a"):
        poke_type1 = cols[2].find("a").get("title")
        add_list.append(poke_type1)
    if cols[3].find("a"):
        poke_type2 = cols[3].find("a").get("title")
        add_list.append(poke_type2)
    csv_list.append(add_list)
# CSVファイルを開く。ファイルがなければ新規作成する。
with open('pokemon.csv', "w", encoding="cp932", errors="replace") as file:
    writecsv = csv.writer(file, lineterminator='\n')
    writecsv.writerows(csv_list)
    file.close()
