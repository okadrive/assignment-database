import urllib.request, urllib.error
from bs4 import BeautifulSoup
import csv

# アクセスするURL
url = "https://gamewith.jp/pokemon-usum/article/show/79582"
# URLを開く
html = urllib.request.urlopen(url)
# BeautifulSoupで開く
soup = BeautifulSoup(html, "html.parser")

# HTMLからタグを絞りこんでいく
table = soup.findAll("table", {"class":"sorttable"})[0]
weapon_rows = table.findAll("tr")
# 配列の作成
csv_list = []
for weapon in weapon_rows:
    weapon_name = weapon.get("data-col1")
    weapon_type = weapon.get("data-col2")
    weapon_force = weapon.get("data-col3")
    weapon_hitrate = weapon.get("data-col4")
    weapon_pp = weapon.get("data-col5")
    add_list = [weapon_name, weapon_type, weapon_force, weapon_hitrate, weapon_pp]
    csv_list.append(add_list)
# CSVファイルを開く。ファイルがなければ新規作成する。
with open('weapon.csv', "w", encoding="cp932") as file:
    writecsv = csv.writer(file, lineterminator='\n')
    writecsv.writerows(csv_list)
    file.close()
