import React, { useReducer, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

// --- 1. LLIBRERIA PARTICLE NETWORK ---
!function(a){var b="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global;"function"==typeof define&&define.amd?define(["exports"],function(c){b.ParticleNetwork=a(b,c)}):"object"==typeof module&&module.exports?module.exports=a(b,{}):b.ParticleNetwork=a(b,{})}(function(a,b){var c=function(a){this.canvas=a.canvas,this.g=a.g,this.particleColor=a.options.particleColor,this.x=Math.random()*this.canvas.width,this.y=Math.random()*this.canvas.height,this.velocity={x:(Math.random()-.5)*a.options.velocity,y:(Math.random()-.5)*a.options.velocity}};return c.prototype.update=function(){(this.x>this.canvas.width+20||this.x<-20)&&(this.velocity.x=-this.velocity.x),(this.y>this.canvas.height+20||this.y<-20)&&(this.velocity.y=-this.velocity.y),this.x+=this.velocity.x,this.y+=this.velocity.y},c.prototype.h=function(){this.g.beginPath(),this.g.fillStyle=this.particleColor,this.g.globalAlpha=.7,this.g.arc(this.x,this.y,1.5,0,2*Math.PI),this.g.fill()},b=function(a,b){this.i=a,this.i.size={width:this.i.offsetWidth,height:this.i.offsetHeight},b=void 0!==b?b:{},this.options={particleColor:void 0!==b.particleColor?b.particleColor:"#fff",background:void 0!==b.background?b.background:"#10171d",interactive:void 0!==b.interactive?b.interactive:!0,velocity:this.setVelocity(b.speed),density:this.j(b.density)},this.init()},b.prototype.init=function(){if(this.k=document.createElement("div"),this.i.appendChild(this.k),this.l(this.k,{position:"absolute",top:0,left:0,bottom:0,right:0,"z-index":1}),/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.options.background))this.l(this.k,{background:this.options.background});this.canvas=document.createElement("canvas"),this.i.appendChild(this.canvas),this.g=this.canvas.getContext("2d"),this.canvas.width=this.i.size.width,this.canvas.height=this.i.size.height,this.l(this.i,{position:"relative"}),this.l(this.canvas,{"z-index":"2",position:"relative"}),window.addEventListener("resize",function(){if(this.i.offsetWidth!==this.i.size.width||this.i.offsetHeight!==this.i.size.height){this.canvas.width=this.i.size.width=this.i.offsetWidth,this.canvas.height=this.i.size.height=this.i.offsetHeight,this.o=[];for(var a=0;a<this.canvas.width*this.canvas.height/this.options.density;a++)this.o.push(new c(this));if(this.options.interactive)this.o.push(this.p)}}.bind(this)),this.o=[];for(var a=0;a<this.canvas.width*this.canvas.height/this.options.density;a++)this.o.push(new c(this));if(this.options.interactive){this.p=new c(this),this.p.velocity={x:0,y:0},this.o.push(this.p),this.canvas.addEventListener("mousemove",function(a){this.p.x=a.clientX-this.canvas.offsetLeft,this.p.y=a.clientY-this.canvas.offsetTop}.bind(this))}requestAnimationFrame(this.update.bind(this))},b.prototype.update=function(){this.g.clearRect(0,0,this.canvas.width,this.canvas.height);for(var a=0;a<this.o.length;a++){this.o[a].update(),this.o[a].h();for(var b=this.o.length-1;b>a;b--){var c=Math.sqrt(Math.pow(this.o[a].x-this.o[b].x,2)+Math.pow(this.o[a].y-this.o[b].y,2));if(c<120){this.g.beginPath(),this.g.strokeStyle=this.options.particleColor,this.g.globalAlpha=(120-c)/120,this.g.lineWidth=.7,this.g.moveTo(this.o[a].x,this.o[a].y),this.g.lineTo(this.o[b].x,this.o[b].y),this.g.stroke()}}}requestAnimationFrame(this.update.bind(this))},b.prototype.setVelocity=function(a){return"fast"===a?1:"slow"===a?.33:0.66},b.prototype.j=function(a){return"high"===a?5e3:"low"===a?2e4:1e4},b.prototype.l=function(a,b){for(var c in b)a.style[c]=b[c]},b});

// --- 2. LÒGICA DEL CARRUSEL 3D ---
// A MAIN.JSX
const slides = [
  {
    title: "Canalització CG-2",
    subtitle: "Bordes de l'Aldosa",
    description: "Sistemes de drenatge avançat i murs de contenció complexos.",
    image: "https://images.unsplash.com/photo-1541976844346-f18aeac57b06?q=80&w=1200" // Construcció estable
  },
  {
    title: "Centre Logístic",
    subtitle: "Andorra la Vella",
    description: "Reurbanització industrial i càlculs d'alta resistència.",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129fe?q=80&w=1200" // Magatzem estable
  },
  {
    title: "Parc Solar",
    subtitle: "Llum de Muntanya",
    description: "Màxima eficiència energètica en terreny irregular de muntanya.",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?q=80&w=1200" // Panells estables
  }
];

// A MAIN.JSX - Substitueix la funció useTilt sencera
function useTilt(active) {
  const ref = useRef(null);

  useEffect(() => {
    // Si no està activa o el component no s'ha muntat, no fem res
    if (!active || !ref.current) return;

    const el = ref.current;
    
    // Per assegurar-nos que les variables CSS existeixen des del principi
    el.style.setProperty("--px", 0.5);
    el.style.setProperty("--py", 0.5);

    const handleMouseMove = (e) => {
      // Calculem la posició relativa del ratolí dins de la targeta (de 0 a 1)
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      // Passem les coordenades al CSS
      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    // Afegim l'esdeveniment
    el.addEventListener("mousemove", handleMouseMove);

    // Neteja quan el component es desmunta o canvia l'estat
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      // Resetegem la posició en sortir
      el.style.setProperty("--px", 0.5);
      el.style.setProperty("--py", 0.5);
    };
  }, [active]); // Re-executar quan canviï l'estat d'activa

  return ref;
}

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") return { slideIndex: (state.slideIndex + 1) % slides.length };
  if (event.type === "PREV") return { slideIndex: state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1 };
  return state;
};

function Slide({ slide, offset }) {
  const active = offset === 0;
  const ref = useTilt(active);
  return (
    <div 
      ref={ref} 
      className="slide" 
      data-active={active || undefined} 
      style={{ 
        "--offset": offset, 
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
        "--abs-offset": Math.abs(offset) // <--- AFEGEIX AIXÒ AQUÍ
      }}
    >
      <div className="slideContent" style={{ backgroundImage: `url('${slide.image}')` }}>
      {/* Aquest div farà el reflex blanc quan moguis el ratolí */}
      <div className="slideShadow"></div> 
      
      <div className="slideContentInner">
        <h2 className="slideTitle">{slide.title}</h2>
        <h3 className="slideSubtitle">{slide.subtitle}</h3>
        <p className="slideDescription">{slide.description}</p>
      </div>
    </div>
  </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(slidesReducer, { slideIndex: 0 });
  useEffect(() => {
    // Inicialització de partícules quan el component es munta
    const canvasDiv = document.getElementById('particle-canvas');
    if (canvasDiv) {
        new window.ParticleNetwork(canvasDiv, {
            particleColor: '#28e100',
            background: '#0a0a0a',
            interactive: true,
            speed: 'medium',
            density: 'high'
        });
    }
  }, []);

  return (
    <div className="slides">
      <button onClick={() => dispatch({ type: "PREV" })}>‹</button>
      {slides.map((slide, i) => {
        let offset = i - state.slideIndex;
        return <Slide slide={slide} offset={offset} key={i} />;
      })}
      <button onClick={() => dispatch({ type: "NEXT" })}>›</button>
    </div>
  );
}

// RENDERITZAT FINAL
const container = document.getElementById("project-app");
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = '#0a0a0a';
        header.style.padding = '0.5rem 2rem'; // Es fa una mica més petit al baixar
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.padding = '1rem 2rem';
    }
});

