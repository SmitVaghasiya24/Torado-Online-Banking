import BreadcrumbHero from '../components/Breadcrumb';
import Subscribe from '../components/Subscriber';
import AtmLocator from '../components/AtmLocator';

function Atm() {
    return (
        <div>
            <BreadcrumbHero title="ATM locator" image="/Breadcrumb/atm.webp" />

            <AtmLocator/>
            
            <Subscribe />
        </div>
    )
}

export default Atm