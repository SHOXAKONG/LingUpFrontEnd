// Import all images
import Abdumajidov_Sodiqjon from "@/assets/aim/Abdumajidov_Sodiqjon.webp";
import Andrey_Kim from "@/assets/aim/Andrey_Kim.webp";
import Asalxon_Amirqulova from "@/assets/aim/Asalxon_Amirqulova.webp";
import Bexruz_Mansurov from "@/assets/aim/Bexruz_Mansurov.webp";
import Damir_Zagrudinov from "@/assets/aim/Damir_Zagrudinov.webp";
import Diana_Garapshina from "@/assets/aim/Diana_Garapshina.webp";
import Jalolova_Zarina from "@/assets/aim/Jalolova_Zarina.webp";
import Kamronbek_Farxodzoda from "@/assets/aim/Kamronbek_Farxodzoda.webp";
import Kim_Andrey from "@/assets/aim/Kim_Andrey.webp";
import Li_Viktor from "@/assets/aim/Li_Viktor.webp";
import Madinabonu_Fayzakhmatova from "@/assets/aim/Madinabonu_Fayzakhmatova.webp";
import Niyazov_Alixan from "@/assets/aim/Niyazov_Alixan.webp";
import Samiriddin_Nizomxojayev from "@/assets/aim/Samiriddin_Nizomxo'jayev.webp";
import Sevinch_Shavkatova from "@/assets/aim/Sevinch_Shavkatova.webp";
import Sodiqjon_Abdumajidov from "@/assets/aim/Sodiqjon_Abdumajidov.webp";
import Yusuf_Avazov from "@/assets/aim/Yusuf_Avazov.webp";
import Zebo_Ielts_Sultonova from "@/assets/aim/Zebo_Ielts_Sultonova.webp";
import Zebo_Sultonova from "@/assets/aim/Zebo_Sultonova.webp";
import Zilola_Umarova from "@/assets/aim/Zilola_Umarova.webp";
import Saidov_Firuz from "@/assets/aim/Saidov_Firuz.webp";
import Amirov_Kodir from "@/assets/aim/Amirov_Kodir.webp";
import Sharipova_Xonzodabegim from "@/assets/aim/Sharipova_Xonzodabegim.webp";
import Toshkoriev_Mukhammadjon from "@/assets/aim/Toshkoriev_Mukhammadjon.webp";

type Slide = {
  id: number;
  name: string;
  image: string;
  course: string;
  description: string;
  score?: string;
  achievement?: string;
};
// Use imports in slides array
const slides: Slide[] = [
  { id: 1, name: "Abdumajidov Sodiqjon", image: Abdumajidov_Sodiqjon, course: "IELTS 5.5", description: "slides.1.description" },
  { id: 2, name: "Andrey Kim", image: Andrey_Kim, course: "CEFR C1", description: "slides.2.description" },
  { id: 3, name: "Asalxon Amirqulova", image: Asalxon_Amirqulova, course: "IELTS 6.5", description: "slides.3.description" },
  { id: 4, name: "Bexruz Mansurov", image: Bexruz_Mansurov, course: "IELTS 7.0", description: "slides.4.description" },
  { id: 5, name: "Damir Zagrudinov", image: Damir_Zagrudinov, course: "IELTS 6.5", description: "slides.5.description" },
  { id: 6, name: "Diana Garapshina", image: Diana_Garapshina, course: "IELTS 7.0", description: "slides.6.description" },
  { id: 7, name: "Jalolova Zarina", image: Jalolova_Zarina, course: "IELTS 6.0", description: "slides.7.description" },
  { id: 8, name: "Kamronbek Farxodzoda", image: Kamronbek_Farxodzoda, course: "IELTS 6.5", description: "slides.8.description" },
  { id: 9, name: "Kim Andrey", image: Kim_Andrey, course: "IELTS 7.0", description: "slides.9.description" },
  { id: 10, name: "Li Viktor", image: Li_Viktor, course: "IELTS 7.0", description: "slides.10.description" },
  { id: 11, name: "Madinabonu Fayzakhmatova", image: Madinabonu_Fayzakhmatova, course: "IELTS 6.0", description: "slides.11.description" },
  { id: 12, name: "Niyazov Alixan", image: Niyazov_Alixan, course: "IETLS 6.5", description: "slides.12.description" },
  { id: 13, name: "Samiriddin Nizomxo'jayev", image: Samiriddin_Nizomxojayev, course: "CEFR C1", description: "slides.13.description" },
  { id: 14, name: "Sevinch Shavkatova", image: Sevinch_Shavkatova, course: "IELTS 8.5", description: "slides.14.description" },
  { id: 15, name: "Sodiqjon Abdumajidov", image: Sodiqjon_Abdumajidov, course: "CEFR B2", description: "slides.15.description" },
  { id: 16, name: "Yusuf Avazov", image: Yusuf_Avazov, course: "IELTS 8.0", description: "slides.16.description" },
  { id: 17, name: "Zebo Sultonova", image: Zebo_Ielts_Sultonova, course: "IELTS 6.5", description: "slides.17.description" },
  { id: 18, name: "Zebo Sultonova", image: Zebo_Sultonova, course: "CEFR C1", description: "slides.18.description" },
  { id: 19, name: "Zilola Umarova", image: Zilola_Umarova, course: "IELTS 6.5", description: "slides.19.description" },
  { id: 20, name: "Saidov Feruz", image: Saidov_Firuz, course: "IELTS 7.0", description: "slides.20.description" },
  { id: 21, name: "Amirov Kodir", image: Amirov_Kodir, course: "IELTS 6.0", description: "slides.21.description" },
  { id: 22, name: "Sharipova Xonzodabegim", image: Sharipova_Xonzodabegim, course: "IELTS 6.0", description: "slides.22.description" },
  { id: 23, name: "Toshkoriev Mukhammadjon", image: Toshkoriev_Mukhammadjon, course: "IELTS 6.0", description: "slides.23.description" }
];

export default slides;
