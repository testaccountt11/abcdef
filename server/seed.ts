import { db } from './db';
import { 
  users, 
  courses, 
  mentors, 
  opportunities, 
  articles, 
  enrollments,
  certificates,
  stats
} from '../shared/schema';

async function seed() {
  console.log('Seeding database...');

  try {
    // Clear existing data to avoid duplicates
    await db.delete(stats);
    await db.delete(certificates);
    await db.delete(enrollments);
    await db.delete(articles);
    await db.delete(opportunities);
    await db.delete(mentors);
    await db.delete(courses);
    await db.delete(users);

    // Insert sample user
    const [user] = await db.insert(users).values({
      username: 'johndoe',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // 'secret42'
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      profileImage: 'https://ui-avatars.com/api/?name=John+Doe'
    }).returning();
    
    console.log('Created user:', user.id);

    // Insert sample courses
    const coursesData = [
      {
        title: 'Introduction to Data Science',
        description: 'Learn the fundamentals of data science including data analysis, visualization, and machine learning.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Data Science',
        provider: 'Tech Academy',
        isPartnerCourse: true,
        contactInfo: 'support@techacademy.com'
      },
      {
        title: 'Web Development Bootcamp',
        description: 'Comprehensive course covering HTML, CSS, JavaScript, and modern frameworks.',
        imageUrl: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Web Development',
        provider: 'Code School',
        isPartnerCourse: true,
        contactInfo: 'hello@codeschool.org'
      },
      {
        title: 'UX/UI Design Principles',
        description: 'Master the principles of user-centered design and create intuitive interfaces.',
        imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Design',
        provider: 'Design Institute',
        isPartnerCourse: false,
        contactInfo: 'courses@designinstitute.edu'
      }
    ];
    
    const insertedCourses = await db.insert(courses).values(coursesData).returning();
    console.log('Created courses:', insertedCourses.map(c => c.id));

    // Enroll user in a course
    await db.insert(enrollments).values({
      userId: user.id,
      courseId: insertedCourses[0].id,
      progress: 30,
      completed: false
    });

    // Insert mentors
    const mentorsData = [
      {
        name: 'Sarah Chen',
        title: 'Data Scientist',
        company: 'TechCorp',
        profileImage: 'https://ui-avatars.com/api/?name=Sarah+Chen',
        skills: ['Python', 'ML', 'Data Analysis'],
        contactInfo: 'sarah.chen@example.com'
      },
      {
        name: 'Michael Johnson',
        title: 'Senior Software Engineer',
        company: 'DevHub',
        profileImage: 'https://ui-avatars.com/api/?name=Michael+Johnson',
        skills: ['JavaScript', 'React', 'Node.js'],
        contactInfo: 'michael.j@example.com'
      },
      {
        name: 'Emily Rodriguez',
        title: 'UX Design Lead',
        company: 'CreativeDesign',
        profileImage: 'https://ui-avatars.com/api/?name=Emily+Rodriguez',
        skills: ['UI/UX', 'Figma', 'Design Systems'],
        contactInfo: 'emily.r@example.com'
      }
    ];
    
    const insertedMentors = await db.insert(mentors).values(mentorsData).returning();
    console.log('Created mentors:', insertedMentors.map(m => m.id));

    // Insert opportunities
    const opportunitiesData = [
      {
        title: 'Data Analysis Intern',
        description: 'Join our team to analyze complex datasets and provide actionable insights.',
        company: 'Analytics Co',
        logoUrl: 'https://ui-avatars.com/api/?name=Analytics+Co',
        type: 'internship',
        location: 'Remote',
        duration: '3 months',
        deadline: 'August 15, 2023'
      },
      {
        title: 'Web Development Volunteer',
        description: 'Help build websites for non-profit organizations.',
        company: 'TechForGood',
        logoUrl: 'https://ui-avatars.com/api/?name=Tech+For+Good',
        type: 'volunteer',
        location: 'Global',
        duration: 'Flexible',
        deadline: 'Ongoing'
      },
      {
        title: 'Coding Competition',
        description: 'Participate in our annual coding challenge and win prizes.',
        company: 'Code Masters',
        logoUrl: 'https://ui-avatars.com/api/?name=Code+Masters',
        type: 'competition',
        location: 'Online',
        duration: '48 hours',
        deadline: 'September 1, 2023'
      }
    ];
    
    const insertedOpportunities = await db.insert(opportunities).values(opportunitiesData).returning();
    console.log('Created opportunities:', insertedOpportunities.map(o => o.id));

    // Insert articles
    const articlesData = [
      {
        title: 'How to Build a Standout Portfolio',
        content: 'A comprehensive guide to creating a portfolio that will impress recruiters and showcase your skills.',
        category: 'Career Advice',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        authorName: 'Alex Morgan',
        authorImage: 'https://ui-avatars.com/api/?name=Alex+Morgan',
        readTime: '5 min'
      },
      {
        title: 'Top Universities for Computer Science in 2023',
        content: 'An overview of the best institutions for studying computer science and their admission requirements.',
        category: 'Education',
        imageUrl: 'https://images.unsplash.com/photo-1569447891616-5fa1a06c4f76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        authorName: 'Priya Sharma',
        authorImage: 'https://ui-avatars.com/api/?name=Priya+Sharma',
        readTime: '8 min'
      },
      {
        title: 'Preparing for Technical Interviews',
        content: 'Expert tips on how to ace your technical interviews and stand out from other candidates.',
        category: 'Interview Tips',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        authorName: 'David Kim',
        authorImage: 'https://ui-avatars.com/api/?name=David+Kim',
        readTime: '6 min'
      }
    ];
    
    const insertedArticles = await db.insert(articles).values(articlesData).returning();
    console.log('Created articles:', insertedArticles.map(a => a.id));

    // Insert user stats
    await db.insert(stats).values({
      userId: user.id,
      coursesInProgress: 1,
      certificatesEarned: 0,
      mentorSessions: 0,
      opportunitiesSaved: 0
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });