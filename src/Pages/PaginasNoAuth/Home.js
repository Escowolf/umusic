import '../css/Home.css';

function Home() {
    return (
        <div className="section home">
            <h1 className='home-phrase'>escute o mundo de um jeito diferente</h1>
            <div className='home-waves'>
                <div className='wave'></div>
                <div className='wave'></div>
                <div className='wave'></div>        
                <div className='wave'></div>        
                <div className='wave'></div>        
                <div className='wave'></div>                
            </div>
            <h1 className='home-phrase'>escute o mundo do <span>seu</span> jeito</h1>
        </div>
    );
}

export default Home;