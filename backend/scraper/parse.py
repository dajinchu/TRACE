import xlrd
from collections import OrderedDict
import json
# Open the workbook and select the first worksheet
wb = xlrd.open_workbook('./sample_data/CS110015Lecture-GhitaAmor-Tijani-Fall_2018-Ratings_summary_w_CRN.xls')
sh = wb.sheet_by_index(0)
# List to hold dictionaries
question_list = []
# Iterate through each row in worksheet and fetch values into dict
for rownum in range(0, 40):
    question = {}
    row_values = sh.row_values(rownum)
    question['quest-abbrv'] = row_values[1]
    question['5'] = row_values[3]
    question['4'] = row_values[4]
    question['3'] = row_values[5]
    question['2'] = row_values[6]
    question['1'] = row_values[7]
    question_list.append(question)
overall = {}
overall_row = sh.row_values(41)
overall['quest-abbrv'] = overall_row[1]
overall['5'] = overall_row[3]
overall['4'] = overall_row[4]
overall['3'] = overall_row[5]
overall['2'] = overall_row[6]
overall['1'] = overall_row[7]
question_list.append(overall)
workload = {}
workload_row = sh.row_values(46)
workload['quest-abbrv'] = workload_row[1]
workload['5'] = workload_row[3]
workload['4'] = workload_row[4]
workload['3'] = workload_row[5]
workload['2'] = workload_row[6]
workload['1'] = workload_row[7]
question_list.append(workload)
# Serialize the list of dicts to JSON
j = json.dumps(question_list)
# Write to file
with open('data.json', 'w') as f:
    f.write(j)
