"use client"

import Link from "next/link";
import { HiMoon, HiSun } from "react-icons/hi";
import { DiGithubAlt } from "react-icons/di";
import { useState } from "react";

export default function DefaultHeader() {
    const [themeIsDark, setThemeIsDark] = useState(false);
    let darkModeMoonIcon = <HiMoon className="w-6 h-6 dark:fill-white" />;
    let darkModeSunIcon = <HiSun className="w-6 h-6 dark:fill-white" />;
    // TODO: system setting 가져오게 설정
    // let isCurrentDarkMode = false;

    function getThemeIcon(isDarkMode: boolean) {
        if (isDarkMode) {
            return darkModeSunIcon;
        }
        return darkModeMoonIcon;
    }

    let darkmodeIconClickHandler = () => {
        setThemeIsDark(!themeIsDark);
        console.log(themeIsDark, document.body)
        if (!themeIsDark) {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }

    return (
        <div className="sticky top-0 z-50 flex px-12 h-16 select-none border-b border-neutral-200 dark:border-neutral-600 align-middle dark:bg-neutral-950">
                <Link href="/">
                    <div className="flex h-full items-center">
                        <p className="text-lg font-bold pr-1 dark:text-white">@Kimssammwu</p>
                        <p className="text-lg font-light dark:text-white">BLOG</p>
                    </div>
                </Link>

                {/* ICON 영역 */}
                <div className="flex items-center ml-auto">
                    {/* <div className="auto sm:hidden">
                        <FiMenu className="w-8 h-8" />
                    </div> */}

                    <div className="hidden sm:block w-8 h-8 p-1" onClick={darkmodeIconClickHandler}>
                        {getThemeIcon(themeIsDark)}
                    </div>

                    <div className="hidden sm:block">
                        <a href="https://github.com/kimssammwu" target="_blank">
                            <DiGithubAlt className="w-8 h-8 dark:fill-white" />
                        </a>
                    </div>

                </div>
        </div>
    )
}
