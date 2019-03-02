"""
Build data for lab 3
"""

import csv
import json

CSVFILE = open("./all_stocks_5yr.csv", "r")
JSONFILE = open("./json-data.json", "w")

FILEDNAMES = ("date", "open", "high", "low", "close", "volume", "Name")
READER = csv.DictReader(CSVFILE, FILEDNAMES)
ACCEPTED_COMPANIES = {"UAL": True, "DAL": True}
# ACCEPTED_COMPANIES = {"NFLX": True, "GOOG": True, "TRIP": True, "MSFT": True}
# JSONFILE.write("[")
COMPANIES = {}
RESULTS = []
for row in READER:
    if row["Name"] in ACCEPTED_COMPANIES:
        RESULTS.append(row)
        # COMPANIES[row["Name"]] = True

json.dump(RESULTS, JSONFILE)
# print COMPANIES.keys()
# JSONFILE.write("]")
