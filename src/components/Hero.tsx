import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImg from '../imports/bb2b3e_8c1e90cc3c3b469c8a00abc7dedade5f_mv2.jpg?url';

export default function Hero() {
  return (
    <section id="home" className="bg-secondary py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">FUNPAPI</h2>
            <p className="text-foreground leading-relaxed mb-4">
              A Fundação de proteção ao meio Ambiente e Ecossitema
              do Estado do Piauí - Funpapi foi constituída em 2002
              com a finalidade de assessorar o Poder Público em ações
              lucrativas, de direitos privados, reconhecida pela
              Município de Teresina como uma Utilidade Pública através
              de uma forte atuação ambiental na defesa do meio ambiente,
              socio fundadores, colaboradores e parceiros.
            </p>
            <p className="text-foreground leading-relaxed">
              A ONG atua em diversas frentes de trabalho, cientes de
              que deles depende uma perspectiva interdisciplinar, visando a
              transversalidade de sabor.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <ImageWithFallback
              src={heroImg}
              alt="FUNPAPI - Proteção ambiental"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}