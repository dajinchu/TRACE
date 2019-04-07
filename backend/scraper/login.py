from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from dotenv import load_dotenv
import requests
import os

load_dotenv()
USERNAME = os.getenv('NEU_USER')
PASSWORD = os.getenv('NEU_PASS')

def login(username, password):
    driver = webdriver.Firefox()

    driver.get("https://www.applyweb.com/eval/shibboleth/neu/36892")

    driver.find_element_by_id("username").send_keys(username)
    driver.find_element_by_id("password").send_keys(password)
    driver.find_element_by_name("submit").click()


    try:
        # Wait for javascript redirect to happen
        WebDriverWait(driver, 5).until(EC.title_contains("My Evaluations"))
        cookies = dict()
        cookies["sid"] = driver.get_cookie("sid")["value"]
        cookies["sdbid"] = driver.get_cookie("sdbid")["value"]
        cookies["awBrowserCheck"] = "true"
        return cookies
    finally:
        driver.quit()

cookies = {}
headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:66.0) Gecko/20100101 Firefox/66.0'
}
def auth_get(*args, **kwargs):
    global cookies
    r = requests.get(*args, **kwargs, cookies=cookies, headers=headers)

    if r.status_code == 401:
        # Retry
        cookies = login(USERNAME, PASSWORD)
        r = requests.get(*args, **kwargs, cookies=cookies, headers=headers)
        if r.status_code == 401:
            raise Exception('Could not log in!')
    return r


if __name__ == "__main__":
    import sys
    login(sys.argv[1], sys.argv[2])
