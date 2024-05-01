"use client";
import { Clipboard } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { toast } from "sonner"; // Assuming 'sonner' is a real, imported library
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Key from "./Key";

interface ArabicMap {
  [key: string]: string | undefined;
}

const basicMap: ArabicMap = {
  q: "ق",
  w: "و",
  e: "ي",
  r: "ر",
  t: "ت",
  y: "ي",
  u: "ء",
  i: "ي",
  o: "و",
  p: "ب",
  a: "ا",
  s: "س",
  d: "د",
  f: "ف",
  g: "ع",
  h: "ه",
  j: "ج",
  k: "ك",
  l: "ل",
  z: "ز",
  x: "ش",
  c: "ث",
  v: "ذ",
  b: "ب",
  n: "ن",
  m: "م",
  H: "ح",
  S: "ص",
  D: "ض",
  T: "ط",
  Z: "ظ",
  Y: "ى",
};

const additionalKeys: ArabicMap = {
  "-": "ء",
  "'": "'",
  "?": "؟",
  "!": "!",
  ",": "،",
  ";": "؛",
  ":": ":",
};

const diacriticMap: ArabicMap = {
  "ت'": "ث",
  "ح'": "خ",
  "د'": "ذ",
  "س'": "ش",
  "ص'": "ض",
  "ط'": "ظ",
  "ع'": "غ",
  ءa: "أ",
  اa: "آ",
  "ي'": "ى",
  "ه'": "ة",
  "ق'": "ڨ",
  "ك'": "ڭ",
  "ر'": "ز",
};

const tappingMap = {
  ...basicMap,
  ...additionalKeys,
};

export const Keyboard = () => {
  const [text, setText] = useState<string>("");

  const handleButtonClick = (character: string): void => {
    setText((prev) => prev + character);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const char = event.key;
    if (char in tappingMap) {
      event.preventDefault();
      const basicMapChar = tappingMap[char];
      const allWords = text.split(" ");
      const lastWord = allWords.at(-1);
      const lastLetter = lastWord?.at(-1);

      if (lastLetter) {
        const combination = diacriticMap[lastLetter + char];

        if (combination) {
          setText((prev) => prev.slice(0, -1) + combination);
        } else {
          setText((prev) => prev + basicMapChar);
        }
      } else {
        setText((prev) => prev + basicMapChar);
      }
    }
  };

  const copyToClipboard = (): void => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Text copied to clipboard!"))
      .catch((err) => toast("Failed to copy text: " + err));
  };

  const keys = Object.keys(tappingMap).map((key) => ({
    eng: key,
    ara: tappingMap[key]!,
  }));

  return (
    <div className="w-full">
      <div className="mt-4 relative">
        <Textarea
          value={text}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="pl-20" // add padding to the textarea
          placeholder="أكتب هنا..."
        />
        <Button
          className="absolute top-2 left-2 z-10"
          onClick={copyToClipboard}
          variant="outline"
        >
          <Clipboard />
        </Button>
      </div>
      <div className="my-12 grid md:grid-cols-10 grid-cols-6 gap-2 md:gap-4">
        {keys.map(({ eng, ara }, index) => (
          <Key key={index} ara={ara} eng={eng} onClick={handleButtonClick} />
        ))}
      </div>
      <div>
        <p className="text-lg font-bold mb-4">Some of the rules :</p>
        <p className="text-base mb-4">
          To type diacritic letters, follow these rules:
        </p>
        <ol className="list-decimal pl-4">
          <li className="mb-2">
            <i className="font-bold">
              Typing a diacritic letter after a basic letter
            </i>
            <span className="text-muted-foreground">
              : If you type a basic letter followed by a diacritic letter, the
              diacritic letter will replace the basic letter. For example, if
              you type `&apos;`ت `&apos;` followed by `&apos;`ه `&apos;`, it
              will result in `&apos;`ث `&apos;`.
            </span>
          </li>
          <li className="mb-2">
            <i className="font-bold">Typing a diacritic letter after a space</i>
            <span className="text-muted-foreground">
              : If you type a diacritic letter after a space, it will be treated
              as a new letter and not a diacritic. For example, if you type
              `&apos;` `&apos;` followed by `&apos;`ه `&apos;`, it will result
              in `&apos;` ه `&apos;`.
            </span>
          </li>
          <li className="mb-2">
            <i className="font-bold">
              Typing a diacritic letter after a non-basic, non-diacritic letter
            </i>
            <span className="text-muted-foreground">
              : If you type a diacritic letter after a non-basic, non-diacritic
              letter, it will be treated as a new letter and not a diacritic.
              For example, if you type `&apos;`ا `&apos;` followed by `&apos;`ه
              `&apos;`, it will result in `&apos;`اه `&apos;`.
            </span>
          </li>
        </ol>
        <table className="w-full text-left text-2xl">
          <thead>
            <tr>
              <th className="px-4 py-2">Diacritic Letter</th>
              <th className="px-4 py-2">Combination</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(diacriticMap).map(([key, value]) => (
              <tr key={key}>
                <td className="border px-4 py-2">{key}</td>
                <td className="border px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
