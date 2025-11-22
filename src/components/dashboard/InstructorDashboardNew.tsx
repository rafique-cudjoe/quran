import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus,
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Video,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  User,
  DollarSign,
  BarChart3,
  MessageSquare,
  CheckCircle,
  XCircle,
  X,
  Mail,
  Globe,
  CreditCard,
  Save,
  Send,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Menu,
  BookOpen
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Session, Instructor, User as UserType, Testimonial, SessionSubscription, Announcement } from '../../types';

// Mobile-optimized collapsible section component
interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  badge?: string | number;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
  badge
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/30 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          {badge && (
            <Badge variant="primary" className="bg-indigo-100 text-indigo-700">
              {badge}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 hidden sm:block">
            {isExpanded ? 'Collapse' : 'Expand'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="p-4 pt-0 border-t border-white/20">
          {children}
        </div>
      </div>
    </div>
  );
};

interface InstructorDashboardProps {
  instructor: Instructor;
  sessions: Session[];
  students: UserType[];
  onDeleteSession: (sessionId: string) => void;
  onStartSession: (sessionId: string) => void;
  onLogout: () => void;
}

// Mock testimonials data (in a real app, this would come from an API)
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Ahmed Hassan',
    userEmail: 'ahmed@example.com',
    rating: 5,
    title: 'Excellent Teaching',
    message: 'The instructor explains everything so clearly. My Quran recitation has improved tremendously!',
    course: 'Session 1 - Beginner Quran Recitation',
    approved: false,
    featured: false,
    createdAt: '2025-09-01T10:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Fatima Ali',
    userEmail: 'fatima@example.com',
    rating: 5,
    title: 'Amazing Experience',
    message: 'This academy has been a blessing for our family. My children love their Quran classes!',
    course: 'Session 4 - Family Quran Learning',
    approved: true,
    featured: true,
    createdAt: '2025-08-28T14:20:00Z'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Omar Khan',
    userEmail: 'omar@example.com',
    rating: 4,
    title: 'Great Progress',
    message: 'I have made significant progress in my Tajweed. The instructor is very patient and knowledgeable.',
    course: 'Session 2 - Tajweed Mastery',
    approved: false,
    featured: false,
    createdAt: '2025-09-03T16:45:00Z'
  },
  {
    id: '4',
    userId: '4',
    userName: 'Maryam Abdullah',
    userEmail: 'maryam@example.com',
    rating: 5,
    title: 'Outstanding Service',
    message: 'The quality of teaching is exceptional. My daughter has memorized 3 surahs already!',
    course: 'Session 3 - Advanced Hifz Program',
    approved: true,
    featured: false,
    createdAt: '2025-09-02T11:15:00Z'
  },
  {
    id: '5',
    userId: '5',
    userName: 'Yusuf Ibrahim',
    userEmail: 'yusuf@example.com',
    rating: 4,
    title: 'Very Helpful',
    message: 'Great support and guidance throughout the learning process. Highly recommended!',
    course: 'Session 1 - Beginner Quran Recitation',
    approved: true,
    featured: true,
    createdAt: '2025-08-30T09:20:00Z'
  },
  {
    id: '6',
    userId: '6',
    userName: 'Khadija Rahman',
    userEmail: 'khadija@example.com',
    rating: 5,
    title: 'Perfect for Beginners',
    message: 'As a new Muslim, this course helped me learn the basics of Quran recitation beautifully.',
    course: 'Session 1 - Beginner Quran Recitation',
    approved: false,
    featured: false,
    createdAt: '2025-09-04T13:30:00Z'
  },
  {
    id: '7',
    userId: '7',
    userName: 'Abdullah Malik',
    userEmail: 'abdullah@example.com',
    rating: 4,
    title: 'Structured Learning',
    message: 'The systematic approach to teaching Tajweed rules is very effective.',
    course: 'Session 2 - Tajweed Mastery',
    approved: true,
    featured: false,
    createdAt: '2025-08-29T15:45:00Z'
  },
  {
    id: '8',
    userId: '8',
    userName: 'Zahra Hussain',
    userEmail: 'zahra@example.com',
    rating: 5,
    title: 'Wonderful Experience',
    message: 'My children love their Quran classes. The instructor is very patient with kids.',
    course: 'Session 4 - Family Quran Learning',
    approved: true,
    featured: true,
    createdAt: '2025-09-01T17:00:00Z'
  },
  {
    id: '9',
    userId: '9',
    userName: 'Hassan Ali',
    userEmail: 'hassan@example.com',
    rating: 4,
    title: 'Good Progress',
    message: 'I can see improvement in my recitation week by week. Thank you for the guidance!',
    course: 'Session 2 - Tajweed Mastery',
    approved: false,
    featured: false,
    createdAt: '2025-09-05T12:10:00Z'
  },
  {
    id: '10',
    userId: '10',
    userName: 'Amina Farouk',
    userEmail: 'amina@example.com',
    rating: 5,
    title: 'Highly Recommend',
    message: 'Excellent teaching methodology and very supportive instructor. Five stars!',
    course: 'Session 3 - Advanced Hifz Program',
    approved: true,
    featured: false,
    createdAt: '2025-08-27T14:25:00Z'
  },
  {
    id: '11',
    userId: '11',
    userName: 'Mohammad Tariq',
    userEmail: 'mohammad.t@example.com',
    rating: 4,
    title: 'Family Friendly',
    message: 'Great for the whole family. We all learn together during the family sessions.',
    course: 'Session 4 - Family Quran Learning',
    approved: false,
    featured: false,
    createdAt: '2025-09-03T10:40:00Z'
  },
  {
    id: '12',
    userId: '12',
    userName: 'Layla Ahmed',
    userEmail: 'layla@example.com',
    rating: 5,
    title: 'Amazing Results',
    message: 'My memorization has improved significantly. The techniques taught here are very effective.',
    course: 'Session 3 - Advanced Hifz Program',
    approved: true,
    featured: true,
    createdAt: '2025-08-31T16:20:00Z'
  }
];

