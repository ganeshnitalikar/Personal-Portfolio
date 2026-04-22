import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, Download, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import { portfolioConfig } from '../config'

const socials = [
  { icon: FaGithub,   href: portfolioConfig.socials.github,         label: 'GitHub',    sub: portfolioConfig.socials.github.replace('https://', ''),       color: '#00f5ff' },
  { icon: FaLinkedin, href: portfolioConfig.socials.linkedin,    label: 'LinkedIn',  sub: portfolioConfig.socials.linkedin.replace('https://www.', ''),  color: '#7b2fff' },
  { icon: Mail,     href: `mailto:${portfolioConfig.socials.email}`,         label: 'Email',     sub: portfolioConfig.socials.email,      color: '#ff2df7' },
]

function InputField({ id, name, label, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-mono text-white/35 tracking-wider uppercase">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-neon"
        aria-required={required}
      />
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        portfolioConfig.emailjs.serviceId,
        portfolioConfig.emailjs.templateId,
        formRef.current,
        portfolioConfig.emailjs.publicKey
      )
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 6000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 6000)
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 w-full" aria-label="Contact section">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs font-mono text-neon-magenta/60 tracking-widest uppercase mb-3 block">
            Let's Connect
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading section-title gradient-text inline-block">
            Get In Touch
          </h2>
          <p className="mt-8 text-white/38 max-w-xl mx-auto text-sm md:text-base font-heading">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          {/* Contact Form — spans 3 */}
          <motion.div
            className="md:col-span-3 glass p-7 md:p-9"
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <h3 className="text-base font-semibold font-heading text-white/70 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" style={{ boxShadow: '0 0 6px #00f5ff' }} />
              Send a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <InputField id="contact-name" name="name" label="Your Name" placeholder={`${portfolioConfig.personal.firstName} ${portfolioConfig.personal.lastName}`}
                value={formData.name} onChange={handleChange} required />
              <InputField id="contact-email" name="email" type="email" label="Email Address"
                placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-white/35 tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  className="input-neon resize-none"
                  aria-required="true"
                />
              </div>

              <motion.button
                type="submit"
                className="btn-neon btn-neon-cyan w-full justify-center mt-1"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 rounded-full"
                      style={{ borderColor: 'rgba(0,245,255,0.3)', borderTopColor: '#00f5ff' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div
                  className="flex items-center gap-2.5 text-sm text-emerald-400 font-mono bg-emerald-400/[0.07] border border-emerald-400/15 rounded-xl px-4 py-3"
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <CheckCircle size={15} className="flex-shrink-0" />
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  className="flex items-center gap-2.5 text-sm text-red-400 font-mono bg-red-400/[0.07] border border-red-400/15 rounded-xl px-4 py-3"
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <AlertCircle size={15} className="flex-shrink-0" />
                  Failed to send. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Sidebar — spans 2 */}
          <motion.div
            className="md:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            {/* Info card */}
            <div className="glass p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.15)' }}>
                    <MapPin size={14} className="text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-sm font-heading text-white/65">India · Remote Worldwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(123,47,255,0.08)', border: '1px solid rgba(123,47,255,0.15)' }}>
                    <Clock size={14} className="text-neon-violet" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-0.5">Response Time</p>
                    <p className="text-sm font-heading text-white/65">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="glass p-6 flex-grow">
              <h3 className="text-sm font-semibold font-heading text-white/60 mb-4">Connect With Me</h3>
              <div className="flex flex-col gap-2.5">
                {socials.map(({ icon: Icon, href, label, sub, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/[0.03] transition-all group animated-underline"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                      style={{ background: `${color}10`, border: `1px solid ${color}25` }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-heading text-white/65 group-hover:text-white/85 transition-colors">{label}</p>
                      <p className="text-[10px] font-mono text-white/25 truncate">{sub}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resume */}
            <div className="glass p-6">
              <h3 className="text-sm font-semibold font-heading text-white/60 mb-1.5">Resume</h3>
              <p className="text-xs text-white/30 mb-4 font-heading">Download my latest CV to learn more about my experience.</p>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon btn-neon-cyan w-full justify-center text-sm"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(0,245,255,0.15)',
                    '0 0 22px rgba(0,245,255,0.32)',
                    '0 0 10px rgba(0,245,255,0.15)',
                  ],
                }}
                transition={{ boxShadow: { duration: 2.5, repeat: Infinity } }}
              >
                <Download size={15} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
