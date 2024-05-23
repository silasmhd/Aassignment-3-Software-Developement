/**
 * @jest-environment jsdom
 */

 require("whatwg-fetch")

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
 
 const http = require("msw").http;
 const HttpsResponse = require("msw").HttpResponse;
 const setupServer = require("msw/node").setupServer
 const modernNumeralsResults = require("./modernNumeralsResults.json")
 
 const server = setupServer(
     http.get("https://romans.justyy.workers.dev/api/romans/", 
     function({ request }) {
        const url = new URL(request.url);
        const query = url.searchParams.get("n")
        if (query == "166") {
            return  HttpsResponse.json({"errpr":null, "input": "166", "result": "CLXVI"})
        } else {
                return HttpResponse.json(modernNumeralsResults)
            }
     })
 )
 
//  const server = setupServer(
//     http.get("https://romans.justyy.workers.dev/api/romans/", ({ request }) => {
        // const url = new URL(request.url);
        // const query = url.searchParams.get("n")
        // if (query == "166") {
        //    console.log("166 called")                                            
        //     return HttpResponse.json({
        //         "error": null,
        //         "input": "166",
        //         "result": "CLXVI"
        //     })
        // } else {
        //     return HttpResponse.json(modernNumeralsResults)
        // }
//     })
// )

 beforeAll(function () {
     server.listen()
 })
 
 afterEach(function () {
     server.resetHandlers()
 })
 
 afterAll(function () {
     server.close();
 })

 
 test("old roman numeral dispalys the correct result for a single number", async function () {
    initDomFromFiles(
        __dirname + "/romanNumerals.html",
        __dirname + "/romanNumerals.js"
    )

    const user = userEvent.setup()

    const userInputForm = domTesting.getByLabelText(document, "Arabic number (1-3999)")
    await user.type(userInputForm, "5")
    const oldResult = domTesting.getByText(document, '"Old" Roman Numeral')
    expect(oldResult).toHaveTextContent("V")
})

test("old roman numeral dispalys the correct result for a large number", async function () {
    initDomFromFiles(
        __dirname + "/romanNumerals.html",
        __dirname + "/romanNumerals.js"
    )
    const user = userEvent.setup()
    const userInputForm = domTesting.getByLabelText(document, "Arabic number (1-3999)")
    await user.type(userInputForm, "166")
    const oldResult = domTesting.getByText(document, '"Old" Roman Numeral')
    expect(oldResult).toHaveTextContent("CLXVI")
})



test("input 166 shows CXXIII in modern", async function () {
    initDomFromFiles(
      __dirname + "/romanNumerals.html",
      __dirname + "/romanNumerals.js"
    )
    
    const user = userEvent.setup()
    const button = domTesting.getByRole(document, "button")
    const input = domTesting.getByLabelText(document, "Arabic number (1-3999)")
    
    await user.type(input, "166")
    await user.click(button)
    
    const newResult = document.getElementById("modern-roman-result");

    await domTesting.waitFor(() =>  {
        expect(newResult).toHaveTextContent("CLXVI")
    })
  })

  test("input 166 and generates modern, then adds new input to clear modern", async function () {
    initDomFromFiles(
      __dirname + "/romanNumerals.html",
      __dirname + "/romanNumerals.js"
    )
    
    const user = userEvent.setup()
    const button = domTesting.getByRole(document, "button")
    const input = domTesting.getByLabelText(document, "Arabic number (1-3999)")
    
    await user.type(input, "166")
    await user.click(button)
    await user.type(input, "166")

    const newResult = document.getElementById("modern-roman-result");

    await domTesting.waitFor(() =>  {
        expect(newResult).toHaveTextContent("")
    })
  })
  
  test("input 166 and generates modern, then adds new input to clear modern", async function () {
    initDomFromFiles(
      __dirname + "/romanNumerals.html",
      __dirname + "/romanNumerals.js"
    )
    
    const user = userEvent.setup()
    const button = domTesting.getByRole(document, "button")
    const input = domTesting.getByLabelText(document, "Arabic number (1-3999)")
    
    await user.type(input, "166")
    await user.click(button)
    await user.type(input, "166")

    const newResult = document.getElementById("modern-roman-result");

    await domTesting.waitFor(() =>  {
        expect(newResult).toHaveTextContent("")
    })
  })