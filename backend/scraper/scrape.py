import csv
import json
import os
import time
from pprint import pprint

import requests
from dotenv import load_dotenv

from login import login


def save_req(r, filename):
    with open(filename, 'wb') as handle:
        for block in r.iter_content(1024):
            handle.write(block)

COURSE_KEYS = ['UID', 'id', 'instructorId', 'termId', 'schoolCode', 'number', 'section', 'type']
def get_courses_page(n):
    query = {
        'excludeTA': 'false',
        'page': str(n),
        'rpp': 450,
        'schoolCodes': 'CS',
        'termId': 87
    }
    url = 'https://www.applyweb.com/eval/new/reportbrowser/evaluatedCourses'
    r = requests.get(url, cookies=cookies, headers=headers, params=query)
    course_info = r.json()['data']
    for course in course_info:
        course['UID'] = '%i-%i-%i'%(course['id'], course['instructorId'], course['termId'])
    course_info = [{key: course[key] for key in COURSE_KEYS} for course in course_info]
    print(len(course_info))
    return course_info

def get_all_courses():
    courses = []
    page_num = 1
    while True:
        print("scraping page ", page_num)
        page = get_courses_page(page_num)
        courses.extend(page)
        if not page:
            break
        page_num += 1
        time.sleep(1)

    with open('sample_data/F18CS_courses.csv', 'w') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=COURSE_KEYS)
        writer.writeheader()
        for course in courses:
            writer.writerow(course)
    with open('sample_data/F18CS_courses.json', 'w') as outfile:
        json.dump(courses, outfile)


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
    r = requests.get(url, cookies=cookies, headers=headers, params=query)
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
    r = requests.get(url, cookies=cookies, headers=headers, params=query)
    return r.content

def download_all_course_excel(courses):
    """Save all ratings excel sheets for the given courses"""
    for cinfo in courses:
        path = 'ratings/'+cinfo['UID']+'.xls'
        if not os.path.exists(path):
            print("downloading ratings for "+cinfo["id"])
            excel = get_ratings_summary_excel(cinfo)
            with open(path, 'wb') as xlsfile:
                xlsfile.write(excel)
                time.sleep(3)

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
    r = requests.get(url, cookies=cookies, headers=headers, params=query)
    return r.content

def download_all_comments(courses):
    """Save all comment HTML documents for the given courses"""
    for cinfo in courses:
        path = 'comments/'+cinfo['UID']+'.html'
        if not os.path.exists(path):
            print("downloading comments for "+cinfo["id"])
            html = get_comments_html(cinfo)
            with open(path, 'wb') as htmlfile:
                htmlfile.write(html)
                time.sleep(3)


load_dotenv()
username = os.getenv('NEU_USER')
password = os.getenv('NEU_PASS')

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:66.0) Gecko/20100101 Firefox/66.0'
}
cookies = login(username, password)

with open('sample_data/F18CS_courses.csv', 'r') as infile:
    reader = csv.DictReader(infile)
    next(reader)
    download_all_comments(reader)

'''
r = requests.get(url_course_search(2), cookies=cookies, headers=headers)
pprint(r.json()['data'][0])

https://www.applyweb.com/eval/new/reportbrowser/evaluatedCourses?excludeTA=false&page=2&rpp=15&termId=0
https://www.applyweb.com/eval/new/reportbrowser/evaluatedCourses?excludeTA=false&page=3&rpp=15&termId=0
https://www.applyweb.com/eval/new/reportbrowser/evaluatedCourses?excludeTA=false&page=3&rpp=15&schoolCodes=CS&termId=0
'''
