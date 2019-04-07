from bs4 import BeautifulSoup
import lxml

def get_comments(html):
    soup = BeautifulSoup(open(html), "lxml")

    answers = soup.select('.panel tbody')
    comments = {}
    course_related = []
    learning_related = []
    instructor_related = []

    if answers:
        instructor_related = []
        for comment in answers[0].find_all('a', text=True):
            course_related.append(comment.string)
        for comment in answers[1].find_all('a', text=True):
            learning_related.append(comment.string)
        for comment in answers[2].find_all('a', text=True):
            instructor_related.append(comment.string)
    comments['course-related'] = course_related
    comments['learning-related'] = learning_related
    comments['instructor-related'] = instructor_related

    print(comments)