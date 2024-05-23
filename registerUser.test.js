/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default
const fs = require("fs")

function initDomFromFiles(htmlPath, jsPath) {
  const html = fs.readFileSync(htmlPath, "utf8")
  document.open()
  document.write(html)
  document.close()
  jest.isolateModules(function () {
    require(jsPath)
  })
}


console.log("__dirname:", __dirname)

test("successfully loads application into DOM", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
    )
})


test("successfully submits an valid username and password", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
        )
    const user = userEvent.setup()

    const userEmail = domTesting.getByLabelText(document, "Email")
    const userPassword = domTesting.getByLabelText(document, "Password")
    const userButton = domTesting.getByRole(document, "button")

    await user.type(userEmail, "Dermers@gmail.com")
    await user.type(userPassword, "dasboudvOUI!@23424")
    await user.click(userButton)

    const message = domTesting.getByRole(document, "status")

    expect(message).toHaveTextContent("✅ SuccessYou have successfully registered")
})

test("enters an invalid email", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
        )
    const user = userEvent.setup()

    const userEmail = domTesting.getByLabelText(document, "Email")
    const userPassword = domTesting.getByLabelText(document, "Password")
    const userButton = domTesting.getByRole(document, "button")

    await user.type(userEmail, "Dermers.com")
    await user.type(userPassword, "dasboudvOUI!@23424")
    await user.click(userButton)

    const message = domTesting.getByRole(document, "alert")

    expect(message).toHaveTextContent("❌ ErrorThe email address you entered is invalid.")
})

test("enters an empty email", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
        )
    const user = userEvent.setup()

    const userEmail = domTesting.getByLabelText(document, "Email")
    const userPassword = domTesting.getByLabelText(document, "Password")
    const userButton = domTesting.getByRole(document, "button")

    await user.type(userEmail, " ")
    await user.type(userPassword, "dasboudvOUI!@23424")
    await user.click(userButton)

    const message = domTesting.getByRole(document, "alert")

    expect(message).toHaveTextContent("❌ ErrorThe email address you entered is invalid.")
})

test("entered a password with only lowercase", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
        )
    const user = userEvent.setup()

    const userEmail = domTesting.getByLabelText(document, "Email")
    const userPassword = domTesting.getByLabelText(document, "Password")
    const userButton = domTesting.getByRole(document, "button")

    await user.type(userEmail, "Teehee@jmail.com")
    await user.type(userPassword, "nahfamthisinvalid")
    await user.click(userButton)

    const message = domTesting.getByRole(document, "alert")

    expect(message).toHaveTextContent("❌ ErrorThe password you entered is invalid.Password needs an upper case letterPassword needs a numeric digit (0-9)Password needs a symbol (!@#$%^&*)")
})

test("entered a password with only uppercase", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
        )
    const user = userEvent.setup()

    const userEmail = domTesting.getByLabelText(document, "Email")
    const userPassword = domTesting.getByLabelText(document, "Password")
    const userButton = domTesting.getByRole(document, "button")

    await user.type(userEmail, "Teehee@jmail.com")
    await user.type(userPassword, "HEHETHISINVALIDTOO")
    await user.click(userButton)

    const message = domTesting.getByRole(document, "alert")

    expect(message).toHaveTextContent("❌ ErrorThe password you entered is invalid.Password needs a lower case letterPassword needs a numeric digit (0-9)Password needs a symbol (!@#$%^&*)")
})

test("entered a password with only numbers", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
        )
    const user = userEvent.setup()

    const userEmail = domTesting.getByLabelText(document, "Email")
    const userPassword = domTesting.getByLabelText(document, "Password")
    const userButton = domTesting.getByRole(document, "button")

    await user.type(userEmail, "Teehee@jmail.com")
    await user.type(userPassword, "12345678")
    await user.click(userButton)

    const message = domTesting.getByRole(document, "alert")

    expect(message).toHaveTextContent("❌ ErrorThe password you entered is invalid.Password needs a lower case letterPassword needs an upper case letterPassword needs a symbol (!@#$%^&*)")
})

test("entered a password with only special characters", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
        )
    const user = userEvent.setup()

    const userEmail = domTesting.getByLabelText(document, "Email")
    const userPassword = domTesting.getByLabelText(document, "Password")
    const userButton = domTesting.getByRole(document, "button")

    await user.type(userEmail, "Teehee@jmail.com")
    await user.type(userPassword, "!@#$")
    await user.click(userButton)

    const message = domTesting.getByRole(document, "alert")

    expect(message).toHaveTextContent("❌ ErrorThe password you entered is invalid.Password needs to be at least 8 charactersPassword needs a lower case letterPassword needs an upper case letterPassword needs a numeric digit (0-9)")
})

test("entered a password with invalid characters", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
        )
    const user = userEvent.setup()

    const userEmail = domTesting.getByLabelText(document, "Email")
    const userPassword = domTesting.getByLabelText(document, "Password")
    const userButton = domTesting.getByRole(document, "button")

    await user.type(userEmail, "Teehee@jmail.com")
    await user.type(userPassword, "~`|+=")
    await user.click(userButton)

    const message = domTesting.getByRole(document, "alert")

    expect(message).toHaveTextContent("❌ ErrorThe password you entered is invalid.Password needs to be at least 8 charactersPassword needs a lower case letterPassword needs an upper case letterPassword needs a numeric digit (0-9)Password needs a symbol (!@#$%^&*)Password contains an invalid character (only letters, numbers, and the symbols !@#$%^&* are allowed)")
})

test("entered a short password", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
        )
    const user = userEvent.setup()

    const userEmail = domTesting.getByLabelText(document, "Email")
    const userPassword = domTesting.getByLabelText(document, "Password")
    const userButton = domTesting.getByRole(document, "button")

    await user.type(userEmail, "Teehee@jmail.com")
    await user.type(userPassword, "sH0rT!")
    await user.click(userButton)

    const message = domTesting.getByRole(document, "alert")

    expect(message).toHaveTextContent("❌ ErrorThe password you entered is invalid.Password needs to be at least 8 characters")
})

test("entered an empty password", async function () {initDomFromFiles(
    __dirname + "/registerUser.html",
    __dirname + "/registerUser.js"
        )
    const user = userEvent.setup()

    const userEmail = domTesting.getByLabelText(document, "Email")
    const userPassword = domTesting.getByLabelText(document, "Password")
    const userButton = domTesting.getByRole(document, "button")

    await user.type(userEmail, "Teehee@jmail.com")
    await user.type(userPassword, " ")
    await user.click(userButton)

    const message = domTesting.getByRole(document, "alert")

    expect(message).toHaveTextContent(" ErrorThe password you entered is invalid.Password needs to be at least 8 charactersPassword needs a lower case letterPassword needs an upper case letterPassword needs a numeric digit (0-9)Password needs a symbol (!@#$%^&*)Password contains an invalid character (only letters, numbers, and the symbols !@#$%^&* are allowed)")
})

