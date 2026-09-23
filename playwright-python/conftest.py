import subprocess
import sys
import time
import urllib.request
from pathlib import Path

import pytest

from config import BASE_URL

@pytest.fixture(scope="session", autouse=True)
def application_server():
    project_directory = Path(__file__).resolve().parent
    process = subprocess.Popen(
        [sys.executable, "server.py"],
        cwd=project_directory,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    for _ in range(30):
        try:
            urllib.request.urlopen(BASE_URL, timeout=1)
            break
        except Exception:
            time.sleep(0.1)
    else:
        process.terminate()
        raise RuntimeError("The local application server did not start.")

    yield

    process.terminate()
    process.wait(timeout=5)


@pytest.fixture(autouse=True)
def clear_cart(page):
    page.goto(BASE_URL)
    page.evaluate("localStorage.clear()")
