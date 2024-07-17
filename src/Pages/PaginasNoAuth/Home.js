import happy from '../img/happy_people.jpg';
import concept from '../img/disco.gif';
import './Home.css';

function Home() {
    return (
        <div className="section grid-container">
                <div className="grid-item area1">
                    <img src={happy} className="img-home" alt="happy people" />
                </div>

                <div className="grid-item area2">
                    <h1><strong>Escute o mundo de um jeito diferente</strong></h1>
                    <h5 className='p_text'>Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Maecenas ultricies
                        magna nec tristique efficitur. Quisque eget euismod
                        lacus, eu rutrum turpis. Aliquam non viverra arcu,
                        sed molestie arcu. Nulla facilisis leo magna,
                        eu sollicitudin lorem imperdiet molestie.
                        Mauris ornare eros nec enim pharetra semper.
                        Sed et fermentum nibh, at pretium lorem.
                        Suspendisse id interdum arcu, semper fermentum metus.</h5>
                </div>

            <div className="banner grid-item area3">
                <strong><p>Garanta já diversão para você, <br />amigos e familiares!</p></strong>
            </div>

            <div className="banner_bottom grid-item area4">
                <img src={concept} className="img_banner" alt="Disco music" />
                <div className="text_gif">
                    <h5>Música de qualidade</h5>
                    <p>Com o Umusic você consegue ouvir suas músicas sem se preocupar com ruídos!</p>
                </div>
            </div>
        </div>
    );
}

export default Home;