import csv
import argparse

class resultsParser:
    def __init__(self, data: str):
        self.data = data


    def parse(self):
        with open(self.data, mode='r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            header = next(reader)
            print(header)

            with open('../Interfaces/resultsInterface.ts', mode='w', encoding='utf-8-sig') as file:
                file.write("export interface resultsInterface {\n")
                file.write("tournamentID: number\n")
                for field in header:
                    if (field.isnumeric):
                        file.write(f"    {field}: number\n")
                    else:
                        file.write(f"    {field}: string\n")
                file.write("}\n")
            for row in reader:
                if "Wisc.-Madison" in row:
                    print(row)

def main():
    argParser = argparse.ArgumentParser()
    argParser.add_argument("csv")
    args = argParser.parse_args()
    dataParser = resultsParser(args.csv)

    dataParser.parse()
    print("yada")

if __name__ == "__main__":
    main()