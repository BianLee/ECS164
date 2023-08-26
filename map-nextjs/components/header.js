"use client";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header aria-label="Site Header" className="shadow-sm bg-gray-100">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex w-0 flex-1 lg:hidden">
          <button
            className="rounded-full bg-gray-100 p-2 text-gray-600"
            type="button"
          >
            <span className="sr-only">Account</span>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewbox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <a href="#">
            <span className="sr-only">Logo</span>
            <span className="h-10 w-20 rounded-lg bg-gray-200"></span>
          </a>

          <form className="mb-0 hidden lg:flex">
            <div className="relative">
              <input
                className="h-10 rounded-lg border-gray-200 pe-10 text-sm focus:outline-none placeholder-gray-300 px-4"
                placeholder="Add City"
                type="text"
              />

              <button
                type="submit"
                className="absolute inset-y-0 end-0 rounded-r-lg p-2 text-gray-400"
              >
                +
              </button>
            </div>
          </form>
        </div>

        <div className="flex w-0 flex-1 justify-end lg:hidden">
          <button
            className="rounded-full bg-gray-100 p-2 text-gray-500"
            type="button"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {/*
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="#"
            className="rounded-lg bg-gray-200 px-5 py-2 text-sm font-medium text-gray-600"
          >
            Log in
          </a>

          <a
            href="#"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
          >
            Sign up
          </a>
        </div>
         */}
      </div>

      <div className="border-t border-gray-100 lg:hidden">
        <nav className="flex items-center justify-center overflow-x-auto p-4 text-sm font-medium">
          <a className="shrink-0 px-4 text-gray-900" href="">
            About
          </a>
          <a className="shrink-0 px-4 text-gray-900" href="">
            Blog
          </a>
          <a className="shrink-0 px-4 text-gray-900" href="">
            Projects
          </a>
          <a className="shrink-0 px-4 text-gray-900" href="">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
