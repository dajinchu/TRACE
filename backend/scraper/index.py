from elasticsearch import Elasticsearch
import os
import csv
client = Elasticsearch()

COURSES = os.path.join('sample_data', 'courses.csv')
AGG_COURSE = os.path.join('sample_data', 'sortedbycourse.csv')
AGG_PROF = os.path.join('sample_data', 'sortedbyprof.csv')
AGG_PROF_COURSE = os.path.join('sample_data', 'sortedbycourse_prof.csv')

with open(COURSES, 'r') as coursesfile,\
        open(AGG_COURSE, 'r') as agg_coursefile,\
        open(AGG_PROF, 'r') as agg_proffile,\
        open(AGG_PROF_COURSE, 'r') as agg_prof_coursefile:
    courses = list(csv.DictReader(coursesfile))
    agg_course = list(csv.DictReader(agg_prof_coursefile))
    agg_prof = list(csv.DictReader(agg_proffile))
    agg_prof_course = list(csv.DictReader(agg_prof_coursefile))
    print(courses[0])
    for course in agg_course:
        code = course['Course']
        meta = next(x for x in courses if x['schoolCode']+x['number']==code)
        print(meta)
        UID = meta['UID']
        name = meta['name']
        avg = {
            "lecture": course



