import { useState, type FormEvent } from 'react'

export default function ContactForm() {
  const [reasonOpen, setReasonOpen] = useState(false)
  const [reason, setReason] = useState('')

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!reason) {
      setReasonOpen(true)
      return
    }

    const data = new FormData(event.currentTarget)
    const subject = String(data.get('subject'))
    const body = [
      `Reason for contacting: ${reason}`,
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Subject: ${subject}`,
      '',
      'Message:',
      String(data.get('message')),
    ].join('\n')

    window.location.href = `mailto:rajkshitij620@gmail.com?subject=${encodeURIComponent(subject || reason)}&body=${encodeURIComponent(body)}`
  }

  return <section className="portfolio-contact" id="contact" aria-labelledby="contact-title">
    <div className="portfolio-contact-inner">
      <p className="portfolio-contact-eyebrow">Have a project or opportunity?</p>
      <h2 id="contact-title">Let&apos;s Build Something Together.</h2>
      <form className="portfolio-contact-form" onSubmit={sendMessage}>
        <label>Name
          <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
        </label>
        <label>Email
          <input name="email" type="email" placeholder="Your email" autoComplete="email" required />
        </label>
        <label className="portfolio-contact-wide">Subject
          <input name="subject" type="text" placeholder="Project / Job Opportunity / Collaboration" required />
        </label>
        <label className="portfolio-contact-wide">Message
          <textarea name="message" placeholder="Tell me about your project or opportunity..." rows={6} required />
        </label>

        {reasonOpen && <label className="portfolio-contact-wide" htmlFor="contact-reason">Reason for contacting
          <select id="contact-reason" name="reason" value={reason} onChange={(event) => setReason(event.target.value)} required>
            <option value="" disabled>Select a reason</option>
            <option value="Job Opportunity">Job Opportunity</option>
            <option value="Freelance Project">Freelance Project</option>
          </select>
        </label>}

        <div className="portfolio-contact-actions portfolio-contact-wide">
          {!reasonOpen ? <button className="contact-button" type="button" onClick={() => setReasonOpen(true)}>Send Message</button> : <button className="contact-button" type="submit" disabled={!reason}>Send Message</button>}
        </div>
      </form>
    </div>
  </section>
}
