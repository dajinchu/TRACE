import csv
import json
import os
import time

from dotenv import load_dotenv

from login import login, auth_get

# schools: 
schools = {
    'ccis': 'CS',
    'cos': 'SC',
    'business': 'BA',
    'bouve': 'BV',
    'camd': 'AM',
    'coe': 'EN',
    'global': 'GN',
    'law': 'LW',
    'cps': 'PS',
    'cssh': 'SH'
}
COURSE_KEYS = ['UID', 'id', 'instructorId', 'termId', 'schoolCode', 'departmentCode', 'number', 'section', 'type',
               'name', 'instructorName' ]
def get_courses_page(n, term, school):
    """https://www.applyweb.com/eval/new/reportbrowser/evaluatedCourses?excludeTA=false&page=1&rpp=15&termId=0"""
    query = {
        'excludeTA': 'false',
        'page': str(n),
        'rpp': 500,
        'schoolCodes': school,
        'termId': str(term)
    }
    url = 'https://www.applyweb.com/eval/new/reportbrowser/evaluatedCourses'
    r = auth_get(url, params=query)
    course_info = r.json()['data']
    for course in course_info:
        course['UID'] = '%i-%i-%i'%(course['id'], course['instructorId'], course['termId'])
        course['instructorName'] = course['instructorFirstName']+' '+course['instructorLastName']
    course_info = [{key: course[key] for key in COURSE_KEYS} for course in course_info]
    print(len(course_info))
    return course_info

def get_all_courses(school):
    courses = []
    page_num = 1
    while True:
        print("scraping page ", page_num)
        page = get_courses_page(page_num, 0, school)
        courses.extend(page)
        if not page:
            break
        page_num += 1
        time.sleep(1)
    return courses


if __name__ == "__main__":
    import sys
    folder = sys.argv[2]
    courses = get_all_courses(schools[sys.argv[1]])
    with open(folder+'/courses.csv', 'w') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=COURSE_KEYS)
        writer.writeheader()
        for course in courses:
            writer.writerow(course)
    with open(folder+'/courses.json', 'w') as outfile:
        json.dump(courses, outfile)
