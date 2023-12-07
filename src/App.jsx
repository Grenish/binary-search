import React, { useRef } from "react";
import { Footer, Header } from "./components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { gsap } from "gsap/all";
import { Tab } from "@headlessui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { python, javascript, c } from "./hoc";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(99 102 241 / 1)",
    },
  },
});

const App = () => {
  const arrayContainerRef = useRef(null);
  const targetElementRef = useRef(null);

  const animateSearch = () => {
    gsap.set(targetElementRef.current, { backgroundColor: "#FFEB3B" });

    const arrayInput = document.getElementById("arrayInput");
    const targetInput = document.getElementById("targetInput");

    const array = arrayInput.value
      .split(",")
      .map((item) => parseInt(item.trim()));
    const target = parseInt(targetInput.value);

    arrayContainerRef.current.innerHTML = array
      .map((value, index) => `<div class="array-element">${value}</div>`)
      .join(" ");

    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    let left = 0;
    let right = array.length - 1;

    function step() {
      const mid = Math.floor((left + right) / 2);
      const childElementsArray = Array.from(arrayContainerRef.current.children);
      const elementWidth = childElementsArray[0].offsetWidth;

      tl.to(targetElementRef.current, {
        x: `=((${elementWidth} + 2) * ${mid})`,
        duration: 0.5,
      })
        .to(childElementsArray[mid], {
          backgroundColor: "#4caf50",
          duration: 0.5,
        })
        .to(
          childElementsArray[left],
          {
            backgroundColor: "#64b5f6",
            duration: 0.5,
          },
          "-=0.5"
        ) // Highlight the first element
        .to(
          childElementsArray[right],
          {
            backgroundColor: "#64b5f6",
            duration: 0.5,
          },
          "-=0.5"
        ) // Highlight the last element
        .to(
          [
            childElementsArray[left],
            childElementsArray[mid],
            childElementsArray[right],
          ],
          {
            backgroundColor: "#fff",
            duration: 0.5,
          },
          "+=0.5"
        ); // Reset the background color of the first, middle, and last elements

      if (array[mid] === target) {
        gsap.to(targetElementRef.current, {
          backgroundColor: "#4CAF50",
          scale: 2,
          duration: 1,
          onComplete: () => {
            arrayContainerRef.current.children[mid].textContent += " ✓";
            gsap.to(targetElementRef.current, { scale: 1, duration: 0.5 });

            const resultMessage = document.createElement("div");
            resultMessage.textContent = `Found at index: ${mid}`;
            resultMessage.className = "result-message";
            document.querySelector(".as").appendChild(resultMessage);
          },
        });
      } else if (array[mid] < target) {
        left = mid + 1;
        gsap.delayedCall(1, step);
      } else {
        right = mid - 1;
        gsap.delayedCall(1, step);
      }
    }

    step();
  };

  

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-grow flex flex-col justify-start items-center">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "55ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="arrayInput"
              label="Enter an array"
              size="medium"
              variant="outlined"
              placeholder="Example : 1, 2, 3, 4"
              color="primary"
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            className="flex justify-center items-center space-x-2"
          >
            <TextField
              id="targetInput"
              label="Number to search"
              size="small"
              variant="outlined"
              placeholder="Example : 4"
              color="primary"
            />
            <button
              type="button"
              onClick={animateSearch}
              className="border-2 border-indigo-400 hover:bg-[#6365f16c] transition-colors ease-in-out p-2 rounded-md"
            >
              Search
            </button>
          </Box>

          <div className="flex flex-col">
            <div
              ref={arrayContainerRef}
              className="array-container mt-4 space-x-2 flex-grow flex"
            ></div>
            <div className="as"></div>
          </div>

          <div className="mt-10 w-1/2">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1 bg-blue-900 rounded-xl">
                <Tab
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm leading-5 font-medium text-blue-500 rounded-lg 
          ${selected ? "bg-white shadow" : ""}`
                  }
                >
                  C
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm leading-5 font-medium text-blue-500 rounded-lg 
          ${selected ? "bg-white shadow" : ""}`
                  }
                >
                  JavaScript
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm leading-5 font-medium text-blue-500 rounded-lg 
          ${selected ? "bg-white shadow" : ""}`
                  }
                >
                  Python
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className="p-5 bg-white rounded-xl shadow">
                  <SyntaxHighlighter language="c" style={solarizedlight}>
                    {c}
                  </SyntaxHighlighter>
                </Tab.Panel>
                <Tab.Panel className="p-5 bg-white rounded-xl shadow">
                  <SyntaxHighlighter language="javascript" style={solarizedlight}>
                    {javascript}
                  </SyntaxHighlighter>
                </Tab.Panel>
                <Tab.Panel className="p-5 bg-white rounded-xl shadow">
                <SyntaxHighlighter language="python" style={solarizedlight}>
                    {python}
                  </SyntaxHighlighter>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
