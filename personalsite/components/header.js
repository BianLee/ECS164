import Link from "next/link";
import React from "react";
export default function Header() {
  return (
    <>
      <section className="bg-sky-900">
        <div class="px-4 text-white -mb-10 pt-5 mr-5 sm:invisible lg:visible invisible">
          <p class="text-right text-md font-medium">
            <Link
              href="https://open.spotify.com/artist/5QHoUe5kwjvOfjfHrbVTBY?si=9xcSsTQzQq-OZXN9_i_N5Q"
              target="_blank"
            >
              Spotify
            </Link>
            <Link href="https://www.instagram.com/bian.lee/" target="_blank">
              <span class="ml-6">Instagram</span>
            </Link>
            <Link href="https://www.linkedin.com/in/bianlee/" target="_blank">
              <span class="ml-6">LinkedIn</span>
            </Link>
            <Link href="https://github.com/BianLee" target="_blank">
              <span class="ml-6">GitHub</span>
            </Link>
          </p>
        </div>
        <div className="mx-auto lg:max-w-5xl sm:max-w-4xl md:max-w-6xl max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* Build & Grow Your Listener Base */}
          <h2
            className="text-left text-5xl font-bold text-white tracking-tight sm:text-6xl"
            style={{ lineHeight: "3.5rem" }}
          >
            <div className="inline-block mb-2">
              <div
                class="text-white inline-bl ock text-[55px] lg:text-7xl sm:text-[55px]"
                style={{ lineHeight: "3.7rem" }}
              >
                Hi! I'm Bian :0
              </div>
            </div>
            {/* <div class="text-orange-400 inline-block">AllegroStudio</div> */}
          </h2>
          <div className="mb-0 sm:mb-0 md:mb-3 lg:mb-5 sm:mt-5 lg:mt-3 mt-5">
            <div className="text-left  inline-block sm:text-xl lg:text-xl text-white tracking-tight sm:text-lg sm:mt-3 lg:mt-5">
              I am a college freshman studying Computer Science and Economics,
              passionate about software engineering, decentralized finance /
              web3, and music production. I've previously interned at a social
              finance startup, Vestr.io, as an analyst. This summer, I'll be a
              data analyst intern at California Air Resources Board in
              Sacramento, California.
              <br />
              <br />
              I've recently launched a web dev + design agency{" "}
              <a
                href="https://empireweb.space"
                target="_blank "
                class="text-yellow-300"
              >
                empireweb.space
              </a>
              . If you (or your organization) need a custom site built, be sure
              to check it out — pricing is negotiable.
              <br />
              <br />
              When I'm not writing code, I'm writing music ♪. Visit{" "}
              <a href="/music" class="text-yellow-300">
                this page
              </a>{" "}
              to find out more about my work.
              <br />
              <br />
              Additionally, click{" "}
              <a href="/gallery" class="text-yellow-300">
                here
              </a>{" "}
              to view my photo gallery.
            </div>
          </div>
        </div>{" "}
      </section>
    </>
  );
}
