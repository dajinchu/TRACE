import csv
import sys
import json
import os
import time
from pprint import pprint
import random

from dotenv import load_dotenv

from login import login, auth_get


def save_req(r, filename):
    with open(filename, 'wb') as handle:
        for block in r.iter_content(1024):
            handle.write(block)


# PROBABLY NOT NEEDED
def get_instructor_report_html(courseinfo):
    query = {
        'embedded': 'true',
        'r': '3',
        'c': courseinfo['id'],
        'i': courseinfo['instructorId'],
        't': courseinfo['termId']
    }
    url = 'https://www.applyweb.com/eval/new/showreport'
    r = auth_get(url, params=query)
    return r.text


def get_ratings_summary_excel(courseinfo):
    """Get ratings excel sheet for a given course"""
    query = {
        'd': 'false',
        'r': '2',
        'c': courseinfo['id'],
        'i': courseinfo['instructorId'],
        't': courseinfo['termId']
    }
    url = 'https://www.applyweb.com/eval/new/showreport/excel'
    r = auth_get(url, params=query)
    return r.content

def download_all_course_excel(courses, folder):
    """Save all ratings excel sheets for the given courses"""
    for cinfo in courses:
        path = os.path.join(folder, 'ratings', cinfo['UID']+'.xls')
        if not os.path.exists(path):
            print("downloading ratings for "+cinfo["id"])
            excel = get_ratings_summary_excel(cinfo)
            with open(path, 'wb') as xlsfile:
                xlsfile.write(excel)
                time.sleep(random.uniform(1,2))

def get_comments_html(courseinfo):
    """Get comments for a given course"""
    query = {
        'd': 'true',
        'r': '9',
        'c': courseinfo['id'],
        'i': courseinfo['instructorId'],
        't': courseinfo['termId']
    }
    url = 'https://www.applyweb.com/eval/new/showreport'
    r = auth_get(url, params=query)
    return r.content

def download_all_comments(courses, folder):
    """Save all comment HTML documents for the given courses"""
    for cinfo in courses:
        path = os.path.join(folder, 'comments', cinfo['UID']+'.html')
        if not os.path.exists(path):
            print("downloading comments for "+cinfo["id"])
            html = get_comments_html(cinfo)
            with open(path, 'wb') as htmlfile:
                htmlfile.write(html)
                time.sleep(random.uniform(1,2))



with open(os.path.join(sys.argv[1],'courses.csv'), 'r') as infile:
    reader = csv.DictReader(infile)
    next(reader)
    files = list(reader)
    download_all_comments(files, sys.argv[1])
    download_all_course_excel(files, sys.argv[1])
