// import { Builder, By, until } from "selenium-webdriver";
// import chrome from "selenium-webdriver/chrome";

// (async function loginTest() {
//   // ✅ Tell Selenium where Chrome is on macOS
//   const options = new chrome.Options();
//   options.setChromeBinaryPath("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");

//   let driver = await new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(options)
//     .build();

//   try {
//     await driver.get("http://localhost:5173/");

//     // Fill login form
//     await driver.findElement(By.css("input[type='email']")).sendKeys("test@gmail.com");
//     await driver.findElement(By.css("input[type='password']")).sendKeys("test");
//     await driver.findElement(By.css("button[type='submit']")).click();

//     // Wait for success/error message
//     const message = await driver.wait(until.elementLocated(By.css("p")), 5000);
//     const text = await message.getText();

//     if (text.includes("Login successful")) {
//       console.log("✅ Login Test Passed:", text);
//     } else {
//       console.error("❌ Login Test Failed:", text);
//     }
//   } catch (err) {
//     console.error("❌ Error in Login Test:", err);
//   } finally {
//     await driver.quit();
//   }
// })();


import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

(async function loginTest() {
  // ✅ Tell Selenium where Chrome is on macOS
  const options = new chrome.Options();
  options.setChromeBinaryPath("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("http://localhost:5173/");

    // Fill login form
    await driver.findElement(By.css("input[type='email']")).sendKeys("test@gmail.com");
    await driver.findElement(By.css("input[type='password']")).sendKeys("test"); // your test password
    await driver.findElement(By.css("button[type='submit']")).click();

    // 🔹 Wait for either Logout or Signup button
    await driver.sleep(2000); // wait for page update after login

    try {
      const logoutBtn = await driver.wait(
        until.elementLocated(By.xpath("//button[span[text()='Logout']]")),
        5000
      );
      if (logoutBtn) {
        console.log("✅ Login Test Passed: Logout button is visible");
      }
    } catch {
      const signupBtn = await driver.findElement(By.xpath("//a[span[text()='Signup']]"));
      if (signupBtn) {
        console.error("❌ Login Test Failed: Signup button still visible (not logged in)");
      }
    }

  } catch (err) {
    console.error("❌ Error in Login Test:", err);
  } finally {
    await driver.quit();
  }
})();