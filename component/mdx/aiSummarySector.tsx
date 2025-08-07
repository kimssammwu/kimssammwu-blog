"use client"

import { RiRobot2Fill } from "react-icons/ri";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

let minimumDelay = 1500
let maximumDelay = 3500





export default function AiSummarySector({ children }: { children: string }) {
    let [display, setDisplay] = useState(false);
    
    useEffect(()=>{
        let randomDelay = minimumDelay + Math.floor(Math.random() * (maximumDelay - minimumDelay))
        randomDelay = 1
        let timer = setTimeout(()=>{ setDisplay(true) }, randomDelay);
        return ()=>{ clearTimeout(timer) }
    }, []);

    return (
        <div className="p-4 mb-12 select-none rounded-lg border border-neutral-300 dark:border-neutral-800">
            <div className="flex mb-6">
                <div className="w-8 h-8 bg-blue-600 p-2 rounded border border-blue-700">
                    <FaWandMagicSparkles className="w-4 h-4 fill-white"/>
                </div>
                <p className="text-md font-semibold pl-4 dark:text-white">AI가 요약한 내용입니다</p>
            </div>
            {
                display ?
                <AiSummarySectorDetail childrens={[
                    "야간 근무 중 반복되던 비효율적인 업무를 자동화하기 위해 클립보드 복사 방식을 개선했습니다.", 
                    "한셀은 CSV 형식 텍스트를 표로 인식하지만, 한글에서는 표로 붙여넣지 못해 HTML 포맷을 이용한 클립보드 복사 방식으로 전환했습니다.", 
                    "HTML 테이블을 클립보드에 복사해 한글에서 표로 붙여넣는 데 성공, 기존 5분 걸리던 작업을 5초로 단축했습니다."]} /> :
                <AiSummarySecotrNotDisplay childrens={[
                    "야간 근무 중 반복되던 비효율적인 업무를 자동화하기 위해 클립보드 복사 방식을 개선했습니다.", 
                    "한셀은 CSV 형식 텍스트를 표로 인식하지만, 한글에서는 표로 붙여넣지 못해 HTML 포맷을 이용한 클립보드 복사 방식으로 전환했습니다.", 
                    "HTML 테이블을 클립보드에 복사해 한글에서 표로 붙여넣는 데 성공, 기존 5분 걸리던 작업을 5초로 단축했습니다."]} />
            }
        </div>
    );
  }


function AiSummarySecotrNotDisplay({ childrens }: { childrens: Array<string> }) {
    return (
        <ol className="transparent-marker pl-4 text-transparent">
            {childrens.map((child, index) => {
                return (
                    <li key={index} className="m-1 rounded bg-gray-200 dark:bg-gray-800 animate-pulse">{child}</li>
                )
            })}
            {/* <li className="m-1 rounded bg-gray-200 dark:bg-gray-800 animate-pulse">Lorem ipsum dolor sit amet</li>
            <li className="m-1 rounded bg-gray-200 dark:bg-gray-800 animate-pulse">consectetur adipiscing elit, sed do eiusmod tempor iminim veniam, consectetur adipiscing elit, sed do eiusmod tempor iminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
            <li className="m-1 rounded bg-gray-200 dark:bg-gray-800 animate-pulse">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li> */}
        </ol>
    )
} 



function AiSummarySectorDetail({ childrens }: { childrens: Array<string> }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedTexts, setCompletedTexts] = useState<string[]>([]);

  const speed = 50;

  useEffect(() => {
    if (currentIndex >= childrens.length) return;

    const text = childrens[currentIndex];
    let currentText = '';
    let idx = 0;

    const interval = setInterval(() => {
      currentText += text[idx];
      idx++;

      // 업데이트 현재 줄
      const updated = [...completedTexts];
      updated[currentIndex] = currentText;
      setCompletedTexts(updated);

      if (idx >= text.length) {
          clearInterval(interval);
          if (childrens.length == completedTexts.length) { return }
        // 다음 줄 추가 준비 & 줄 간 딜레이
        setTimeout(() => {
          setCompletedTexts((prev) => [...prev, '']);
          setCurrentIndex((prev) => prev + 1);
        }, 300);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [currentIndex]);


  return (
    <ol className="pl-4">
      {completedTexts.map((text, idx) => {
        return (
            <li key={idx} className="m-1">
              {text}
            </li>
        )
      }
      )}
    </ol>
  );
}


// function AiSummarySectorDetail({ childrens }: { childrens: Array<string> }) {
//     let totalDelay = 0;
//     let speed = 50;
//     return (
//         <ol className="pl-4">
//             {
//                 childrens.map((child, index) => {
//                     totalDelay = totalDelay + (child.length * speed);
//                     console.log(totalDelay)
//                     return (
//                         <li key={index} className="m-1">{<TypingEffect text={child} delay={totalDelay} speed={speed} />}</li>
//                     )
//                 })
//             }
//         </ol>
//     )
// } 







// const TypingEffect = ({ text, delay, speed }: { text: string; delay: number; speed: number }) => {
//     const [displayedText, setDisplayedText] = useState('');
//     const prevStringRef = useRef('');
//     const timeoutsRef = useRef<number[]>([]);
  
//     useEffect(() => {
//       const timeouts: number[] = [];
  
//       Array.from(text).forEach((char, idx) => {
//         const timeoutId = window.setTimeout(() => {
//           prevStringRef.current += char;
//           setDisplayedText(prevStringRef.current);
//         }, delay + idx * speed);
//         timeouts.push(timeoutId);
//       });
  
//       // cleanup on unmount
//       timeoutsRef.current = timeouts;
//       return () => {
//         timeoutsRef.current.forEach((id) => clearTimeout(id));
//       };
//     }, [text, delay, speed]);
  
//     return <div>{displayedText}</div>;
//   };
  