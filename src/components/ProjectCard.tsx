import React from 'react';
import { motion } from 'motion/react';
import { Project } from '@/src/data';
import { ImageCarousel } from './ImageCarousel';
import { cn } from '@/src/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "flex flex-col gap-12 py-24 border-t border-black/5",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Text Content */}
      <div className="flex-1 max-w-md">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-1.5 border border-btn-secondary-border rounded-full text-[12px] text-text-secondary uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-4xl md:text-5xl mb-6">{project.title}</h3>
        <p className="text-text-secondary text-lg leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Carousel */}
      <div className="flex-[1.5] overflow-hidden">
        <ImageCarousel images={project.images} reverse={!isEven} />
      </div>
    </motion.div>
  );
};
