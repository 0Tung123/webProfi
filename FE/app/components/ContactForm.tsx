'use client';

import { useState } from 'react';
import { contactService, CreateContactSubmissionDto } from '@/app/lib/api/contact.service';
import useIntersectionObserver from '@/app/hooks/useIntersectionObserver';

export default function ContactForm() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();
  const [formData, setFormData] = useState<CreateContactSubmissionDto>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await contactService.submit(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit form');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <section id="contact" ref={sectionRef} className="relative py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 text-center">
          <div
            className={`reveal max-w-2xl mx-auto bg-white rounded-lg border border-green-200 p-8 ${isVisible ? 'is-visible' : ''}`}
          >
            <h3 className="font-display text-2xl font-bold text-green-700 mb-4 uppercase">
              Cảm ơn bạn đã liên hệ!
            </h3>
            <p className="text-gray-600 mb-6">
              Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi sớm nhất có thể.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-accent-soft"
            >
              Gửi tin nhắn khác
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
        <div className="max-w-2xl mx-auto">
          <h2
            className={`reveal font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-0)] uppercase leading-tight mb-6 text-center ${isVisible ? 'is-visible' : ''}`}
          >
            Liên hệ với chúng tôi
          </h2>

          <p
            className={`reveal text-[var(--text-2)] text-base sm:text-lg mb-10 text-center ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Hãy cho chúng tôi biết ý tưởng của bạn. Chúng tôi sẵn sàng biến nó thành hiện thực.
          </p>

          {error && (
            <div
              className={`reveal bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 ${isVisible ? 'is-visible' : ''}`}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`reveal space-y-6 ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-200"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-200"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-200"
                placeholder="090 123 4567"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Tin nhắn <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-200 resize-none"
                placeholder="Hãy mô tả dự án của bạn..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-full bg-accent px-10 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-accent-soft hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_14px_35px_rgba(213,175,52,0.25)]"
              >
                {isLoading ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}