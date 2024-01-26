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
    /*  "]": "द्व", */
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
   /*  "?": "घ्", */
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
    /* "fDk":"कि",
   "fDA":"कि", */

    fU: "नि्",
    /* "fUk":"नि",
   "fUA":"नि" */

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
  };


  /* const character1mapping={
    "?": "घ्",

  }; */
  
  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setBackspaceCount((prevCount) => prevCount + 1);
    }

    lastKeyPressed.current = e.key;

    // Custom logic to prevent certain keys
    if (
      [
        "!",
        "|",
        /*  "(", */
        "#",
        ":",
        "$",
        /*  "*", */
        "%",
        "-",
        "+",
        "\u002B",
        /*  "?",  */
        /* '"', */
        "]",
        /*  "[",  */
        "&",
        /*   "}", */
        "^",
        /*  "'",  */
        ",",
        "\\",
        "<",
        ">",
        "_",
        /*  "\u0040", */
         "@", 
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
    } /* else if (e.key === "(") {
      setUserInput((prev) => prev + "त्र");
      lastKeyPressed.current = "(";
    }  */ else if (e.key === "#") {
      setUserInput((prev) => prev + ":");
      lastKeyPressed.current = "#";
    } else if (e.key === ":") {
      setUserInput((prev) => prev + "रु");
      lastKeyPressed.current = ":";
    } else if (e.key === "$") {
      setUserInput((prev) => prev + "*");
      lastKeyPressed.current = "$";
    } /*  else if (e.key === "*") {
      setUserInput((prev) => prev + "द्ध");
      lastKeyPressed.current = "*";
    }  */ else if (e.key === "%") {
      setUserInput((prev) => prev + "-");
      lastKeyPressed.current = "%";
    } else if (e.key === "-") {
      setUserInput((prev) => prev + ";");
      lastKeyPressed.current = "-";
    } /*  else if (e.key === ";") {
      setUserInput((prev) => prev + "य");
      lastKeyPressed.current = ";";
    } */

    /*  else if (e.key === "?") {
      setUserInput((prev) => prev + "घ्");
      lastKeyPressed.current = "?";
    } */ /* else if (e.key === '"') {
      setUserInput((prev) => prev + "ष्");
      lastKeyPressed.current = '"';
    }  */ else if (e.key === "]") {
      setUserInput((prev) => prev + ",");
      lastKeyPressed.current = "]";
    } /*   else if (e.key === "[") {
      setUserInput((prev) => prev + "ख्");
      lastKeyPressed.current = "[";
    }  */ else if (e.key === "&") {
      setUserInput((prev) => prev + "'");
      lastKeyPressed.current = "&";
    } /*  else if (e.key === "}") {
      setUserInput((prev) => prev + "द्व");
      lastKeyPressed.current = "}";
    }  */ else if (e.key === "^") {
      setUserInput((prev) => prev + "'");
      lastKeyPressed.current = "^";
    } /* else if (e.key === "'") {
      setUserInput((prev) => prev + "श्");
      lastKeyPressed.current = "'";
    }  */ else if (e.key === ",") {
      setUserInput((prev) => prev + "ए");
      lastKeyPressed.current = ",";
    } else if (e.key === "\\") {
      setUserInput((prev) => prev + ")");
      lastKeyPressed.current = "\\";
    } else if (e.key === "<") {
      setUserInput((prev) => prev + "ढ");
      lastKeyPressed.current = "<";
    } else if (e.key === ">") {
      setUserInput((prev) => prev + "झ");
      lastKeyPressed.current = ">";
    } else if (e.key === "_") {
      setUserInput((prev) => prev + ".");
      lastKeyPressed.current = "_";
    } else if (e.key === "+") {
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
  
    
   /*  else if (e.key === ";" && lastKeyPressed.current === "f") {
      e.preventDefault();
      setUserInput(
        (prev) =>
          prev.slice(0, -charactersMapping["f"].length) +
          charactersMapping["f;"]
      );
    } */


       else if (e.key === "\u0040") {
      setUserInput((prev) => prev + "@");
      lastKeyPressed.current = "\u0040";
    }   
     else if (e.key === "@") {
      setUserInput((prev) => prev + "/");
      lastKeyPressed.current = "@";
    }    
    
   

    if (e.key === "Z" && userInput.endsWith("इ")) {
      // If the last characters are 'इ', replace them with 'ई'
      setUserInput((prev) => prev.slice(0, -1) + "ई");
      // Set the last key pressed to 'Z'
      lastKeyPressed.current = "Z";
      // Prevent the default behavior of the key press
      e.preventDefault();
    } else if (e.key === "Z" && userInput.length > 0) {
      const lastChar = userInput.slice(-1);
      // Apply the default logic for 'Z'
      const modifiedText = characterMapping["Z"] + lastChar;
      setUserInput((prev) => prev.slice(0, -1) + modifiedText);
      // Set the last key pressed to 'Z'
      lastKeyPressed.current = "Z";
      // Prevent the default behavior of the key press
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

      // Check for complete sequences in the user input
      for (let key in characterMapping) {
        if (userInput.endsWith(key)) {
          output = characterMapping[key];
        }
      }

      setOutputValue(output);
    }, 300); // Adjust the debounce delay as needed

    return () => clearTimeout(timeoutId);
  }, [userInput]);

  const handleInputChange = (e) => {
    if (timeLeft > 0) {
      let inputValue = e.target.value;

      const specialCharacterMapping = {
         "@": "/",  
          "\u0040": "@",  // Alt+064 mapped to @
        "&": '"',
        /*           "'": "श्",
         */ /* "/": "ध्",  */
        /*  '"': "ष्", */
        ",": "ए",

        /*   ".": "ण्", */
        "]": ",",
       /*  "\u003F": "?", */
        /*            "\u003F": "?",
         */ /*  "\u0022": '"', */
        "\u005D": "]",
        /*  "\u005B": "[", */
        "\u0026": "&",
        /* "\u007D": "}", */ // Alt+0125 mapped to }
        "\u005E": "^", // Alt+094 mapped to ^
        /*  "\u0027": "'",  */ // Alt+039 mapped to '
        "\u002C": ",", // Alt+044 mapped to ,
        "\u005C": "\\", // Alt+092 mapped to \
        "\u003A": ":", // Alt+058 mapped to :
        /*  "\u003B": ";", */ // Alt+059 mapped to ;
        "\u0023": "#",
        "\u003C": "<", // Alt+060 mapped to <
        "\u003E": ">", // Alt+062 mapped to >
        /*          _: ".",
         */
      };

      if (inputValue.length > 1) {
        // If there are more than one characters in the input, handle special characters separately
        const lastChar = inputValue.slice(-1);
        const restOfString = inputValue.slice(0, -1);

        if (specialCharacterMapping.hasOwnProperty(lastChar)) {
          inputValue = restOfString + specialCharacterMapping[lastChar];
        } else {
          inputValue = restOfString + lastChar;
        }
      } else {
        if (specialCharacterMapping.hasOwnProperty(inputValue)) {
          inputValue = specialCharacterMapping[inputValue];
        }
      }

      inputValue = inputValue.replace(/w/g, "ू").replace(/a/g, "ं");

      if (
        [
          "!",
          "|",
          "(",
          "#",
          ":",
          "$",
          "*",
          "%",
          "-",
          /*  ";", */
          /*  "?", */
          /*  '"', */
          "]",
          /* "[", */
          "&",
          "}",
          "\\",
           "@",
          /*  ".", */
          /*  "_", */
        ].includes(e.key)
      ) {
        inputValue = inputValue.slice(0, -1); // Remove the last character
      }

      let newInput = "";
      let mappedValue = "";
      let isFPressedLocal = isFPressed;

      for (let i = 0; i < inputValue.length; i++) {
        const char = inputValue[i];

        if (specialCharacterMapping.hasOwnProperty(char)) {
          // If the current character is one of the special characters, add it without further conversion
          newInput += char;
        } 
        
        else if (char in charactersMapping) {
          const mappedCharacter = charactersMapping[char];
          if (char === "Q" && newInput[newInput.length - 1] === "उ") {
            newInput = newInput.slice(0, -1) + "ऊ";
          } else if (isIApplied) {
            setIsIApplied(false);

            if (char === "[" && newInput.endsWith(charactersMapping["f"])) {
              newInput = newInput.slice(0, -charactersMapping["f"].length);
              newInput += charactersMapping[`f${char}`] || char;
            } else if (
              char === "'" &&
              newInput.endsWith(charactersMapping["f"])
            ) {
              newInput = newInput.slice(0, -charactersMapping["f"].length);
              newInput += charactersMapping[`f${char}`] || char;
            } else if (
              char === "/" &&
              newInput.endsWith(charactersMapping["f"])
            ) {
              newInput = newInput.slice(0, -charactersMapping["f"].length);
              newInput += charactersMapping[`f${char}`] || char;
            } else if (
              char === '"' &&
              newInput.endsWith(charactersMapping["f"])
            ) {
              newInput = newInput.slice(0, -charactersMapping["f"].length);
              newInput += charactersMapping[`f${char}`] || char;
            } else if (
              char === "{" &&
              newInput.endsWith(charactersMapping["f"])
            ) {
              newInput = newInput.slice(0, -charactersMapping["f"].length);
              newInput += charactersMapping[`f${char}`] || char;
            } else if (
              char === "?" &&
              newInput.endsWith(charactersMapping["f"])
            ) {
              newInput = newInput.slice(0, -charactersMapping["f"].length);
              newInput += charactersMapping[`f${char}`] || char;
            } else if (
              char === "." &&
              newInput.endsWith(charactersMapping["f"])
            ) {
              newInput = newInput.slice(0, -charactersMapping["f"].length);
              newInput += charactersMapping[`f${char}`] || char;
            } else if (
              char === "F" &&
              newInput.endsWith(charactersMapping["f"])
            ) {
              newInput = newInput.slice(0, -charactersMapping["f"].length);
              newInput += charactersMapping[`f${char}`] || char;
            } else if (
              char === "H" &&
              newInput.endsWith(charactersMapping["f"])
            ) {
              newInput = newInput.slice(0, -charactersMapping["f"].length);
              newInput += charactersMapping[`f${char}`] || char;
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
              newInput = newInput.slice(0, -1) + mappedCharacter + "ि";
            }
          } else {
            setIsIApplied(char === "f");
            newInput += mappedCharacter;
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["f["])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping["f["].length);
          newInput += characterMapping[`f[${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["f'"])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping["f'"].length);
          newInput += characterMapping[`f'${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["f/"])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping["f/"].length);
          newInput += characterMapping[`f/${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping['f"'])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping['f"'].length);
          newInput += characterMapping[`f"${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["f{"])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping["f{"].length);
          newInput += characterMapping[`f{${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["f?"])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping["f?"].length);
          newInput += characterMapping[`f?${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["f."])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping["f."].length);
          newInput += characterMapping[`f.${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["fF"])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping["fF"].length);
          newInput += characterMapping[`fF${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["fH"])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping["fH"].length);
          newInput += characterMapping[`fH${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["fD"])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping["fD"].length);
          newInput += characterMapping[`fD${char}`] || char;
        } else if (char === "[") {
        /* else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping['fU'])
        ) {
          // Handle 'A' and 'k' after 'f['
          newInput = newInput.slice(0, -characterMapping['fU'].length);
          newInput += characterMapping[`fU${char}`] || char;
       
        }  */
          // Handle '[' character separately
          newInput += characterMapping[char];
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["["])
        ) {
          // Handle 'A' and 'k' after '['
          newInput = newInput.slice(0, -characterMapping["["].length);
          newInput += characterMapping[`[${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["[A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["[A"].length);
          newInput += characterMapping[`[${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["[k"])
        ) {
          // Handle 'A' and 'k' after '[k'
          newInput = newInput.slice(0, -characterMapping["[k"].length);
          newInput += characterMapping[`[${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput

          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["[A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["[A"].length);
          newInput += characterMapping[`[${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["[kA"])
        ) {
          // Handle 'A' and 'k' after '[kA'
          newInput = newInput.slice(0, -characterMapping["[kA"].length);
          newInput += characterMapping[`[k${char}`] || char;

          if (char === "A" || char === "k") {
            newInput += "ा";
          }
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
          /* else if (char === "Z" && newInput[newInput.length - 1] === "इ") {
          newInput = newInput.slice(0, -1) + "ई";
        } */
          newInput += "ँ";
          i++;
        } else if (char === "{") {
          // Handle '[' character separately
          newInput += characterMapping[char];
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["{"])
        ) {
          // Handle 'A' and 'k' after '['
          newInput = newInput.slice(0, -characterMapping["{"].length);
          newInput += characterMapping[`{${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["{A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["{A"].length);
          newInput += characterMapping[`{${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["{k"])
        ) {
          // Handle 'A' and 'k' after '[k'
          newInput = newInput.slice(0, -characterMapping["{k"].length);
          newInput += characterMapping[`{${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["{A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["{A"].length);
          newInput += characterMapping[`{${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["{kA"])
        ) {
          // Handle 'A' and 'k' after '[kA'
          newInput = newInput.slice(0, -characterMapping["{kA"].length);
          newInput += characterMapping[`{k${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (char === "'") {
          // Handle '[' character separately
          newInput += characterMapping[char];
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["'"])
        ) {
          // Handle 'A' and 'k' after '['
          newInput = newInput.slice(0, -characterMapping["'"].length);
          newInput += characterMapping[`'${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["'A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["'A"].length);
          newInput += characterMapping[`'${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["'k"])
        ) {
          // Handle 'A' and 'k' after '[k'
          newInput = newInput.slice(0, -characterMapping["'k"].length);
          newInput += characterMapping[`'${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["'A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["'A"].length);
          newInput += characterMapping[`'${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["'kA"])
        ) {
          // Handle 'A' and 'k' after '[kA'
          newInput = newInput.slice(0, -characterMapping["'kA"].length);
          newInput += characterMapping[`'k${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (char === "/") {
          // Handle '[' character separately
          newInput += characterMapping[char];
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["/"])
        ) {
          // Handle 'A' and 'k' after '['
          newInput = newInput.slice(0, -characterMapping["/"].length);
          newInput += charactersMapping[`/${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["/A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["/A"].length);
          newInput += charactersMapping[`/${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["/k"])
        ) {
          // Handle 'A' and 'k' after '[k'
          newInput = newInput.slice(0, -characterMapping["/k"].length);
          newInput += characterMapping[`/${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["/A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["/A"].length);
          newInput += charactersMapping[`/${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["/kA"])
        ) {
          // Handle 'A' and 'k' after '[kA'
          newInput = newInput.slice(0, -characterMapping["/kA"].length);
          newInput += characterMapping[`/k${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (char === "?") {
          // Handle '[' character separately
          newInput += characterMapping[char];
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["?"])
        ) {
          // Handle 'A' and 'k' after '['
          newInput = newInput.slice(0, -characterMapping["?"].length);
          newInput += characterMapping[`?${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["?A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["?A"].length);
          newInput += characterMapping[`?${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["?k"])
        ) {
          // Handle 'A' and 'k' after '[k'
          newInput = newInput.slice(0, -characterMapping["?k"].length);
          newInput += characterMapping[`?${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["?A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["?A"].length);
          newInput += characterMapping[`?${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["?kA"])
        ) {
          // Handle 'A' and 'k' after '[kA'
          newInput = newInput.slice(0, -characterMapping["?kA"].length);
          newInput += characterMapping[`?k${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (char === ".") {
          // Handle '[' character separately
          newInput += characterMapping[char];
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["."])
        ) {
          // Handle 'A' and 'k' after '['
          newInput = newInput.slice(0, -characterMapping["."].length);
          newInput += characterMapping[`.${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping[".A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping[".A"].length);
          newInput += characterMapping[`.${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping[".k"])
        ) {
          // Handle 'A' and 'k' after '[k'
          newInput = newInput.slice(0, -characterMapping[".k"].length);
          newInput += characterMapping[`.${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping[".A"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping[".A"].length);
          newInput += characterMapping[`.${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping[".kA"])
        ) {
          // Handle 'A' and 'k' after '[kA'
          newInput = newInput.slice(0, -characterMapping[".kA"].length);
          newInput += characterMapping[`.k${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (char === "F") {
          // Handle '[' character separately
          newInput += characterMapping[char];
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["F"])
        ) {
          // Handle 'A' and 'k' after '['
          newInput = newInput.slice(0, -characterMapping["F"].length);
          newInput += characterMapping[`F${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["FA"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["FA"].length);
          newInput += characterMapping[`F${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["Fk"])
        ) {
          // Handle 'A' and 'k' after '[k'
          newInput = newInput.slice(0, -characterMapping["Fk"].length);
          newInput += characterMapping[`F${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["FA"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["FA"].length);
          newInput += characterMapping[`F${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["FkA"])
        ) {
          // Handle 'A' and 'k' after '[kA'
          newInput = newInput.slice(0, -characterMapping["FkA"].length);
          newInput += characterMapping[`Fk${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (char === "H") {
          // Handle '[' character separately
          newInput += characterMapping[char];
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["H"])
        ) {
          // Handle 'A' and 'k' after '['
          newInput = newInput.slice(0, -characterMapping["H"].length);
          newInput += characterMapping[`H${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["HA"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["HA"].length);
          newInput += characterMapping[`H${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["Hk"])
        ) {
          // Handle 'A' and 'k' after '[k'
          newInput = newInput.slice(0, -characterMapping["Hk"].length);
          newInput += characterMapping[`H${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["HA"])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping["HA"].length);
          newInput += characterMapping[`H${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping["HkA"])
        ) {
          // Handle 'A' and 'k' after '[kA'
          newInput = newInput.slice(0, -characterMapping["HkA"].length);
          newInput += characterMapping[`Hk${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (char === '"') {
          // Handle '[' character separately
          newInput += characterMapping[char];
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping['"'])
        ) {
          // Handle 'A' and 'k' after '['
          newInput = newInput.slice(0, -characterMapping['"'].length);
          newInput += characterMapping[`"${char}`] || char;
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping['"A'])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping['"A'].length);
          newInput += characterMapping[`"${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping['"k'])
        ) {
          // Handle 'A' and 'k' after '[k'
          newInput = newInput.slice(0, -characterMapping['"k'].length);
          newInput += characterMapping[`"${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping['"A'])
        ) {
          // Handle 'A' and 'k' after '[A'
          newInput = newInput.slice(0, -characterMapping['"A'].length);
          newInput += characterMapping[`"${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else if (
          (char === "A" || char === "k") &&
          newInput.endsWith(characterMapping['"kA'])
        ) {
          // Handle 'A' and 'k' after '[kA'
          newInput = newInput.slice(0, -characterMapping['"kA'].length);
          newInput += characterMapping[`"k${char}`] || char;

          // If the current character is 'A', append 'ा' to newInput
          if (char === "A" || char === "k") {
            newInput += "ा";
          }
        } else {
          newInput += characterMapping[char] || char;
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

      // Clear previous debounce timeout
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      // Set a new debounce timeout
      const newTimeout = setTimeout(() => {
        // Process the input after the debounce period
        processUserInput(newInput);
      }, 200);

      setDebounceTimeout(newTimeout);
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
      // Handle wrong word logic here
      console.log("Wrong word:", typedWord);
    }

    if (currentWord === typedWord && highlightedWordIndex < words.length - 1) {
      // Move to the next word
      setHighlightedWordIndex((prevIndex) => prevIndex + 1);
    } else if (
      highlightedWordIndex === words.length - 1 &&
      currentWord === typedWord
    ) {
      // End of the test
      setEndTime(Date.now());
    }
  };

  useEffect(() => {
    if (!userInput) {
      setHighlightedWordIndex(0);
    }
  }, [userInput]);

  useEffect(() => {
    /*  if (timeLeft === 0) {
      const userWords = userInput.trim().split(/\s+/);
      let correctWords = [];
      userWords.forEach((word, idx) => {
        if (word === words[idx]) {
          correctWords.push(word);
        }
      }); */

    if (timeLeft === 0) {
      const userWords = userInput.trim().split(/\s+/);
      let correctWords = [];
      let wrongWords = [];
      userWords.forEach((word, idx) => {
        if (word === words[idx]) {
          correctWords.push(word);
        } else {
          wrongWords.push(word);
        }
      });
      const totalWords = userWords.length;
      const correctWordsCount = correctWords.length;
      const wrongWordsCount = totalWords - correctWordsCount;
      const accuracy = Math.floor((correctWordsCount / totalWords) * 100);
      const timeTakenInMinutes = (timeLimit - timeLeft) / 60;
      const grossSpeed = Math.floor(totalWords / timeTakenInMinutes);
      const errorsPerMinute =
        (totalWords - correctWordsCount) / timeTakenInMinutes;
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
        backspaceCount,

        []
      );
    }
  }, [timeLeft, userInput, onTestComplete, words, timeLimit]);

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
    </div>
  );
};

export default HindiTypingSpace;
