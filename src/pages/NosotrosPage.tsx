import { AboutUs } from "../components/about/AboutUs";
import { AboutContent } from "../components/about/AboutContent";
import { ContactInfo } from "../components/about/ContactInfo";

export const NosotrosPage = () => {
    const paragraphs = [
        "pasteleria",
        "Atentos que es muy super"
    ];

    return (
        <div className="space-y-5">
            <AboutUs 
                title="Nuestra Pasteleria" 
                imageUrl="https://th.bing.com/th/id/OIP.ihbxBwsBbMjMlZGks1v0tQHaET?w=264&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" 
            />
            <AboutContent 
                paragraphs={paragraphs} 
                sectionTitle="Compren wey" 
            />
            <ContactInfo 
                email="pasteleria@pasteleriamilsabores.com" 
                phone="+56 9 91537604" 
                introText="Para mas informacion huevos a la pera" 
            />
        </div>
    );
};