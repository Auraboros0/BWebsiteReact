import csv
import argparse
import json
import os

class teamResultsParser:
    def __init__(self, data: str):
        self.data = data

    def is_number(self, s: str):
        try:
            float(s)
            return True
        except ValueError:
            return False

    def parse(self):
        with open(self.data, mode='r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            header = next(reader)
            allStats = []

            for i in range(len(header)):
                header[i] = header[i].replace(" ", "_")

            for row in reader:
                allStats.append(row)
            print("[")

            for index, row in enumerate(allStats):
                print("{")
                # print(f'"tournamentName": "{file_name}",')
                for i in range(len(row)):
                    if i == len(row) - 1:
                        if self.is_number(row[i]):
                            print(f'"{header[i]}": {row[i]} ')
                        else:
                            print(f'"{header[i]}": "{row[i]}" ')
                    else:
                        if self.is_number(row[i]):
                            print(f'"{header[i]}": {row[i]}, ')
                        else:
                            print(f'"{header[i]}": "{row[i]}", ')
                if index != len(allStats) - 1:
                    print("},")
                else:
                    print("}")
            print("]")

def main():
    argParser = argparse.ArgumentParser()
    argParser.add_argument("csv")
    args = argParser.parse_args()
    dataParser = teamResultsParser(args.csv)

    dataParser.parse()

if __name__ == "__main__":
    main()