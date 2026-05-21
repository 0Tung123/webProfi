'use client';

import { useState } from 'react';
import { contactService, CreateContactSubmissionDto } from '@/app/lib/api/contact.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
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
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
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
              suppressHydrationWarning
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
            Bắt đầu dự án của bạn cùng với Hạt Media
          </h2>

          <p
            className={`reveal text-[var(--text-2)] text-base sm:text-lg mb-10 text-center ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            ọi ý tưởng lớn đều cần một khởi đầu đúng đắn. Hãy chia sẻ bài toán của bạn, chúng tôi sẽ phác thảo nên giải pháp thị giác tối ưu nhất.
          </p>

          {error && (
            <div
              className={`reveal bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 ${isVisible ? 'is-visible' : ''}`}
            >
              <p className="font-semibold text-sm mb-1">Gửi tin nhắn thất bại</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => setError('')}
                className="mt-2 text-xs text-red-500 underline hover:text-red-700"
              >
                Đóng
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`reveal space-y-6 ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-1)] mb-2">
                  Tên cá nhân / Doanh nghiệp <span className="text-red-500 font-normal">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full bg-[var(--bg-1)] border border-[var(--surface-border)] px-5 py-4 text-[14px] text-[var(--text-0)] rounded-2xl placeholder-gray-400/70 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all duration-300"
                  placeholder="Nguyễn Văn A"
                  minLength={2}
                  title="Họ tên phải có ít nhất 2 ký tự"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-1)] mb-2">
                  Email <span className="text-red-500 font-normal">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full bg-[var(--bg-1)] border border-[var(--surface-border)] px-5 py-4 text-[14px] text-[var(--text-0)] rounded-2xl placeholder-gray-400/70 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all duration-300"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-1)] mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                suppressHydrationWarning
                className="w-full bg-[var(--bg-1)] border border-[var(--surface-border)] px-5 py-4 text-[14px] text-[var(--text-0)] rounded-2xl placeholder-gray-400/70 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all duration-300"
                placeholder="090 123 4567"
                pattern="[0-9\s\+\-\(\)]+"
                title="Chỉ nhập số điện thoại hợp lệ"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-1)] mb-2">
                Bài toán/Dự án của bạn là gì? <span className="text-red-500 font-normal">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                suppressHydrationWarning
                rows={6}
                className="w-full bg-[var(--bg-1)] border border-[var(--surface-border)] px-5 py-4 text-[14px] text-[var(--text-0)] rounded-2xl placeholder-gray-400/70 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all duration-300 resize-none"
                placeholder="Hãy mô tả dự án của bạn... (tối thiểu 10 ký tự)"
                minLength={10}
                title="Bài toán/Dự án của bạn phải có ít nhất 10 ký tự"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                suppressHydrationWarning
                className="inline-flex items-center justify-center rounded-full bg-accent px-10 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-accent-soft hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_14px_35px_rgba(213,175,52,0.25)]"
              >
                {isLoading ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}