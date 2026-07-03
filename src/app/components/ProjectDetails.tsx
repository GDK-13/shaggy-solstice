import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const modules = import.meta.glob('../../content/projetos/*.json', { eager: true });

const getSafeImageUrl = (img?: string) => {
  if (!img) return undefined;
  const cleanImg = img.startsWith('/') ? img.substring(1) : img;
  return `${import.meta.env.BASE_URL}${cleanImg}`;
};

export default function ProjectDetails() {
  const { id } = useParams();
  const [activeSlide, setActiveSlide] = useState(0);

  const projectPath = `../../content/projetos/${id}.json`;
  const projectData = modules[projectPath] ? (modules[projectPath] as any).default : null;

  if (!projectData) {
    return <div className="text-center py-20 text-2xl font-bold">Projeto não encontrado!</div>;
  }

  // Consolida todas as imagens (capa + galeria) com suas respectivas legendas
  const slideshow: Array<{ url: string; caption: string }> = [];
  
  if (projectData.image) {
    slideshow.push({
      url: projectData.image,
      caption: projectData.image_caption || 'Imagem de capa do projeto'
    });
  }

  if (projectData.gallery && projectData.gallery.length > 0) {
    projectData.gallery.forEach((item: any) => {
      if (item && item.photo) {
        slideshow.push({ url: item.photo, caption: item.caption || '' });
      } else if (typeof item === 'string') {
        slideshow.push({ url: item, caption: '' });
      }
    });
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slideshow.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slideshow.length) % slideshow.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1>FUNPAPI</h1>
          <Link to="/" className="hover:opacity-80 transition-opacity text-sm font-medium">
            &larr; Voltar para Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6">
        
        {/* CARROSSEL DE IMAGENS (TOPO) */}
        {slideshow.length > 0 && (
          <div className="relative group w-full mb-8 bg-muted rounded-2xl overflow-hidden shadow-lg">
            <div className="h-[450px] w-full">
              <ImageWithFallback 
                src={getSafeImageUrl(slideshow[activeSlide].url)} 
                alt={projectData.title} 
                className="w-full h-full object-cover transition-all duration-300" 
              />
            </div>

            {/* Setas de Navegação (Apenas aparecem se tiver mais de 1 foto) */}
            {slideshow.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
                >
                  &#10094;
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
                >
                  &#10095;
                </button>
              </>
            )}

            {/* Barra de Legenda Dinâmica */}
            {slideshow[activeSlide].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-10 text-white text-sm">
                <p className="max-w-3xl mx-auto italic">{slideshow[activeSlide].caption}</p>
              </div>
            )}
          </div>
        )}

        <h1 className="text-4xl font-bold mb-6">{projectData.title}</h1>
        
        {/* TEXTO DO PROJETO */}
        <div className="text-lg text-muted-foreground leading-relaxed flex flex-col gap-4">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{projectData.description}</ReactMarkdown>
        </div>

        {/* GALERIA EM GRADE COMPLETA (FINAL DA PÁGINA) */}
        {slideshow.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h3 className="text-2xl font-bold mb-6">Galeria de Fotos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {slideshow.map((img, index) => (
                <div 
                  key={index} 
                  onClick={() => setActiveSlide(index)}
                  className={`overflow-hidden rounded-xl shadow-sm cursor-pointer border-2 transition-all duration-200 ${
                    activeSlide === index ? 'border-primary scale-[0.98]' : 'border-transparent hover:border-primary/50'
                  }`}
                >
                  <ImageWithFallback
                    src={getSafeImageUrl(img.url)}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-36 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}