import csv
import os
import json
from pprint import pprint
from itertools import groupby
from operator import itemgetter

from bs4 import BeautifulSoup
import lxml

"""
A Comments is a: {
    'mat': [Listof Strings],
    'lrn': [Listof Strings],
    'prf': [Listof Strings]
}
A Section is a: {
    'code': String,
    'prof': String,
    'UID': String,
    'comments': Comments
}
"""

def get_comments(html):
    """Return comments with each category in a list"""
    soup = BeautifulSoup(open(html, encoding="UTF-8"), "lxml")

    comments = {}
    comments['mat'] = soup.select('#cat_1 tbody a')
    comments['lrn'] = soup.select('#cat_2 tbody a')
    comments['prf'] = soup.select('#cat_3 tbody a')

    # Get the actual text from each of the comments in each of categories
    for cat in comments:
        comments[cat] = [' '.join(comment.stripped_strings) for comment in comments[cat]]

    section = {}
    section['code'] = get_course_id(html)
    section['prof_id'] = get_prof_id(html)
    section['prof_id'] = get_prof_id(html)
    section['UID'] = section['prof_id'] +'-'+ section['code']
    section['comments'] = comments

    return section

def get_course_id(html):
    for course in courses:
        if course["UID"] in html:
            return course["departmentCode"] + course["number"]

def get_prof_id(html):
    for course in courses:
        if course["UID"] in html:
            return course['instructorId']

def is_lecture(file):
    for course in courses:
        if course["UID"] in file:
            return course["type"] == "Lecture"

def get_all_comments(comments_dir):
    """Parse all html files in the comments directory"""
    return [get_comments(os.path.join(comments_dir, file)) for file in os.listdir(comments_dir) if is_lecture(file)]

def merge_comments(comments1, comments2):
    """ Merge a two Comments into a single Comments dictionary"""
    return {category: comments1[category]+comments2[category] for category in comments1}

def extend_section(section1, section2):
    """ Extend a Section by adding the comments of the second section"""
    section1['comments'] = merge_comments(section1['comments'], section2['comments'])
    return section1

def agg_prof_course(sections):
    """ Aggregate all comments for when a prof teaches a certain course"""
    agg_pc = {}
    sorted_sections = sorted(sections, key=itemgetter('UID'))
    grouped = groupby(sorted_sections, key=itemgetter('UID'))
    for UID, group in grouped:
        prof_course = next(group)
        for section in group:
            prof_course = extend_section(prof_course, section)
        agg_pc[UID] = prof_course
    return agg_pc

def agg_prof(pc_sections):
    """ Aggregate just the instructor related questions for each prof"""
    agg_p = {}
    sorted_sections = sorted(pc_sections, key=itemgetter('prof_id'))
    grouped = groupby(sorted_sections, key=itemgetter('prof_id'))
    for prof_id, group in grouped:
        prof = {'prof_id': prof_id, 'UID': prof_id, 'comments': {'prf':[]}}
        for prof_course in group:
            prof = extend_section(prof, prof_course)
        agg_p[prof_id] = prof
    return agg_p

def agg_course(pc_sections):
    """ Aggregate just the learning related questions for each course"""
    agg_c = {}
    sorted_sections = sorted(pc_sections, key=itemgetter('code'))
    grouped = groupby(sorted_sections, key=itemgetter('code'))
    for code, group in grouped:
        course = {'code': code, 'UID': code, 'comments': {'lrn':[]}}
        for prof_course in group:
            course = extend_section(course, prof_course)
        agg_c[code] = course
    return agg_c

import sys
folder = sys.argv[1]
comments_dir = os.path.join(folder, 'comments')
pc_path = os.path.join(folder, 'pc_comments.json')
prof_path = os.path.join(folder, 'prof_comments.json')
course_path = os.path.join(folder, 'course_comments.json')

with open(os.path.join(folder, "courses.csv"), 'r') as infile:
    courses = list(csv.DictReader(infile))

all_sections = get_all_comments(comments_dir)
prof_course_comments = agg_prof_course(all_sections)
prof_comments = agg_prof(prof_course_comments.values())
course_comments = agg_course(prof_course_comments.values())

with open(pc_path, 'w') as outfile:
    json.dump(prof_course_comments, outfile)

with open(prof_path, 'w') as outfile:
    json.dump(prof_comments, outfile)

with open(course_path, 'w') as outfile:
    json.dump(course_comments, outfile)
