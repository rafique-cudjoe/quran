import React, { useState } from 'react';
import { X, Star, MessageSquare, User, BookOpen } from 'lucide-react';
import { Button } from './Button';
import { Testimonial } from '../../types';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt' | 'approved' | 'featured'>) => void;
  userName: string;
  userEmail: string;
  userId: string;
}

export const TestimonialModal: React.FC<TestimonialModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userName,
  userEmail,
  userId
}) => {
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [course, setCourse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !message.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        userId,
        userName,
        userEmail,
        rating,
        title: title.trim(),
        message: message.trim(),
        course: course.trim() || undefined,
      });
      
      // Reset form
      setRating(5);
      setTitle('');
      setMessage('');
      setCourse('');
      onClose();
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Share Your Experience</h2>
              <p className="text-sm text-slate-600">Help others discover our Quran learning program</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              How would you rate your experience?
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star as 1 | 2 | 3 | 4 | 5)}
                  className={`p-1 rounded-lg transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-200'
                  }`}
                >
                  <Star className={`w-8 h-8 ${star <= rating ? 'fill-current' : ''}`} />
                </button>
              ))}
              <span className="ml-3 text-sm text-slate-600">
                {rating === 5 ? 'Excellent!' : 
                 rating === 4 ? 'Very Good' : 
                 rating === 3 ? 'Good' : 
                 rating === 2 ? 'Fair' : 'Needs Improvement'}
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
              Testimonial Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 'Transformed my Quran recitation'"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={100}
              required
            />
            <p className="text-xs text-slate-500 mt-1">{title.length}/100 characters</p>
          </div>

          {/* Course/Session */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-slate-700 mb-2">
              Course/Session (Optional)
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="e.g., 'Evening Quran Session', 'Tajweed Mastery'"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={50}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
              Your Testimonial
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your experience with our Quran learning program. How has it helped you? What would you tell others considering joining?"
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              maxLength={500}
              required
            />
            <p className="text-xs text-slate-500 mt-1">{message.length}/500 characters</p>
          </div>

          {/* Student Info Display */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">{userName}</p>
                <p className="text-sm text-slate-600">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Privacy Notice:</strong> Your testimonial will be reviewed by our team before being published. 
              We may feature your testimonial on our website and marketing materials to help other students discover our program.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !message.trim()}
              className="flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4" />
                  <span>Submit Testimonial</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