// Mock session subscriptions data
const mockSubscriptions: SessionSubscription[] = [
  {
    id: 'sub1',
    userId: '1',
    sessionId: '1',
    subscriptionDate: '2025-08-15T10:00:00Z',
    status: 'active',
    paymentStatus: 'paid',
    price: 49.99,
    totalPaid: 49.99,
    userName: 'Ahmed Hassan',
    userEmail: 'ahmed@example.com',
    sessionTitle: 'Beginner Quran Recitation',
    nextPaymentDate: '2025-09-15T10:00:00Z'
  },
  {
    id: 'sub2',
    userId: '2',
    sessionId: '2',
    subscriptionDate: '2025-08-20T14:30:00Z',
    status: 'active',
    paymentStatus: 'paid',
    price: 59.99,
    totalPaid: 59.99,
    userName: 'Fatima Ali',
    userEmail: 'fatima@example.com',
    sessionTitle: 'Tajweed Mastery',
    nextPaymentDate: '2025-09-20T14:30:00Z'
  },
  {
    id: 'sub3',
    userId: '3',
    sessionId: '1',
    subscriptionDate: '2025-08-25T09:15:00Z',
    status: 'active',
    paymentStatus: 'pending',
    price: 49.99,
    totalPaid: 0,
    userName: 'Omar Khan',
    userEmail: 'omar@example.com',
    sessionTitle: 'Beginner Quran Recitation',
    nextPaymentDate: '2025-09-10T09:15:00Z'
  },
  {
    id: 'sub4',
    userId: '4',
    sessionId: '4',
    subscriptionDate: '2025-08-30T16:45:00Z',
    status: 'cancelled',
    paymentStatus: 'refunded',
    price: 39.99,
    totalPaid: 39.99,
    userName: 'Sarah Johnson',
    userEmail: 'sarah@example.com',
    sessionTitle: 'Family Quran Learning'
  },
  {
    id: 'sub5',
    userId: '5',
    sessionId: '2',
    subscriptionDate: '2025-09-01T11:20:00Z',
    status: 'active',
    paymentStatus: 'paid',
    price: 59.99,
    totalPaid: 59.99,
    userName: 'Aisha Rahman',
    userEmail: 'aisha@example.com',
    sessionTitle: 'Tajweed Mastery',
    nextPaymentDate: '2025-10-01T11:20:00Z'
  },
  {
    id: 'sub6',
    userId: '6',
    sessionId: '3',
    subscriptionDate: '2025-09-02T13:45:00Z',
    status: 'active',
    paymentStatus: 'paid',
    price: 69.99,
    totalPaid: 69.99,
    userName: 'Ibrahim Ali',
    userEmail: 'ibrahim@example.com',
    sessionTitle: 'Advanced Hifz Program',
    nextPaymentDate: '2025-10-02T13:45:00Z'
  },
  {
    id: 'sub7',
    userId: '7',
    sessionId: '1',
    subscriptionDate: '2025-09-03T08:30:00Z',
    status: 'active',
    paymentStatus: 'pending',
    price: 49.99,
    totalPaid: 0,
    userName: 'Zainab Hassan',
    userEmail: 'zainab@example.com',
    sessionTitle: 'Beginner Quran Recitation',
    nextPaymentDate: '2025-09-10T08:30:00Z'
  },
  {
    id: 'sub8',
    userId: '8',
    sessionId: '4',
    subscriptionDate: '2025-09-04T15:15:00Z',
    status: 'active',
    paymentStatus: 'paid',
    price: 39.99,
    totalPaid: 39.99,
    userName: 'Mohammad Qureshi',
    userEmail: 'mohammad@example.com',
    sessionTitle: 'Family Quran Learning',
    nextPaymentDate: '2025-10-04T15:15:00Z'
  },
  {
    id: 'sub9',
    userId: '9',
    sessionId: '2',
    subscriptionDate: '2025-08-28T12:00:00Z',
    status: 'active',
    paymentStatus: 'paid',
    price: 59.99,
    totalPaid: 119.98,
    userName: 'Maryam Abdullah',
    userEmail: 'maryam@example.com',
    sessionTitle: 'Tajweed Mastery',
    nextPaymentDate: '2025-09-28T12:00:00Z'
  },
  {
    id: 'sub10',
    userId: '10',
    sessionId: '3',
    subscriptionDate: '2025-08-22T14:30:00Z',
    status: 'active',
    paymentStatus: 'paid',
    price: 69.99,
    totalPaid: 139.98,
    userName: 'Yusuf Ibrahim',
    userEmail: 'yusuf@example.com',
    sessionTitle: 'Advanced Hifz Program',
    nextPaymentDate: '2025-09-22T14:30:00Z'
  },
  {
    id: 'sub11',
    userId: '11',
    sessionId: '1',
    subscriptionDate: '2025-09-05T09:45:00Z',
    status: 'active',
    paymentStatus: 'pending',
    price: 49.99,
    totalPaid: 0,
    userName: 'Khadija Rahman',
    userEmail: 'khadija@example.com',
    sessionTitle: 'Beginner Quran Recitation',
    nextPaymentDate: '2025-09-12T09:45:00Z'
  },
  {
    id: 'sub12',
    userId: '12',
    sessionId: '4',
    subscriptionDate: '2025-08-18T11:20:00Z',
    status: 'cancelled',
    paymentStatus: 'refunded',
    price: 39.99,
    totalPaid: 39.99,
    userName: 'Abdullah Malik',
    userEmail: 'abdullah@example.com',
    sessionTitle: 'Family Quran Learning'
  },
  {
    id: 'sub13',
    userId: '13',
    sessionId: '2',
    subscriptionDate: '2025-09-01T16:30:00Z',
    status: 'active',
    paymentStatus: 'paid',
    price: 59.99,
    totalPaid: 59.99,
    userName: 'Zahra Hussain',
    userEmail: 'zahra@example.com',
    sessionTitle: 'Tajweed Mastery',
    nextPaymentDate: '2025-10-01T16:30:00Z'
  },
  {
    id: 'sub14',
    userId: '14',
    sessionId: '3',
    subscriptionDate: '2025-08-25T13:15:00Z',
    status: 'active',
    paymentStatus: 'paid',
    price: 69.99,
    totalPaid: 209.97,
    userName: 'Hassan Ali',
    userEmail: 'hassan@example.com',
    sessionTitle: 'Advanced Hifz Program',
    nextPaymentDate: '2025-09-25T13:15:00Z'
  },
  {
    id: 'sub15',
    userId: '15',
    sessionId: '1',
    subscriptionDate: '2025-09-06T10:00:00Z',
    status: 'active',
    paymentStatus: 'paid',
    price: 49.99,
    totalPaid: 49.99,
    userName: 'Amina Farouk',
    userEmail: 'amina@example.com',
    sessionTitle: 'Beginner Quran Recitation',
    nextPaymentDate: '2025-10-06T10:00:00Z'
  }
];

