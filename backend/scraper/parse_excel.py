import csv
import os
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

    overall_row = sh.row_values(37)
    workload_row = sh.row_values(42)
    end_range = 35

    if 350.0 in sh.col_values(0):
        overall_row = sh.row_values(41)
        workload_row = sh.row_values(46)
        end_range = 40


    # Iterate through each row in worksheet and fetch values into dict
    for rownum in range(11, end_range):
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
    overall['quest-abbrv'] = overall_row[1]
    overall['5'] = overall_row[3]
    overall['4'] = overall_row[4]
    overall['3'] = overall_row[5]
    overall['2'] = overall_row[6]
    overall['1'] = overall_row[7]
    question_list.append(overall)
    workload = {}

    workload['quest-abbrv'] = workload_row[1]
    workload['5'] = workload_row[3]
    workload['4'] = workload_row[4]
    workload['3'] = workload_row[5]
    workload['2'] = workload_row[6]
    workload['1'] = workload_row[7]
    question_list.append(workload)

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

    return [lecture_effectiveness, workload, personality, overall, challenge, learning_value]

def get_prof(file):
    # Open the workbook and select the first worksheet
    wb = xlrd.open_workbook(file)
    sh = wb.sheet_by_index(0)
    return sh.row_values(3)[1]

def get_course_name(file):
    # Open the workbook and select the first worksheet
    with open("./sample_data/courses.csv", 'r') as infile:
        reader = csv.DictReader(infile)
        next(reader)
        for line in reader:
            if line["UID"] in file:
                return line["schoolCode"] + line["number"]

def is_lecture(file):
    with open("./sample_data/courses.csv", 'r') as infile:
        reader = csv.DictReader(infile)
        next(reader)
        for line in reader:
            if line["UID"] in file:
                return line["type"] == "Lecture"

def sort_by_prof():
    with open("./ratings.csv", 'r') as infile:
        reader = csv.reader(infile)
        next(reader)
        sorted_list = sorted(reader, key=lambda row: row[0])
    return sorted_list

#AGGREGATE FUNC
def aggregate(outfile, aggregate_by, aggregate_column):
    with open(outfile, 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        prof_name = ""
        agg_le, agg_w, agg_p, agg_o, agg_c, agg_lv, count = 0, 0, 0, 0, 0, 0, 0
        for row in sort_by_prof():
            if row[0] == prof_name:
                agg_le = agg_le + float(row[2])
                agg_w = agg_w + float(row[3])
                agg_p = agg_p + float(row[4])
                agg_o = agg_o + float(row[5])
                agg_c = agg_c + float(row[6])
                agg_lv = agg_lv + float(row[7])
                count = count+1
            else:
                if count == 0:
                    writer.writerow(
                        ["Prof", "Course", "Lecture Effective", "Workload", "Personality", "Overall", "Challenge",
                         "Learning Value"])
                else:
                    writer.writerow(
                        [prof_name, row[1], agg_le / count, agg_w / count, agg_p / count, agg_o / count, agg_c / count,
                         agg_lv / count])
                prof_name = row[0]
                agg_le = float(row[2])
                agg_w = float(row[3])
                agg_p = float(row[4])
                agg_o = float(row[5])
                agg_c = float(row[6])
                agg_lv = float(row[7])
                count = 1
        writer.writerow(
            [prof_name, row[1], agg_le / count, agg_w / count, agg_p / count, agg_o / count, agg_c / count,
             agg_lv / count])





def prof_aggregate():
    with open("sortedbyprof.csv", 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        prof_name = ""
        agg_le, agg_w, agg_p, agg_o, agg_c, agg_lv, count = 0, 0, 0, 0, 0, 0, 0
        for row in sort_by_prof():
            if row[0] == prof_name:
                agg_le = agg_le + float(row[2])
                agg_w = agg_w + float(row[3])
                agg_p = agg_p + float(row[4])
                agg_o = agg_o + float(row[5])
                agg_c = agg_c + float(row[6])
                agg_lv = agg_lv + float(row[7])
                count = count+1
            else:
                if count == 0:
                    writer.writerow(
                        ["Prof", "Course", "Lecture Effective", "Workload", "Personality", "Overall", "Challenge",
                         "Learning Value"])
                else:
                    writer.writerow(
                        [prof_name, row[1], agg_le / count, agg_w / count, agg_p / count, agg_o / count, agg_c / count,
                         agg_lv / count])
                prof_name = row[0]
                agg_le = float(row[2])
                agg_w = float(row[3])
                agg_p = float(row[4])
                agg_o = float(row[5])
                agg_c = float(row[6])
                agg_lv = float(row[7])
                count = 1
        writer.writerow(
            [prof_name, row[1], agg_le / count, agg_w / count, agg_p / count, agg_o / count, agg_c / count,
             agg_lv / count])



def course_aggregate():
    with open("sortedbycourse.csv", 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        course_name = ""
        agg_le, agg_w, agg_p, agg_o, agg_c, agg_lv, count = 0, 0, 0, 0, 0, 0, 0
        for row in sort_by_prof():
            if row[1] == course_name:
                agg_le = agg_le + float(row[2])
                agg_w = agg_w + float(row[3])
                agg_p = agg_p + float(row[4])
                agg_o = agg_o + float(row[5])
                agg_c = agg_c + float(row[6])
                agg_lv = agg_lv + float(row[7])
                count = count+1
            else:
                if count == 0:
                    writer.writerow(
                        ["Prof", "Course", "Lecture Effective", "Workload", "Personality", "Overall", "Challenge",
                         "Learning Value"])
                else:
                    writer.writerow(
                        [course_name, row[1], agg_le / count, agg_w / count, agg_p / count, agg_o / count, agg_c / count,
                         agg_lv / count])
                course_name = row[0]
                agg_le = float(row[2])
                agg_w = float(row[3])
                agg_p = float(row[4])
                agg_o = float(row[5])
                agg_c = float(row[6])
                agg_lv = float(row[7])
                count = 1
        writer.writerow(
            [course_name, row[1], agg_le / count, agg_w / count, agg_p / count, agg_o / count, agg_c / count,
             agg_lv / count])



def sort_by_course():
    with open("./ratings.csv", 'r') as infile:
        reader = csv.reader(infile)
        next(reader)
        sorted_list = sorted(reader, key=lambda row: row[1])
    return sorted_list


if __name__ == '__main__':
    ratings_dir = './ratings'
    with open("ratings.csv", 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(["Prof", "Course", "Lecture Effective", "Workload", "Personality", "Overall", "Challenge", "Learning Value"])
        for filename in os.listdir(ratings_dir):
            if is_lecture(filename):
                file = "./ratings/" + filename
                metrics = parse_excel(file)
                prof = get_prof(file)
                course_name = get_course_name(file)
                writer.writerow([prof] + [course_name] + metrics)

    prof_aggregate()
    course_aggregate()

