
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import ban11 from "../../../assets/rsz_appsLaunching.jpg";
import ban1 from "../../../assets/rsz_1eduban1.jpg";
import ban2 from "../../../assets/rsz_1eduban2.jpg";
import ban3 from "../../../assets/rsz_ambrasedorr.jpg";
import ban4 from "../../../assets/rsz_banwithsumon.jpg";


const Bannar = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} dynamicHeight={false}>
            <div>
                <img src={ban11}/>
                
            </div>
            <div>
                <img src={ban4}/>
                
            </div>
            <div>
                <img src={ban2} />
              
            </div>
            <div>
                <img src={ban3} />
                
            </div>
            <div>
                <img src={ban1} />
                
            </div>
        </Carousel>
    );
}

export default Bannar;