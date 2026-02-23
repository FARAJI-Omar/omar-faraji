import React from "react"
import quoteImage from "../assets/quote.jpg"
import logoImage from "../assets/logo2.png"

export default function Footer() {
  return (
    <footer id="footer" className="bg-bg flex items-center justify-center px-6 py-12 mt-20 sm:mt-32 md:mt-40">
      <div className="max-w-[1000px] w-full flex flex-col items-center gap-12">

        {/* Testimonial */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 max-w-[1100px] w-full">
          <div className="flex-shrink-0">
            <img
              src={quoteImage}
              alt="Donald Knuth"
              className="w-20 h-24 sm:w-28 sm:h-36 rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <span className="text-5xl text-white/15 font-light leading-none">&ldquo;</span>
            <p className="text-lg sm:text-[1.3rem] font-medium leading-7 text-white m-0">
              Programs are meant to be read by humans and only incidentally executed by computers.
            </p>
            <div className="flex flex-col gap-1">
              <h4 className="text-[1.05rem] font-medium text-white/75 m-0">Donald Knuth</h4>
              <p className="text-sm text-[#8a8f9e] m-0 font-normal">&ldquo;father of algorithm analysis&rdquo;</p>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col items-center gap-6 w-full">
          <img src={logoImage} alt="Logo" className="w-12 h-12 object-contain" />
          <p className="text-base text-white/80 m-0 font-normal">That&apos;s all, thanks for scrolling.</p>
          <div className="flex gap-10 items-center">
            <a href="https://www.linkedin.com/in/omar-faraji-1b7274332/" className="social-link" aria-label="LinkedIn">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://github.com/FARAJI-Omar" className="social-link" aria-label="GitHub">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
