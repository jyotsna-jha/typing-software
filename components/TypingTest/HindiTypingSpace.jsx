"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaHourglassStart } from "react-icons/fa";
import characterMapping from "./characterMapping";
import TextHighlighter from "./TextHighlighter1";

const HindiTypingSpace = ({
  sampleText,
  timeLimit,
  onTestComplete,
  userName,
  enableHighlight,
}) => {
  const [userInput, setUserInput] = useState("");
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [hasStarted, setHasStarted] = useState(false);
  const [outputValue, setOutputValue] = useState(""); // New state for the output
  const words = sampleText.split(" ");
  const [backspaceCount, setBackspaceCount] = useState(0);
  const textAreaRef = useRef(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [isIApplied, setIsIApplied] = useState(false);
  const [isFPressed, setIsFPressed] = useState(false);
  const lastKeyPressed = useRef(null);
  const [zModifierIndex, setZModifierIndex] = useState(null);

  const charactersMapping = {
    d: "क",
    D: "क्",
    f: "ि",
    g: "ह",
    G: "ळ",
    j: "र",
    J: "श्र",
    L: "स्",
    E: "म्",
    R: "त्",
    T: "ज्",
    Y: "ल्",
    K: "ज्ञ",
    I: "प्",
    l: "स",
    Q: "फ",
    O: "व्",
    P: "च्",
    e: "म",
    r: "त",
    t: "ज",
    y: "ल",
    u: "न",
    U: "न्",
    i: "प",
    o: "व",
    p: "च",
    Z: "र्",

    "~": "द्य",
    x: "ग",
    C: "ब्",
    c: "ब",
    X: "ग्",
    v: "अ",
    V: "ट",
    b: "इ",
    B: "ठ",
    n: "द",
    N: "छ",
    m: "उ",
    M: "ड",
    ",": "ए",
    "<": "ढ",
    ">": "झ",
    "(": "त्र",
    ")": "ऋ",
    "'": "श्",
    '"': "ष्",
    "{": "क्ष्‍",
    "\u003F": "?",
    ".": "ण्",
    F: "थ्",
    H: "भ्",
    "[": "ख्",
    "[A": "ख",
    "[k": "ख",
    ".A": "ण",
    ".k": "ण",
    "/A": "ध",
    "/k": "ध",
    "?A": "घ",
    "?k": "घ",
    "'A": "श",
    "'k": "श",
    '"A': "ष",
    '"k': "ष",
    "}": "द्व",
    HA: "भ",
    Hk: "भ",
    FA: "थ",
    Fk: "थ",
    "*": "द्ध",
    "{A": "क्ष",
    "{k": "क्ष",
    "/": "ध्",
    "f[": "खि्",
    "f[k": "खि",
    "f[A": "खि",
    "f'": "शि्",
    "f'k": "शि",
    "f'A": "शि",
    "f/": "धि्",
    "f/k": "धि",
    "f/A": "धि",
    'f"': "षि्",
    'f"k': "षि",
    'f"A': "षि",

    "f{": "क्षि्",
    "f{k": "क्षि",
    "f{A": "क्षि",

    "f?": "घि्",
    "f?k": "घि",
    "f?A": "घि",

    "f.": "णि्",
    "f.k": "णि",
    "f.A": "णि",

    fF: "थि् ",
    fFk: "थि",
    fFA: "थि",

    fH: "भि् ",
    fHk: "भि",
    fHA: "भि",

    ";": "य",

    fD: "कि्",

    fU: "नि्",

    fL: "सि्",
    fE: "मि्",
    fR: "ति्",
    fT: "जि्",
    fY: "लि्",
    fI: "पि्",
    fO: "वि्",
    fP: "चि्",
    fX: "गि्",
    fC: " बि्",
    "\u003D": "=",
    "\u0060": "`",
    "\u0084": '"',
    "_":".",
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setBackspaceCount((prevCount) => prevCount + 1);
    }

    lastKeyPressed.current = e.key;

    if (
      [
        "!",
        "|",

        "#",
        ":",
        "$",

        "%",
        "-",
        "+",
        "\u002B",

        "]",

        "&",

        "^",

        ",",
        "\\",
        /*  "<",
        ">", */
        /* "_", */

        "\u003D",
        "=",
        "\u0060",
        "`",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
    if (e.key === "|") {
      setUserInput((prev) => prev + "(");
      lastKeyPressed.current = "|";
    } else if (e.key === "!") {
      setUserInput((prev) => prev + "|");
      lastKeyPressed.current = "!";
    } else if (e.key === "#") {
      setUserInput((prev) => prev + ":");
      lastKeyPressed.current = "#";
    } else if (e.key === ":") {
      setUserInput((prev) => prev + "रु");
      lastKeyPressed.current = ":";
    } else if (e.key === "$") {
      setUserInput((prev) => prev + "*");
      lastKeyPressed.current = "$";
    } else if (e.key === "%") {
      setUserInput((prev) => prev + "-");
      lastKeyPressed.current = "%";
    } else if (e.key === "-") {
      setUserInput((prev) => prev + ";");
      lastKeyPressed.current = "-";
    } else if (e.key === "]") {
      setUserInput((prev) => prev + ",");
      lastKeyPressed.current = "]";
    } else if (e.key === "&") {
      setUserInput((prev) => prev + "'");
      lastKeyPressed.current = "&";
    } else if (e.key === "^") {
      setUserInput((prev) => prev + "'");
      lastKeyPressed.current = "^";
    } else if (e.key === ",") {
      setUserInput((prev) => prev + "ए");
      lastKeyPressed.current = ",";
    } else if (e.key === "\\") {
      setUserInput((prev) => prev + ")");
      lastKeyPressed.current = "\\";
    } /* else if (e.key === "<") {
      setUserInput((prev) => prev + "ढ");
      lastKeyPressed.current = "<";
    } */ /* else if (e.key === ">") {
      setUserInput((prev) => prev + "झ");
      lastKeyPressed.current = ">";
    }  */ /* else if (e.key === "_") {
      setUserInput((prev) => prev + ".");
      lastKeyPressed.current = "_";
    } */ else if (e.key === "+") {
      setUserInput((prev) => prev + "्");
      lastKeyPressed.current = "+";
    } else if (e.key === "\u002B") {
      setUserInput((prev) => prev + "+");
      lastKeyPressed.current = "\u002B";
    } else if (e.key === "=") {
      setUserInput((prev) => prev + "ृ");
      lastKeyPressed.current = "=";
    } else if (e.key === "\u003D") {
      setUserInput((prev) => prev + "=");
      lastKeyPressed.current = "\u003D";
    } else if (e.key === "`") {
      setUserInput((prev) => prev + "़");
      lastKeyPressed.current = "`";
    } else if (e.key === "\u0060") {
      setUserInput((prev) => prev + "`");
      lastKeyPressed.current = "\u0060";
    }

    if (e.key === "Z" && userInput.endsWith("इ")) {
      setUserInput((prev) => prev.slice(0, -1) + "ई");
      lastKeyPressed.current = "Z";
      e.preventDefault();
    } else if (e.key === "Z" && userInput.length > 0) {
      const lastChar = userInput.slice(-1);
      const modifiedText = characterMapping["Z"] + lastChar;
      setUserInput((prev) => prev.slice(0, -1) + modifiedText);
      lastKeyPressed.current = "Z";
      e.preventDefault();
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      if (remainingSeconds === 0) {
        return `${minutes} min`;
      } else {
        return `${minutes} min ${remainingSeconds} sec`;
      }
    } else {
      return `${remainingSeconds} sec`;
    }
  };

  useEffect(() => {
    let timerInterval;
    if (hasStarted && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [hasStarted]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let output = "";

      for (let key in characterMapping) {
        if (userInput.endsWith(key)) {
          output = characterMapping[key];
        }
      }

      setOutputValue(output);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [userInput]);

  const handleInputChange = (e) => {
    if (timeLeft > 0) {
      let inputValue = e.target.value;
      /* inputValue = inputValue.replace(/w/g, "ू").replace(/a/g, "ं");
       */

      const specialCharacterMapping = {
        "&": '"',

        ",": "ए",

        "]": ",",

        "\u005D": "]",
        "\u0026": "&",
        "\u005E": "^",
        "\u002C": ",", // Alt+044 mapped to ,
        "\u005C": "\\", // Alt+092 mapped to \
        "\u003A": ":", // Alt+058 mapped to :
        "\u0023": "#",
        /*  "\u003C": "<", // Alt+060 mapped to <
        "\u003E": ">",  */ // Alt+062 mapped to >
      };
      let newInput = "";
      let transformedInput = userInput;

      for (let i = 0; i < inputValue.length; i++) {
        const char = inputValue[i];
        if (specialCharacterMapping.hasOwnProperty(char)) {
          newInput += char;
        }
        // If the character is not already mapped, map it
        else if (!transformedInput.includes(char)) {
          const mappedChar = characterMapping[char];
          // Additional checks based on your provided logic
          if (mappedChar !== undefined) {
            if (char === "Q" && newInput.endsWith("उ")) {
              newInput = newInput.slice(0, -1) + "ऊ";
            } else if (
              (char === "A" || char === "k") &&
              newInput[newInput.length - 1] === "अ"
            ) {
              newInput = newInput.slice(0, -1) + "आ";
            } else if (char === "W" && newInput[newInput.length - 1] === "आ") {
              newInput = newInput.slice(0, -1) + "ऑ";
            } else if (char === "s" && newInput[newInput.length - 1] === "आ") {
              newInput = newInput.slice(0, -1) + "ओ ";
            } else if (char === "S" && newInput[newInput.length - 1] === "आ") {
              newInput = newInput.slice(0, -1) + "औ";
            } else if (char === "s" && newInput[newInput.length - 1] === "ए") {
              newInput = newInput.slice(0, -1) + "ऐ";
            } else if (char === "ॅ" && inputValue[i + 1] === "ं") {
              newInput += "ँ";
              i++;
            } else if (isIApplied) {
              setIsIApplied(false);

              if (char === "'" && newInput.endsWith(characterMapping["f"])) {
                newInput = newInput.slice(0, -characterMapping["f"].length);
                newInput += characterMapping[`f${char}`] || char;
              } else if (
                char === "[" &&
                newInput.endsWith(characterMapping["f"])
              ) {
                newInput = newInput.slice(0, -characterMapping["f"].length);
                newInput += characterMapping[`f${char}`] || char;
              } else if (
                char === "/" &&
                newInput.endsWith(characterMapping["f"])
              ) {
                newInput = newInput.slice(0, -characterMapping["f"].length);
                newInput += characterMapping[`f${char}`] || char;
              } else if (
                char === "?" &&
                newInput.endsWith(characterMapping["f"])
              ) {
                newInput = newInput.slice(0, -characterMapping["f"].length);
                newInput += characterMapping[`f${char}`] || char;
              } else if (
                char === "{" &&
                newInput.endsWith(characterMapping["f"])
              ) {
                newInput = newInput.slice(0, -characterMapping["f"].length);
                newInput += characterMapping[`f${char}`] || char;
              } else if (
                char === "F" &&
                newInput.endsWith(characterMapping["f"])
              ) {
                newInput = newInput.slice(0, -characterMapping["f"].length);
                newInput += characterMapping[`f${char}`] || char;
              } else if (
                char === "." &&
                newInput.endsWith(characterMapping["f"])
              ) {
                newInput = newInput.slice(0, -characterMapping["f"].length);
                newInput += characterMapping[`f${char}`] || char;
              } else if (
                char === "H" &&
                newInput.endsWith(characterMapping["f"])
              ) {
                newInput = newInput.slice(0, -characterMapping["f"].length);
                newInput += characterMapping[`f${char}`] || char;
              } else if (
                char === '"' &&
                newInput.endsWith(characterMapping["f"])
              ) {
                newInput = newInput.slice(0, -characterMapping["f"].length);
                newInput += characterMapping[`f${char}`] || char;
              } else if (
                char === "D" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "U" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "E" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "R" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "T" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "Y" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "I" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "O" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "P" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "X" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "C" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else if (
                char === "L" &&
                newInput.endsWith(charactersMapping["f"])
              ) {
                newInput = newInput.slice(0, -charactersMapping["f"].length);
                newInput += charactersMapping[`f${char}`] || char;
              } else {
                newInput = newInput.slice(0, -1) + mappedChar + "ि";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["f'"])
            ) {
              newInput = newInput.slice(0, -characterMapping["f'"].length);
              newInput += characterMapping[`f'${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["f["])
            ) {
              newInput = newInput.slice(0, -characterMapping["f["].length);
              newInput += characterMapping[`f[${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["f."])
            ) {
              newInput = newInput.slice(0, -characterMapping["f."].length);
              newInput += characterMapping[`f.${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping['f"'])
            ) {
              newInput = newInput.slice(0, -characterMapping['f"'].length);
              newInput += characterMapping[`f"${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["f/"])
            ) {
              newInput = newInput.slice(0, -characterMapping["f/"].length);
              newInput += characterMapping[`f/${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["f?"])
            ) {
              newInput = newInput.slice(0, -characterMapping["f?"].length);
              newInput += characterMapping[`f?${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["f{"])
            ) {
              newInput = newInput.slice(0, -characterMapping["f{"].length);
              newInput += characterMapping[`f{${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["fF"])
            ) {
              newInput = newInput.slice(0, -characterMapping["fF"].length);
              newInput += characterMapping[`fF${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["fH"])
            ) {
              newInput = newInput.slice(0, -characterMapping["fH"].length);
              newInput += characterMapping[`fH${char}`] || char;
            } else if (char === "'") {
              newInput += characterMapping[char];
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["'"])
            ) {
              newInput = newInput.slice(0, -characterMapping["'"].length);
              newInput += characterMapping[`'${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["'A"])
            ) {
              newInput = newInput.slice(0, -characterMapping["'A"].length);
              newInput += characterMapping[`'${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["'k"])
            ) {
              newInput = newInput.slice(0, -characterMapping["'k"].length);
              newInput += characterMapping[`'${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["'A"])
            ) {
              newInput = newInput.slice(0, -characterMapping["'A"].length);
              newInput += characterMapping[`'${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["'kA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["'kA"].length);
              newInput += characterMapping[`'k${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (char === "/") {
              newInput += characterMapping[char];
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["/"])
            ) {
              newInput = newInput.slice(0, -characterMapping["/"].length);
              newInput += characterMapping[`/${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["/A"])
            ) {
              newInput = newInput.slice(0, -characterMapping["/A"].length);
              newInput += characterMapping[`/${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["/k"])
            ) {
              newInput = newInput.slice(0, -characterMapping["/k"].length);
              newInput += characterMapping[`/${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["/A"])
            ) {
              newInput = newInput.slice(0, -characterMapping["/A"].length);
              newInput += characterMapping[`/${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["/kA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["/kA"].length);
              newInput += characterMapping[`/k${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (char === "[") {
              newInput += characterMapping[char];
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["["])
            ) {
              newInput = newInput.slice(0, -characterMapping["["].length);
              newInput += characterMapping[`[${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["[A"])
            ) {
              newInput = newInput.slice(0, -characterMapping["[A"].length);
              newInput += characterMapping[`[${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["[k"])
            ) {
              newInput = newInput.slice(0, -characterMapping["[k"].length);
              newInput += characterMapping[`[${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["[A"])
            ) {
              newInput = newInput.slice(0, -characterMapping["[A"].length);
              newInput += characterMapping[`[${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["[kA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["[kA"].length);
              newInput += characterMapping[`[k${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (char === "{") {
              newInput += characterMapping[char];
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["{"])
            ) {
              newInput = newInput.slice(0, -characterMapping["{"].length);
              newInput += characterMapping[`{${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["{A"])
            ) {
              newInput = newInput.slice(0, -characterMapping["{A"].length);
              newInput += characterMapping[`{${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["{k"])
            ) {
              newInput = newInput.slice(0, -characterMapping["{k"].length);
              newInput += characterMapping[`{${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["{A"])
            ) {
              newInput = newInput.slice(0, -characterMapping["{A"].length);
              newInput += characterMapping[`{${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["{kA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["{kA"].length);
              newInput += characterMapping[`{k${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (char === '"') {
              newInput += characterMapping[char];
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping['"'])
            ) {
              newInput = newInput.slice(0, -characterMapping['"'].length);
              newInput += characterMapping[`"${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping['"A'])
            ) {
              newInput = newInput.slice(0, -characterMapping['"A'].length);
              newInput += characterMapping[`"${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping['"k'])
            ) {
              newInput = newInput.slice(0, -characterMapping['"k'].length);
              newInput += characterMapping[`"${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping['"A'])
            ) {
              newInput = newInput.slice(0, -characterMapping['"A'].length);
              newInput += characterMapping[`"${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping['"kA'])
            ) {
              newInput = newInput.slice(0, -characterMapping['"kA'].length);
              newInput += characterMapping[`"k${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (char === "?") {
              newInput += characterMapping[char];
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["?"])
            ) {
              newInput = newInput.slice(0, -characterMapping["?"].length);
              newInput += characterMapping[`?${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["?A"])
            ) {
              newInput = newInput.slice(0, -characterMapping["?A"].length);
              newInput += characterMapping[`?${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["?k"])
            ) {
              newInput = newInput.slice(0, -characterMapping["?k"].length);
              newInput += characterMapping[`?${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["?A"])
            ) {
              newInput = newInput.slice(0, -characterMapping["?A"].length);
              newInput += characterMapping[`?${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["?kA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["?kA"].length);
              newInput += characterMapping[`?k${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (char === ".") {
              newInput += characterMapping[char];
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["."])
            ) {
              newInput = newInput.slice(0, -characterMapping["."].length);
              newInput += characterMapping[`.${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping[".A"])
            ) {
              newInput = newInput.slice(0, -characterMapping[".A"].length);
              newInput += characterMapping[`.${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping[".k"])
            ) {
              newInput = newInput.slice(0, -characterMapping[".k"].length);
              newInput += characterMapping[`.${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping[".A"])
            ) {
              newInput = newInput.slice(0, -characterMapping[".A"].length);
              newInput += characterMapping[`.${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping[".kA"])
            ) {
              newInput = newInput.slice(0, -characterMapping[".kA"].length);
              newInput += characterMapping[`.k${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (char === "F") {
              newInput += characterMapping[char];
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["F"])
            ) {
              newInput = newInput.slice(0, -characterMapping["F"].length);
              newInput += characterMapping[`F${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["FA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["FA"].length);
              newInput += characterMapping[`F${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["Fk"])
            ) {
              newInput = newInput.slice(0, -characterMapping["Fk"].length);
              newInput += characterMapping[`F${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["FA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["FA"].length);
              newInput += characterMapping[`F${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["FkA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["FkA"].length);
              newInput += characterMapping[`Fk${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (char === "H") {
              newInput += characterMapping[char];
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["H"])
            ) {
              newInput = newInput.slice(0, -characterMapping["H"].length);
              newInput += characterMapping[`H${char}`] || char;
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["HA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["HA"].length);
              newInput += characterMapping[`H${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["Hk"])
            ) {
              newInput = newInput.slice(0, -characterMapping["Hk"].length);
              newInput += characterMapping[`H${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["HA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["HA"].length);
              newInput += characterMapping[`H${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else if (
              (char === "A" || char === "k") &&
              newInput.endsWith(characterMapping["HkA"])
            ) {
              newInput = newInput.slice(0, -characterMapping["HkA"].length);
              newInput += characterMapping[`Hk${char}`] || char;

              if (char === "A" || char === "k") {
                newInput += "ा";
              }
            } else {
              setIsIApplied(char === "f");
              newInput += mappedChar;
            }
            /*  transformedInput += mappedChar; */ // Update the transformedInput
          } else {
            // If the character has already been mapped, keep it as is

            newInput += char;
          }
        } else {
          // If the character has already been mapped, keep it as is
          newInput += char;
        }
      }

      setUserInput(newInput);

      if (!hasStarted) {
        setHasStarted(true);
      }

      if (newInput.endsWith(" ") || highlightedWordIndex === words.length - 1) {
        setHighlightedWordIndex((prevIndex) => prevIndex + 1);
      } else if (!newInput.trim()) {
        setHighlightedWordIndex(0);
      }
    }
  };

  const processUserInput = (inputValue) => {
    console.log("Input Value:", inputValue);
    const userWords = inputValue.trim().split(/\s+/);
    console.log("User Words:", userWords);
    const currentWord = words[highlightedWordIndex]?.trim();
    const typedWord = userWords[highlightedWordIndex]?.trim();

    console.log("Current Word:", currentWord);
    console.log("Typed Word:", typedWord);

    console.log("Words Length:", words.length);
    console.log("User Words Length:", userWords.length);

    if (currentWord !== typedWord) {
      console.log("Wrong word:", typedWord);
    }

    if (currentWord === typedWord && highlightedWordIndex < words.length - 1) {
      setHighlightedWordIndex((prevIndex) => prevIndex + 1);
    } else if (
      highlightedWordIndex === words.length - 1 &&
      currentWord === typedWord
    ) {
      setEndTime(Date.now());
    }
  };

  useEffect(() => {
    if (!userInput) {
      setHighlightedWordIndex(0);
    }
  }, [userInput]);

  useEffect(() => {
    if (timeLeft === 0) {
      completeTest();
    }
  }, [timeLeft]);

  const completeTest = () => {
    const userWords = userInput.trim().split(/\s+/);
    let correctWords = [];
    let wrongWords = [];
    userWords.forEach((word, idx) => {
      if (word === words[idx]) {
        correctWords.push(word);
      } else {
        wrongWords.push({ typed: word, correct: words[idx] });
      }
    });
    const totalWords = userWords.length;
    const correctWordsCount = correctWords.length;
    const wrongWordsCount = totalWords - correctWordsCount;
    const accuracy = Math.floor((correctWordsCount / totalWords) * 100);
    const timeTakenInMinutes = (timeLimit - timeLeft) / 60;
    const grossSpeed = Math.floor(totalWords / timeTakenInMinutes);
    const errorsPerMinute = wrongWordsCount / timeTakenInMinutes;
    const netSpeed = Math.floor(grossSpeed - errorsPerMinute);

    onTestComplete(
      totalWords,
      correctWordsCount,
      wrongWordsCount,
      accuracy,
      grossSpeed,
      netSpeed,
      correctWords,
      wrongWords,
      backspaceCount
    );
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 relative">
      <div className="text-center py-4">
        <h1 className="text-3xl md:text-4xl  font-semibold text-[#e74c3c]">
          Hindi Typing Mangal
        </h1>
        <p className="text-base md:text-lg py-2 font-semibold text-gray-600">
          Practice Hindi typing Mangal to enhance your proficiency...
        </p>
      </div>
      <h1 className="text-base md:text-lg py-2 font-semibold text-gray-600">
        Hi {userName}
      </h1>
      <div className="flex items-center text-[#e74c3c] font-semibold text-lg mb-4">
        <FaHourglassStart className="mr-2 text-2xl" />
        Timer: {formatTime(timeLeft)}
      </div>
      {enableHighlight ? (
        <TextHighlighter sampleText={sampleText} userText={userInput} />
      ) : (
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 h-60 overflow-y-auto">
          {sampleText}
        </div>
      )}
      <div>
        <textarea
          ref={textAreaRef}
          className="w-full p-4 border-2 border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-4 transition"
          rows="10"
          placeholder="समय शुरू होगा जब आप टाइपिंग करना शुरू करेंगे।"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ fontSize: "20px" }}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={completeTest}
      >
        Submit Test
      </button>
    </div>
  );
};

export default HindiTypingSpace;