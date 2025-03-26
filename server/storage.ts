import {
  users, type User, type InsertUser,
  courses, type Course, type InsertCourse,
  enrollments, type Enrollment, type InsertEnrollment,
  opportunities, type Opportunity, type InsertOpportunity,
  mentors, type Mentor, type InsertMentor,
  articles, type Article, type InsertArticle,
  certificates, type Certificate, type InsertCertificate,
  stats, type Stats, type InsertStats
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  getUserCourses(userId: number): Promise<Course[]>;
  
  // Enrollments
  getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(userId: number, courseId: number, progress: number): Promise<Enrollment | undefined>;
  
  // Opportunities
  getOpportunities(): Promise<Opportunity[]>;
  getOpportunity(id: number): Promise<Opportunity | undefined>;
  createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity>;
  
  // Mentors
  getMentors(): Promise<Mentor[]>;
  getMentor(id: number): Promise<Mentor | undefined>;
  createMentor(mentor: InsertMentor): Promise<Mentor>;
  
  // Articles
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  // Certificates
  getUserCertificates(userId: number): Promise<Certificate[]>;
  getCertificate(id: number): Promise<Certificate | undefined>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  
  // Stats
  getUserStats(userId: number): Promise<Stats | undefined>;
  createUserStats(stats: InsertStats): Promise<Stats>;
  updateUserStats(userId: number, stats: Partial<InsertStats>): Promise<Stats | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private enrollments: Map<string, Enrollment>; // key = userId-courseId
  private opportunities: Map<number, Opportunity>;
  private mentors: Map<number, Mentor>;
  private articles: Map<number, Article>;
  private certificates: Map<number, Certificate>;
  private stats: Map<number, Stats>; // key = userId
  
  private currentIds: {
    users: number;
    courses: number;
    enrollments: number;
    opportunities: number;
    mentors: number;
    articles: number;
    certificates: number;
    stats: number;
  };

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.enrollments = new Map();
    this.opportunities = new Map();
    this.mentors = new Map();
    this.articles = new Map();
    this.certificates = new Map();
    this.stats = new Map();
    
    this.currentIds = {
      users: 1,
      courses: 1,
      enrollments: 1,
      opportunities: 1,
      mentors: 1,
      articles: 1,
      certificates: 1,
      stats: 1
    };
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample courses
    const sampleCourses: InsertCourse[] = [
      {
        title: "Data Science Fundamentals",
        description: "Learn the basics of data analysis and visualization",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        category: "Data Science",
        provider: "Portfol.IO",
        isPartnerCourse: false,
        progress: 60,
      },
      {
        title: "Web Development Bootcamp",
        description: "Master HTML, CSS, and JavaScript from scratch",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692",
        category: "Web Development",
        provider: "Portfol.IO",
        isPartnerCourse: false,
        progress: 35,
      },
      {
        title: "Digital Marketing Essentials",
        description: "Learn social media, SEO, and content marketing",
        imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
        category: "Marketing",
        provider: "Portfol.IO",
        isPartnerCourse: false,
        progress: 75,
      }
    ];
    
    sampleCourses.forEach(course => this.createCourse(course));
    
    // Sample opportunities
    const sampleOpportunities: InsertOpportunity[] = [
      {
        title: "Data Analysis Intern",
        description: "Gain hands-on experience working with large datasets and creating meaningful visualizations.",
        company: "Google",
        logoUrl: "https://storage.googleapis.com/portfol-io-company-logos/google.png",
        type: "internship",
        location: "Remote",
        duration: "3 months",
      },
      {
        title: "Web Developer",
        description: "Help non-profit organizations by building websites and digital tools that make a difference.",
        company: "Tech4Good",
        logoUrl: "https://storage.googleapis.com/portfol-io-company-logos/tech4good.png",
        type: "volunteer",
        location: "Hybrid",
        duration: "Ongoing",
      },
      {
        title: "Student Innovation Challenge",
        description: "Showcase your innovative ideas and win cash prizes, mentorship, and potential internship offers.",
        company: "Microsoft",
        logoUrl: "https://storage.googleapis.com/portfol-io-company-logos/microsoft.png",
        type: "competition",
        location: "",
        deadline: "Jun. 15, 2023",
      }
    ];
    
    sampleOpportunities.forEach(opportunity => this.createOpportunity(opportunity));
    
    // Sample mentors
    const sampleMentors: InsertMentor[] = [
      {
        name: "Sarah Chen",
        title: "Data Scientist",
        company: "Amazon",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        skills: ["Python", "ML", "AI"],
        contactInfo: "sarah.chen@example.com",
      },
      {
        name: "Michael Rodriguez",
        title: "Senior Developer",
        company: "Netflix",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        skills: ["React", "Node", "AWS"],
        contactInfo: "michael.rodriguez@example.com",
      },
      {
        name: "Jessica Williams",
        title: "Marketing Director",
        company: "Adobe",
        profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
        skills: ["SEO", "Ads", "Content"],
        contactInfo: "jessica.williams@example.com",
      },
      {
        name: "David Kim",
        title: "UX Designer",
        company: "Google",
        profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        skills: ["UI/UX", "Figma", "Research"],
        contactInfo: "david.kim@example.com",
      }
    ];
    
    sampleMentors.forEach(mentor => this.createMentor(mentor));
    
    // Sample articles
    const sampleArticles: InsertArticle[] = [
      {
        title: "How to Build a Standout Portfolio",
        content: "Tips from industry experts on creating a portfolio that catches recruiters' attention.",
        category: "Career Advice",
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
        authorName: "James Wilson",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        readTime: "5 min read",
      },
      {
        title: "Acing Your College Interviews",
        content: "Strategies and preparation tips for successful university admission interviews.",
        category: "Admissions",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
        authorName: "Emily Chen",
        authorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
        readTime: "7 min read",
      }
    ];
    
    sampleArticles.forEach(article => this.createArticle(article));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    // Ensure all required fields have proper values to match the User type
    const user: User = { 
      ...insertUser, 
      id,
      lastName: insertUser.lastName || null,
      profileImage: insertUser.profileImage || null
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userUpdate: Partial<InsertUser>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userUpdate };
    this.users.set(id, updatedUser);
    
    return updatedUser;
  }
  
  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }
  
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentIds.courses++;
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }
  
  async getUserCourses(userId: number): Promise<Course[]> {
    const userEnrollments = Array.from(this.enrollments.values())
      .filter(enrollment => enrollment.userId === userId);
    
    return userEnrollments.map(enrollment => 
      this.courses.get(enrollment.courseId)!
    ).filter(Boolean);
  }
  
  // Enrollment methods
  async getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined> {
    return this.enrollments.get(`${userId}-${courseId}`);
  }
  
  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = this.currentIds.enrollments++;
    const enrollment: Enrollment = { ...insertEnrollment, id };
    this.enrollments.set(`${enrollment.userId}-${enrollment.courseId}`, enrollment);
    
    // Update user stats
    const userStats = await this.getUserStats(enrollment.userId);
    if (userStats) {
      await this.updateUserStats(enrollment.userId, {
        coursesInProgress: userStats.coursesInProgress + 1
      });
    }
    
    return enrollment;
  }
  
  async updateEnrollmentProgress(userId: number, courseId: number, progress: number): Promise<Enrollment | undefined> {
    const key = `${userId}-${courseId}`;
    const enrollment = this.enrollments.get(key);
    
    if (!enrollment) return undefined;
    
    const updatedEnrollment: Enrollment = {
      ...enrollment,
      progress,
      completed: progress === 100
    };
    
    this.enrollments.set(key, updatedEnrollment);
    
    // If completed, update user stats
    if (updatedEnrollment.completed) {
      const userStats = await this.getUserStats(userId);
      if (userStats) {
        await this.updateUserStats(userId, {
          coursesInProgress: Math.max(0, userStats.coursesInProgress - 1),
          certificatesEarned: userStats.certificatesEarned + 1
        });
      }
    }
    
    return updatedEnrollment;
  }
  
  // Opportunity methods
  async getOpportunities(): Promise<Opportunity[]> {
    return Array.from(this.opportunities.values());
  }
  
  async getOpportunity(id: number): Promise<Opportunity | undefined> {
    return this.opportunities.get(id);
  }
  
  async createOpportunity(insertOpportunity: InsertOpportunity): Promise<Opportunity> {
    const id = this.currentIds.opportunities++;
    const opportunity: Opportunity = { ...insertOpportunity, id };
    this.opportunities.set(id, opportunity);
    return opportunity;
  }
  
  // Mentor methods
  async getMentors(): Promise<Mentor[]> {
    return Array.from(this.mentors.values());
  }
  
  async getMentor(id: number): Promise<Mentor | undefined> {
    return this.mentors.get(id);
  }
  
  async createMentor(insertMentor: InsertMentor): Promise<Mentor> {
    const id = this.currentIds.mentors++;
    const mentor: Mentor = { ...insertMentor, id };
    this.mentors.set(id, mentor);
    return mentor;
  }
  
  // Article methods
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }
  
  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }
  
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentIds.articles++;
    const article: Article = { ...insertArticle, id };
    this.articles.set(id, article);
    return article;
  }
  
  // Certificate methods
  async getUserCertificates(userId: number): Promise<Certificate[]> {
    return Array.from(this.certificates.values())
      .filter(certificate => certificate.userId === userId);
  }
  
  async getCertificate(id: number): Promise<Certificate | undefined> {
    return this.certificates.get(id);
  }
  
  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const id = this.currentIds.certificates++;
    const certificate: Certificate = { ...insertCertificate, id };
    this.certificates.set(id, certificate);
    
    // Update user stats
    const userStats = await this.getUserStats(certificate.userId);
    if (userStats) {
      await this.updateUserStats(certificate.userId, {
        certificatesEarned: userStats.certificatesEarned + 1
      });
    }
    
    return certificate;
  }
  
  // Stats methods
  async getUserStats(userId: number): Promise<Stats | undefined> {
    return this.stats.get(userId);
  }
  
  async createUserStats(insertStats: InsertStats): Promise<Stats> {
    const id = this.currentIds.stats++;
    const stats: Stats = { ...insertStats, id };
    this.stats.set(stats.userId, stats);
    return stats;
  }
  
  async updateUserStats(userId: number, statsUpdate: Partial<InsertStats>): Promise<Stats | undefined> {
    const existingStats = await this.getUserStats(userId);
    
    if (!existingStats) {
      // Create stats if they don't exist
      return this.createUserStats({
        userId,
        coursesInProgress: statsUpdate.coursesInProgress || 0,
        certificatesEarned: statsUpdate.certificatesEarned || 0,
        mentorSessions: statsUpdate.mentorSessions || 0,
        opportunitiesSaved: statsUpdate.opportunitiesSaved || 0
      });
    }
    
    const updatedStats: Stats = { ...existingStats, ...statsUpdate };
    this.stats.set(userId, updatedStats);
    
    return updatedStats;
  }
}

export const storage = new MemStorage();
