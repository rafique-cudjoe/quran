import React, { useState } from 'react';
import { X, Send, Lightbulb, MessageSquare, User, Settings, HelpCircle } from 'lucide-react';
import { Button } from './Button';
import { CreateRecommendationRequest, RecommendationService } from '../../services/recommendationService';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const RecommendationModal: React.FC<RecommendationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'feature' | 'content' | 'instructor' | 'technical' | 'general'>('general');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      onError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const recommendation: CreateRecommendationRequest = {
        title: title.trim(),
        description: description.trim(),
        category,
        priority
      };

      await RecommendationService.createRecommendation(recommendation);
      onSuccess('Thank you! Your recommendation has been submitted successfully.');
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('general');
      setPriority('medium');
      onClose();
    } catch (error) {
      onError('Failed to submit recommendation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryIcons = {
    feature: <Lightbulb className="w-4 h-4" />,
    content: <MessageSquare className="w-4 h-4" />,
    instructor: <User className="w-4 h-4" />,
    technical: <Settings className="w-4 h-4" />,
    general: <HelpCircle className="w-4 h-4" />
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Share Your Recommendation</h2>
                <p className="text-sm text-slate-600">Help us improve your learning experience</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief title for your recommendation..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                maxLength={100}
                required
              />
              <p className="text-xs text-slate-500 mt-1">{title.length}/100 characters</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(categoryIcons).map(([key, icon]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key as typeof category)}
                    className={`flex items-center space-x-2 p-3 rounded-xl border transition-all ${
                      category === key
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {icon}
                    <span className="text-sm font-medium capitalize">{key}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Priority
              </label>
              <div className="flex space-x-2">
                {['low', 'medium', 'high'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p as typeof priority)}
                    className={`flex-1 p-3 rounded-xl border transition-all ${
                      priority === p
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-sm font-medium capitalize">{p}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe your recommendation in detail..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                maxLength={500}
                required
              />
              <p className="text-xs text-slate-500 mt-1">{description.length}/500 characters</p>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 flex items-center justify-center space-x-2"
                disabled={isSubmitting || !title.trim() || !description.trim()}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
