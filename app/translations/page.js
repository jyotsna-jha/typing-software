"use client"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faExchangeAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu"
}

const Translator = () => {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [translateFrom, setTranslateFrom] = useState('en-GB');
  const [translateTo, setTranslateTo] = useState('hi-IN');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleExchange = () => {
    setFromText(toText);
    setToText(fromText);
    setTranslateFrom(translateTo);
    setTranslateTo(translateFrom);
  };

  const handleKeyUp = () => {
    if (!fromText) {
      setToText('');
    }
  };

  const handleTranslate = () => {
    if (!fromText) return;
    setToText('Translating...');

    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fromText)}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.responseData && data.responseData.translatedText) {
          setToText(data.responseData.translatedText);
        } else {
          setToText('Translation not available');
        }
      })
      .catch((error) => {
        console.error('Translation error:', error);
        setToText('Translation error');
      });
  };

  const handleCopyOrSpeak = (target, source) => {
    if (!fromText || !toText) return;

    if (target === 'copy') {
      navigator.clipboard.writeText(source);
    } else {
      if (isSpeaking) {
        // Stop speaking
        speechSynthesis.cancel();
      } else {
        // Start speaking
        const utterance = new SpeechSynthesisUtterance(source);
        utterance.lang = target === 'from' ? translateFrom : translateTo;
        speechSynthesis.speak(utterance);
      }

      // Toggle the speaking state
      setIsSpeaking(!isSpeaking);
    }
  };

  const handleReset = () => {
    setFromText('');
    setToText('');
  };

  return (
    <div className="container mx-auto p-4 mt-8 max-w-2xl">
      <h1 className="text-4xl text-red-500 mb-4 font-bold text-center">Language Translator</h1>
      <p className="text-gray-600 md:text-lg mb-8 text-center font-semibold">Translate text between different languages with style...</p>
      <div className="flex flex-col items-center space-y-6 lg:space-y-8">
        <div className="text-input relative w-full">
          <button
            className="absolute bottom-4 left-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800 text-sm"
            onClick={handleReset}
          >
            Reset
          </button>
          <textarea
            spellCheck="false"
            className="from-text p-4 border border-gray-300 rounded-lg w-full h-64 focus:outline-none focus:border-red-300 focus:border-4 transition"
            placeholder="Enter text"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
            onKeyUp={handleKeyUp}
          ></textarea>
          <button
            className="absolute bottom-4 right-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800 text-sm"
            onClick={handleTranslate}
          >
            Translate
          </button>
        </div>
        <div className="flex items-center space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="row flex items-center space-x-4">
            <div className="icons cursor-pointer" onClick={() => handleCopyOrSpeak('from', fromText)}>
              {/* Removed faCopy icon */}
            </div>
            <div className="icons cursor-pointer" onClick={() => handleCopyOrSpeak('from', fromText)}>
              <FontAwesomeIcon icon={faVolumeUp} className={`text-gray-600 text-lg lg:text-xl ${isSpeaking ? 'text-red-500' : ''}`} />
            </div>
            <select
              value={translateFrom}
              onChange={(e) => setTranslateFrom(e.target.value)}
              className="border border-gray-300 rounded p-2 text-gray-600"
            >
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="exchange cursor-pointer" onClick={handleExchange}>
            <FontAwesomeIcon icon={faExchangeAlt} className="text-gray-600 text-2xl lg:text-3xl" />
          </div>
          <div className="row flex items-center space-x-4">
            <select
              value={translateTo}
              onChange={(e) => setTranslateTo(e.target.value)}
              className="border border-gray-300 rounded p-2 text-gray-600"
            >
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <div className="icons cursor-pointer" onClick={() => handleCopyOrSpeak('to', toText)}>
              <FontAwesomeIcon icon={faVolumeUp} className={`text-gray-600 text-lg lg:text-xl ${isSpeaking ? 'text-red-500' : ''}`} />
            </div>
            <div className="icons cursor-pointer" onClick={() => handleCopyOrSpeak('to', toText)}>
              {/* Removed faCopy icon */}
            </div>
          </div>
        </div>
        <textarea
          spellCheck="false"
          readOnly
          disabled
          className="to-text p-4 border border-gray-300 rounded-lg w-full h-64 mt-4"
          placeholder="Translation"
          value={toText}
        ></textarea>
      </div>
    </div>
  );
};

export default Translator;
