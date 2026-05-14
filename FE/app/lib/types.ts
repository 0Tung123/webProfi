export interface NavItem {
  label: string;
  href: string;
}

export interface HeroCard {
  id: string;
  src: string;
  alt: string;
  blurDataURL?: string;
}

export interface Service {
  title: string;
  desc: string;
  image: string;
  blurDataURL?: string;
}

export interface Project {
  title: string;
  category: string;
  image: string;
  blurDataURL?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export type Skill = string;
export type Benefit = string;
export type Client = string;
