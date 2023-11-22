import time
import unittest

from selenium import webdriver
from selenium.webdriver import Keys
from selenium.webdriver.common.by import By


class BankingReport(unittest.TestCase):

    @classmethod
    def setUpClass(self):
        # setting the property for chromedriver.exe
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        # #  Navigate to banking project website
        self.driver.get("https://demo.guru99.com/V4/")
        time.sleep(2)

        #     driver = self.driver
        #     driver.maximize_window()
        #
        #     #  Navigate to Facebopok
        #     driver.get("https://www.facebook.com/")
        #
        #     # Search & Enter the Email or Phone field & Enter Password
        #     # Enter the right username
        #     # Enter the incorrect password
        #     driver.find_element(By.NAME, "email").send_keys("atul.dahiya0401@gmail.com")
        #     driver.find_element(By.NAME, "pass").send_keys("hello")
        #     # Introduced sleep just to check the browser behaviour, not needed everytime
        #     time.sleep(5)
        #
        #     # Click Login
        #     driver.find_element(By.NAME, "login").click()
        #
        #     # check and assert for error message
        #     element = driver.find_element(By.CLASS_NAME, "_9ay7")
        #     assert element.text == "The email address you entered isn't connected to an account. Find your account and log in."

    def test_DC1(self):
        # Locate the User ID input field
        self.driver.find_element(By.NAME,"uid").send_keys(" ")
        # self.driver.find_element(By.NAME, "password").send_keys("mUdurad")
        # Locate the Login button and click
        self.driver.find_element(By.NAME, "btnlogin").click()


        # Find the error message element by its name attribute
        error_message = self.driver.find_element_by_id,("message_23")

        # Verify that the error message is displayed correctly
        self.assertTrue(error_message.is_displayed(), "User-ID must not be blank")
    def test_DC2(self):
        self.driver.find_element(By.NAME,"uid").send_keys("Acc123")


    @classmethod
    def tearDownClass(self):
        # closes the chrome session
        self.driver.quit()
