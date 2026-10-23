/** Projects that have their own (placeholder) page at /projects/<slug>.html. */
export interface Project {
  slug: string;
  name: string;
  repo: string;
}

export const projects: Project[] = [
  { slug: 'conduit', name: 'Conduit', repo: 'https://github.com/Spongy01/Conduit' },
  { slug: 'brokenomore', name: 'BrokeNoMore', repo: 'https://github.com/Spongy01/BrokeNoMore' },
  { slug: 'cardiology-qa', name: 'Cardiology LLM Fine-Tuning', repo: 'https://github.com/Spongy01/Cardiology-QA' },
  { slug: 'pdf-to-latex', name: 'PDF to LaTeX', repo: 'https://github.com/Spongy01/pdf-2-latex' },
  { slug: 'pubmedqa-debate', name: 'Debating Small Models for Medical QA', repo: 'https://github.com/Spongy01/NLP_Project' },
  { slug: 'minigpt', name: 'miniGPT', repo: 'https://github.com/Spongy01/miniGPT' },
];
