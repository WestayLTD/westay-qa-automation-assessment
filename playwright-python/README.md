# Playwright Python Assessment

## Prerequisites

- Python 3.10 or later
- pip

## Setup on macOS or Linux

From the repository root:

```bash
cd playwright-python
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
playwright install chromium
pytest
```

## Setup on Windows PowerShell

```powershell
cd playwright-python
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
playwright install chromium
pytest
```

The Python test setup starts and stops the application automatically. The expected starter result is **8 passed**.

## View the HTML report

After the tests finish, open:

```text
playwright-python/report.html
```

On macOS, you can use:

```bash
open report.html
```

## Explore the application manually

```bash
python server.py
```

Open `http://127.0.0.1:4174`.

## Candidate exercises

1. Automate the rule that a customer cannot add more than **2 units of the same product**.
2. Automate the rule that the cart cannot contain more than **3 unique products**.

Keep tests independent, use appropriate Playwright locators and assertions, and extend the existing Page Objects where useful.
