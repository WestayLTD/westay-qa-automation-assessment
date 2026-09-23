from playwright.sync_api import Page

from config import BASE_URL


class LandingPage:
    def __init__(self, page: Page):
        self.page = page
        self.title = page.get_by_role(
            "heading", name="Test thoughtfully. Build confidently."
        )
        self.start_button = page.get_by_role("link", name="Start Evaluation")

    def goto(self):
        self.page.goto(BASE_URL)

    def start_evaluation(self):
        self.start_button.click()
