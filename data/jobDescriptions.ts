export interface JobDescription {
  id: string;
  title: string;
  description: string;
}

export const jobDescriptions: JobDescription[] = [
  {
    id: 'frontend-engineer',
    title: 'Senior Frontend Engineer (React)',
    description: `We are seeking an experienced Senior Frontend Engineer to join our dynamic team. The ideal candidate will have a strong background in building modern, responsive, and high-performance web applications using React.

Key Responsibilities:
- Develop and maintain user-facing features using React.js.
- Build reusable components and front-end libraries for future use.
- Translate designs and wireframes into high-quality code.
- Optimize components for maximum performance across a vast array of web-capable devices and browsers.
- Collaborate with backend engineers to integrate with server-side APIs.
- Work closely with UI/UX designers to ensure technical feasibility of designs.

Qualifications:
- 5+ years of professional experience in frontend development.
- Proficient in JavaScript, TypeScript, CSS, and HTML.
- Deep understanding of React.js and its core principles.
- Experience with popular React.js workflows (such as Flux or Redux).
- Familiarity with modern front-end build pipelines and tools (e.g., Webpack, Babel, NPM).
- Experience with RESTful APIs.
- Strong problem-solving skills and attention to detail.`
  },
  {
    id: 'backend-engineer',
    title: 'Lead Backend Engineer (Node.js)',
    description: `We are looking for a Lead Backend Engineer to manage our server-side logic and lead a team of talented developers. You will be responsible for the development of all server-side logic, definition and maintenance of the central database, and ensuring high performance and responsiveness to requests from the front-end.

Key Responsibilities:
- Design and implement scalable and secure server-side applications using Node.js.
- Lead and mentor a team of backend developers.
- Manage the interchange of data between the server and the users.
- Develop and maintain APIs for our web and mobile applications.
- Integrate with third-party services and APIs.
- Optimize applications for speed and scalability.
- Implement security and data protection measures.

Qualifications:
- 7+ years of experience in backend development.
- Strong proficiency with JavaScript and TypeScript.
- In-depth knowledge of Node.js and frameworks available for it (e.g., Express).
- Experience with database technologies like PostgreSQL, MongoDB, or Redis.
- Understanding of microservices architecture.
- Experience with cloud platforms like AWS or Google Cloud.
- Proven experience leading a technical team.`
  },
  {
    id: 'product-manager',
    title: 'Product Manager, Core Platform',
    description: `We are seeking a passionate and driven Product Manager to take ownership of our core platform. You will be responsible for defining the product vision, strategy, and roadmap, and working with cross-functional teams to deliver a world-class product.

Key Responsibilities:
- Define and communicate the product roadmap, aligning it with company goals.
- Gather and prioritize product and customer requirements.
- Write detailed product specifications and user stories.
- Work closely with engineering, design, marketing, and sales teams to ensure successful product launches.
- Analyze market trends and competitive landscape.
- Use data and user feedback to make informed product decisions.
- Act as the product evangelist, both internally and externally.

Qualifications:
- 4+ years of product management experience, preferably in a SaaS or platform company.
- Proven track record of managing all aspects of a successful product throughout its lifecycle.
- Strong technical background with understanding and/or hands-on experience in software development.
- Excellent written and verbal communication skills.
- Strong analytical and problem-solving skills.
- Ability to work effectively in a fast-paced, collaborative environment.`
  }
];