// Mock announcements data
const mockAnnouncements: Announcement[] = [
  {
    id: 'ann1',
    title: 'Welcome New Students!',
    content: 'We are excited to welcome all our new students to Ismail Academy. Please make sure to join 5 minutes before your scheduled session.',
    type: 'general',
    targetAudience: 'all_students',
    createdBy: 'instructor1',
    createdAt: '2025-09-01T10:00:00Z',
    status: 'published',
    priority: 'medium',
    readBy: ['1', '2']
  },
  {
    id: 'ann2',
    title: 'Session 1 - Special Tajweed Focus',
    content: 'This week we will have a special focus on Tajweed rules. Please bring your Mushaf and be ready to practice.',
    type: 'session_specific',
    targetAudience: 'session_subscribers',
    sessionId: '1',
    createdBy: 'instructor1',
    createdAt: '2025-09-03T14:30:00Z',
    status: 'published',
    priority: 'high',
    readBy: ['1']
  },
  {
    id: 'ann3',
    title: 'Ramadan Preparation Course',
    content: 'Join our special Ramadan preparation course starting next month. We will focus on proper recitation for Tarawih prayers.',
    type: 'general',
    targetAudience: 'all_students',
    createdBy: 'instructor1',
    createdAt: '2025-09-02T16:00:00Z',
    status: 'scheduled',
    priority: 'high',
    readBy: []
  },
  {
    id: 'ann4',
    title: 'Family Session Update',
    content: 'Family sessions will now include interactive activities for children. Parents are encouraged to participate actively.',
    type: 'session_specific',
    targetAudience: 'session_subscribers',
    sessionId: '4',
    createdBy: 'instructor1',
    createdAt: '2025-09-04T11:15:00Z',
    status: 'published',
    priority: 'medium',
    readBy: ['4', '8']
  },
  {
    id: 'ann5',
    title: 'Technical Maintenance Notice',
    content: 'Our platform will undergo maintenance this Sunday from 2 AM to 4 AM. Sessions during this time will be rescheduled.',
    type: 'general',
    targetAudience: 'all_students',
    createdBy: 'instructor1',
    createdAt: '2025-09-05T09:30:00Z',
    status: 'published',
    priority: 'urgent',
    readBy: ['1', '2', '3']
  },
  {
    id: 'ann6',
    title: 'Advanced Hifz Milestone Celebration',
    content: 'Congratulations to all students who completed their first Juz! We will have a special celebration session next week.',
    type: 'session_specific',
    targetAudience: 'session_subscribers',
    sessionId: '3',
    createdBy: 'instructor1',
    createdAt: '2025-09-01T13:45:00Z',
    status: 'published',
    priority: 'low',
    readBy: ['6', '10', '14']
  },
  {
    id: 'ann7',
    title: 'New Learning Materials Available',
    content: 'We have added new audio recordings and practice sheets to your course materials. Check your dashboard for downloads.',
    type: 'general',
    targetAudience: 'all_students',
    createdBy: 'instructor1',
    createdAt: '2025-08-30T12:20:00Z',
    status: 'published',
    priority: 'medium',
    readBy: ['1', '2', '3', '4', '5']
  },
  {
    id: 'ann8',
    title: 'Tajweed Workshop This Weekend',
    content: 'Special intensive Tajweed workshop this weekend for intermediate students. Limited seats available - register now!',
    type: 'session_specific',
    targetAudience: 'session_subscribers',
    sessionId: '2',
    createdBy: 'instructor1',
    createdAt: '2025-09-03T15:10:00Z',
    status: 'published',
    priority: 'high',
    readBy: ['2', '5', '9', '13']
  },
  {
    id: 'ann9',
    title: 'Student Progress Reports',
    content: 'Monthly progress reports are now available in your student portal. Please review and contact us if you have any questions.',
    type: 'general',
    targetAudience: 'all_students',
    createdBy: 'instructor1',
    createdAt: '2025-09-04T14:00:00Z',
    status: 'draft',
    priority: 'medium',
    readBy: []
  },
  {
    id: 'ann10',
    title: 'Holiday Schedule Update',
    content: 'Please note the updated schedule for the upcoming holiday period. Some sessions will be rescheduled to accommodate the holiday.',
    type: 'general',
    targetAudience: 'all_students',
    createdBy: 'instructor1',
    createdAt: '2025-09-05T16:30:00Z',
    status: 'published',
    priority: 'high',
    readBy: ['1', '3', '7', '11']
  },
  {
    id: 'ann11',
    title: 'Beginner Session - Common Mistakes',
    content: 'This week we will address the most common pronunciation mistakes in Quran recitation. Come prepared with your questions!',
    type: 'session_specific',
    targetAudience: 'session_subscribers',
    sessionId: '1',
    createdBy: 'instructor1',
    createdAt: '2025-09-02T10:45:00Z',
    status: 'published',
    priority: 'medium',
    readBy: ['1', '3', '7', '11', '15']
  },
  {
    id: 'ann12',
    title: 'Parent-Teacher Conference',
    content: 'Individual parent-teacher conferences available for family session participants. Schedule your slot through the portal.',
    type: 'session_specific',
    targetAudience: 'session_subscribers',
    sessionId: '4',
    createdBy: 'instructor1',
    createdAt: '2025-08-29T11:30:00Z',
    status: 'published',
    priority: 'low',
    readBy: ['4', '8', '12']
  }
];

// Pagination utility functions
const getPaginatedItems = <T,>(items: T[], currentPage: number, itemsPerPage: number): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
};

const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

// Enhanced PaginationControls with range & accessibility
const PaginationControls: React.FC<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(totalItems, currentPage * itemsPerPage);
  return (
    <div className="flex flex-col items-center gap-1" aria-live="polite">
      <div className="text-xs text-slate-500">Showing {startItem}–{endItem} of {totalItems}</div>
      <div role="navigation" aria-label="Pagination" className="flex items-center flex-wrap gap-2">
        <span className="text-sm font-medium text-slate-600">
          Page {currentPage} of {totalPages}
        </span>
        {totalPages > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="w-11 h-11 p-0 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </Button>
            <ul className="flex items-center gap-1" role="list">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <li key={page}>
                  <Button
                    variant={page === currentPage ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? 'page' : undefined}
                    aria-label={`Go to page ${page}`}
                    className={`w-11 h-11 p-0 text-sm font-medium rounded-lg ${page === currentPage ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow focus:ring-2 focus:ring-indigo-500' : 'hover:bg-indigo-50'} `}
                  >
                    {page}
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="w-11 h-11 p-0 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

// PaginationBar wrapper for consistent styling
const PaginationBar: React.FC<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}> = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange, className = '' }) => (
  <div className={`mt-6 flex justify-center flex-shrink-0 ${className}`}>
    <div className="w-full bg-white/70 backdrop-blur-md rounded-xl border border-white/30 shadow-sm px-6 py-4">
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  </div>
);


