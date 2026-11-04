import React, { useState, useEffect } from 'react';
import { Star, Plus } from 'lucide-react';
import { Review } from '../types/index.js';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [favoriteItem, setFavoriteItem] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success && data.reviews) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author,
          city,
          rating,
          comment,
          favoriteItem
        })
      });

      const data = await res.json();
      if (data.success) {
        setFeedback('Thank you for sharing your experience!');
        fetchReviews();
        setTimeout(() => {
          setIsModalOpen(false);
          setAuthor('');
          setComment('');
          setCity('');
          setFeedback('');
        }, 1200);
      }
    } catch {
      setFeedback('Error saving review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-16 md:py-24 border-b border-[#E8DEC8]/60 bg-[#F5EDE3]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="text-xs font-semibold tracking-wider text-[#B45309] uppercase mb-1">
              Guest Impressions
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#2C1810] tracking-tight">
              Stories From Sunshine
            </h2>
            <p className="text-sm text-[#6B5143] mt-2">
              Read how neighbors, writers, and coffee aficionados enjoy their mornings and afternoons with us.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2C1810] hover:bg-[#432519] text-[#FAF7F2] text-xs font-medium rounded-xl shadow-xs transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-[#DECDBB] shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#D97706]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-current text-[#D97706]' : 'text-[#E5D7C5]'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-[#2C1810] ml-1.5 tabular-nums">
                    {rev.rating}.0
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4A3428] leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2ECE3]">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h4 className="text-xs font-bold text-[#2C1810]">{rev.author}</h4>
                    <p className="text-[11px] text-[#8C6D58]">{rev.city}</p>
                  </div>
                  <span className="text-[11px] text-[#A89382]">{rev.date}</span>
                </div>

                {rev.favoriteItem && (
                  <div className="mt-2 text-[11px] text-[#78350F] font-medium bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E8DEC8]">
                    Favorite: {rev.favoriteItem}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C0F0A]/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#FAF7F2] border border-[#DECDBB] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#2C1810]">
              <h3 className="text-2xl font-display font-bold text-[#2C1810] mb-1">
                Share Your Experience
              </h3>
              <p className="text-xs text-[#7A6150] mb-6">
                Tell us about your favorite roast, peaceful table moments, or a delicious pastry you tried.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#5C4537] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Chen"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5C4537] mb-1">
                      City / Neighborhood
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bangalore, South Ext."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5C4537] mb-1">
                      Favorite Drink or Treat
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hearth-Smoked Vanilla Latte"
                      value={favoriteItem}
                      onChange={(e) => setFavoriteItem(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-1">
                    Rating ({rating} Stars)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-[#D97706] hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating ? 'fill-current text-[#D97706]' : 'text-[#D4C3B3]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C4537] mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Write your thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                  />
                </div>

                {feedback && (
                  <div className="text-xs text-[#059669] font-medium bg-[#ECFDF5] p-2 rounded-lg">
                    {feedback}
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#7A6150] hover:text-[#2C1810]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-[#2C1810] text-[#FAF7F2] text-xs font-medium rounded-xl hover:bg-[#432519] transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Posting...' : 'Post Story'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
