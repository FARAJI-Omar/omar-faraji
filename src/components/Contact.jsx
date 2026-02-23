import React, { useState, useRef } from "react"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const formRef = useRef()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")
    emailjs.sendForm("service_864247p", "template_2e53bbn", formRef.current, "oVBYDbz8Kv9ZA9HG1")
      .then(() => {
        setStatus("success")
        setLoading(false)
        formRef.current.reset()
        setTimeout(() => setStatus(""), 3000)
      })
      .catch(() => {
        setStatus("error")
        setLoading(false)
        setTimeout(() => setStatus(""), 3000)
      })
  }

  const inputCls = "w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.08] text-white text-[0.95rem] outline-none transition-all duration-200 focus:border-accent focus:bg-white/[0.12] placeholder:text-white/30"

  return (
    <section id="contact" className="grid grid-cols-1 md:grid-cols-2 min-h-screen -mx-[7px] mt-20">

      {/* Left panel */}
      <div className="contact-left bg-bg flex flex-col justify-center px-8 py-16 sm:px-16 md:px-24 lg:px-36 md:py-40">
        <h2 className="text-[1.4rem] sm:text-[1.7rem] font-bold leading-loose text-white">
          Do you need a web developer?
        </h2>
        <p className="text-[1.2rem] sm:text-[1.7rem] leading-loose font-semibold">Looking to build a web/mobile app?</p>
        <p className="text-[1.2rem] sm:text-[1.7rem] leading-loose font-semibold">Want to collaborate on a project?</p>
        <p className="text-[1.2rem] sm:text-[1.7rem] leading-loose font-semibold">Need a professional website?</p>
        <p className="text-base text-white font-medium mt-6 mb-4">
          Let&apos;s turn your idea into reality  contact me.
        </p>
        <a
          href="mailto:farajomar99@gmail.com"
          className="inline-flex items-center gap-3 text-accent font-semibold no-underline text-[0.95rem] mt-2 transition-all duration-200 hover:text-white"
        >
          <span></span>
          farajomar99@gmail.com
        </a>
      </div>

      {/* Right panel */}
      <div className="bg-bg-deeper flex flex-col justify-center px-8 py-12 sm:px-12 md:px-16 md:py-24">
        <h3 className="text-[1.8rem] font-bold text-accent mb-8">Get in Touch</h3>
        <form ref={formRef} className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/80">Name</label>
            <input type="text" name="name" required className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/80">Email Address</label>
            <input type="email" name="email" required className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/80">Subject</label>
            <input type="text" name="subject" required className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/80">Message</label>
            <textarea name="message" required rows={4} className={`${inputCls} resize-y min-h-[100px]`} />
          </div>

          {status === "success" && (
            <div className="px-4 py-3 rounded-lg text-sm font-medium text-center bg-[rgba(46,204,113,0.15)] text-[#2ecc71] border border-[rgba(46,204,113,0.3)]">
               Message sent successfully! I&apos;ll contact you soon.
            </div>
          )}
          {status === "error" && (
            <div className="px-4 py-3 rounded-lg text-sm font-medium text-center bg-[rgba(231,76,60,0.15)] text-[#e74c3c] border border-[rgba(231,76,60,0.3)]">
               Failed to send message. Please try again or email me directly.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-1 rounded-lg bg-accent text-bg-deeper font-bold text-[0.95rem] cursor-pointer transition-all duration-200 hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_5px_10px_rgba(246,162,28,0.63)] disabled:opacity-60 disabled:cursor-not-allowed border-none"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  )
}
