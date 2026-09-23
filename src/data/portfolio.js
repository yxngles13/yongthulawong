export const profile = {
  name: 'Yong Thu La Wong',
  shortName: 'Yong',
  location: 'West Covina, California',
  email: 'yongthulaw@cpp.edu',
  github: 'https://github.com/yxngles13',
  linkedin: 'https://www.linkedin.com/in/yong-thu-la-wong',
  resume: '/Yong_Thu_La_Wong_Software_Engineering_Intern_Resume__Summer_2027_.pdf',
  introduction: 'Computer science student and software engineer building thoughtful full-stack and machine learning experiences.',
  biography: [
    'I’m a computer science student at Cal Poly Pomona, minoring in artificial intelligence and graduating in December 2027.',
    'I enjoy turning complex ideas into approachable products across full-stack engineering, data, and machine learning.',
  ],
}

export const photos = [
  { src: '/images/IMG_0466.JPG', alt: 'Photo of Yong, 1 of 5', caption: 'Caption coming soon' },
  { src: '/images/IMG_1351.JPG', alt: 'Photo of Yong, 2 of 5', caption: 'Caption coming soon' },
  { src: '/images/IMG_1434.JPG', alt: 'Photo of Yong, 3 of 5', caption: 'Caption coming soon' },
  { src: '/images/IMG_4402.JPG', alt: 'Photo of Yong, 4 of 5', caption: 'Caption coming soon' },
  { src: '/images/IMG_4544.JPG', alt: 'Photo of Yong, 5 of 5', caption: 'Caption coming soon' },
]

export const navigation = [
  { label: 'my work', href: '#work' },
  { label: 'about', href: '#about' },
  { label: 'experience', href: '#experience' },
  { label: 'contact', href: '#contact' },
]

export const experiences = [
  {
    organization: 'California State University, Chancellor’s Office',
    role: 'Software Engineering Intern',
    dates: 'June 2026 – Present',
    location: 'Pomona, CA',
    summary: 'Building production full-stack features for the CSU Student Success Dashboard, a platform supporting more than 20 CSU campuses.',
    highlights: [
      'Ship frontend and backend functionality with PHP, Laravel, MySQL, AWS RDS, and JavaScript/jQuery.',
      'Built an administrative inbox, user-management interface, and usage-tracking tools from scratch.',
      'Design RESTful APIs and database-backed workflows with Laravel MVC and Eloquent ORM.',
    ],
  },
  {
    organization: 'Cadence Design Systems',
    role: 'Break Through Tech AI Studio – ML Engineer Intern',
    dates: 'Aug. 2025 – Dec. 2025',
    location: 'Cornell Tech',
    summary: 'Developed an AI-powered sentiment analysis system for customer feedback in partnership with Cadence Design Systems.',
    highlights: [
      'Trained and fine-tuned BERT, RoBERTa, and Twitter-RoBERTa models across more than 10,000 Amazon reviews.',
      'Compared F1 score, accuracy, and training and validation loss to select the strongest model.',
      'Presented the system, results, and product recommendations to Cadence stakeholders.',
    ],
  },
  {
    organization: 'Deep-Hipo Research',
    role: 'Research Assistant',
    dates: 'Spring 2025',
    location: 'Cal Poly Pomona',
    summary: 'Supported deep-learning research for histopathological image classification with a faculty researcher.',
    highlights: [
      'Preprocessed and annotated image datasets with Python, NumPy, and Pandas.',
      'Developed and evaluated an image-classification model through iterative data and model improvements.',
    ],
  },
]

export const projects = [
  {
    name: 'Eye Tracking Analysis',
    dates: 'Aug. 2026 – Present',
    summary: 'A web-based eye-tracking system that maps gaze coordinates to page elements, batches interaction data, and supports visualization of user attention.',
    technologies: ['WebGazer.js', 'Laravel', 'PHP', 'MySQL'],
  },
  {
    name: 'Project Sloka',
    dates: 'May 2025 – Dec. 2025',
    summary: 'A full-stack platform with secure authentication, RESTful APIs, real-time features, and role-based access control.',
    technologies: ['React', 'TypeScript', 'PostgreSQL', 'GCP'],
  },
  {
    name: 'BrainHive',
    dates: 'CalHacks 11.0 · 2024',
    summary: 'An AI-powered platform built during a 36-hour hackathon with real-time D3.js visualization and Firebase live sync.',
    technologies: ['Next.js', 'Gemini AI', 'D3.js', 'Tailwind CSS', 'Firebase'],
  },
]

export const skillGroups = [
  {
    label: 'Languages',
    items: ['Java', 'TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL', 'C++', 'HTML/CSS'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Bootstrap 5', 'Tailwind CSS', 'jQuery', 'Highcharts'],
  },
  {
    label: 'Backend',
    items: ['Laravel', 'Flask', 'Node.js', 'REST APIs', 'HTTP', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['Google Cloud Platform', 'AWS RDS', 'Firebase', 'Docker', 'Git/GitHub', 'Claude Code'],
  },
  {
    label: 'Machine Learning',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'NumPy', 'Pandas', 'Gemini AI'],
  },
]
