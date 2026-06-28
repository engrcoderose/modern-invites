import { weddingTwoData } from "./data/wedding-two-data";
import HeroSection from "./components/HeroSection";
export default function TemplateTwo(){
  return (
    <div>
      <HeroSection
        bride={weddingTwoData.bride}
        groom={weddingTwoData.groom}
        weddingDate={weddingTwoData.weddingDate}
      />
      
    </div>
  )
}