export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  instructor,
  sessions,
  students,
  onDeleteSession,
  onStartSession,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'students' | 'subscriptions' | 'announcements' | 'testimonials' | 'emails' | 'analytics'>('overview');
  const [selectedStudent, setSelectedStudent] = useState<UserType | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [subscriptions] = useState<SessionSubscription[]>(mockSubscriptions);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  
  // Pagination states
  const [currentPageSessions, setCurrentPageSessions] = useState(1);
  const [currentPageStudents, setCurrentPageStudents] = useState(1);
  const [currentPageSubscriptions, setCurrentPageSubscriptions] = useState(1);
  const [currentPageAnnouncements, setCurrentPageAnnouncements] = useState(1);
  const [currentPageTestimonials, setCurrentPageTestimonials] = useState(1);
  
  // Emails tab state
  const [emailRecipientMode, setEmailRecipientMode] = useState<'all' | 'single'>('all');
  const [emailRecipientId, setEmailRecipientId] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailCategory, setEmailCategory] = useState<'general' | 'holiday' | 'promotion'>('general');
  const [emailBody, setEmailBody] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState<string | null>(null);
  
  // Mobile-specific state
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    todaySessions: true, // Default to expanded on desktop
    quickActions: true,
    performance: false
  });
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  
  const itemsPerPage = 3; // Show 3 items per page to ensure pagination is always visible

  // Detect low power mode for performance optimization
  useEffect(() => {
    // Simple heuristic for mobile performance optimization
    const isMobile = window.innerWidth < 768;
    const isSlowConnection = (navigator as any).connection && (navigator as any).connection.effectiveType && 
      ['slow-2g', '2g'].includes((navigator as any).connection.effectiveType);
    
    setIsLowPowerMode(isMobile && (isSlowConnection || navigator.hardwareConcurrency <= 2));
    
    // Set default expanded states based on screen size
    if (isMobile) {
      setExpandedSections(prev => ({
        ...prev,
        todaySessions: true,
        quickActions: false,
        performance: false
      }));
    }
  }, []);

  // Performance optimization: Intersection Observer for lazy loading
  useEffect(() => {
    if (isLowPowerMode) {
      // Implement virtual scrolling hints for better performance
      const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      }, observerOptions);

      // Observe all card elements
      const cards = document.querySelectorAll('[data-card="true"]');
      cards.forEach(card => observer.observe(card));

      return () => {
        cards.forEach(card => observer.unobserve(card));
      };
    }
  }, [isLowPowerMode, activeTab]);

  // Mobile touch handling for swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart.x - touchEnd.x;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    const isVerticalSwipe = Math.abs(touchStart.y - touchEnd.y) > 50;

    // Only handle horizontal swipes
    if (isVerticalSwipe) return;

    const tabs = ['overview', 'sessions', 'students', 'subscriptions', 'announcements', 'testimonials', 'emails', 'analytics'] as const;
    const currentIndex = tabs.indexOf(activeTab);

    if (isLeftSwipe && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else if (isRightSwipe && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  }, [touchStart, touchEnd, activeTab]);

  // Toggle expanded sections for progressive disclosure
  const toggleSection = useCallback((sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  }, []);
  
  // Session creation modal state
  const [showCreateSessionModal, setShowCreateSessionModal] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    price: '',
    maxStudents: '',
    day: '',
    startTime: '',
    endTime: '',
    category: 'recitation' as const
  });
  
  // Announcement creation modal state
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState<{
    title: string;
    content: string;
    type: 'general' | 'session_specific' | 'urgent';
    targetAudience: 'all_students' | 'session_subscribers' | 'specific_users';
    sessionId: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
  }>({
    title: '',
    content: '',
    type: 'general',
    targetAudience: 'all_students',
    sessionId: '',
    priority: 'medium'
  });

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const totalRevenue = sessions.reduce((sum, session) => sum + (session.price * session.enrolledStudents), 0);
  const totalStudents = sessions.reduce((sum, session) => sum + session.enrolledStudents, 0);
  
  // Remove rating calculation and replace with total sessions
  const totalSessions = sessions.length;

  const handleApproveTestimonial = (testimonialId: string | undefined) => {
    if (!testimonialId) return;
    setTestimonials(prev => prev.map(t => 
      t.id === testimonialId ? { ...t, approved: true } : t
    ));
  };

  const handleRejectTestimonial = (testimonialId: string | undefined) => {
    if (!testimonialId) return;
    setTestimonials(prev => prev.map(t => 
      t.id === testimonialId ? { ...t, approved: false } : t
    ));
  };

  const TabButton: React.FC<{ 
    tab: string; 
    label: string; 
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
  }> = ({ label, icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1 sm:space-x-2 lg:space-x-3 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold transition-all duration-200 text-xs sm:text-sm lg:text-base whitespace-nowrap touch-feedback min-h-[44px] ${
        isActive 
          ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg transform scale-105' 
          : 'text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-md hover:scale-105'
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <>
      {/* Performance CSS for mobile animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Mobile touch feedback */
        @media (max-width: 768px) {
          .touch-feedback:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }
        }
        
        /* Smooth scrolling for mobile */
        .mobile-scroll {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
      `}</style>
      
    <div className="min-h-screen h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 overflow-hidden flex flex-col">
      {/* Modern Header with Glass Effect */}
      <header className="flex-shrink-0 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-12 sm:h-14 lg:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <img 
                  src="/logos/ismail-academy-logo.jpeg" 
                  alt="Ismail Academy Logo" 
                  className="w-6 h-6 object-contain rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>';
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ismail Academy
                </h1>
                <p className="text-xs text-slate-500">Instructor Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Notifications with Modern Design */}
              <div className="relative">
                <button className="p-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl hover:from-indigo-200 hover:to-blue-200 transition-all duration-200 group">
                  <Bell className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-lg animate-pulse">
                    3
                  </span>
                </button>
              </div>
              
              {/* Instructor Profile Section */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-white/60 to-blue-50/60 rounded-xl px-4 py-2 backdrop-blur-sm border border-white/30">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{instructor.name}</p>
                  <p className="text-xs text-slate-500">Instructor</p>
                </div>
              </div>
              
              {/* Settings */}
              <button className="p-3 bg-gradient-to-r from-slate-100 to-gray-100 rounded-xl hover:from-slate-200 hover:to-gray-200 transition-all duration-200 group">
                <Settings className="w-6 h-6 text-slate-600 group-hover:scale-110 transition-transform" />
              </button>
              
              {/* Logout with Modern Style */}
              <button 
                onClick={onLogout}
                className="p-3 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl hover:from-red-200 hover:to-pink-200 transition-all duration-200 group"
                title="Logout"
              >
                <LogOut className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Better Layout */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-4 lg:py-6 flex-1 flex flex-col min-h-0">
          {/* Enhanced Welcome Section - Made More Spacious */}
          <div className="mb-3 sm:mb-4 lg:mb-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 p-3 sm:p-4 lg:p-6 shadow-xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 lg:mb-3">
                    Welcome back, {instructor.name}! 🎓
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mb-2 lg:mb-3">
                    You have {sessions.length} total sessions.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-blue-100 text-xs sm:text-sm lg:text-base">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{totalStudents} Students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{totalSessions} Sessions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>${totalRevenue} Revenue</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Navigation Tabs with Touch Support */}
          <div 
            className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 lg:mb-4 p-1 sm:p-2 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/30 overflow-x-auto relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile swipe indicator */}
            <div className="md:hidden absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full opacity-50"></div>
            
            <TabButton
              tab="overview"
              label="Overview"
              icon={<TrendingUp className="w-5 h-5" />}
              isActive={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            />
            <TabButton
              tab="sessions"
              label="Sessions"
              icon={<Video className="w-5 h-5" />}
              isActive={activeTab === 'sessions'}
              onClick={() => setActiveTab('sessions')}
            />
            <TabButton
              tab="students"
              label="Students"
              icon={<Users className="w-5 h-5" />}
              isActive={activeTab === 'students'}
              onClick={() => setActiveTab('students')}
            />
            <TabButton
              tab="subscriptions"
              label="Subscriptions"
              icon={<CreditCard className="w-5 h-5" />}
              isActive={activeTab === 'subscriptions'}
              onClick={() => setActiveTab('subscriptions')}
            />
            <TabButton
              tab="announcements"
              label="Announcements"
              icon={<Megaphone className="w-5 h-5" />}
              isActive={activeTab === 'announcements'}
              onClick={() => setActiveTab('announcements')}
            />
            <TabButton
              tab="emails"
              label="Emails"
              icon={<Mail className="w-5 h-5" />}
              isActive={activeTab === 'emails'}
              onClick={() => setActiveTab('emails')}
            />
            <TabButton
              tab="testimonials"
              label="Testimonials"
              icon={<MessageSquare className="w-5 h-5" />}
              isActive={activeTab === 'testimonials'}
              onClick={() => setActiveTab('testimonials')}
            />
            <TabButton
              tab="analytics"
              label="Analytics"
              icon={<BarChart3 className="w-5 h-5" />}
              isActive={activeTab === 'analytics'}
              onClick={() => setActiveTab('analytics')}
            />
          </div>

          {/* Tab Content Area with Proper Height */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
            <div className="h-full flex flex-col space-y-2 sm:space-y-3 lg:space-y-4">
            {/* Quick Stats with Modern Glassmorphism - Larger like Student Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm lg:text-base text-slate-500 mb-1 sm:mb-2 font-medium">Total Students</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{totalStudents}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm lg:text-base text-slate-500 mb-1 sm:mb-2 font-medium">Active Sessions</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{sessions.filter(s => s.status === 'active').length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Video className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm lg:text-base text-slate-500 mb-1 sm:mb-2 font-medium">Total Sessions</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{totalSessions}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm lg:text-base text-slate-500 mb-1 sm:mb-2 font-medium">Revenue</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${totalRevenue}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-Optimized Overview with Progressive Disclosure */}
            <div className="space-y-4">
              {/* Quick Stats - Always Visible */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-500 mb-1 sm:mb-2 font-medium">Total Students</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{totalStudents}</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-500 mb-1 sm:mb-2 font-medium">Active Sessions</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{sessions.filter(s => s.status === 'active').length}</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Video className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-500 mb-1 sm:mb-2 font-medium">Total Sessions</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{totalSessions}</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-500 mb-1 sm:mb-2 font-medium">Revenue</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${totalRevenue}</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsible Sections for Mobile */}
              <div className="space-y-4">
                
                {/* Today's Sessions - Collapsible */}
                <CollapsibleSection
                  title="Today's Sessions"
                  icon={<Video className="w-5 h-5 text-white" />}
                  isExpanded={expandedSections['todaySessions'] ?? true}
                  onToggle={() => toggleSection('todaySessions')}
                  badge={sessions.filter(s => s.status === 'active').length}
                >
                  {sessions.filter(s => s.status === 'active').length > 0 ? (
                    <div className="space-y-3">
                      {sessions.filter(s => s.status === 'active').slice(0, 3).map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 text-base mb-1">{session.title}</h4>
                            <p className="text-sm text-slate-600 mb-1">
                              {formatTime(session.schedule.startTime)} - {formatTime(session.schedule.endTime)}
                            </p>
                            <p className="text-sm text-slate-500">{session.enrolledStudents} students</p>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 ml-3">
                            <Video className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Start</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-500">No sessions scheduled for today</p>
                    </div>
                  )}
                </CollapsibleSection>

                {/* Quick Actions - Collapsible */}
                <CollapsibleSection
                  title="Quick Actions"
                  icon={<Plus className="w-5 h-5 text-white" />}
                  isExpanded={expandedSections['quickActions'] ?? true}
                  onToggle={() => toggleSection('quickActions')}
                >
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setShowCreateSessionModal(true)}
                      className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 justify-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Session
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('announcements')}
                      variant="outline" 
                      className="w-full justify-center"
                    >
                      <Megaphone className="w-4 h-4 mr-2" />
                      Send Announcement
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('emails')}
                      variant="outline" 
                      className="w-full justify-center"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email Students
                    </Button>
                  </div>
                </CollapsibleSection>

                {/* Performance Summary - Collapsible */}
                <CollapsibleSection
                  title="This Week Performance"
                  icon={<BarChart3 className="w-5 h-5 text-white" />}
                  isExpanded={expandedSections['performance'] ?? false}
                  onToggle={() => toggleSection('performance')}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg">
                      <span className="text-sm text-slate-600">Sessions Completed</span>
                      <span className="text-lg font-semibold text-slate-900">12</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
                      <span className="text-sm text-slate-600">New Students</span>
                      <span className="text-lg font-semibold text-emerald-600">+3</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <span className="text-sm text-slate-600">Revenue Generated</span>
                      <span className="text-lg font-semibold text-blue-600">${totalRevenue}</span>
                    </div>
                  </div>
                </CollapsibleSection>

              </div>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="h-full flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Manage Sessions</h3>
              <Button 
                onClick={() => setShowCreateSessionModal(true)}
                className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Session
              </Button>
            </div>
            
            <div className="flex-1 min-h-0 flex flex-col pb-6">
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0 pb-4 max-h-[calc(100vh-24rem)]">
              {getPaginatedItems(sessions, currentPageSessions, itemsPerPage).map((session) => (
                <div key={session.id} data-card="true" className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-1">{session.title}</h4>
                        <p className="text-base text-slate-600 mb-2">{session.description}</p>
                        <div className="flex items-center space-x-4 text-base text-slate-500">
                          <span className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span>{session.schedule.day}</span>
                          </span>
                          <span className="flex items-center space-x-2">
                            <Clock className="w-5 h-5" />
                            <span>{formatTime(session.schedule.startTime)} - {formatTime(session.schedule.endTime)}</span>
                          </span>
                          <span className="flex items-center space-x-2">
                            <Users className="w-5 h-5" />
                            <span>{session.enrolledStudents}/{session.maxStudents}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
                      <Badge variant={session.status === 'active' ? 'success' : 'default'} className="text-xs sm:text-base px-2 sm:px-3 py-1 self-start">
                        {session.status}
                      </Badge>
                      
                      {/* Desktop: Always visible actions */}
                      <div className="hidden sm:flex items-center space-x-2">
                        <Button size="sm" onClick={() => onStartSession(session.id)} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 px-3 py-2">
                          <Video className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                        <Button variant="outline" size="sm" className="px-2 py-2">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onDeleteSession(session.id)} className="text-red-600 hover:bg-red-50 px-2 py-2">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Mobile: Collapsible actions */}
                      <div className="sm:hidden">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleSection(`session-actions-${session.id}`)}
                          className="w-full justify-between"
                        >
                          <span className="text-sm">Actions</span>
                          {expandedSections[`session-actions-${session.id}`] ? 
                            <ChevronUp className="w-4 h-4" /> : 
                            <ChevronDown className="w-4 h-4" />
                          }
                        </Button>
                        
                        {expandedSections[`session-actions-${session.id}`] && (
                          <div className="mt-2 grid grid-cols-3 gap-2">
                            <Button size="sm" onClick={() => onStartSession(session.id)} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 justify-center text-xs">
                              <Video className="w-4 h-4 mr-1" />
                              Start
                            </Button>
                            <Button variant="outline" size="sm" className="justify-center text-xs">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => onDeleteSession(session.id)} className="text-red-600 hover:bg-red-50 justify-center text-xs">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
              
              <PaginationBar
                currentPage={currentPageSessions}
                totalPages={getTotalPages(sessions.length, itemsPerPage)}
                totalItems={sessions.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(p) => setCurrentPageSessions(p)}
                className="sticky bottom-0 z-10"
              />
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="h-full flex flex-col space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">My Students</h3>
            
            <div className="flex-1 min-h-0 flex flex-col pb-6">
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0 pb-4 max-h-[calc(100vh-24rem)]">
              {getPaginatedItems(students, currentPageStudents, itemsPerPage).map((student) => (
                <div key={student.id} data-card="true" className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-slate-900 mb-1">{student.firstName} {student.lastName}</p>
                        <p className="text-base text-slate-500 mb-1">{student.email}</p>
                        <p className="text-base text-slate-500">Joined: {new Date(student.dateJoined).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="info" className="text-base px-3 py-1">{student.subscription?.plan || 'Free'}</Badge>
                      <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)} className="px-3 py-2">
                        <Eye className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
              
              <PaginationBar
                currentPage={currentPageStudents}
                totalPages={getTotalPages(students.length, itemsPerPage)}
                totalItems={students.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(p) => setCurrentPageStudents(p)}
                className="sticky bottom-0 z-10"
              />
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="h-full flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Student Testimonials</h3>
              <div className="flex space-x-3">
                <Badge variant="info" className="text-base px-3 py-1">
                  {testimonials.filter(t => t.approved).length} Approved
                </Badge>
                <Badge variant="warning" className="text-base px-3 py-1">
                  {testimonials.filter(t => !t.approved).length} Pending
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto space-y-4 mb-1">
                {getPaginatedItems(testimonials, currentPageTestimonials, itemsPerPage).map((testimonial) => (
                <div key={testimonial.id} className="bg-white/70 backdrop-blur-md rounded-xl p-5 shadow border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-11 h-11 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-md flex items-center justify-center shadow">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm md:text-base font-semibold text-slate-900 leading-tight truncate">{testimonial.userName}</p>
                          <p className="text-xs md:text-sm text-slate-500 truncate">{testimonial.userEmail}</p>
                        </div>
                        <div className="flex items-center space-x-0.5" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              aria-hidden="true"
                              className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="text-base font-semibold text-slate-900 mb-1 line-clamp-2">{testimonial.title}</h4>
                      <p className="text-sm text-slate-600 mb-2 whitespace-pre-wrap break-words">{testimonial.message}</p>
                      <p className="text-xs text-slate-500">Course: {testimonial.course}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1 ml-2 flex-shrink-0">
                      <Badge variant={testimonial.approved ? 'success' : 'warning'} className="text-[10px] px-2 py-0.5">
                        {testimonial.approved ? 'Approved' : 'Pending'}
                      </Badge>
                      {testimonial.featured && (
                        <Badge variant="info" className="text-[10px] px-2 py-0.5">Featured</Badge>
                      )}
                      <div className="flex space-x-1 mt-1">
                        {!testimonial.approved ? (
                          <Button
                            size="sm"
                            onClick={() => handleApproveTestimonial(testimonial.id)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-2 py-1 h-8 text-xs"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectTestimonial(testimonial.id)}
                            className="text-red-600 hover:bg-red-50 px-2 py-1 h-8"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedTestimonial(testimonial)}
                          className="px-2 py-1 h-8"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
              
              <PaginationBar
                currentPage={currentPageTestimonials}
                totalPages={getTotalPages(testimonials.length, itemsPerPage)}
                totalItems={testimonials.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(p) => setCurrentPageTestimonials(p)}
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="h-full flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Session Subscriptions</h3>
              <div className="flex space-x-3">
                <Badge variant="info" className="text-base px-3 py-1">
                  {subscriptions.filter(s => s.status === 'active').length} Active
                </Badge>
                <Badge variant="warning" className="text-base px-3 py-1">
                  {subscriptions.filter(s => s.paymentStatus === 'pending').length} Pending
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 min-h-0 flex flex-col pb-6">
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0 pb-4 max-h-[calc(100vh-24rem)]">
                {getPaginatedItems(subscriptions, currentPageSubscriptions, itemsPerPage).map((subscription) => (
                <div key={subscription.id} className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-slate-900">{subscription.userName}</p>
                          <p className="text-base text-slate-500">{subscription.userEmail}</p>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-slate-900 mb-3">{subscription.sessionTitle}</h4>
                      <div className="grid grid-cols-2 gap-3 text-base">
                        <div>
                          <span className="font-medium text-slate-700">Price: </span>
                          <span className="text-slate-600">${subscription.price}</span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Paid: </span>
                          <span className="text-slate-600">${subscription.totalPaid}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2 ml-6">
                      <Badge variant={subscription.status === 'active' ? 'success' : subscription.status === 'cancelled' ? 'default' : 'warning'} className="text-base px-3 py-1">
                        {subscription.status}
                      </Badge>
                      <Badge variant={
                        subscription.paymentStatus === 'paid' ? 'success' : 
                        subscription.paymentStatus === 'pending' ? 'warning' : 'default'
                      } className="text-base px-3 py-1">
                        {subscription.paymentStatus}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedStudent(students.find(s => s.id === subscription.userId) || null)}
                        className="px-3 py-2"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
              
              <PaginationBar
                currentPage={currentPageSubscriptions}
                totalPages={getTotalPages(subscriptions.length, itemsPerPage)}
                totalItems={subscriptions.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(p) => setCurrentPageSubscriptions(p)}
                className="sticky bottom-0 z-10"
              />
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="h-full flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Announcements</h3>
              <Button 
                onClick={() => setShowAnnouncementModal(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-4 py-2"
                size="sm"
              >
                <Plus className="w-5 h-5 mr-2" />
                New
              </Button>
            </div>
            
            <div className="flex-1 min-h-0 flex flex-col pb-6">
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0 pb-4 max-h-[calc(100vh-24rem)]">
                {getPaginatedItems(announcements, currentPageAnnouncements, itemsPerPage).map((announcement) => (
                <div key={announcement.id} className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                          <Megaphone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900">{announcement.title}</h4>
                          <p className="text-base text-slate-500">
                            {new Date(announcement.createdAt).toLocaleDateString()} • 
                            {announcement.targetAudience === 'all_students' ? ' All Students' : 
                             announcement.targetAudience === 'session_subscribers' ? ` Session Subscribers` : 
                             ' Specific Students'}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-base text-slate-600 mb-3">{announcement.content}</p>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2 ml-6">
                      <Badge variant={announcement.status === 'published' ? 'success' : announcement.status === 'scheduled' ? 'warning' : 'default'} className="text-base px-3 py-1">
                        {announcement.status}
                      </Badge>
                      <Badge variant={
                        announcement.priority === 'urgent' ? 'default' :
                        announcement.priority === 'high' ? 'warning' :
                        announcement.priority === 'medium' ? 'info' : 'success'
                      } className="text-base px-3 py-1">
                        {announcement.priority}
                      </Badge>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline" className="px-3 py-2">
                          <Edit className="w-5 h-5" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 px-3 py-2">
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
              
              <PaginationBar
                currentPage={currentPageAnnouncements}
                totalPages={getTotalPages(announcements.length, itemsPerPage)}
                totalItems={announcements.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(p) => setCurrentPageAnnouncements(p)}
                className="sticky bottom-0 z-10"
              />
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="h-full flex flex-col space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Analytics</h3>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/30 text-center">
                <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-slate-700 mb-2">Analytics Coming Soon</h4>
                <p className="text-slate-500">Detailed analytics and insights will be available here.</p>
              </div>
            </div>
          </div>
        )}

        {/* Emails Tab */}
        {activeTab === 'emails' && (
          <div className="h-full flex flex-col space-y-2 sm:space-y-3 lg:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Send Email</h3>
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-white/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-4 lg:mb-6">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-700 mb-1">Recipients</p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <Button size="sm" variant={emailRecipientMode==='all'?'primary':'outline'} onClick={() => {setEmailRecipientMode('all'); setEmailRecipientId('');}}>All Students</Button>
                      <Button size="sm" variant={emailRecipientMode==='single'?'primary':'outline'} onClick={() => setEmailRecipientMode('single')}>Individual</Button>
                    </div>
                  </div>
                  {emailRecipientMode === 'single' && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Select Student</label>
                      <select
                        value={emailRecipientId}
                        onChange={(e)=>setEmailRecipientId(e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">-- Choose --</option>
                        {students.map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName} • {s.email}</option>)}
                      </select>
                    </div>
                  )}
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-700 mb-1">Category</p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {(['general','holiday','promotion'] as const).map(cat => (
                        <Button key={cat} size="sm" variant={emailCategory===cat?'primary':'outline'} onClick={()=>setEmailCategory(cat)} className="capitalize text-xs sm:text-sm">{cat}</Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <input value={emailSubject} onChange={(e)=>setEmailSubject(e.target.value)} placeholder="Subject" className="w-full rounded-md border border-slate-300 bg-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea value={emailBody} onChange={(e)=>setEmailBody(e.target.value)} rows={6} placeholder="Write your email..." className="w-full rounded-md border border-slate-300 bg-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y" />
                  </div>
                </div>
              </div>
              {emailStatusMsg && <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-emerald-600 font-medium">{emailStatusMsg}</div>}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="text-xs text-slate-500 order-2 sm:order-1">
                  {emailRecipientMode==='all' ? `${students.length} students will receive this email.` : emailRecipientId ? 'Ready to send to selected student.' : 'Select a student to enable send.'}
                </div>
                <div className="flex items-center space-x-2 order-1 sm:order-2">
                  <Button size="sm" variant="outline" onClick={()=>{setEmailSubject(''); setEmailBody(''); setEmailStatusMsg(null);}} disabled={emailSending || (!emailSubject && !emailBody)} className="text-xs sm:text-sm">Clear</Button>
                  <Button size="sm" onClick={async ()=>{ if(emailRecipientMode==='single' && !emailRecipientId) return; if(!emailSubject||!emailBody) return; setEmailSending(true); setEmailStatusMsg(null); await new Promise(r=>setTimeout(r,600)); setEmailSending(false); setEmailStatusMsg('Email queued (simulation). Resend integration pending.'); }} disabled={emailSending || !emailSubject || !emailBody || (emailRecipientMode==='single' && !emailRecipientId)} className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-xs sm:text-sm">{emailSending?'Sending…':'Send Email'}</Button>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur rounded-xl p-3 sm:p-4 border border-white/30 text-xs text-slate-500">
              <p className="mb-1 sm:mb-2 font-medium text-slate-600 text-xs sm:text-sm">Planned Email Integration</p>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-xs">
                <li>Hook up Resend API in a dedicated service.</li>
                <li>Add template variables (e.g. {'{{studentName}}'}).</li>
                <li>Store sent email history and show metrics later.</li>
              </ul>
            </div>
          </div>
        )}
        </div>
        {/* END TABS SECTION */}

        {/* Mobile-Optimized Create Session Modal */}
        {showCreateSessionModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-white/30 w-full max-w-2xl 
                            h-full sm:h-auto sm:max-h-[90vh] overflow-auto
                            flex flex-col">
              
              {/* Mobile-Optimized Header */}
              <div className="p-4 sm:p-6 border-b border-slate-200 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    Create New Session
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowCreateSessionModal(false)}
                    className="text-slate-500 hover:text-slate-700 p-2"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                {/* Mobile: Add progress indicator */}
                <div className="sm:hidden mt-3">
                  <div className="flex space-x-1">
                    <div className="flex-1 h-1 bg-indigo-200 rounded-full">
                      <div className="h-1 bg-indigo-600 rounded-full w-1/3"></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Step 1 of 3 - Basic Information</p>
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-4 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Session Title</label>
                    <Input
                      value={newSession.title}
                      onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                      placeholder="e.g., Advanced Quran Recitation"
                      className="w-full text-base" // Larger text for mobile
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Price ($)</label>
                    <Input
                      type="number"
                      value={newSession.price}
                      onChange={(e) => setNewSession({...newSession, price: e.target.value})}
                      placeholder="49.99"
                      className="w-full text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    value={newSession.description}
                    onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                    placeholder="Describe what students will learn in this session..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Day</label>
                    <select
                      value={newSession.day}
                      onChange={(e) => setNewSession({...newSession, day: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select Day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Start Time</label>
                    <Input
                      type="time"
                      value={newSession.startTime}
                      onChange={(e) => setNewSession({...newSession, startTime: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">End Time</label>
                    <Input
                      type="time"
                      value={newSession.endTime}
                      onChange={(e) => setNewSession({...newSession, endTime: e.target.value})}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Max Students</label>
                    <Input
                      type="number"
                      value={newSession.maxStudents}
                      onChange={(e) => setNewSession({...newSession, maxStudents: e.target.value})}
                      placeholder="10"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                    <select
                      value={newSession.category}
                      onChange={(e) => setNewSession({...newSession, category: e.target.value as any})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="recitation">Recitation</option>
                      <option value="memorization">Memorization</option>
                      <option value="tajweed">Tajweed</option>
                      <option value="translation">Translation</option>
                      <option value="islamic-studies">Islamic Studies</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setShowCreateSessionModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      // Here you would typically call onCreateSession with the new session data
                      console.log('Creating session:', newSession);
                      setShowCreateSessionModal(false);
                      // Reset form
                      setNewSession({
                        title: '',
                        description: '',
                        price: '',
                        maxStudents: '',
                        day: '',
                        startTime: '',
                        endTime: '',
                        category: 'recitation'
                      });
                    }}
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Create Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Announcement Modal */}
        {showAnnouncementModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Create Announcement
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowAnnouncementModal(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Announcement Title</label>
                  <Input
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    placeholder="e.g., Important Update for Next Week"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                  <textarea
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    placeholder="Write your announcement message here..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={4}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
                    <select
                      value={newAnnouncement.targetAudience}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, targetAudience: e.target.value as any})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="all_students">All Students</option>
                      <option value="session_subscribers">Session Subscribers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                    <select
                      value={newAnnouncement.priority}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value as any})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                {newAnnouncement.targetAudience === 'session_subscribers' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Select Session</label>
                    <select
                      value={newAnnouncement.sessionId}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, sessionId: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select a session</option>
                      {sessions.map((session) => (
                        <option key={session.id} value={session.id}>
                          {session.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setShowAnnouncementModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      const newAnn: Announcement = {
                        id: Date.now().toString(),
                        ...newAnnouncement,
                        type: newAnnouncement.targetAudience === 'session_subscribers' ? 'session_specific' : 'general',
                        createdBy: instructor.id,
                        createdAt: new Date().toISOString(),
                        status: 'published',
                        readBy: []
                      };
                      setAnnouncements(prev => [newAnn, ...prev]);
                      setShowAnnouncementModal(false);
                      // Reset form
                      setNewAnnouncement({
                        title: '',
                        content: '',
                        type: 'general',
                        targetAudience: 'all_students',
                        sessionId: '',
                        priority: 'medium'
                      });
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Student Profile Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    Student Profile
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedStudent(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      {selectedStudent.firstName} {selectedStudent.lastName}
                    </h4>
                    <p className="text-slate-600">{selectedStudent.email}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                    <h5 className="font-semibold text-slate-900 mb-3 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Info
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span>{selectedStudent.email}</span>
                      </div>
                      {selectedStudent.country && (
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-slate-500" />
                          <span>{selectedStudent.country}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <h5 className="font-semibold text-slate-900 mb-3 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Subscription
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Plan: </span>
                        <Badge variant="info">{selectedStudent.subscription?.plan || 'Free'}</Badge>
                      </div>
                      <div>
                        <span className="font-medium">Status: </span>
                        <Badge variant={selectedStudent.subscription?.status === 'active' ? 'success' : 'default'}>
                          {selectedStudent.subscription?.status || 'inactive'}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Joined: </span>
                        <span>{new Date(selectedStudent.dateJoined).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                  <h5 className="font-semibold text-slate-900 mb-3">Profile Details</h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">User ID: </span>
                      <span className="text-slate-600">{selectedStudent.id}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Role: </span>
                      <span className="text-slate-600 capitalize">{selectedStudent.role}</span>
                    </div>
                    {selectedStudent.timezone && (
                      <div>
                        <span className="font-medium text-slate-700">Timezone: </span>
                        <span className="text-slate-600">{selectedStudent.timezone}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-slate-700">Account Status: </span>
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        {/* END TABS SECTION */}

        {/* Testimonial Detail Modal */}
        {selectedTestimonial && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 max-w-lg w-full">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    Testimonial Details
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedTestimonial(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{selectedTestimonial.userName}</p>
                    <p className="text-sm text-slate-500">{selectedTestimonial.userEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < selectedTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-slate-600">({selectedTestimonial.rating}/5)</span>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">{selectedTestimonial.title}</h4>
                  <p className="text-slate-600">{selectedTestimonial.message}</p>
                </div>
                
                <div className="text-sm text-slate-500">
                  <p><strong>Course:</strong> {selectedTestimonial.course}</p>
                  <p><strong>Submitted:</strong> {new Date(selectedTestimonial.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant={selectedTestimonial.approved ? 'success' : 'warning'}>
                    {selectedTestimonial.approved ? 'Approved' : 'Pending'}
                  </Badge>
                  {selectedTestimonial.featured && (
                    <Badge variant="info">Featured</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};
