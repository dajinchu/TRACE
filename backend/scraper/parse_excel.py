import csv
import os
from statistics import median

import xlrd
from collections import OrderedDict
import json

from operator import add

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

    question_averages = {}

    for dimension in question_list:
        if dimension["quest-abbrv"] == "hours devoted to course":
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
            if hours:
                avg = median(hours)
            else:
                avg = -1
        elif (dimension["5"] + dimension["4"] + dimension["3"] + dimension["2"] + dimension["1"]) != 0:
            avg = (dimension["5"] * 5 + dimension["4"] * 4 + dimension["3"] * 3 + dimension["2"] * 2 +
                   dimension["1"]) /(dimension["5"] + dimension["4"] + dimension["3"] + dimension["2"] + dimension["1"])
        else:
            avg = 0
        
        question_averages[dimension["quest-abbrv"]] = avg


#    lecture_effectiveness = lecture_effectiveness / len(lecture_effectiveness_vals)
#    workload = workload / len(workload_vals)
#    personality = personality / len(personality_vals)
#    overall = overall / len(overall_vals)
#    challenge = challenge / len(challenge_vals)
#    learning_value = learning_value / len(learning_value_vals)

#    return [lecture_effectiveness, workload, personality, overall, challenge, learning_value]
    return question_averages

def get_prof(file):
    for course in courses:
        if course["UID"] in file:
            return course['instructorName']

def get_prof_id(file):
    for course in courses:
        if course["UID"] in file:
            return course['instructorId']

def get_course_name(file):
    for course in courses:
        if course["UID"] in file:
            return course["departmentCode"] + course["number"]

def is_lecture(file):
    for course in courses:
        if course["UID"] in file:
            return course["type"] == "Lecture"
    raise Exception("Course not found in courses.csv")


METRICS = ["syllabus", "textbook", "online materials", "fieldwork", "lectures", "in-class", "classroom technology",
"challenging", "learning amount", "application", "expression", "analysis", "communication skills", "communication",
"objectives", "syllabus", "preparation", "effective use of time", "feedback", "performance evaluation", "recommendation",
"respect", "action to help understand", "availability", "enthusiasm", "overall rating of teaching", "hours devoted to course"]



def prof_aggregate(outpath):
    with open(outpath, 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(["prof_id"]+METRICS)
        sorted = sort_by_prof()
        prof_id = sorted[0][0]
        count = 0
        aggs = [0]*6
        for row in sorted:
            if row[0] == prof_id:
                aggs = list(map(add, aggs, row[2:8]))
                count = count+1
            else:
                writer.writerow([prof_id] + [agg/count for agg in aggs])
                prof_id = row[0]
                aggs = row[2:8]
                count = 1
        writer.writerow([prof_id] + [agg / count for agg in aggs])



def course_aggregate(outpath):
    with open(outpath, 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(["code"]+METRICS)
        sorted = sort_by_course()
        course_name = sorted[0][1]
        count = 0
        aggs = [0]*6
        for row in sorted:
            if row[1] == course_name:
                aggs = list(map(add, aggs, row[2:8]))
                count = count+1
            else:
                writer.writerow([course_name] + [agg/count for agg in aggs])
                course_name = row[1]
                aggs = row[2:8]
                count = 1
        writer.writerow([course_name] + [agg / count for agg in aggs])

def course_prof_aggregate(outpath):
    with open(outpath, 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(["prof_id","code"]+METRICS)
        sorted = sort_by_prof_course()
        prof_course = sorted[0][0:2]
        count = 0
        aggs = [0]*6
        for row in sorted:
            if row[0:2] == prof_course:
                aggs = list(map(add, aggs, row[2:8]))
                count = count+1
            else:
                writer.writerow(row[0:2] + [agg/count for agg in aggs])
                prof_course = row[0:2]
                aggs = row[2:8]
                count = 1
        writer.writerow(row[0:2] + [agg / count for agg in aggs])


def sort_by_prof():
    return sorted(ratings, key=lambda row: row[0])

def sort_by_course():
    return sorted(ratings, key=lambda row: row[1])

def sort_by_prof_course():
    return sorted(ratings, key=lambda row: (row[0], row[1]))


if __name__ == '__main__':
    import sys
    import json
    folder = sys.argv[1]
    ratings_dir = os.path.join(folder,'ratings')
    outpath = os.path.join(folder,"ratings.json")
    ratings = []
    with open(outpath, 'w', newline='') as outfile, \
        open(os.path.join(folder, 'courses.csv')) as coursesfile:
        courses = list(csv.DictReader(coursesfile))
        for filename in os.listdir(ratings_dir):
            if is_lecture(filename):
                file = os.path.join(ratings_dir, filename)
                metrics = parse_excel(file)
                prof_id = get_prof_id(file)
                course_name = get_course_name(file)
                ratings.append({"prof_id":prof_id, "code":course_name, "metrics": metrics})
        json.dump(ratings, outfile)
        """
        course_aggregate(os.path.join(folder, 'sortedbycourse.json'))
        prof_aggregate(os.path.join(folder, 'sortedbyprof.json'))
        course_prof_aggregate(os.path.join(folder, 'sortedbycourse_prof.json'))

"""