import {
  isInvalidNumber,
  isInvalidArray,
  processArray,
  getArraySize10,
  isPrime,
} from "./modules/helpers.js";
import * as dom from "./modules/dom.js";
import * as loop from "./modules/loop.js";
import * as array from "./modules/array.js";

/**
 * General Events ---------------------------------
 */
// Open questions
dom.questionOpenBtns.forEach((questionOpenBtn, idx) => {
  questionOpenBtn.addEventListener("click", () => {
    const openedBox = Object.values(dom.questionBoxes).find(
      questionBox => questionBox.style.display === "flex"
    );

    if (openedBox) openedBox.style.display = "none";

    dom.questionBoxes[idx].style.display = "flex";
  });
});

// Toggle theme
dom.toggleThemeBtn.onclick = function () {
  dom.body.classList.toggle("theme-green");

  dom.toggleThemeBtn.classList.toggle("fa-sun");
  dom.toggleThemeBtn.classList.toggle("fa-moon");

  const imgName = dom.headerLogo.src.split("/").at(-1);
  let imgPath = "assets/images/";
  dom.headerLogo.src =
    imgName === "signature-pink.png"
      ? `${imgPath}signature-green.png`
      : `${imgPath}signature-pink.png`;
};

/**
 * Loop questions ---------------------------------
 */
// Question 1
dom.loopQ1SubmitBtn.addEventListener("click", () => {
  const x = +dom.loopQ1InputX.value;

  if (isInvalidNumber(x, input => !Number.isInteger(input))) {
    dom.loopQ1Result.innerHTML = `❌ Invalid input. Please enter a integer number >= 0.`;
    return;
  }

  dom.loopQ1Result.innerHTML = `n = ${loop.findSmallestPositiveInt(x)}.`;
});

// Question 2
dom.loopQ2SubmitBtn.addEventListener("click", () => {
  const x = +dom.loopQ2InputX.value;
  const n = +dom.loopQ2InputN.value;

  dom.loopQ2Result.innerHTML = "";

  if (isInvalidNumber(x)) {
    dom.loopQ2Result.innerHTML = `❌ Invalid input "x". Please enter a number >= 0.`;
    return;
  }

  if (isInvalidNumber(n, input => !Number.isInteger(n) || n < 1)) {
    dom.loopQ2Result.innerHTML += `❌ Invalid input "n". Please enter a integer number >= 1.`;
    return;
  }

  dom.loopQ2Result.innerHTML = `S(n) = ${loop.findSumSn(x, n)}.`;
});

// Question 3
dom.loopQ3SubmitBtn.addEventListener("click", () => {
  const n = +dom.loopQ3InputN.value;

  if (isInvalidNumber(n, input => !Number.isInteger(input))) {
    dom.loopQ3Result.innerHTML = `❌ Invalid input "n". Please enter a integer number >= 0.`;
    return;
  }

  dom.loopQ3Result.innerHTML = `${n}! = ${loop.loopFactorial(n)}.`;
});

// Question 4
dom.loopQ4SubmitBtn.addEventListener("click", () => {
  const input = +dom.loopQ4Input.value;

  dom.loopQ4Result.innerHTML = "Notification Here 😁";
  dom.divBoxes.innerHTML = "";

  if (isInvalidNumber(input, input => !Number.isInteger(input))) {
    dom.loopQ4Result.innerHTML = `❌ Invalid input. Please enter a integer number >= 0.`;
    return;
  }

  dom.divBoxes.innerHTML = loop.generateDivs(input);
});

// Question 5
dom.loopQ5SubmitBtn.addEventListener("click", () => {
  const input = +dom.loopQ5Input.value;

  if (isInvalidNumber(input, input => !Number.isInteger(input) || input < 2)) {
    dom.loopQ5Result.innerHTML = `❌ Invalid input. Please enter a integer number >= 2.`;
    return;
  }

  const primeArr = [];
  for (let i = 2; i <= input; ++i) if (isPrime(i)) primeArr.push(i);

  dom.loopQ5Result.innerHTML = `Prime are: `;

  dom.loopQ5Result.innerHTML += primeArr;
});

/**
 * Array questions ---------------------------------
 */
// Process questions 1 - 10
for (const [idx, arrayBtn] of Object.entries(dom.arrayBtns)) {
  arrayBtn.addEventListener("click", () => {
    const unprocessedArray = dom.arrayInput.value.trim().split(" ");
    if (isInvalidArray(unprocessedArray)) {
      dom.arrayResult.innerHTML = "❌ Invalid array.";
      return;
    }

    // Remove empty string and convert element into number
    const processedArray = processArray(unprocessedArray);

    // These lines are used for question 6
    // Start
    let idx1Val;
    let idx2Val;
    if (+idx === 5) {
      idx1Val = +dom.idx1ArrayInput.value;
      idx2Val = +dom.idx2ArrayInput.value;

      if (
        isInvalidNumber(idx1Val, input => !Number.isInteger(input)) ||
        isInvalidNumber(idx2Val, input => !Number.isInteger(input)) ||
        idx1Val >= processedArray.length ||
        idx2Val >= processedArray.length
      ) {
        dom.arrayResult.innerHTML = "❌ Invalid index.";
        return;
      }
    }
    // End

    dom.arrayStepBox.innerHTML = array.qSteps[idx];

    dom.arrayResult.innerHTML = `
      Your array: ${processedArray}.<br>
      Result for this question: ${array.solArray[idx](
        processedArray,
        idx1Val,
        idx2Val
      )}.
    `;
  });
}

dom.genArrayBtn.addEventListener("click", () => {
  const strArray = getArraySize10().join(" ");
  dom.arrayInput.value = strArray;
  dom.arrayResult.innerHTML = `
  Your array: ${strArray}.
`;
});
