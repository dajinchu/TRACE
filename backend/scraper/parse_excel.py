from statistics import median

import xlrd
from collections import OrderedDict
import json

def parse_excel(file):
    # Open the workbook and select the first worksheet
    wb = xlrd.open_workbook(file)
    sh = wb.sheet_by_index(0)
    # List to hold dictionaries
    question_list = []
    # Iterate through each row in worksheet and fetch values into dict
    for rownum in range(11, 40):
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

    lecture_effectiveness_vals = ["lectures", "in-class", "communication skills", "communication", "preparation",
                                  "effective use of time", "feedback", "action to help understand"]
    workload_vals = ["hours devoted to course"]
    personality_vals = ["communication skills", "feedback", "respect", "action to help understand", "availability",
                        "enthusiasm"]
    overall_vals = ["recommendation", "overall rating of teaching"]
    challenge_vals = ["challenging", "performance evaluation"]
    learning_value_vals = ["fieldwork", "lectures", "in-class", "learning amount", "application", "feedback",
                           "action to help understand"]

    lecture_effectiveness = 0
    workload = 0
    personality = 0
    overall = 0
    challenge = 0
    learning_value = 0

    for dimension in question_list:
        if (dimension["5"] + dimension["4"] + dimension["3"] + dimension["2"] + dimension["1"]) != 0:
            avg = (dimension["5"] * 5 + dimension["4"] * 4 + dimension["3"] * 3 + dimension["2"] * 2 +
                   dimension["1"]) /(dimension["5"] + dimension["4"] + dimension["3"] + dimension["2"] + dimension["1"])
        else:
            avg = 0
        if dimension["quest-abbrv"] in lecture_effectiveness_vals:
            lecture_effectiveness += avg
        if dimension["quest-abbrv"] in personality_vals:
            personality += avg
        if dimension["quest-abbrv"] in overall_vals:
            overall += avg
        if dimension["quest-abbrv"] in challenge_vals:
            challenge += avg
        if dimension["quest-abbrv"] in learning_value_vals:
            learning_value += avg
        if dimension["quest-abbrv"] in workload_vals:
            hours = []
            for x in range(0, int(dimension["5"])):
                hours.append(20)
            for x in range(0, int(dimension["4"])):
                hours.append(16)
            for x in range(0, int(dimension["3"])):
                hours.append(12)
            for x in range(0, int(dimension["2"])):
                hours.append(8)
            for x in range(0, int(dimension["1"])):
                hours.append(4)
            workload = median(hours)

    lecture_effectiveness = lecture_effectiveness / len(lecture_effectiveness_vals)
    workload = workload / len(workload_vals)
    personality = personality / len(personality_vals)
    overall = overall / len(overall_vals)
    challenge = challenge / len(challenge_vals)
    learning_value = learning_value / len(learning_value_vals)

    print(lecture_effectiveness, workload, personality, overall, challenge, learning_value)