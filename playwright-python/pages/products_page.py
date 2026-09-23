from playwright.sync_api import Page

from config import BASE_URL


class ProductsPage:
    def __init__(self, page: Page):
        self.page = page
        self.product_cards = page.get_by_test_id("product-card")
        self.cart_count = page.get_by_test_id("cart-count")

    def goto(self):
        self.page.goto(f"{BASE_URL}/products")

    def product(self, name: str):
        return self.product_cards.filter(
            has=self.page.get_by_role("heading", name=name, exact=True)
        )

    def add_product_to_cart(self, name: str):
        self.product(name).get_by_role("button", name="Add to Cart").click()

    def open_cart(self):
        self.page.get_by_role("link", name="View cart").click()
