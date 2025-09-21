import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

(async function addEmployeeTest() {
  const options = new chrome.Options();
  options.setChromeBinaryPath("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Login first
    await driver.get("http://localhost:5173/");
    await driver.findElement(By.css("input[type='email']")).sendKeys("test@gmail.com");
    await driver.findElement(By.css("input[type='password']")).sendKeys("test");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.sleep(2000); // wait for login

    // Go to add employee
    await driver.get("http://localhost:5173/add-employee");

    await driver.findElement(By.css("input[placeholder='Name']")).sendKeys("Jonny");
    await driver.findElement(By.css("input[placeholder='Role']")).sendKeys("Dv");
    await driver.findElement(By.css("button[type='submit']")).click();

    // 🔹 Wait until we are redirected
    await driver.wait(until.urlContains("/employees"), 5000);

    // 🔹 Check that Jenny appears in the employee table
    const tableText = await driver.findElement(By.css("table")).getText();
    if (tableText.includes("Jonny") && tableText.includes("Dv")) {
      console.log("✅ Add Employee Test Passed: Jenny is listed in employees table");
    } else {
      console.error("❌ Add Employee Test Failed: Jenny not found in table");
    }

  } catch (err) {
    console.error("❌ Error in Add Employee Test:", err);
  } finally {
    await driver.quit();
  }
})();