import { ImageWithFallback } from './figma/ImageWithFallback';

import img1 from '../imports/Sunrise_over_Bali_Jungle.jpg';
import img2 from '../imports/Lush_Green_Plants_Thriving_in_a_Greenhouse_Bathed_in_Sunlight_Showing_Vibrant_Foliage_and_Water_Droplets.jpg';
import img3 from '../imports/View_of_the_Nature_of_Moldova.jpg';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "LOREM IPSUM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eros massa, pulvinar elemod tempor posuere.",
      image: img1
    },
    {
      id: 2,
      title: "LOREM IPSUM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eros massa, pulvinar elemod tempor posuere.",
      image: img2
    },
    {
      id: 3,
      title: "LOREM IPSUM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eros massa, pulvinar elemod tempor posuere.",
      image: img3
    }
  ];

  return (
    <section id="projects" className="bg-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-12 text-center">Ações e Projetos</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-card rounded-2xl overflow-hidden shadow-md">
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}