import re

from playwright.sync_api import Page, expect

from pages.landing_page import LandingPage


def test_tc_01_should_display_the_evaluation_landing_page(page: Page):
    landing_page = LandingPage(page)
    landing_page.goto()

    expect(landing_page.title).to_be_visible()
    expect(landing_page.start_button).to_be_visible()


def test_tc_02_should_navigate_to_the_product_listing(page: Page):
    landing_page = LandingPage(page)
    landing_page.goto()
    landing_page.start_evaluation()

    expect(page).to_have_url(re.compile(r"/products$"))
    expect(page.get_by_role("heading", name="Products", exact=True)).to_be_visible()
