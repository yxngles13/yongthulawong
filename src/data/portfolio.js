export const profile = {
  name: 'Yong Thu La Wong',
  shortName: 'Yong',
  location: 'West Covina, California',
  email: 'yongthulawong@gmail.com',
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

// Each experience is a folder. folder.color picks the palette (pink, sage, peach, butter); folder.peek is
// what sticks out of it — a sheet of paper (doc), a tech tag (tag), or a sticky note (note).
export const experiences = [
  {
    organization: 'California State University, Office of the Chancellor',
    role: 'Software Engineering Intern',
    dates: 'June 2026 – Present',
    location: 'Remote',
    folder: {
      label: 'CSU Chancellor',
      color: 'pink',
      peek: [
        { type: 'doc', text: 'dashboard.php' },
        { type: 'tag', text: 'Laravel' },
        { type: 'note', text: '20+ campuses' },
      ],
    },
    technologies: ['PHP', 'Laravel', 'MySQL', 'REST APIs', 'Eloquent ORM', 'Bitbucket', 'CI/CD'],
    highlights: [
      'Develop and maintain production applications using PHP, Laravel, MySQL, and RESTful APIs for a CSU dashboard serving 20+ campuses.',
      'Engineered 3 administrative tools, including an asynchronous messaging system using Laravel queued jobs to support broadcasts to 1,000+ users.',
      'Troubleshoot and resolve issues across application layers while designing backend APIs and database workflows with Laravel MVC and Eloquent ORM.',
      'Contribute code via Bitbucket, where the team’s CI/CD pipelines build and deploy changes.',
    ],
  },
  {
    organization: 'California State Polytechnic University, Pomona – hapii Lab',
    role: 'Undergraduate Researcher',
    dates: 'June 2026 – Present',
    location: 'Pomona, CA',
    folder: {
      label: 'hapii Lab',
      color: 'sage',
      peek: [
        { type: 'doc', text: 'fixations.csv' },
        { type: 'tag', text: 'WebGazer.js' },
        { type: 'note', text: 'DBSCAN' },
      ],
    },
    technologies: ['WebGazer.js', 'Laravel', 'MySQL', 'Python', 'DBSCAN'],
    highlights: [
      'Developed a WebGazer.js eye-tracking platform (Laravel, MySQL, Python API) that captures webcam gaze data and converts it into Gazepoint Open Gaze–format fixations.',
      'Analyzed gaze data using Python and DBSCAN clustering to generate heatmaps and assess webpage usability.',
    ],
  },
  {
    organization: 'Cadence Design Systems',
    role: 'Machine Learning Engineer Intern',
    dates: 'August 2025 – December 2025',
    location: 'Remote',
    folder: {
      label: 'Cadence',
      color: 'peach',
      peek: [
        { type: 'doc', text: 'reviews.csv' },
        { type: 'tag', text: 'BERT' },
        { type: 'note', text: '87% acc.' },
      ],
    },
    technologies: ['Python', 'Pandas', 'NLTK', 'Hugging Face', 'BERT', 'PyABSA'],
    highlights: [
      'Built Python data preprocessing pipelines using Pandas and NLTK to clean and transform 48M+ Amazon reviews for downstream machine learning workflows.',
      'Fine-tuned and evaluated BERT using Hugging Face Transformers, achieving 87% accuracy in multi-class sentiment classification.',
      'Developed an aspect-based sentiment analysis pipeline using PyABSA to extract and analyze feature-level sentiment across 51K product reviews.',
    ],
  },
  {
    organization: 'California State Polytechnic University, Pomona',
    role: 'Undergraduate Research Assistant',
    dates: 'February 2025 – May 2025',
    location: 'Pomona, CA',
    folder: {
      label: 'Research',
      color: 'butter',
      peek: [
        { type: 'doc', text: 'Slide-Omics' },
        { type: 'tag', text: 'Python' },
        { type: 'note', text: 'symposium ✦' },
      ],
    },
    technologies: ['Python', 'Multi-omics', 'Survival analysis'],
    highlights: [
      'Co-authored Slide-Omics, a multi-omics cancer survival prediction framework presented at CPP’s 18th Annual Science Research Symposium.',
    ],
  },
]

export const projects = [
  {
    name: 'Eye Tracking Analysis',
    dates: 'Aug. 2026 – Present',
    summary: 'A general-purpose, web-based eye-tracking platform that captures gaze coordinates and scrolling behavior, batches interaction data into MySQL via Laravel, and processes it with DBSCAN clustering and fixation aggregation to generate usability heatmaps.',
    technologies: ['WebGazer.js', 'Laravel', 'PHP', 'MySQL', 'Python'],
    art: { style: 'placeholder' },
  },
  {
    name: 'Sloka',
    dates: 'May 2025 – Dec. 2025',
    summary: 'A full-stack platform with secure authentication, RESTful APIs, real-time features, and role-based access control (RBAC), built with React and TypeScript on the frontend and PostgreSQL and Google Cloud Platform on the backend.',
    technologies: ['React', 'TypeScript', 'PostgreSQL', 'Google Cloud Platform'],
    art: { style: 'placeholder' },
  },
  // Add demo: '/videos/my-project.mp4' (file in public/videos) to any project to play it in the full-size viewer.
  // Placeholders — swap in real projects. Art styles: placeholder, heatmap, type, waves, scribble, stamp, bubble,
  // or set art.image to a path in /public (e.g. '/images/my-project.png') to use your own graphic.
  { name: 'Project 03', placeholder: true, dates: 'Coming soon', summary: 'Details coming soon.', technologies: [], art: { style: 'placeholder' } },
  { name: 'Project 04', placeholder: true, dates: 'Coming soon', summary: 'Details coming soon.', technologies: [], art: { style: 'placeholder' } },
  { name: 'Project 05', placeholder: true, dates: 'Coming soon', summary: 'Details coming soon.', technologies: [], art: { style: 'placeholder' } },
  { name: 'Project 06', placeholder: true, dates: 'Coming soon', summary: 'Details coming soon.', technologies: [], art: { style: 'placeholder' } },
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
