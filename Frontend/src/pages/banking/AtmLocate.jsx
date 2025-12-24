import Subscribe from '../../components/Subscriber';
import AtmLocator from '../../components/AtmLocator';
import BreadcrumbHero from '../../components/Breadcrumb';

function AtmLocate() {
    return (
        <div>
            <BreadcrumbHero title="ATM locator" image="/Breadcrumb/atm.webp" />

            <AtmLocator/>
            
            <Subscribe />
        </div>
    )
}

export default AtmLocate