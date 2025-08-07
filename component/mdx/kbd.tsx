import React from 'react';
import { FaWindows } from "react-icons/fa";
import { LuCommand } from "react-icons/lu";

interface KBDProps {
  children: string;
}

export default function KBD({ children }: { children: string }) {
    const keyboard = keyMap[children] || children.toLowerCase();
    return (
      <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
        {keyboard}
      </kbd>
    );
  }


// TODO: string or svg object
const keyMap: Record<string, React.ReactNode> = {
    // 알파벳 대문자 → 소문자
    A: "a", B: "b", C: "c", D: "d", E: "e",
    F: "f", G: "g", H: "h", I: "i", J: "j",
    K: "k", L: "l", M: "m", N: "n", O: "o",
    P: "p", Q: "q", R: "r", S: "s", T: "t",
    U: "u", V: "v", W: "w", X: "x", Y: "y", Z: "z",
  
    // 숫자
    "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
    "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
  
    // 방향키
    ArrowUp: "🠝",
    ArrowDown: "🠟",
    ArrowLeft: "🠜",
    ArrowRight: "🠞",
  
    // 제어 키
    Control: "ctrl",
    Ctrl: "ctrl",         // 대체 입력
    Shift: "shift",
    Alt: "alt",
    Meta: <FaWindows className="inline-block"/>,         // Windows ⊞ / Mac ⌘
    Windows: <FaWindows className="inline-block"/>,         // Windows ⊞ / Mac ⌘
    Command: <LuCommand  className="inline-block"/>,      // 대체 입력
  
    // 공통 기능 키
    Enter: "enter",
    Escape: "esc",
    Esc: "esc",           // 대체 입력
    Backspace: "backspace",
    Tab: "tab",
    CapsLock: "caps_lock",
    Space: "space",
  
    // 기호 키 (기본)
    "-": "-", "=": "=", "[": "[", "]": "]",
    "\\": "\\", ";": ";", "'": "'", ",": ",", ".": ".", "/": "/",
  
    // 기능 키
    F1: "f1", F2: "f2", F3: "f3", F4: "f4", F5: "f5",
    F6: "f6", F7: "f7", F8: "f8", F9: "f9", F10: "f10",
    F11: "f11", F12: "f12",
  };
  