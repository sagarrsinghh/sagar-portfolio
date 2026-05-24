import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";

const socials = [
  {
    name: "GitHub",
    link: "https://github.com/sagarrsinghh",
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/sagarrsingh10",
  },
  {
    name: "Email",
    link: "mailto:sagarr.st11@gmail.com",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [lastMessageLinks, setLastMessageLinks] = useState({ whatsapp: "", sms: "" });
  const [method, setMethod] = useState("email"); // "email" or "whatsapp"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Construct pre-filled text for direct messaging
    const textMessage = `Hello Sagar! My name is ${formData.name} (${formData.email}). I reached out from your Spider-Verse Portfolio:\n\n"${formData.message}"`;
    const whatsappUrl = `https://wa.me/917426977723?text=${encodeURIComponent(textMessage)}`;
    const smsUrl = `sms:+917426977723?body=${encodeURIComponent(textMessage)}`;
    
    setLastMessageLinks({ whatsapp: whatsappUrl, sms: smsUrl });

    if (method === "whatsapp") {
      // Directly open WhatsApp
      window.open(whatsappUrl, "_blank");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://formsubmit.co/ajax/sagarr.st11@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Spider-Verse Message from ${formData.name}! 🕸️`
        })
      });

      let result = null;
      try {
        result = await response.json();
      } catch (err) {
        // Not JSON
      }

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        if (result && result.message && (result.message.toLowerCase().includes("activate") || result.message.toLowerCase().includes("check your inbox"))) {
          setStatus("activation_sent");
        } else {
          setStatus("error");
        }
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="
        relative
        min-h-screen
        px-6
        md:px-16
        py-32
        overflow-hidden
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-red-600/10
          rounded-full
          blur-[180px]
        "
      ></div>

      {/* TITLE */}
      <motion.div
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        viewport={{
          once: true,
        }}
        className="
          relative
          z-10
          text-center
          mb-24
        "
      >
        <p
          className="
            text-red-500
            uppercase
            tracking-[6px]
            text-sm
            mb-5
          "
        >
          Connect Across The Spider-Verse
        </p>

        <h2
          className="
            text-5xl
            md:text-7xl
            font-black
            text-white
          "
          style={{
            fontFamily: "Orbitron",
          }}
        >
          CONTACT
          <span className="text-red-600">
            HUB
          </span>
        </h2>
      </motion.div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-16
        "
      >
        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            x: -80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          <h3
            className="
              text-4xl
              font-black
              text-white
              leading-tight
            "
          >
            Let’s Build
            Something
            Legendary.
          </h3>

          <p
            className="
              mt-8
              text-gray-300
              leading-[2]
            "
          >
            Whether it’s full-stack systems, scalable backend
            architectures, immersive frontend experiences, or
            creative product ideas —
            I’m always open to building something extraordinary.
          </p>

          {/* SOCIALS */}
          <div
            className="
              mt-12
              flex
              flex-wrap
              gap-5
            "
          >
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                className="
                  px-6
                  py-3
                  rounded-full
                  bg-white/5
                  border
                  border-red-500/20
                  backdrop-blur-xl
                  hover:border-red-500/50
                  hover:bg-red-500/10
                  transition-all
                  duration-300
                "
              >
                {social.name}
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <GlassCard
          xOffset={80}
          className="p-10 rounded-[35px] min-h-[450px]"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              {status === "success" || status === "activation_sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center h-full py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center border border-red-500/40 shadow-[0_0_20px_rgba(255,0,0,0.4)] mb-6 animate-[bounce_2s_infinite]">
                    <span className="text-3xl">{status === "activation_sent" ? "✉️" : (method === "whatsapp" ? "💬" : "🕸️")}</span>
                  </div>
                  <h4 className="text-2xl font-black text-red-500 uppercase tracking-widest" style={{ fontFamily: "Orbitron" }}>
                    {status === "activation_sent" ? "ACTIVATION SENT!" : (method === "whatsapp" ? "WHATSAPP READY!" : "TRANSMISSION SENT!")}
                  </h4>
                  <p className="text-gray-300 mt-3 text-xs leading-relaxed max-w-[320px]">
                    {status === "activation_sent"
                      ? "FormSubmit has sent an activation link to sagarr.st11@gmail.com. Please check your spam/inbox and click 'Activate' to enable submissions!"
                      : method === "whatsapp" 
                        ? "A new tab has been launched with your WhatsApp message draft! If it did not open automatically, click the button below to complete transmission:"
                        : "Your message has been beamed to Sagar's email inbox (sagarr.st11@gmail.com). You can also instantly send it to his phone number:"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-5 w-full max-w-[340px]">
                    <a
                      href={lastMessageLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 font-semibold tracking-wide text-xs text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105 text-center"
                    >
                      Send WhatsApp 💬
                    </a>
                    <a
                      href={lastMessageLinks.sms}
                      className="flex-1 flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold tracking-wide text-xs text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:scale-105 text-center"
                    >
                      Send SMS 📱
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs text-gray-400 hover:text-white underline decoration-red-500/50 hover:decoration-red-500 transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form-inputs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 flex-grow flex flex-col justify-between"
                >
                  {/* METHOD TOGGLE */}
                  <div className="flex rounded-full bg-black/60 border border-red-500/25 p-1 mb-2">
                    <button
                      type="button"
                      onClick={() => setMethod("email")}
                      className={`flex-1 py-2.5 px-4 rounded-full text-[10px] md:text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                        method === "email"
                          ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      🛰️ TRANSMIT EMAIL
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("whatsapp")}
                      className={`flex-1 py-2.5 px-4 rounded-full text-[10px] md:text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                        method === "whatsapp"
                          ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      🕸️ DIRECT WHATSAPP
                    </button>
                  </div>

                  {/* INPUTS */}
                  <div className="space-y-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="
                        w-full
                        px-6
                        py-5
                        rounded-2xl
                        bg-black/40
                        border
                        border-red-500/20
                        outline-none
                        focus:border-red-500
                        text-white
                        transition-all
                        duration-300
                      "
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="
                        w-full
                        px-6
                        py-5
                        rounded-2xl
                        bg-black/40
                        border
                        border-red-500/20
                        outline-none
                        focus:border-red-500
                        text-white
                        transition-all
                        duration-300
                      "
                    />

                    <textarea
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      required
                      className="
                        w-full
                        px-6
                        py-5
                        rounded-2xl
                        bg-black/40
                        border
                        border-red-500/20
                        outline-none
                        focus:border-red-500
                        text-white
                        resize-none
                        transition-all
                        duration-300
                      "
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-xs font-semibold tracking-wide">
                      ⚠️ Transmission failed! Please try emailing directly to sagarr.st11@gmail.com.
                    </p>
                  )}

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={`
                      mt-4
                      w-full
                      px-8
                      py-4
                      rounded-full
                      shadow-[0_0_25px_rgba(255,0,0,0.45)]
                      transition-all
                      duration-300
                      font-semibold
                      tracking-wide
                      cursor-pointer
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      ${method === "whatsapp" 
                        ? "bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_25px_rgba(16,185,129,0.45)] text-white" 
                        : "bg-red-600 hover:bg-red-700 text-white"}
                    `}
                  >
                    {status === "submitting" 
                      ? "Transmitting..." 
                      : method === "whatsapp" 
                        ? "Initiate WhatsApp Chat 💬" 
                        : "Send Message 🚀"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </GlassCard>


      </div>

    </section>
  );
};

export default Contact;