document.querySelectorAll('.codedText').forEach((t) => {
    const arr1 = t.innerText.split(''); // Fem servir innerText per seguretat
    const arr2 = [];
    arr1.forEach((char, i) => arr2[i] = randChar());

    t.onpointerover = () => {
        const tl = gsap.timeline();
        let step = 0;
        
        tl.fromTo(t, {
            innerHTML: arr2.join(''),
            color: '#000',
            background: '#28e100' // Verd ENGIX al fer hover
        }, {
            duration: arr1.length / 20,
            ease: 'power4.in',
            delay: 0.05,
            color: '#fff',
            background: 'transparent', // Torna a transparent
            onUpdate: () => {
                const p = Math.floor(tl.progress() * (arr1.length));
                if (step != p) {
                    step = p;
                    arr1.forEach((char, i) => arr2[i] = randChar());
                    let pt1 = arr1.join('').substring(p, 0);
                    let pt2 = arr2.join('').substring(arr2.length - p, 0);
                    
                    if (t.classList.contains('fromRight')) {
                        pt1 = arr2.join('').substring(arr2.length - p, 0);
                        pt2 = arr1.join('').substring(arr1.length - p);
                    }
                    t.innerHTML = pt1 + pt2;
                }
            },
            onComplete: () => {
                t.innerHTML = arr1.join(''); // Ens assegurem que el text final sigui correcte
            }
        });
    }
});

function randChar() {
    let c = "abcdefghijklmnopqrstuvwxyz1234567890!@#$^&*()…æ_+-=;[]/~`";
    c = c[Math.floor(Math.random() * c.length)];
    return (Math.random() > 0.5) ? c : c.toUpperCase();
}