import os

from backend.scraper.parse_excel import parse_excel
from backend.scraper.parse_html import get_comments

ratings_dir = './ratings'
comments_dir = './comments'


for filename in os.listdir(comments_dir):
    file = "./comments/" + filename
    get_comments(file)


for filename in os.listdir(ratings_dir):
    file = "./ratings/" + filename
    parse_excel(file)