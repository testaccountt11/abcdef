import {
  users, type User, type InsertUser,
  courses, type Course, type InsertCourse,
  enrollments, type Enrollment, type InsertEnrollment,
  opportunities, type Opportunity, type InsertOpportunity,
  mentors, type Mentor, type InsertMentor,
  articles, type Article, type InsertArticle,
  certificates, type Certificate, type InsertCertificate,
  stats, type Stats, type InsertStats,
  achievements, type Achievement, type InsertAchievement,
  userAchievements, type UserAchievement, type InsertUserAchievement,
  badges, type Badge, type InsertBadge,
  userBadges, type UserBadge, type InsertUserBadge
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
  
  // Achievements
  getAchievements(): Promise<Achievement[]>;
  getAchievement(id: number): Promise<Achievement | undefined>;
  getAchievementByName(name: string): Promise<Achievement | undefined>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  getUserAchievements(userId: number): Promise<(UserAchievement & { achievement: Achievement })[]>;
  getUserAchievementProgress(userId: number, achievementId: number): Promise<UserAchievement | undefined>;
  createUserAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement>;
  updateUserAchievementProgress(userId: number, achievementId: number, progress: number): Promise<UserAchievement | undefined>;
  completeUserAchievement(userId: number, achievementId: number, completedValue: number): Promise<UserAchievement | undefined>;
  
  // Badges
  getBadges(): Promise<Badge[]>;
  getBadge(id: number): Promise<Badge | undefined>;
  getBadgeByName(name: string): Promise<Badge | undefined>;
  createBadge(badge: InsertBadge): Promise<Badge>;
  getUserBadges(userId: number): Promise<(UserBadge & { badge: Badge })[]>;
  awardBadgeToUser(userId: number, badgeId: number): Promise<UserBadge>;
  updateUserBadgeDisplay(userId: number, badgeId: number, displayOnProfile: boolean): Promise<UserBadge | undefined>;
  checkAndAwardBadges(userId: number): Promise<Badge[]>; // Check if user qualifies for new badges
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
  private achievements: Map<number, Achievement>;
  private userAchievements: Map<string, UserAchievement>; // key = userId-achievementId
  private badges: Map<number, Badge>;
  private userBadges: Map<string, UserBadge>; // key = userId-badgeId
  
  private currentIds: {
    users: number;
    courses: number;
    enrollments: number;
    opportunities: number;
    mentors: number;
    articles: number;
    certificates: number;
    stats: number;
    achievements: number;
    userAchievements: number;
    badges: number;
    userBadges: number;
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
    this.achievements = new Map();
    this.userAchievements = new Map();
    this.badges = new Map();
    this.userBadges = new Map();
    
    this.currentIds = {
      users: 1,
      courses: 1,
      enrollments: 1,
      opportunities: 1,
      mentors: 1,
      articles: 1,
      certificates: 1,
      stats: 1,
      achievements: 1,
      userAchievements: 1,
      badges: 1,
      userBadges: 1
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
        summary: "Learn expert strategies for creating an impressive portfolio that will help you stand out to recruiters.",
        category: "Career Advice",
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
        authorName: "James Wilson",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        readTime: "5 min read",
      },
      {
        title: "Acing Your College Interviews",
        content: "Strategies and preparation tips for successful university admission interviews.",
        summary: "Essential tips and strategies to help you prepare for and excel in your college admission interviews.",
        category: "Admissions",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
        authorName: "Emily Chen",
        authorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
        readTime: "7 min read",
      }
    ];
    
    sampleArticles.forEach(article => this.createArticle(article));
    
    // Sample achievements
    const sampleAchievements: InsertAchievement[] = [
      {
        name: "Course Explorer",
        description: "Enroll in your first course",
        iconUrl: "https://assets.portfol.io/icons/achievements/course-explorer.svg",
        category: "course",
        requirement: "Enroll in 1 course",
        requiredValue: 1,
        points: 10,
        isHidden: false
      },
      {
        name: "Knowledge Seeker",
        description: "Complete your first course",
        iconUrl: "https://assets.portfol.io/icons/achievements/knowledge-seeker.svg",
        category: "course",
        requirement: "Complete 1 course",
        requiredValue: 1,
        points: 20,
        isHidden: false
      },
      {
        name: "Portfolio Builder",
        description: "Add your first certificate to your profile",
        iconUrl: "https://assets.portfol.io/icons/achievements/portfolio-builder.svg",
        category: "certificate",
        requirement: "Add 1 certificate",
        requiredValue: 1,
        points: 15,
        isHidden: false
      },
      {
        name: "Mentorship Connection",
        description: "Connect with your first mentor",
        iconUrl: "https://assets.portfol.io/icons/achievements/mentorship.svg",
        category: "mentor",
        requirement: "Connect with 1 mentor",
        requiredValue: 1,
        points: 15,
        isHidden: false
      },
      {
        name: "Opportunity Hunter",
        description: "Save your first opportunity",
        iconUrl: "https://assets.portfol.io/icons/achievements/opportunity-hunter.svg",
        category: "opportunity",
        requirement: "Save 1 opportunity",
        requiredValue: 1,
        points: 10,
        isHidden: false
      },
      {
        name: "Learning Enthusiast",
        description: "Complete 5 courses",
        iconUrl: "https://assets.portfol.io/icons/achievements/learning-enthusiast.svg",
        category: "course",
        requirement: "Complete 5 courses",
        requiredValue: 5,
        points: 50,
        isHidden: false
      },
      {
        name: "Certificate Collector",
        description: "Earn 10 certificates",
        iconUrl: "https://assets.portfol.io/icons/achievements/certificate-collector.svg",
        category: "certificate",
        requirement: "Earn 10 certificates",
        requiredValue: 10,
        points: 100,
        isHidden: false
      }
    ];
    
    sampleAchievements.forEach(achievement => this.createAchievement(achievement));
    
    // Sample badges
    const sampleBadges: InsertBadge[] = [
      {
        name: "Beginner",
        description: "You've started your educational journey",
        iconUrl: "https://assets.portfol.io/icons/badges/beginner.svg",
        category: "level",
        level: 1,
        requiredPoints: 30,
        isRare: false
      },
      {
        name: "Intermediate",
        description: "You're making good progress in your studies",
        iconUrl: "https://assets.portfol.io/icons/badges/intermediate.svg",
        category: "level",
        level: 2,
        requiredPoints: 100,
        isRare: false
      },
      {
        name: "Advanced",
        description: "You've demonstrated significant educational achievements",
        iconUrl: "https://assets.portfol.io/icons/badges/advanced.svg",
        category: "level",
        level: 3,
        requiredPoints: 250,
        isRare: false
      },
      {
        name: "Expert",
        description: "You've mastered a wide range of educational content",
        iconUrl: "https://assets.portfol.io/icons/badges/expert.svg",
        category: "level",
        level: 4,
        requiredPoints: 500,
        isRare: true
      },
      {
        name: "Course Master",
        description: "Special badge for completing 10+ courses",
        iconUrl: "https://assets.portfol.io/icons/badges/course-master.svg",
        category: "special",
        level: 5,
        requiredPoints: 150,
        isRare: true
      },
      {
        name: "Portfolio Champion",
        description: "Special badge for building an exceptional portfolio",
        iconUrl: "https://assets.portfol.io/icons/badges/portfolio-champion.svg",
        category: "special",
        level: 5,
        requiredPoints: 200,
        isRare: true
      }
    ];
    
    sampleBadges.forEach(badge => this.createBadge(badge));
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
    const course: Course = { 
      ...insertCourse, 
      id,
      imageUrl: insertCourse.imageUrl || null,
      isPartnerCourse: insertCourse.isPartnerCourse || null,
      contactInfo: insertCourse.contactInfo || null,
      progress: insertCourse.progress || null
    };
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
    const enrollment: Enrollment = { 
      ...insertEnrollment, 
      id,
      progress: insertEnrollment.progress || 0,
      completed: insertEnrollment.completed || false
    };
    this.enrollments.set(`${enrollment.userId}-${enrollment.courseId}`, enrollment);
    
    // Update user stats
    const userStats = await this.getUserStats(enrollment.userId);
    if (userStats) {
      await this.updateUserStats(enrollment.userId, {
        coursesInProgress: (userStats.coursesInProgress || 0) + 1
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
          coursesInProgress: Math.max(0, (userStats.coursesInProgress || 0) - 1),
          certificatesEarned: (userStats.certificatesEarned || 0) + 1
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
    const opportunity: Opportunity = { 
      ...insertOpportunity, 
      id,
      logoUrl: insertOpportunity.logoUrl || null,
      duration: insertOpportunity.duration || null,
      deadline: insertOpportunity.deadline || null
    };
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
    const mentor: Mentor = { 
      ...insertMentor, 
      id,
      profileImage: insertMentor.profileImage || null,
      contactInfo: insertMentor.contactInfo || null,
      skills: insertMentor.skills || null
    };
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
    const article: Article = {
      id,
      title: insertArticle.title,
      content: insertArticle.content,
      summary: insertArticle.summary,
      category: insertArticle.category,
      imageUrl: insertArticle.imageUrl || null,
      authorName: insertArticle.authorName,
      authorImage: insertArticle.authorImage || null,
      readTime: insertArticle.readTime || null,
      publishDate: insertArticle.publishDate || null
    };
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
    const now = new Date();
    const certificate: Certificate = {
      id,
      title: insertCertificate.title,
      userId: insertCertificate.userId,
      issuer: insertCertificate.issuer,
      issueDate: insertCertificate.issueDate,
      certificateUrl: insertCertificate.certificateUrl || null,
      certificateFile: insertCertificate.certificateFile || null,
      createdAt: now,
      updatedAt: now
    };
    this.certificates.set(id, certificate);
    return certificate;
  }
  
  // Stats methods
  async getUserStats(userId: number): Promise<Stats | undefined> {
    return this.stats.get(userId);
  }
  
  async createUserStats(insertStats: InsertStats): Promise<Stats> {
    const id = this.currentIds.stats++;
    const stats: Stats = { 
      ...insertStats, 
      id,
      coursesInProgress: insertStats.coursesInProgress || 0,
      certificatesEarned: insertStats.certificatesEarned || 0,
      mentorSessions: insertStats.mentorSessions || 0,
      opportunitiesSaved: insertStats.opportunitiesSaved || 0
    };
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
  
  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }
  
  async getAchievement(id: number): Promise<Achievement | undefined> {
    return this.achievements.get(id);
  }
  
  async getAchievementByName(name: string): Promise<Achievement | undefined> {
    return Array.from(this.achievements.values()).find(
      (achievement) => achievement.name === name,
    );
  }
  
  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentIds.achievements++;
    const achievement: Achievement = {
      id,
      name: insertAchievement.name,
      description: insertAchievement.description,
      category: insertAchievement.category,
      iconUrl: insertAchievement.iconUrl,
      requirement: insertAchievement.requirement,
      requiredValue: insertAchievement.requiredValue || null,
      points: insertAchievement.points || null,
      isHidden: insertAchievement.isHidden || null,
      createdAt: new Date()
    };
    this.achievements.set(id, achievement);
    return achievement;
  }
  
  async getUserAchievements(userId: number): Promise<(UserAchievement & { achievement: Achievement })[]> {
    const userAchievements = Array.from(this.userAchievements.values())
      .filter(ua => ua.userId === userId);
    
    return userAchievements.map(ua => {
      const achievement = this.achievements.get(ua.achievementId);
      if (!achievement) return null;
      return { ...ua, achievement };
    }).filter(Boolean) as (UserAchievement & { achievement: Achievement })[];
  }
  
  async getUserAchievementProgress(userId: number, achievementId: number): Promise<UserAchievement | undefined> {
    return this.userAchievements.get(`${userId}-${achievementId}`);
  }
  
  async createUserAchievement(insertUserAchievement: InsertUserAchievement): Promise<UserAchievement> {
    const id = this.currentIds.userAchievements++;
    const userAchievement: UserAchievement = { 
      ...insertUserAchievement, 
      id,
      earnedAt: insertUserAchievement.isComplete ? new Date() : null,
      progress: insertUserAchievement.progress || 0,
      isComplete: insertUserAchievement.isComplete || false,
      completedValue: insertUserAchievement.completedValue || 0
    };
    
    const key = `${userAchievement.userId}-${userAchievement.achievementId}`;
    this.userAchievements.set(key, userAchievement);
    
    // Check for badge qualification if achievement is complete
    if (userAchievement.isComplete) {
      await this.checkAndAwardBadges(userAchievement.userId);
    }
    
    return userAchievement;
  }
  
  async updateUserAchievementProgress(userId: number, achievementId: number, progress: number): Promise<UserAchievement | undefined> {
    const key = `${userId}-${achievementId}`;
    const userAchievement = this.userAchievements.get(key);
    const achievement = await this.getAchievement(achievementId);
    
    if (!userAchievement || !achievement) {
      return undefined;
    }

    const updatedUA: UserAchievement = {
      ...userAchievement,
      progress
    };

    // Check if achievement is completed
    if (achievement.requiredValue !== null && progress >= achievement.requiredValue && !userAchievement.isComplete) {
      updatedUA.isComplete = true;
      updatedUA.completedValue = progress;
      updatedUA.earnedAt = new Date();
      
      // Check for badge qualification
      await this.checkAndAwardBadges(userId);
    }

    this.userAchievements.set(key, updatedUA);
    return updatedUA;
  }
  
  async completeUserAchievement(userId: number, achievementId: number, completedValue: number): Promise<UserAchievement | undefined> {
    const key = `${userId}-${achievementId}`;
    const userAchievement = this.userAchievements.get(key);
    const achievement = await this.getAchievement(achievementId);
    
    if (!userAchievement || !achievement || achievement.requiredValue === null) {
      return undefined;
    }

    // Only complete if the completed value meets or exceeds the required value
    if (completedValue >= achievement.requiredValue) {
      const updatedUA: UserAchievement = {
        ...userAchievement,
        isComplete: true,
        completedValue,
        earnedAt: new Date()
      };
      this.userAchievements.set(key, updatedUA);
      
      // Check if user qualifies for any badges after completing achievement
      await this.checkAndAwardBadges(userId);
      
      return updatedUA;
    }
    
    return userAchievement;
  }
  
  // Badge methods
  async getBadges(): Promise<Badge[]> {
    return Array.from(this.badges.values());
  }
  
  async getBadge(id: number): Promise<Badge | undefined> {
    return this.badges.get(id);
  }
  
  async getBadgeByName(name: string): Promise<Badge | undefined> {
    return Array.from(this.badges.values()).find(
      (badge) => badge.name === name,
    );
  }
  
  async createBadge(insertBadge: InsertBadge): Promise<Badge> {
    const id = this.currentIds.badges++;
    const badge: Badge = {
      id,
      name: insertBadge.name,
      description: insertBadge.description,
      category: insertBadge.category,
      iconUrl: insertBadge.iconUrl,
      level: insertBadge.level || null,
      requiredPoints: insertBadge.requiredPoints || null,
      isRare: insertBadge.isRare || null,
      createdAt: new Date()
    };
    this.badges.set(id, badge);
    return badge;
  }
  
  async getUserBadges(userId: number): Promise<(UserBadge & { badge: Badge })[]> {
    const userBadges = Array.from(this.userBadges.values())
      .filter(ub => ub.userId === userId);
    
    return userBadges.map(ub => {
      const badge = this.badges.get(ub.badgeId);
      if (!badge) return null;
      return { ...ub, badge };
    }).filter(Boolean) as (UserBadge & { badge: Badge })[];
  }
  
  async awardBadgeToUser(userId: number, badgeId: number): Promise<UserBadge> {
    // Check if user already has this badge
    const existingKey = `${userId}-${badgeId}`;
    const existingUserBadge = this.userBadges.get(existingKey);
    
    if (existingUserBadge) {
      return existingUserBadge;
    }
    
    const id = this.currentIds.userBadges++;
    const userBadge: UserBadge = {
      id,
      userId,
      badgeId,
      earnedAt: new Date(),
      displayOnProfile: true
    };
    
    this.userBadges.set(existingKey, userBadge);
    
    return userBadge;
  }
  
  async updateUserBadgeDisplay(userId: number, badgeId: number, displayOnProfile: boolean): Promise<UserBadge | undefined> {
    const key = `${userId}-${badgeId}`;
    const userBadge = this.userBadges.get(key);
    
    if (!userBadge) return undefined;
    
    const updatedUserBadge: UserBadge = {
      ...userBadge,
      displayOnProfile
    };
    
    this.userBadges.set(key, updatedUserBadge);
    
    return updatedUserBadge;
  }
  
  async checkAndAwardBadges(userId: number): Promise<Badge[]> {
    const userAchievements = await this.getUserAchievements(userId);
    const existingBadges = await this.getUserBadges(userId);
    const allBadges = await this.getBadges();
    const newBadges: Badge[] = [];

    // Calculate total points from completed achievements
    const totalPoints = userAchievements.reduce((sum, ua) => {
      if (ua.isComplete && ua.achievement.points !== null) {
        return sum + ua.achievement.points;
      }
      return sum;
    }, 0);

    // Check each badge to see if user qualifies
    for (const badge of allBadges) {
      // Skip if user already has this badge
      if (existingBadges.some(ub => ub.badgeId === badge.id)) {
        continue;
      }

      // Award badge if user has enough points and badge has valid requiredPoints
      if (badge.requiredPoints !== null && totalPoints >= badge.requiredPoints) {
        const userBadge = await this.awardBadgeToUser(userId, badge.id);
        if (userBadge) {
          newBadges.push(badge);
        }
      }
    }

    return newBadges;
  }
}

import { PgStorage } from "./pg-storage";

// Use PostgreSQL storage instead of in-memory storage
export const storage = new PgStorage();
