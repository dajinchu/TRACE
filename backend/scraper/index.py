from elasticsearch import Elasticsearch
import os
import csv

es = Elasticsearch([{'host': '35.237.184.11', 'port': 9200}])


COURSES = os.path.join('sample_data', 'courses.csv')
AGG_COURSE = os.path.join('sample_data', 'sortedbycourse.csv')
AGG_PROF = os.path.join('sample_data', 'sortedbyprof.csv')
AGG_PROF_COURSE = os.path.join('sample_data', 'sortedbycourse_prof.csv')

def get_metric(prof, code):
    for metric in agg_prof_course:
        if metric['prof'] == prof and metric['code'] == code:
            return metric

def get_instructor_ID(prof_name):
    for meta in courses:
        if meta['instructorName'] == prof_name:
            return meta['instructorId']

METRICS = ["lecture", "workload", "personality", "overall", "challenge", "learning"]
def just_metrics(metric_row):
    return {key:metric_row[key] for key in METRICS}


with open(COURSES, 'r') as coursesfile,\
        open(AGG_COURSE, 'r') as agg_coursefile,\
        open(AGG_PROF, 'r') as agg_proffile,\
        open(AGG_PROF_COURSE, 'r') as agg_prof_coursefile:
    courses = list(csv.DictReader(coursesfile))
    agg_course = list(csv.DictReader(agg_coursefile))
    agg_prof = list(csv.DictReader(agg_proffile))
    agg_prof_course = list(csv.DictReader(agg_prof_coursefile))

    # get metrics for the courses, with detailed info on the profs_course for each course
    for metrics in agg_course:
        code = metrics['code']
        metas = [section for section in courses if section['schoolCode']+section['number']==code]
        UID = metas[0]['UID']
        name = metas[0]['name'] # get full name
        avg = dict(metrics)
        avg.pop('code')


        profs = [{'UID': get_instructor_ID(pc_metric['prof']),'name': pc_metric['prof'], 'metrics': just_metrics(pc_metric)}
                 for pc_metric in agg_prof_course if pc_metric['code'] == code]

        print(UID)
        document = {
            'type': 'course',
            'UID': UID,
            'code': code,
            'name': name,
            'metrics': avg,
            'profs': profs
        }
        es.index(index='courses', id=UID, doc_type='_doc', body=document)

    for p_metric in agg_prof:
        UID = get_instructor_ID(p_metric['prof']);
        document = {
            'type': 'prof',
            'UID': UID,
            'name': p_metric['prof'],
            'metrics': just_metrics(p_metric)
        }
        es.index(index='profs', id=UID, doc_type='_doc', body=document) 



