import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User as UserIcon, GraduationCap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { LoginRequest } from '../../services/authService';
import { User } from '../../types';
import { parseValidationErrors, clearFieldError, FormErrors } from '../../utils/validationUtils';

// Dummy user data for testing
const DUMMY_USERS = {
  student: {
    id: 'demo-student-1',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'student@demo.com',
    telephone: '+1-555-123-4567',
    country: 'United States',
    dateOfBirth: '1990-05-15',
    role: 'student' as const,
    userType: 'adult' as const,
    age: 35,
    dateJoined: '2024-01-15',
    timezone: 'America/New_York',
    subscription: {
      id: '1',
      plan: 'premium' as const,
      status: 'active' as const,
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      price: 49,
      autoRenew: true,
      sessionsIncluded: 16,
      sessionsUsed: 8
    },
    selectedSessions: ['1'],
    progress: {
      totalHours: 45,
      completedLessons: 12,
      currentSurah: 'Al-Baqarah',
      memorizedVerses: 150,
      achievements: [
        {
          id: '1',
          title: 'First Week Complete',
          description: 'Completed your first week of learning',
          icon: '🎉',
          dateEarned: '2024-01-22',
          category: 'attendance' as const
        },
        {
          id: '2',
          title: '30 Day Streak',
          description: 'Consistent learning for 30 days',
          icon: '🔥',
          dateEarned: '2024-02-15',
          category: 'attendance' as const
        }
      ],
      weeklyGoal: 10,
      weeklyProgress: 7
    }
  } as User,
  instructor: {
    id: 'demo-instructor-1',
    firstName: 'Muhammad',
    lastName: 'Ali',
    email: 'instructor@demo.com',
    telephone: '+1-555-987-6543',
    country: 'United States',
    dateOfBirth: '1985-03-20',
    role: 'instructor' as const,
    userType: 'adult' as const,
    age: 40,
    dateJoined: '2023-08-01',
    timezone: 'America/New_York',
    subscription: {
      id: '2',
      plan: 'premium' as const,
      status: 'active' as const,
      startDate: '2023-08-01',
      endDate: '2025-08-01',
      price: 0,
      autoRenew: false,
      sessionsIncluded: 0,
      sessionsUsed: 0
    },
    selectedSessions: [],
    progress: {
      totalHours: 500,
      completedLessons: 0,
      currentSurah: '',
      memorizedVerses: 6236, // Full Quran
      achievements: [
        {
          id: '1',
          title: 'Certified Instructor',
          description: 'Completed instructor certification',
          icon: '🎓',
          dateEarned: '2023-08-01',
          category: 'milestone' as const
        }
      ],
      weeklyGoal: 0,
      weeklyProgress: 0
    }
  } as User
};

interface LoginFormProps {
  onBack: () => void;
  onSignupClick: () => void;
  onLoginSuccess?: (user?: User) => void;
  onToastSuccess?: (title: string, message?: string) => void;
  onToastError?: (title: string, message?: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onBack,
  onSignupClick,
  onLoginSuccess,
  onToastSuccess,
  onToastError
}) => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
    userType: 'adult'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Demo login function
  const handleDemoLogin = (userType: 'student' | 'instructor') => {
    const demoUser = DUMMY_USERS[userType];
    
    // Store demo user in localStorage to simulate authentication
    localStorage.setItem('quran-academy-user', JSON.stringify(demoUser));
    localStorage.setItem('quran-academy-token', 'demo-token-' + userType);
    
    // Show success toast
    onToastSuccess?.(`Demo Login Successful`, `Logged in as ${userType}`);
    
    // Call success callback
    onLoginSuccess?.(demoUser);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await login(formData);
      
      if (response.success) {
        // Show success toast with exact backend message
        const successMessage = response.message || 'Login successful';
        onToastSuccess?.(successMessage);
        
        // Login successful, call success callback with user data
        if (response.data?.user) {
          onLoginSuccess?.(response.data.user);
        } else {
          onLoginSuccess?.();
        }
      } else {
        // Show error toast with exact backend response
        const errorMessage = response.message || response.error || 'Login Failed';
        onToastError?.(errorMessage);
        
        // Parse validation errors from backend response
        const validationErrors = parseValidationErrors(response.message || response.error || '');
        setErrors(validationErrors);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Show error toast with connection error message
      let errorMessage = 'Unable to connect to server. Please check your internet connection and try again.';
      
      // Try to extract meaningful error message from the error object
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      onToastError?.(errorMessage);
      
      // Handle unexpected errors
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    }
  };

  const handleInputChange = (field: keyof LoginRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field-specific error when user starts typing
    clearFieldError(errors, field, setErrors);
  };

  // Use rememberMe for future implementation
  React.useEffect(() => {
    if (rememberMe) {
      // Future: implement remember me functionality
      console.log('Remember me is enabled');
    }
  }, [rememberMe]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </button>
        
        <Card variant="elevated">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-600">Sign in to continue your Quran learning journey</p>
          </CardHeader>
          
          <CardContent>
            {/* Demo Login Section */}
            <div className="mb-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-3 text-center">🚀 Demo Access</h3>
              <p className="text-sm text-amber-700 mb-4 text-center">Try the platform instantly with demo accounts</p>
              
              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={() => handleDemoLogin('student')}
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Demo Student Dashboard</span>
                </Button>
                
                <Button
                  onClick={() => handleDemoLogin('instructor')}
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Demo Instructor Dashboard</span>
                </Button>
              </div>
              
              <div className="mt-3 text-xs text-amber-600 text-center">
                <p>No signup required • Full feature access • Reset anytime</p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or sign in with your account</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}
              
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                leftIcon={<Mail className="w-5 h-5 text-slate-400" />}
              />
              
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                leftIcon={<Lock className="w-5 h-5 text-slate-400" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
              />
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-700 bg-white border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-700 hover:text-blue-800">
                  Forgot password?
                </a>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Don't have an account?{' '}
                <button
                  onClick={onSignupClick}
                  className="text-blue-700 hover:text-blue-800 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
