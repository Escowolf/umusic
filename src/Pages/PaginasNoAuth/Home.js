import happy from '../img/happy_people.jpg';
import concept from '../img/disco.gif';
import '../css/Home.css';

function Home() {
    return (
        <div className="Home">
            <div className="container">

                <div className="row">
                    <div className="col-sm">
                        <img src={happy} className="img-fluid" alt="happy people" />
                    </div>

                    <div className="col-sm">
                        <h1 ><strong>Escute o mundo de um jeito diferente</strong></h1>
                        <h5>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Maecenas ultricies
                            magna nec tristique efficitur. Quisque eget euismod
                            lacus, eu rutrum turpis. Aliquam non viverra arcu,
                            sed molestie arcu. Nulla facilisis leo magna,
                            eu sollicitudin lorem imperdiet molestie.
                            Mauris ornare eros nec enim pharetra semper.
                            Sed et fermentum nibh, at pretium lorem.
                            Suspendisse id interdum arcu, semper fermentum metus.</h5>
                    </div>
                </div> <br />

                <div className="text">
                    <strong><p>Garanta já diversão para você, <br />amigos e familiares!</p></strong>
                </div>
                <br />

                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={concept} className="d-block w-100" alt="Disco music" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Música de qualidade</h5>
                                <p>Com o Umusic você consegue ouvir suas músicas sem se preocupar com ruídos!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;