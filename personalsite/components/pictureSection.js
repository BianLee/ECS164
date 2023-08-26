import React from "react";
import "@/app/globals.css";

export default function PictureSection() {
  return (
    <>
      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
          <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
            <div class="relative h-full sm:h-full lg:h-full">
              <img
                alt="Party"
                src="sitePicOne.JPG"
                class="inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="relative h-full sm:h-full lg:h-full">
              <img
                alt="Party"
                src="sitePicTwo.JPG"
                class="inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      <br />
    </>
  );
}
