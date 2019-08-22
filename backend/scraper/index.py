from elasticsearch import Elasticsearch
import os
import csv
import json
from dotenv import load_dotenv

load_dotenv()
USERNAME = os.getenv('es_user')
PASSWORD = os.getenv('es_pass')

es = Elasticsearch(['https://trace.sandboxneu.com/'], http_auth=(USERNAME, PASSWORD))

import sys
folder = sys.argv[1]
COURSES = os.path.join(folder, 'courses.csv')
AGG_COURSE = os.path.join(folder, 'sortedbycourse.json')
AGG_PROF = os.path.join(folder, 'sortedbyprof.json')
AGG_PROF_COURSE = os.path.join(folder, 'sortedbycourse_prof.json')
COMMENTS_COURSE = os.path.join(folder, 'course_comments.json')
COMMENTS_PROF = os.path.join(folder, 'prof_comments.json')
COMMENTS_PROF_COURSE = os.path.join(folder, 'pc_comments.json')

def get_instructor_name(prof_id):
    for meta in courses:
        if meta['instructorId'] == prof_id:
            return meta['instructorName']

def get_course_name(code):
    return next(c['name'] for c in courses if c['departmentCode']+c['number']==code)

METRICS = ["syllabus", "textbook", "online materials", "fieldwork", "lectures", "in-class", "classroom technology",
"challenging", "learning amount", "application", "expression", "analysis", "communication skills", "communication",
"objectives", "syllabus", "preparation", "effective use of time", "feedback", "performance evaluation", "recommendation",
"respect", "action to help understand", "availability", "enthusiasm", "overall rating of teaching", "hours devoted to course"]

def just_metrics(metric_row):
    return metric_row['metrics']

def index_courses():
    # get metrics for the courses, with detailed info on the profs_course for each course
    for metrics in agg_course:
        code = metrics['code']
        name = get_course_name(code)
        avg = metrics['metrics']

        profs = [{'UID': pc_metric['prof_id'],
                  'name': get_instructor_name(pc_metric['prof_id']),
                  'metrics': just_metrics(pc_metric)}
                 for pc_metric in agg_prof_course if pc_metric['code'] == code]
        comments = comments_course[code]['comments']['lrn'][0:3]

        document = {
            'type': 'course',
            'comments': comments,
            'UID': code,
            'code': code,
            'name': name,
            'metrics': avg,
            'profs': profs
        }
        es.index(index='courses', id=code, doc_type='_doc', body=document)

def index_profs():
    for p_metric in agg_prof:
        UID = p_metric['prof_id']
        document = {
            'type': 'prof',
            'UID': UID,
            'name': get_instructor_name(p_metric['prof_id']),
            'metrics': just_metrics(p_metric)
        }
        es.index(index='profs', id=UID, doc_type='_doc', body=document) 

def index_prof_courses():
    """Index the intersection of profs and courses"""
    for pc_metric in agg_prof_course:
        UID = pc_metric['prof_id']+'-'+pc_metric['code']
        code = pc_metric['code']
        prof = get_instructor_name(pc_metric['prof_id'])
        document = {
            'UID': UID,
            'profID': get_instructor_name(prof),
            'courseID': code,
            'courseName': get_course_name(code),
            'profName': prof,
            'metrics': just_metrics(pc_metric),
            'comments': ['placeholder']
        }
        es.index(index='pc', id=UID, doc_type='_doc', body=document)

with open(COURSES, 'r') as coursesfile,\
        open(AGG_COURSE, 'r') as agg_coursefile,\
        open(AGG_PROF, 'r') as agg_proffile,\
        open(AGG_PROF_COURSE, 'r') as agg_prof_coursefile,\
        open(COMMENTS_COURSE, 'r') as cc_file,\
        open(COMMENTS_PROF, 'r') as cp_file,\
        open(COMMENTS_PROF_COURSE, 'r') as cpc_file:
    courses = list(csv.DictReader(coursesfile))
    agg_course = json.load(agg_coursefile)
    agg_prof = json.load(agg_proffile)
    agg_prof_course = json.load(agg_prof_coursefile)
    comments_course = json.load(cc_file)
    comments_prof = json.load(cp_file)
    comments_prof_course = json.load(cpc_file)
    index_profs()
    index_courses()



