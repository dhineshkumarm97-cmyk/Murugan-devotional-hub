import React, { useState } from 'react';
import { Send, Mail, User, Heart, Sparkles, CheckCircle2, ExternalLink, Briefcase, Video } from 'lucide-react';
import { MessageCategory } from '../types';

export default function ContactView() {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<MessageCategory>('devotee');
  const [subcategory, setSubcategory] = useState('bhajans');
  const [message, setMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [gmailUrl, setGmailUrl] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');
  
  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle category toggle
  const handleCategoryChange = (cat: MessageCategory) => {
    setCategory(cat);
    if (cat === 'devotee') {
      setSubcategory('bhajans');
    } else {
      setSubcategory('sponsorship');
    }
  };

  // Handle message submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          category,
          subcategory,
          message,
          videoUrl: category === 'devotee' ? videoUrl : '',
        }),
      });

      if (response.ok) {
        // Build direct email and Gmail Compose URLs
        const recipient = 'mdinovationpvtltd@gmail.com';
        const isDevotee = category === 'devotee';
        const mailtoSubject = `[Murugan Devotional Hub] ${isDevotee ? 'Devotee Feedback' : 'Partner/Advertiser Proposal'} from ${name}`;
        const videoSection = (isDevotee && videoUrl) ? `\nSuggested Video URL: ${videoUrl}` : '';
        const mailtoBody = `Dear Murugan South India Devotional,\n\nName: ${name}\nEmail: ${email}\nCategory: ${isDevotee ? 'Devotee' : 'Partner/Advertiser'}\nTopic: ${subcategory.replace('_', ' ').toUpperCase()}${videoSection}\n\nMessage:\n${message}\n\n---\nSent via Murugan Devotional Hub`;

        const generatedGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
        const generatedMailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

        setGmailUrl(generatedGmailUrl);
        setMailtoUrl(generatedMailtoUrl);
        setSubmitSuccess(true);

        // Attempt to auto-open Gmail in new tab, fallback to mailto redirect
        try {
          const newWindow = window.open(generatedGmailUrl, '_blank');
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            window.location.href = generatedMailtoUrl;
          }
        } catch (error) {
          window.location.href = generatedMailtoUrl;
        }

        // Clear fields
        setName('');
        setEmail('');
        setMessage('');
        setVideoUrl('');
      } else {
        const errData = await response.json();
        setSubmitError(errData.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setSubmitError('Server error. Please check if your backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Intro Text Section */}
      <div id="contact-welcome-banner" className="bg-white rounded-3xl p-6 md:p-10 border border-amber-100 shadow-sm space-y-6">
        <div className="border-b border-amber-100 pb-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-amber-950 flex items-center gap-2">
            🙏 Divine Connection & Communication Hub
          </h2>
          <p className="text-slate-600 text-sm mt-1">Vetrivel Muruganukku Arohara! Let’s keep in touch and grow our divine community.</p>
        </div>

        {/* The Exact User Welcome Text */}
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
          <p className="font-semibold text-amber-900 text-base">
            Vanakkam & Welcome! (Om Muruga) 🙏<br/>
            Vetrivel Muruganukku Arohara!
          </p>
          <p>
            Thank you for visiting. This space is dedicated to connecting with our wonderful community of devotees and potential partners/advertisers. No login or account is required to send a message.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-200/40 space-y-3">
              <h3 className="font-bold font-display text-amber-950 flex items-center gap-2 text-base">
                <Heart className="w-5 h-5 text-amber-600 fill-amber-600/15" /> Share Devotee Feedback
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We would love to hear your thoughts on our recent Murugan devotional videos, bhajans, or temple content. Please share your suggestions or let us know what kind of divine content or prayer requests you wish to see next on the channel.
              </p>
            </div>

            <div className="bg-amber-100/30 rounded-2xl p-6 border border-amber-200/30 space-y-3">
              <h3 className="font-bold font-display text-amber-950 flex items-center gap-2 text-base">
                <Briefcase className="w-5 h-5 text-amber-700 fill-amber-700/10" /> Partner & Advertiser Proposals
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                If you are a business looking to advertise on our channel, promote relevant devotional products, or collaborate on video sponsorship proposals, please share your business requirements.
              </p>
            </div>
          </div>

          <p className="pt-4 text-sm font-medium text-amber-900 border-t border-amber-100 mt-4">
            Please select the appropriate category and fill out the simple form below to send a message directly to our inbox. May Lord Murugan’s blessings be with you always.
          </p>
        </div>
      </div>

      {/* Main Grid: Form on left, quick tips on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-amber-100 shadow-md space-y-6">
          <h3 className="text-lg font-bold font-display text-amber-950 flex items-center gap-2">
            <Send className="w-5 h-5 text-amber-600" /> {category === 'devotee' ? 'Devotee Feedback Form' : 'Partner & Advertiser Form'}
          </h3>

          {submitSuccess ? (
            <div id="form-success-alert" className="text-center py-8 px-4 space-y-5 bg-amber-50 rounded-2xl border border-amber-200 animate-fadeIn">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto text-white shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold font-display text-amber-950">Message Ready to Send!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your message has been saved in the inbox. We have also prepared your email to send directly to Murugan South India Devotional's Gmail inbox (<code className="font-mono bg-amber-100 text-amber-900 px-1 rounded text-xs">mdinovationpvtltd@gmail.com</code>).
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                If the email composer did not launch automatically, please click one of the buttons below to open Gmail or your default email app:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {gmailUrl && (
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" /> Open in Gmail Web
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {mailtoUrl && (
                  <a
                    href={mailtoUrl}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Open Default Mail App
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="pt-4 border-t border-amber-200/50 mt-4">
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2.5 rounded-full border border-amber-600 text-amber-800 hover:bg-amber-100/50 font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {submitError}
                </div>
              )}

              {/* Category Selector Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  I want to connect as a <span className="text-amber-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    id="cat-devotee-btn"
                    type="button"
                    onClick={() => handleCategoryChange('devotee')}
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 font-medium text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      category === 'devotee'
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold shadow-sm'
                        : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-slate-50/50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${category === 'devotee' ? 'fill-amber-600 text-amber-600' : ''}`} />
                    Devotee Feedback
                  </button>

                  <button
                    id="cat-partner-btn"
                    type="button"
                    onClick={() => handleCategoryChange('partner')}
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 font-medium text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      category === 'partner'
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold shadow-sm'
                        : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-slate-50/50'
                    }`}
                  >
                    <Briefcase className={`w-4 h-4 ${category === 'partner' ? 'fill-amber-700/15 text-amber-700' : ''}`} />
                    Partner / Advertiser
                  </button>
                </div>
              </div>

              {/* Grid Name / Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="form-name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none text-sm transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="form-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none text-sm transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Subcategory */}
              <div className="space-y-1.5">
                <label htmlFor="form-subcategory" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Subject / Reason <span className="text-amber-600">*</span>
                </label>
                <select
                  id="form-subcategory"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none text-sm bg-white transition-all duration-300"
                >
                  {category === 'devotee' ? (
                    <>
                      <option value="bhajans">Feedback on Devotional Bhajans</option>
                      <option value="temple_content">Suggestions for Temple Visit videos</option>
                      <option value="poojas">Special Pooja Ritual Video suggestions</option>
                      <option value="general_feedback">General Devotee Encouragement / Prayer Request</option>
                    </>
                  ) : (
                    <>
                      <option value="sponsorship">Video Sponsorship Proposal</option>
                      <option value="advertising">Channel Banner / End-screen Advertisement</option>
                      <option value="collaboration">Collaborating on joint Devotional Content</option>
                      <option value="other_business">Other Partnerships</option>
                    </>
                  )}
                </select>
              </div>

              {/* Video URL (Only shown for Devotee Feedback form) */}
              {category === 'devotee' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label htmlFor="form-videourl" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Video URL / YouTube Link <span className="text-slate-400 font-normal text-[10px]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Video className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="form-videourl"
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none text-sm transition-all duration-300"
                    />
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="form-message" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {category === 'devotee' ? 'Your Message / Feedback' : 'Your Business Proposal / Message'} <span className="text-amber-600">*</span>
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={5}
                  placeholder={
                    category === 'devotee'
                      ? 'Share your thoughts, divine wishes, bhajan feedback, or what you would love to see next on the channel...'
                      : 'Please specify your brand, proposed campaign, budget guidelines, timeline, or collaborative ideas...'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none text-sm transition-all duration-300"
                />
              </div>

              <button
                id="form-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 disabled:bg-amber-300 flex items-center justify-center gap-2 shadow-md shadow-amber-900/10 hover:shadow-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <>Sending Message...</>
                ) : (
                  <>
                    <Send className="w-4 h-4 fill-white" /> Submit Message Directly
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Informational sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick FAQ / Guidelines */}
          <div className="bg-amber-50/40 rounded-3xl p-6 border border-amber-200/40 space-y-4">
            <h4 className="font-bold font-display text-sm text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" /> Connecting Safely
            </h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed list-disc list-inside">
              <li>No signup or account registration is required to share your feedback or proposal.</li>
              <li>Sponsors and advertisers generally receive response feedback within 48 business hours.</li>
              <li>Your personal details are kept strictly private and secure on this portal.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
