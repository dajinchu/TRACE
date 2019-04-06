import csv
import json
import os
import time

import requests
from dotenv import load_dotenv

from login import login

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:66.0) Gecko/20100101 Firefox/66.0'
}

COURSE_KEYS = ['UID', 'id', 'instructorId', 'termId', 'schoolCode', 'number', 'section', 'type']
def get_courses_page(n, term):
    """https://www.applyweb.com/eval/new/reportbrowser/evaluatedCourses?excludeTA=false&page=1&rpp=15&termId=0"""
    query = {
        'excludeTA': 'false',
        'page': str(n),
        'rpp': 500,
        'schoolCodes': 'CS',
        'termId': str(term)
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
        page = get_courses_page(page_num, 0)
        courses.extend(page)
        if not page:
            break
        page_num += 1
        time.sleep(1)
    return courses


if __name__ == "__main__":
    load_dotenv()
    username = os.getenv('NEU_USER')
    password = os.getenv('NEU_PASS')

    cookies = login(username, password)
    import sys
    courses = get_all_courses()
    folder = sys.argv[1]
    with open(folder+'/courses.csv', 'w') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=COURSE_KEYS)
        writer.writeheader()
        for course in courses:
            writer.writerow(course)
    with open(folder+'/courses.json', 'w') as outfile:
        json.dump(courses, outfile)
