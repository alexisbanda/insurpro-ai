
import React from 'react';

export interface NavLink {
  name: string;
  href: string;
}

export interface HowItWorksStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Solution {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface Testimonial {
    quote: string;
    name: string;
    title: string;
    avatar: string;
}
