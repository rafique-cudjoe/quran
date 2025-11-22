import React from 'react';
import { 
  BookOpen, 
  Users, 
  Video, 
  Star, 
  Award, 
  Clock, 
  Globe,
  CheckCircle,
  Play,
  ArrowRight,
  User,
  Calendar
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onWatchSalatVideos: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, onWatchSalatVideos }) => {
  const features = [
    {
      icon: <Video className="w-6 h-6 text-blue-700" />,
      title: "Live Zoom Sessions",
      description: "Interactive live classes with qualified Quran teachers through Zoom video calls"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-700" />,
      title: "Expert Instructors",
      description: "Learn from certified Quran teachers with years of teaching experience"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-700" />,
      title: "Time Zone Based Sessions",
      description: "Join sessions scheduled for your time zone with students of all skill levels"
    },
    {
      icon: <Award className="w-6 h-6 text-blue-700" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed progress reports and achievements"
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-700" />,
      title: "Global Community",
      description: "Join students from around the world in your Quran learning journey"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-700" />,
      title: "Mixed-Level Sessions",
      description: "Learn alongside students of different levels in time zone-based classes"
    }
  ];

  const testimonials = [
    {
      name: "Aisha Mohammed",
      location: "London, UK",
      rating: 5,
      text: "The live sessions are amazing! My teacher is so patient and knowledgeable. I've learned more in 3 months than I did in years of self-study.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%234F46E5'/%3E%3Ctext x='24' y='30' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EA%3C/text%3E%3C/svg%3E"
    },
    {
      name: "Ahmad Hassan",
      location: "Toronto, Canada", 
      rating: 5,
      text: "Perfect for busy parents like me. The flexible scheduling allows me to learn while my kids are at school. Highly recommended!",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%2306B6D4'/%3E%3Ctext x='24' y='30' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EA%3C/text%3E%3C/svg%3E"
    },
    {
      name: "Fatima Ali",
      location: "Sydney, Australia",
      rating: 5,
      text: "My daughter loves her Quran classes! The teacher makes learning fun and engaging. We can see her progress every week.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%2310B981'/%3E%3Ctext x='24' y='30' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EF%3C/text%3E%3C/svg%3E"
    }
  ];

  const plans = [
    {
      name: "Free Salat Videos",
      price: "$0",
      period: "/always",
      features: [
        "Complete Salat prayer tutorials",
        "Step-by-step guidance",
        "Multiple camera angles",
        "Arabic pronunciation help",
        "No registration required",
        "Watch anytime, anywhere"
      ],
      popular: false,
      isFree: true
    },
    {
      name: "Quran Learning Premium",
      price: "$29",
      period: "/month", 
      features: [
        "4 live Quran sessions per week",
        "Time zone-based scheduling",
        "Mixed skill level classes",
        "Expert certified instructors",
        "Progress tracking & reports",
        "Interactive Zoom classes",
        "Community access",
        "Mobile app access",
        "Downloadable resources"
      ],
      popular: true,
      isFree: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-lg bg-white border border-slate-100">
                <img 
                  src="/logos/ismail-academy-logo.jpeg" 
                  alt="Ismail Academy" 
                  className="w-18 h-18 object-contain rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
                  Ismail Academy
                </h1>
                <p className="text-sm text-slate-600 font-medium">Learn Quran Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onWatchSalatVideos} className="text-blue-700 hover:text-blue-800 hover:bg-blue-50">
                <Play className="w-4 h-4 mr-2" />
                Watch Salat Videos
              </Button>
              <Button variant="ghost" onClick={onLogin} className="text-slate-700 hover:text-slate-900 hover:bg-slate-50">
                Sign In
              </Button>
              <Button onClick={onGetStarted} className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-md">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-8 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Badge */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-semibold shadow-lg mb-4">
              <Star className="w-4 h-4 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
              Welcome to Ismail Academy
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content - Text */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-6">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Learn the Holy{' '}
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
                  Quran
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience personalized online Quran learning with <strong className="text-slate-900">Muallim Adubofour Ismael</strong> - 
                a certified instructor dedicated to helping you master Quranic recitation and Tajweed.
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Live Sessions Available</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">10,000+ Students</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={onGetStarted} 
                  className="px-10 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Start Learning Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-10 py-6 text-lg border-2 border-blue-600 text-blue-700 hover:bg-blue-50 hover:border-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" 
                  onClick={onWatchSalatVideos}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Free Salat Videos
                </Button>
              </div>
            </div>

            {/* Right Content - Video */}
            <div className="lg:col-span-7">
              <div className="relative group">
                {/* Video Container */}
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-200">
                  <div className="relative aspect-video">
                    <video 
                      id="hero-video"
                      className="w-full h-full object-cover"
                      autoPlay 
                      muted 
                      loop
                      playsInline
                    >
                      <source src="/video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Gradient Overlay for Better Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Instructor Info Badge - Top Left */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <div className="flex items-center space-x-3 bg-white/98 backdrop-blur-md rounded-xl px-4 py-3 shadow-2xl border border-slate-100">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center ring-2 ring-blue-100">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm">Muallim Adubofour Ismael</h3>
                          <p className="text-xs text-slate-600 font-medium">Certified Quran Instructor</p>
                        </div>
                      </div>
                      <Badge variant="success" className="shadow-lg px-3 py-1.5 text-xs font-bold">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          LIVE
                        </div>
                      </Badge>
                    </div>

                    {/* Video Controls - Bottom Right */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                      <button
                        onClick={() => {
                          const video = document.getElementById('hero-video') as HTMLVideoElement;
                          if (video) {
                            video.muted = !video.muted;
                          }
                        }}
                        className="group/btn bg-white/95 hover:bg-white backdrop-blur-md rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
                        aria-label="Toggle mute"
                      >
                        <svg className="w-5 h-5 text-slate-700 group-hover/btn:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          const video = document.getElementById('hero-video') as HTMLVideoElement;
                          if (video) {
                            if (video.paused) {
                              video.play();
                            } else {
                              video.pause();
                            }
                          }
                        }}
                        className="group/btn bg-white/95 hover:bg-white backdrop-blur-md rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
                        aria-label="Play/Pause"
                      >
                        <Play className="w-5 h-5 text-slate-700 group-hover/btn:text-blue-600 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>

              {/* Trust Indicators Below Video */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Certified Instructor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Time Zone Based</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Interactive Sessions</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the most comprehensive and interactive way to learn the Quran 
              from the comfort of your home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Time Zone Sessions Explanation */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Global Learning Community
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Sessions Organized By Time Zone
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12">
              We schedule our live sessions based on time zones, not skill levels. This means you'll learn 
              alongside students from your region who may be beginners, intermediate, or advanced learners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Regional Time Zones
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Join sessions scheduled for North America, Europe, Asia, or other regions 
                    at times that work best for your local schedule.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Adaptive Learning Environment
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our sessions are designed to accommodate all skill levels. Whether you're 
                    just starting or advancing your knowledge, you'll receive personalized 
                    attention suited to your learning pace.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Convenient Timing
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    No more staying up late or waking up early for sessions. Join classes 
                    at reasonable hours in your local time zone.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Sample Session Schedule
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-900">Session 1</div>
                    <div className="text-sm text-slate-600">Morning</div>
                  </div>
                  <div className="text-blue-700 font-semibold">9:00 AM - 11:00 AM</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-900">Session 2</div>
                    <div className="text-sm text-slate-600">Afternoon</div>
                  </div>
                  <div className="text-blue-700 font-semibold">2:00 PM - 4:00 PM</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-900">Session 3</div>
                    <div className="text-sm text-slate-600">Evening</div>
                  </div>
                  <div className="text-blue-700 font-semibold">7:00 PM - 9:00 PM</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-900">Session 4</div>
                    <div className="text-sm text-slate-600">Late Afternoon</div>
                  </div>
                  <div className="text-blue-700 font-semibold">4:00 PM - 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Salat Videos Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Always Free • No Registration Required
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Learn Perfect Salat Prayer 🕌
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Master the proper way to perform your daily prayers with our comprehensive video tutorials. 
              Available 24/7 for everyone, completely free.
            </p>
            <Button 
              size="lg" 
              variant="primary"
              onClick={onWatchSalatVideos}
              className="px-8 bg-blue-600 hover:bg-blue-700"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Salat Videos Now
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated" className="hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Complete Prayer Guide
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Step-by-step instructions for all five daily prayers with proper movements and recitations.
                </p>
              </CardContent>
            </Card>
            
            <Card variant="elevated" className="hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Multiple Languages
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Arabic pronunciation with English explanations to help you understand every step.
                </p>
              </CardContent>
            </Card>
            
            <Card variant="elevated" className="hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Watch Anytime
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Access our prayer tutorials 24/7 from any device. Perfect for learning at your own pace.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-slate-600">
              Join thousands of satisfied students who have transformed their Quran learning journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Learning Plan
            </h2>
            <p className="text-xl text-slate-600">
              Free Salat videos for everyone, premium Quran learning with monthly subscription
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                variant={plan.popular ? "elevated" : "default"}
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                } ${plan.isFree ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="success" className="px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                {plan.isFree && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="px-4 py-1 bg-blue-600 text-white">Always Free</Badge>
                  </div>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-blue-700 mr-3" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.popular ? "primary" : plan.isFree ? "outline" : "outline"} 
                    className="w-full"
                    onClick={plan.isFree ? onWatchSalatVideos : onGetStarted}
                  >
                    {plan.isFree ? "Watch Free Videos" : "Start Learning"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Quran Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join our community of dedicated learners and start your transformation today. 
            Your first session is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="px-8"
              onClick={onGetStarted}
            >
                          Start Watching free videos
                          <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 border-white text-white hover:bg-white hover:text-blue-700"
            >
             Join the academy
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Ismail Academy</h3>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Empowering Muslims worldwide to learn and connect with the Holy Quran through 
                innovative online education and expert instruction.
              </p>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Our Instructors</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Curriculum</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 Ismail Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
