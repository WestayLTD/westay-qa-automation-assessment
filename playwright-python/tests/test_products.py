from playwright.sync_api import Page, expect

from pages.products_page import ProductsPage


def test_tc_03_should_display_products_with_their_key_details(page: Page):
    products_page = ProductsPage(page)
    products_page.goto()

    expect(products_page.product_cards).to_have_count(6)
    laptop = products_page.product("Laptop")
    expect(laptop.get_by_test_id("product-price")).to_have_text("$999.00")
    expect(laptop.get_by_role("button", name="Add to Cart")).to_be_visible()


def test_tc_04_should_add_a_product_to_the_cart(page: Page):
    products_page = ProductsPage(page)
    products_page.goto()
    products_page.add_product_to_cart("Laptop")

    expect(products_page.cart_count).to_have_text("1")


def test_tc_05_should_add_multiple_products_to_the_cart(page: Page):
    products_page = ProductsPage(page)
    products_page.goto()
    products_page.add_product_to_cart("Laptop")
    products_page.add_product_to_cart("Wireless Headphones")
    products_page.add_product_to_cart("Mechanical Keyboard")

    expect(products_page.cart_count).to_have_text("3")
