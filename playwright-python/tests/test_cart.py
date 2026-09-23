from playwright.sync_api import Page, expect

from pages.cart_page import CartPage
from pages.products_page import ProductsPage


def test_tc_06_should_show_an_added_product_in_the_cart(page: Page):
    products_page = ProductsPage(page)
    cart_page = CartPage(page)
    products_page.goto()
    products_page.add_product_to_cart("Laptop")
    products_page.open_cart()

    expect(cart_page.item("Laptop")).to_be_visible()
    expect(cart_page.item("Laptop").get_by_test_id("item-quantity")).to_have_text("1")


def test_tc_07_should_remove_a_product_from_the_cart(page: Page):
    products_page = ProductsPage(page)
    cart_page = CartPage(page)
    products_page.goto()
    products_page.add_product_to_cart("Laptop")
    products_page.open_cart()
    cart_page.remove_product("Laptop")

    expect(cart_page.item("Laptop")).to_have_count(0)
    expect(cart_page.cart_count).to_have_text("0")


def test_tc_08_should_calculate_the_cart_subtotal_correctly(page: Page):
    products_page = ProductsPage(page)
    cart_page = CartPage(page)
    products_page.goto()
    products_page.add_product_to_cart("Laptop")
    products_page.add_product_to_cart("Wireless Headphones")
    products_page.open_cart()

    expect(cart_page.subtotal).to_have_text("$1,148.00")
