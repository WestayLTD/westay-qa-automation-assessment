from playwright.sync_api import Page

from config import BASE_URL


class CartPage:
    def __init__(self, page: Page):
        self.page = page
        self.cart_items = page.get_by_test_id("cart-item")
        self.subtotal = page.get_by_test_id("subtotal")
        self.cart_count = page.get_by_test_id("cart-count")

    def goto(self):
        self.page.goto(f"{BASE_URL}/cart")

    def item(self, name: str):
        return self.cart_items.filter(
            has=self.page.get_by_role("heading", name=name, exact=True)
        )

    def remove_product(self, name: str):
        self.item(name).get_by_role("button", name="Remove").click()
