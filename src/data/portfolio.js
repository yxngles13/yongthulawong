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

export const experiences = [
  {
    organization: 'California State University, Office of Chancellor',
    role: 'Software Engineering Intern',
    dates: 'June 2026 – Present',
    location: 'Remote',
    summary: 'Leading end-to-end development of centralized administrative systems used across more than 20 CSU campuses.',
    highlights: [
      'Led the end-to-end development of 3 administrative systems—Admin Page, System Inbox, and User Usage—supporting centralized workflows across 20+ CSU campuses.',
      'Delivered 15+ frontend and backend features within an Agile Scrum team using PHP, Laravel, JavaScript, jQuery, MySQL, and AWS RDS.',
      'Designed RESTful APIs and database-backed workflows using Laravel MVC and Eloquent ORM, enabling administrators to manage users, messages, and platform activity.',
      'Diagnosed and resolved 30+ frontend, backend, and database issues, improving platform reliability and supporting production deployments.',
    ],
  },
  {
    organization: 'Cadence Design Systems',
    role: 'Machine Learning Engineer Fellow',
    dates: 'Aug. 2025 – Dec. 2025',
    location: 'Remote',
    summary: 'Built an interactive analytics dashboard that transformed unstructured review data and model outputs into product-level insights, and presented the system and findings to Cadence Design Systems stakeholders.',
    highlights: [
      'Cleaned and preprocessed 48M+ Amazon product reviews using Python, Pandas, and NLTK, building a text-processing pipeline for large-scale NLP model training.',
      'Fine-tuned BERT-Base Uncased using Hugging Face Transformers for multi-class sentiment analysis, achieving 87% accuracy across positive, neutral, and negative classifications.',
      'Developed an aspect-based sentiment analysis pipeline using PyABSA to extract product features and analyze feature-level sentiment across 51K reviews, identifying customer pain points and product features to preserve or redesign.',
    ],
  },
  {
    organization: 'California State Polytechnic University, Pomona',
    role: 'Research Assistant',
    dates: 'Spring 2025',
    location: 'Pomona, CA',
    summary: 'Supported deep-learning research for histopathological cancer image classification and survival analysis with a faculty researcher.',
    highlights: [
      'Preprocessed and analyzed 1,385 whole-slide histopathological images across three cancer cohorts—TCGA-LUAD, TCGA-LIHC, and TCGA-LGG—using Python, NumPy, and Pandas.',
      'Integrated three multi-omics layers representing 9,405 genes into pathway-image representations and collaborated on deep learning models for cancer survival analysis.',
      'Evaluated HipoMap and pathway-image representations using concordance index, achieving a best validation C-index of 0.57 and a best test C-index of 0.56.',
    ],
  },
]

export const projects = [
  {
    name: 'Eye Tracking Analysis',
    dates: 'Aug. 2026 – Present',
    summary: 'A general-purpose, web-based eye-tracking platform that captures gaze coordinates and scrolling behavior, batches interaction data into MySQL via Laravel, and processes it with DBSCAN clustering and fixation aggregation to generate usability heatmaps.',
    technologies: ['WebGazer.js', 'Laravel', 'PHP', 'MySQL', 'Python'],
  },
  {
    name: 'Sloka',
    dates: 'May 2025 – Dec. 2025',
    summary: 'A full-stack platform with secure authentication, RESTful APIs, real-time features, and role-based access control (RBAC), built with React and TypeScript on the frontend and PostgreSQL and Google Cloud Platform on the backend.',
    technologies: ['React', 'TypeScript', 'PostgreSQL', 'Google Cloud Platform'],
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
