"use client"

import React, { useState, useRef, useEffect } from "react";
import styles from "./codeBlock.module.css"
import { SiJavascript, SiPython, SiTypescript, SiMarkdown, SiGnubash, SiC } from 'react-icons/si'
import { FaJava } from "react-icons/fa";
import { FiCopy, FiCheck, FiX } from "react-icons/fi";

import { createScope, createTimeline } from 'animejs';


function* textGenerator(node: React.ReactNode): Generator<string> {
    if (typeof node === "string" || typeof node === "number") {
        yield node.toString();
    } else if (Array.isArray(node)) {
        for (const child of node) {
            yield* textGenerator(child);
        }
    } else if (React.isValidElement(node)) {
        yield* textGenerator((node as React.ReactElement<any>).props.children);
    }
}

export default function Codespace({ children }: { children: React.ReactNode }) {
    const root = useRef<HTMLDivElement>(null);
    const scope = useRef<any>(null);
  
    useEffect(() => {
        if (!root.current) return;
        scope.current = createScope({ root: root.current }).add(self => {
            self.add('applySuccessStatus', (isSuccessAction) => {
                let buttonAnimeTimeline = createTimeline({ defaults: { duration: 300 } });
                let targetIcon = ".copy.state-failed";
                if (isSuccessAction) {
                    targetIcon = ".copy.state-success"
                }
                buttonAnimeTimeline.label('start')
                    .add(targetIcon, { scale: 0, duration: 0 }, 'start')
                    .add('.copy.state-base', { scale: 0 }, 'start')
                    .add(targetIcon, { scale: 1 }, 300)
                    .add(targetIcon, { scale: 0 }, 3000)
                    .add('.copy.state-base', { scale: 1 }, 3300)
            });
        });
      return () => scope.current.revert()
    }, []);
    
    let childArray = React.Children.toArray(children)
    let titleCaption = childArray.find((child) => React.isValidElement(child) && child.type === 'figcaption')
    let mainCode = childArray.find((child) => !(React.isValidElement(child) && child.type === 'figcaption'))

    let dataLanguage = titleCaption && React.isValidElement(titleCaption)
    ? (titleCaption as React.ReactElement<any>).props['data-language']
    : "NOT_ASSIGN_PROGRAMMING_LANGUAGE"

    let dataLanguageIcon = programingLanguageMap[dataLanguage];          
    

    let copyContent = Array.from(textGenerator(mainCode)).join('');    

    const copyButtonHandler = async () => {
        if (!scope.current) return;
        try {
            await navigator.clipboard.writeText(copyContent);
            scope.current.methods.applySuccessStatus(true);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            scope.current.methods.applySuccessStatus(false);
        }
    };



    return (
        <figure className={`relative overflow-hidden`}  ref={root}>
            {/* caption (etc. title) */}
            <div className="h-12 
                            flex items-center rounded-t-lg pl-4 pr-3 
                            border border-b-0 text-sm 
                            text-neutral-600 dark:text-neutral-400 
                            bg-neutral-100 dark:bg-black
                            border-neutral-300 dark:border-neutral-800">
                {dataLanguageIcon}
                {titleCaption}

                <div className="w-8 h-8 p-2 rounded-lg ml-auto cursor-pointer
                                transition duration-300 ease-in-out
                                hover:bg-neutral-200 dark:hover:bg-neutral-900"
                     onClick={copyButtonHandler}
                    >
                    <FiCopy className="copy state-base w-4 h-4 absolute"/>
                    <FiCheck className="copy state-success w-4 h-4 absolute scale-0"/>
                    <FiX className="copy state-failed w-4 h-4 absolute scale-0"/>
                </div>
            </div>

            {/* code base */}
            <div className={`${styles.codeblock} rounded-b-lg border border-neutral-300 dark:border-neutral-800 py-5`}>
                {mainCode}
            </div>
        </figure>
    )
}


const programingLanguageMap: Record<string, React.ReactElement> = {
    "NOT_ASSIGN_PROGRAMMING_LANGUAGE": <></>,
    "javascript": <SiJavascript className="mr-3" />,
    "python": <SiPython className="mr-3" />,
    "typescript": <SiTypescript className="mr-3" />,
    "markdown": <SiMarkdown className="mr-3" />,
    "shell": <SiGnubash className="mr-3" />,
    "bash": <SiGnubash className="mr-3" />,
    "c": <SiC className="mr-3" />,
    "java": <FaJava className="mr-3" />,
}
  