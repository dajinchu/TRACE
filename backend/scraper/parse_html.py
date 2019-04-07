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

    comments['course-related'] = course_related_comments
    comments['learning-related'] = learning_related_comments
    comments['instructor-related'] = instructor_related_comments

    print(comments)