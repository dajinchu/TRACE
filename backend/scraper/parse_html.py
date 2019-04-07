import csv
import os

from bs4 import BeautifulSoup
import lxml

def get_comments(html):
    soup = BeautifulSoup(open(html, encoding="UTF-8"), "lxml")

    comments = {}
    course_related = soup.select('#cat_1 tbody a')
    learning_related = soup.select('#cat_2 tbody a')
    instructor_related = soup.select('#cat_3 tbody a')
    course_related_comments = [comment.string for comment in course_related]
    learning_related_comments = [comment.string for comment in learning_related]
    instructor_related_comments = [comment.string for comment in instructor_related]

    comments['course-related'] = ""
    comments['learning-related'] = ""
    comments['instructor-related'] = ""

    if course_related_comments:
        comments['course-related'] = course_related_comments[0]
    if learning_related_comments:
        comments['learning-related'] = learning_related_comments[0]
    if instructor_related_comments:
        comments['instructor-related'] = instructor_related_comments[0]

    dict = {"code": get_course_id(html), "UID": get_course_id(html), "comments": comments}

    return dict


def get_course_id(html):
    with open("./sample_data/courses.csv", 'r') as infile:
        reader = csv.DictReader(infile)
        next(reader)
        for line in reader:
            if line["UID"] in html:
                return line["schoolCode"] + line["number"]

def get_comments_by_class():
    comments_dir = './comments'
    comments = []
    already_written = []
    with open("./sample_data/comments.csv", 'w') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['code', 'UID', 'course-comment', 'learning-comment', 'instructor-related'])
        for filename in os.listdir(comments_dir):
            course_comments = get_comments(comments_dir + '/' + filename)
            if course_comments['code'] not in already_written:
                already_written.append(course_comments['code'])
                writer.writerow([course_comments['code'], course_comments['UID'], course_comments['comments']['course-related'],
                                course_comments['comments']['learning-related'], course_comments['comments']['instructor-related']])



get_comments_by_class()